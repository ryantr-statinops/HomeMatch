# P07 — Browser Model Lab
**Trạng thái:** chưa bắt đầu.

## Mục tiêu và phụ thuộc
P02 Pyodide/worker gates + P03 snapshots; P04 required only for news features.

## Ownership
Web/ML agent owns form/worker/evaluation presets; API agent owns configs/results sync and grants.

## Phạm vi
Form datasets/features/target/horizon/model/split/costs; logistic direction, Ridge return/vol. Price-only first; news-only/combined only on eligible data. Browser only; no arbitrary code/pickle/deep learning/server train.

## Input/output contracts
Output: saved config before run, worker progress/cancel/lifecycle, private client-computed result/artifact manifest with dataset/runtime/seed/costs. Config and run IDs separate.

## Tasks
RT-LAB-01 schema/presets; -02 pipeline/worker; -03 local cache/privacy/cancel; -04 sync/results; -05 report comparisons.

## Kiểm thử và nghiệm thu
Warmup/labels/gaps/single-class/solver failure, grant/hash mismatch, logout/tab-close/crash/stale callbacks, byte limits/version, malicious verified flag, IndexedDB quota. Reproduce fixture within documented tolerance.

Every result origin client-computed and unverified; no unsupported browser promise. Train-only preprocessing/purge/horizon tests pass. Volatility output không tự tạo trading action.

## Rollback và handoff
Terminate/restart worker, preserve saved config; interrupted rerun from start. Handoff P08 scripts/fixtures/versioned reports.
