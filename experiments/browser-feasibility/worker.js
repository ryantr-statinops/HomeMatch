const PYODIDE_VERSION = "314.0.7";
const PYODIDE_INDEX = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const ROW_COUNTS = new Set([5000, 25000, 50000]);
globalThis.notifyStage = (stage, runId) => self.postMessage({ type: "stage", stage, runId });

let pyodidePromise;
let packagesPromise;
let runtimeLoadMs = 0;
let packageLoadMs = 0;

async function runtime() {
  if (!pyodidePromise) {
    self.postMessage({ type: "stage", stage: "runtime-load-start" });
    const loadStart = performance.now();
    pyodidePromise = import(`${PYODIDE_INDEX}pyodide.mjs`).then(({ loadPyodide }) => loadPyodide({ indexURL: PYODIDE_INDEX })).then((loaded) => {
      runtimeLoadMs = performance.now() - loadStart;
      return loaded;
    });
  }
  const pyodide = await pyodidePromise;
  if (!packagesPromise) {
    self.postMessage({ type: "stage", stage: "package-load-start", packages: ["numpy", "scikit-learn"] });
    const packageStart = performance.now();
    packagesPromise = pyodide.loadPackage(["numpy", "scikit-learn"]).then(() => {
      packageLoadMs = performance.now() - packageStart;
    });
  }
  await packagesPromise;
  return pyodide;
}

self.onmessage = async ({ data }) => {
  if (data?.type !== "run") return;
  const rows = Number(data.rows);
  if (!ROW_COUNTS.has(rows)) {
    self.postMessage({ type: "error", error: "Unsupported row count." });
    return;
  }
  const runId = data.runId;
  const cold = !pyodidePromise;
  const start = performance.now();
  try {
    const pyodide = await runtime();
    const runtimeAndPackagesMs = performance.now() - start;
    const source = `
import time, js
import_start = time.perf_counter()
import numpy as np
from sklearn.linear_model import Ridge, LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, accuracy_score
python_imports_ms = (time.perf_counter() - import_start) * 1000
js.notifyStage("features", ${JSON.stringify(runId)})

n = ${rows}
feature_start = time.perf_counter()
raw_index = np.arange(n)
rng = np.random.default_rng(42)
step = rng.normal(0.00015, 0.012, n + 1)
prices = 100.0 * np.cumprod(1.0 + step)
returns = np.diff(prices) / prices[:-1]
lag1 = np.concatenate(([0.0], returns[:-1]))
lag4 = np.concatenate((np.zeros(4), returns[:-4]))
vol20 = np.array([np.std(returns[max(0, i-20):i+1]) for i in range(n)])
missing = np.arange(n) % 997 == 0
returns[missing] = np.nan
lag1[missing] = np.nan
X = np.column_stack((lag1, lag4, vol20))
y_return = np.roll(returns, -1)
y_return[-1] = np.nan
y_direction = (y_return > 0).astype(np.int8)
valid = np.isfinite(X).all(axis=1) & np.isfinite(y_return)
split_time = int(n * 0.8)
valid_index = raw_index[valid]
X_clean = X[valid]
y_return_clean = y_return[valid]
y_direction_clean = y_direction[valid]
train_mask = valid_index < split_time - 1
test_mask = valid_index >= split_time
X_train, X_test = X_clean[train_mask], X_clean[test_mask]
y_train, y_test = y_return_clean[train_mask], y_return_clean[test_mask]
yd_train, yd_test = y_direction_clean[train_mask], y_direction_clean[test_mask]
purged_rows = int(np.count_nonzero(valid) - len(X_train) - len(X_test))
scaler = StandardScaler().fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)
feature_ms = (time.perf_counter() - feature_start) * 1000
js.notifyStage("fit", ${JSON.stringify(runId)})
fit_start = time.perf_counter()
ridge = Ridge(alpha=1.0).fit(X_train, y_train)
logit = LogisticRegression(solver="lbfgs", max_iter=200, random_state=42).fit(X_train, yd_train)
fit_ms = (time.perf_counter() - fit_start) * 1000
js.notifyStage("evaluation", ${JSON.stringify(runId)})
eval_start = time.perf_counter()
pred_return = ridge.predict(X_test)
pred_direction = logit.predict(X_test)
metrics = {"ridge_mse": float(mean_squared_error(y_test, pred_return)),
           "direction_accuracy": float(accuracy_score(yd_test, pred_direction))}
majority_class = int(np.bincount(yd_train).argmax())
baselines = {"zero_return_mse": float(mean_squared_error(y_test, np.zeros_like(y_test))),
             "majority_class_accuracy": float(accuracy_score(yd_test, np.full_like(yd_test, majority_class)))}
evaluation_ms = (time.perf_counter() - eval_start) * 1000
{"requestedRows": n, "usedRows": int(len(X_train)+len(X_test)), "trainRows": int(len(X_train)), "testRows": int(len(X_test)),
 "rawSplitIndex": split_time, "purgeRows": purged_rows, "horizonRows": 1,
 "missingRowsDropped": int(n-np.count_nonzero(valid)), "features": ["return_lag_1", "return_lag_4", "volatility_20"],
 "pythonImportsMs": python_imports_ms, "featuresMs": feature_ms, "fitMs": fit_ms, "evaluationMs": evaluation_ms, "metrics": metrics, "baselines": baselines}
`;
    const result = await pyodide.runPythonAsync(source);
    const payload = result.toJs({ dict_converter: Object.fromEntries });
    result.destroy();
    self.postMessage({ type: "result", runId, cold, runtimeLoadMs, packageLoadMs, runtimeAndPackagesMs, result: payload, workerTotalMs: performance.now() - start });
  } catch (error) {
    self.postMessage({ type: "error", runId, error: String(error?.stack || error) });
  }
};
