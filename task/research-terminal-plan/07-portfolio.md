# P06 — Portfolio
**Trạng thái:** chưa bắt đầu.

## Mục tiêu và phụ thuộc
P02 account isolation; P03 authoritative price/snapshot contract. Có thể parallel P04/P05 sau contracts.

## Ownership
Domain/API agent owns ledger/imports/valuation; web agent owns preview/UI; coordinator finance math review.

## Phạm vi
Spot long/cash manual/CSV, base USDT, weighted-average cost. Cashflow tách trading P&L; v1 fees USDT only. Không sàn keys/order/margin/short.

## Input/output contracts
Output: owner-scoped ledger/revision, import preview/atomic commit/idempotency, holdings/P&L/cashflows/equity coverage và stale source valuation.

## Tasks
RT-PORT-01 decimal ledger fixtures; -02 imports/revisions; -03 valuation; -04 private UI; -05 tests/ownership.

## Kiểm thử và nghiệm thu
Buys/sells/partial/all-close, fees, opening/transfers basis, negative cash/inventory, duplicate CSV/conflicting ID/revision, backdate invalid tail, stale quote and export IDOR.

Formulas/replay match canonical examples, double-submit no duplicates, backend uses provenance marks not forged browser quote. No implicit USD conversion or fabricated missing mark.

## Rollback và handoff
Revert versioned ledger projection/migration; restore/replay audited events theo policy. Handoff P08 acceptance evidence; portfolio không tự feed private ledger vào training.
