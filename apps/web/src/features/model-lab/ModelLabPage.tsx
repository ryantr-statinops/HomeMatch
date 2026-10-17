import { useState } from "react";
import Container from "../../components/layout/Container";
import { DEFAULT_CONFIG, type ExperimentConfig, type ExperimentResult } from "./types";
import { createNoopAdapter } from "./workerAdapter";

function EmptyState({ message }: { message: string }) {
  return (
    <div className="panel text-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

export function ModelLabPage() {
  const [config, setConfig] = useState<ExperimentConfig>(DEFAULT_CONFIG);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ExperimentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleRun() {
    setRunning(true);
    setError(null);
    setResult(null);
    try {
      const adapter = createNoopAdapter();
      const res = (await adapter.run(config)) as ExperimentResult;
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setRunning(false);
    }
  }

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Model Lab</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Browser Web Worker training/backtest · client-computed · chưa có Pyodide runtime
      </p>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="panel grid gap-3">
          <h2 className="text-lg font-semibold">Cấu hình experiment</h2>

          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">Tài sản</span>
            <select
              value={config.instrument_id}
              onChange={(e) => setConfig({ ...config, instrument_id: e.target.value })}
              className="rounded-lg border border-border bg-background px-3 py-2"
            >
              <option value="binance:spot:BTCUSDT">BTC/USDT</option>
              <option value="binance:spot:ETHUSDT">ETH/USDT</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">Interval</span>
            <select
              value={config.interval}
              onChange={(e) => setConfig({ ...config, interval: e.target.value as ExperimentConfig["interval"] })}
              className="rounded-lg border border-border bg-background px-3 py-2"
            >
              <option value="15m">15m</option>
              <option value="1h">1h</option>
              <option value="1d">1d</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">Model</span>
            <select
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value as ExperimentConfig["model"] })}
              className="rounded-lg border border-border bg-background px-3 py-2"
            >
              <option value="ridge">Ridge</option>
              <option value="logistic">Logistic</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">Train split (0–1)</span>
            <input
              type="number"
              min={0.1}
              max={0.9}
              step={0.1}
              value={config.split}
              onChange={(e) => setConfig({ ...config, split: parseFloat(e.target.value) })}
              className="rounded-lg border border-border bg-background px-3 py-2 font-mono"
            />
          </label>

          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">Costs (bps)</span>
            <input
              type="number"
              min={0}
              step={1}
              value={config.costs_bps}
              onChange={(e) => setConfig({ ...config, costs_bps: parseInt(e.target.value, 10) || 0 })}
              className="rounded-lg border border-border bg-background px-3 py-2 font-mono"
            />
          </label>

          <button
            type="button"
            onClick={handleRun}
            disabled={running}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {running ? "Đang chạy…" : "Run experiment"}
          </button>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="panel">
          <h2 className="text-lg font-semibold">Kết quả</h2>
          {!result && !running && <EmptyState message="Chưa có kết quả. Cấu hình và chạy experiment." />}
          {running && <p className="text-muted-foreground">Đang chạy… (noop adapter, sẽ thay bằng Pyodide worker)</p>}
          {result && (
            <dl className="mt-3 grid gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Run ID</dt>
                <dd className="font-mono">{result.run_id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd>{result.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Out-of-sample windows</dt>
                <dd className="font-mono">{result.out_of_sample_windows}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Baseline</dt>
                <dd className="font-mono">{result.baseline ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Net cost</dt>
                <dd className="font-mono">{result.net_cost ?? "—"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Max drawdown</dt>
                <dd className="font-mono">{result.max_drawdown ?? "—"}</dd>
              </div>
              <div className="mt-2 rounded-lg border border-border bg-secondary/50 p-2 text-xs text-muted-foreground">
                {result.client_computed
                  ? "Client-computed. Không phải bằng chứng alpha."
                  : "Server-computed."}
              </div>
            </dl>
          )}
        </div>
      </section>

      <p className="mt-6 text-xs text-muted-foreground">
        Arbitrary Python không được thực thi. Training/backtest chạy trong browser Web Worker (chưa triển khai). Pyodide phải qua feasibility spike.
      </p>
    </Container>
  );
}
