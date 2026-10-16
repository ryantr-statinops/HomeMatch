# Research Terminal — kế hoạch A–Z
**Trạng thái:** P00 documentation đã merge PR #17. P01 repository reset đã qua checks local trên nhánh riêng; remote CI/review và retirement còn pending. P02–P10 chưa triển khai. [Inventory P01](p01-inventory.md), [verification và commit map](p01-completion-report.md).

[Báo cáo P00, verification và commit map](completion-report.md).

## Đọc trước
[Docs](../../docs/README.md), [glossary](../../docs/glossary.md), [ADR](../../docs/02-architecture/decisions.md), [orchestration](00-orchestration.md), [legacy audit](legacy-integrations-audit.md).

## Dependency graph
~~~text
P00 docs -> P01 reset -> P02 foundation + browser/auth feasibility
                         -> P03 history -> P05 live terminal -> P08 review
                         -> P04 news ------^                  -> P09 release
                         -> P06 portfolio (needs P03 marks) ----^
                         -> P07 browser lab (needs P03, P04 only for news features)
P09 -> optional P10 market expansion
~~~

P03/P04 có thể parallel sau shared contracts và source grants. P06 không chờ news hoàn thiện. P07 price-only bắt đầu khi P03 và browser spike accepted; news-combined phải có P04 eligibility. Preview/monitoring có thể sớm ở P02, production phải qua P08 và source rights.

## Phase files
| Phase | File |
|---|---|
| P00 — Documentation reset | [01-documentation-reset.md](01-documentation-reset.md) |
| P01 — Legacy retirement và code reset | [02-legacy-retirement-code-reset.md](02-legacy-retirement-code-reset.md) |
| P02 — Foundation và feasibility | [03-foundation-feasibility.md](03-foundation-feasibility.md) |
| P03 — Historical market data | [04-historical-market-data.md](04-historical-market-data.md) |
| P04 — News intelligence | [05-news-intelligence.md](05-news-intelligence.md) |
| P05 — Live terminal | [06-live-terminal.md](06-live-terminal.md) |
| P06 — Portfolio | [07-portfolio.md](07-portfolio.md) |
| P07 — Browser Model Lab | [08-browser-model-lab.md](08-browser-model-lab.md) |
| P08 — Evaluation và security | [09-evaluation-security.md](09-evaluation-security.md) |
| P09 — Deployment và showcase | [10-deployment-showcase.md](10-deployment-showcase.md) |
| P10 — Market expansion | [11-market-expansion.md](11-market-expansion.md) |

## Cập nhật trạng thái
Mỗi phase ghi evidence, task IDs, owner, accepted input revision và checks; không chỉ đổi checkbox. Source register flags independent, chưa feed-tested không ghi approved. P01 begins by inventory/legacy audit, không xóa dữ liệu/Cloud resources trong P00.

Crypto MVP = P01–P09 acceptance; P10 là hướng mở rộng. Không claim free hosting, real-time news hoặc model alpha trước evidence.
