# Testing và quality
**Trạng thái:** kế hoạch kiểm chứng, chưa có test runtime mới đã pass.

## Lớp kiểm thử
- Unit: parser, timestamp/unit conversion, bar closure, feature availability, ledger math và CSV validation.
- Contract: Gateway/FastAPI OpenAPI, worker messages, dataset manifest, artifact schema và source grants.
- Integration: managed Auth/JWT, account isolation, database uniqueness, immutable snapshots/result sync.
- Browser: WebSocket lifecycle/CSP/access, Pyodide package compatibility, cancel/terminate/retry, 5k/25k/50k row benchmarks.
- Quant: walk-forward, purging theo label intervals, train-only preprocessing, fees/slippage và baseline comparisons.
- E2E: news→asset→watchlist, ledger import, Model Lab→private result và demo isolation.

## Scenarios bắt buộc
Feed disconnect, late/duplicate/missing bars, open candle, timestamp milliseconds/microseconds; news duplicate/revision/backfill/publication absent; owner spoof/IDOR/JWT expired; CSV replay/same-time transactions/fee currencies; stale quote; worker unsupported/crash/tab close/logout mid-run; result spoof và large artifact; source chưa đủ quyền.

CI dùng tiny deterministic fixtures. Benchmark report ghi browser/device/memory/time, không cam kết mọi máy. Network smoke test không thay quyền source thành approved. Public demo release phải chứng minh data/model claims bằng report, không bằng screenshots.
