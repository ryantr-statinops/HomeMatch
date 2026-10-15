# P04 — News intelligence
**Trạng thái:** chưa bắt đầu.

## Mục tiêu và phụ thuộc
P02 + approved news access/retention/train/display scope; có thể song song P03 sau shared data contracts.

## Ownership
News/data agent owns adapters/event pipeline; coordinator/source reviewer owns approval.

## Phạm vi
Thu RSS/API permitted, article revisions, dedup/novelty, BTC/ETH mapping/event taxonomy. Full text/summary/translation chỉ theo quyền và budgets; không mặc định paid LLM.

## Input/output contracts
Output: source runs, article/event versions với published/first-seen/updated/available evidence; eligible features và source coverage. Không backdate old articles thành lịch sử có thể giao dịch.

## Tasks
RT-NEWS-01 candidates/rights review; -02 adapter/schedule; -03 dedup/mapping/corrections; -04 PIT feature eligibility; -05 UI metadata contract.

## Kiểm thử và nghiệm thu
Missing publication, late revisions, syndicated duplicate, false entity mapping, feed outage vs zero count, backfilled future leakage, unknown rights. Test source attribution và safe link/content exposure.

News feed có measurable freshness và provenance. News features chỉ bật cho eligible sample; thiếu PIT data thì price-only vẫn hoạt động, không claim historical news alpha.

## Rollback và handoff
Disable adapter/revert extraction version, preserve observations theo retention. Handoff terminal và Model Lab dataset coverage.
