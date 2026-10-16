# P08 — Evaluation và security
**Trạng thái:** chưa bắt đầu.

## Mục tiêu và phụ thuộc
P03/P04 coverage evidence, P06 portfolio and P07 experiments; P05 UX.

## Ownership
Independent quant/security reviewers with coordinator; reviewers không tự sửa shared contracts ngoài assignment.

## Phạm vi
Audit data availability, walkforward/holdout/selection bias, spot costs and account isolation/client trust. Không tạo verified performance badge từ user uploads.

## Input/output contracts
Output: baseline/model per-asset/timeframe/horizon report, news-coverage intersection, confidence/limitations, security/E2E findings and remediation.

## Tasks
RT-EVAL-01 leakage adversarial fixtures; -02 cost math/strategy; -03 repeatability; -04 ownership/upload/cache; -05 claims review.

## Kiểm thử và nghiệm thu
Future bar/news injection, overlapping label intervals, same holdout retuning, constant/model failure, fees/slippage/capital overlap; IDOR/JWT expired/public demo isolation, altered result payload.

Report prediction and strategy metrics separately, publish negative findings/sample sizes/cost assumptions. All critical domain/security checks fixed; no unsupported claims.

## Rollback và handoff
Revert problematic preset/dataset/public report, keep audit. Handoff P09 evidence and residual limitations.
