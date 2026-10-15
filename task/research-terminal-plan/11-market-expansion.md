# P10 — Market expansion
**Trạng thái:** chưa bắt đầu.

## Mục tiêu và phụ thuộc
Crypto P09 acceptance; new source/market ADR. Optional, không gate hoàn tất crypto MVP.

## Ownership
Coordinator plus market-specific research agent; data/quant reviewers accept contracts.

## Phạm vi
Refresh US equities/FX/VN research. Choose one expansion by actual accessible licensed data; no automatic 4-market rollout. Funding/OI is separate crypto-data extension first if evidence supports.

## Input/output contracts
Output: updated source register, PIT identity/calendar/cost/instrument changes and bounded market plan; generic abstraction only after demonstrated consumer.

## Tasks
RT-EXP-01 refresh official docs/rights; -02 access/history sample; -03 market-specific clock/corporate-action/funding rules; -04 source and product ADR.

## Kiểm thử và nghiệm thu
US corporate actions/delists; FX revisions/quote sides/swap/COT timing; VN sessions/price bands/settlement constraints; no reuse of Binance fees/calendar assumptions.

Evidence of permitted train/display/history with quotas, appropriate backtest and user demand. FRED legal restrictions reviewed, wrapper license not upstream rights.

## Rollback và handoff
Do not expose unsupported market; revert feature gate. Handoff accepted separate implementation roadmap, no inferred feature already live.
