const $ = (id) => document.getElementById(id);
const resultRows = [];
const cancelRows = [];
let socket;
let worker;
let runStarted;
let rafSamples = [];
let rafPrevious;
let rafSampling = false;
let activeRunId;
let runCounter = 0;
let packageResourceBytes = null;
let currentStage = "idle";
let currentRows = null;

function log(target, text) {
  const el = $(target);
  el.textContent = `${new Date().toISOString()} ${text}\n${el.textContent}`.slice(0, 10000);
}

function wsState(state, detail = "") {
  $("ws-state").textContent = state;
  log("ws-log", `${state}${detail ? ` — ${detail}` : ""}`);
}

function connect() {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) return;
  $("ws-connect").disabled = true;
  wsState("connecting", "wss://data-stream.binance.vision/ws/btcusdt@trade");
  try {
    socket = new WebSocket("wss://data-stream.binance.vision/ws/btcusdt@trade");
    socket.addEventListener("open", () => {
      $("ws-connect").disabled = false;
      $("ws-close").disabled = false;
      wsState(document.hidden ? "stale-hidden" : "live");
    });
    socket.addEventListener("message", (event) => {
      const count = Number($("ws-count").textContent) + 1;
      $("ws-count").textContent = String(count);
      if (count === 1 || count % 20 === 0) {
        try {
          const data = JSON.parse(event.data);
          log("ws-log", `trade #${count}; event=${data.e}; symbol=${data.s}; eventTime=${data.E}; localReceived=${Date.now()}`);
        } catch { log("ws-log", `message #${count}; payload not parsed`); }
      }
    });
    socket.addEventListener("error", () => wsState("error", "Check browser console for CSP/network details; region or policy may block the public endpoint."));
    socket.addEventListener("close", (event) => {
      $("ws-connect").disabled = false;
      $("ws-close").disabled = true;
      wsState("closed", `code=${event.code} clean=${event.wasClean}`);
    });
  } catch (error) {
    $("ws-connect").disabled = false;
    wsState("error", String(error));
  }
}

$("ws-connect").addEventListener("click", connect);
$("ws-close").addEventListener("click", () => socket?.close(1000, "user close"));
document.addEventListener("visibilitychange", () => {
  if (socket?.readyState === WebSocket.OPEN) wsState(document.hidden ? "stale-hidden" : "live-visible");
});
window.addEventListener("offline", () => { if (socket) wsState("offline"); });
window.addEventListener("online", () => { if (socket?.readyState !== WebSocket.OPEN) wsState("online-awaiting-manual-reconnect"); });

function animationFrame(now) {
  if (rafSampling && rafPrevious !== undefined && rafSamples.length < 30000) rafSamples.push(now - rafPrevious - 16.67);
  rafPrevious = now;
  requestAnimationFrame(animationFrame);
}
requestAnimationFrame(animationFrame);

function percentile(values, p) {
  if (!values.length) return 0;
  const ordered = [...values].sort((a, b) => a - b);
  return Math.max(0, ordered[Math.min(ordered.length - 1, Math.floor((ordered.length - 1) * p))]);
}

function workerForRun() {
  if (worker) return worker;
  worker = new Worker("./worker.js", { type: "module" });
  worker.addEventListener("message", ({ data }) => {
    if (data.runId && data.runId !== activeRunId) return;
    if (data.type === "stage") {
      currentStage = data.stage;
      if (data.stage === "features") window.__featureStageAt = performance.now();
      $("run-state").textContent = data.stage;
      log("worker-log", `stage: ${data.stage}`);
    } else if (data.type === "error") {
      finishRun();
      $("run-state").textContent = "failed";
      $("run-message").textContent = data.error;
      log("worker-log", data.error);
    } else if (data.type === "result") {
      const coldRows = performance.getEntriesByType("resource").filter((entry) => entry.name.includes("pyodide") || entry.name.includes("cdn.jsdelivr.net/pyodide"));
      const bytes = coldRows.reduce((sum, entry) => sum + entry.transferSize, 0);
      if (bytes > 0) packageResourceBytes = bytes;
      const record = {
        runId: data.runId,
        recordedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        deviceMemoryGb: navigator.deviceMemory ?? null,
        rowsRequested: data.result.requestedRows,
        rowsUsed: data.result.usedRows,
        rowsDropped: data.result.missingRowsDropped,
        rawSplitIndex: data.result.rawSplitIndex,
        purgeRows: data.result.purgeRows,
        horizonRows: data.result.horizonRows,
        trainRows: data.result.trainRows,
        testRows: data.result.testRows,
        cold: data.cold,
        runtimeLoadMs: data.runtimeLoadMs,
        packageLoadMs: data.packageLoadMs,
        runtimeAndPackagesMs: data.runtimeAndPackagesMs,
        pythonImportsMs: data.result.pythonImportsMs,
        featuresMs: data.result.featuresMs,
        fitMs: data.result.fitMs,
        evaluationMs: data.result.evaluationMs,
        workerTotalMs: data.workerTotalMs,
        pyodideVersion: "314.0.7",
        packageResourceTransferBytes: packageResourceBytes,
        rafP95DelayMs: percentile(rafSamples, .95),
        rafMaxDelayMs: Math.max(0, ...rafSamples),
        memoryMeasurement: performance.measureUserAgentSpecificMemory ? "API available; periodic sampling not implemented in this spike" : "unavailable",
        metrics: data.result.metrics,
        baselines: data.result.baselines,
      };
      resultRows.push(record);
      renderResult(record);
      finishRun(true);
      $("run-state").textContent = "complete";
      $("run-message").textContent = `Cold transfer bytes: ${packageResourceBytes ?? "not exposed by browser"}.`;
      log("worker-log", JSON.stringify(record, null, 2));
    }
  });
  worker.addEventListener("error", (event) => {
    finishRun();
    $("run-state").textContent = "failed";
    $("run-message").textContent = event.message || "Worker failed; check console.";
  });
  return worker;
}

function finishRun(keepWorker = false) {
  rafSampling = false;
  if (!keepWorker) {
    worker?.terminate();
    worker = null;
  }
  activeRunId = null;
  $("run").disabled = false;
  $("cancel").disabled = true;
}

function renderResult(record) {
  const tr = document.createElement("tr");
  const cells = [record.cold ? "cold" : "warm", `${record.rowsRequested} / ${record.rowsUsed}`, record.cold ? `${record.runtimeLoadMs.toFixed(0)} ms` : "cached", record.cold ? `${record.packageLoadMs.toFixed(0)} ms` : "cached", `${record.pythonImportsMs.toFixed(0)} ms`, `${record.featuresMs.toFixed(0)} ms`, `${record.fitMs.toFixed(0)} ms`, `${record.evaluationMs.toFixed(0)} ms`, `${record.workerTotalMs.toFixed(0)} ms`];
  for (const value of cells) { const td = document.createElement("td"); td.textContent = value; tr.append(td); }
  $("results").append(tr);
  $("raf-p95").textContent = record.rafP95DelayMs.toFixed(1);
  $("raf-max").textContent = record.rafMaxDelayMs.toFixed(1);
  $("download").disabled = false;
}

$("run").addEventListener("click", () => {
  const rows = Number($("rows").value);
  currentRows = rows;
  currentStage = "starting";
  runStarted = performance.now();
  rafSamples = [];
  rafSampling = true;
  $("run-state").textContent = "starting";
  $("run-message").textContent = "Cold run includes runtime and package loading; run again for warm timings.";
  $("run").disabled = true;
  $("cancel").disabled = false;
  activeRunId = `run-${++runCounter}`;
  const current = workerForRun();
  current.postMessage({ type: "run", rows, runId: activeRunId });
});

$("cancel").addEventListener("click", () => {
  if (!worker) return;
  const clickAt = performance.now();
  const elapsedMs = performance.now() - runStarted;
  const cancelStart = performance.now();
  worker.terminate();
  const terminateCallMs = performance.now() - cancelStart;
  worker = null;
  activeRunId = null;
  $("run").disabled = false;
  $("cancel").disabled = true;
  $("download").disabled = false;
  $("run-state").textContent = "cancelled";
  const stageAtCancel = currentStage;
  currentStage = "cancelled";
  const cancel = { runId: `run-${runCounter}`, rowsRequested: currentRows, stageAtCancel, terminateCallMs, runElapsedMs: elapsedMs, recordedAt: new Date().toISOString() };
  requestAnimationFrame(() => {
    cancel.clickToNextFrameMs = performance.now() - clickAt;
    cancel.rafP95DelayMs = percentile(rafSamples, .95);
    cancel.rafMaxDelayMs = Math.max(0, ...rafSamples);
    cancelRows.push(cancel);
    rafSampling = false;
    $("run-message").textContent = `Cancelled during ${stageAtCancel}; terminate call ${terminateCallMs.toFixed(2)} ms; next frame ${cancel.clickToNextFrameMs.toFixed(1)} ms; run elapsed ${elapsedMs.toFixed(0)} ms.`;
    $("raf-p95").textContent = cancel.rafP95DelayMs.toFixed(1);
    $("raf-max").textContent = cancel.rafMaxDelayMs.toFixed(1);
    log("worker-log", `cancelled during ${stageAtCancel}; terminate call=${terminateCallMs.toFixed(2)} ms; next frame=${cancel.clickToNextFrameMs.toFixed(1)} ms; elapsed=${elapsedMs.toFixed(0)} ms`);
  });
});

$("download").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({ harness: "browser-feasibility", harnessVersion: "gap1-v1", results: resultRows, cancellations: cancelRows }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "browser-feasibility-results.json";
  anchor.click();
  URL.revokeObjectURL(url);
});

if (performance.memory?.usedJSHeapSize) $("heap").textContent = "available (not sampled by this harness)";
