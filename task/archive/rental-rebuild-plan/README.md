# HomeMatch rebuild plan A–Z

> **Historical / superseded:** roadmap rental, không phải hướng dẫn hiện hành. Kế hoạch hiện tại là [Research Terminal](../../research-terminal-plan/README.md). Các trạng thái Complete dưới đây chỉ là lịch sử rental.

## Mục tiêu

Xây nền tảng khám phá tin phòng cá nhân hóa cho người thuê nói chung: thu thập tin từ nguồn đã được duyệt, chuẩn hóa và theo dõi độ mới, tìm kiếm/xếp hạng theo nhu cầu, gợi ý tin tương tự và cung cấp khoảng giá chào thuê tham khảo. Phạm vi địa lý được chọn sau khảo sát nguồn. Đây là kế hoạch; trạng thái ban đầu của mọi phase là **Not started**.

## Quy tắc thực hiện

- Hoàn tất docs trước khi codebase reset; hoàn tất reset trước khi dựng nền tảng mới.
- Source crawl, điều khoản truy cập, hosting batch và provider lưu trữ chỉ được khóa sau discovery/spike có bằng chứng.
- Ưu tiên ranking baseline hữu ích trước model phức tạp; không tuyên bố ML quality nếu chưa đo trên dataset hợp lệ.
- Coordinator là chủ duy nhất của shared contracts, dependency board, integrations và commit trên `main`.
- Tối đa ba subagent đồng thời. Mỗi subagent có vùng file độc quyền và không tự commit/switch branch.
- Mỗi phase phải đạt exit criteria và cập nhật trạng thái/evidence trong chính file phase trước khi downstream bắt đầu.

## Dependency graph

```text
P00 Docs reset
  -> P01 Codebase reset
      -> P02 Platform foundation
          -> P03 Source discovery + crawler
              -> P04 Data processing + quality
                  -> P05 Search + personalization
                  -> P06 ML training + evaluation (có thể song song sau P04)
                      -> P07 Product experience integration
                          -> P08 Deployment + observability
                              -> P09 Validation + showcase
```

P06 bắt đầu khi data contracts và một dataset snapshot đủ để dựng baseline đã được P04 nghiệm thu; không cần đợi P05 hoàn thiện UI. P08 có thể tạo preview sớm ở P02 nhưng chỉ mở production sau acceptance của P07/P09.

## Phase index

| ID | File | Owner mặc định | Dependencies |
|---|---|---|---|
| P00 | [01-documentation-reset.md](01-documentation-reset.md) | Coordinator + 3 doc agents | — |
| P01 | [02-codebase-reset.md](02-codebase-reset.md) | Coordinator + web/backend inventory agents | P00 |
| P02 | [03-platform-foundation.md](03-platform-foundation.md) | Coordinator; frontend, gateway, API agents | P01 |
| P03 | [04-source-discovery-and-crawling.md](04-source-discovery-and-crawling.md) | Coordinator + crawler/data agent | P02 |
| P04 | [05-data-processing-and-quality.md](05-data-processing-and-quality.md) | Coordinator + data agent | P03 |
| P05 | [06-search-and-personalization.md](06-search-and-personalization.md) | Coordinator + product/search agent | P04 |
| P06 | [07-ml-training-and-evaluation.md](07-ml-training-and-evaluation.md) | Coordinator + ML agent | P04 |
| P07 | [08-product-experience.md](08-product-experience.md) | Coordinator + web/product agent | P05, P06 baseline/fallback |
| P08 | [09-deployment-and-observability.md](09-deployment-and-observability.md) | Coordinator + platform/operations agent | P02; production depends P07 |
| P09 | [10-validation-and-showcase.md](10-validation-and-showcase.md) | Coordinator + independent reviewers | P07, P08 |

## Task status

| Phase | State | Evidence |
|---|---|---|
| P00 | Complete | Nine docs domains authored; old plans archived; relative Markdown links validated across 94 files. |
| P01–P09 | Not started | Await P00 review/acceptance before codebase changes. |

A phase status may be changed only with linked commit/PR or evidence and completed exit criteria.

## How to continue

P01 included [legacy integration inventory and removal](../../research-terminal-plan/legacy-integrations-audit.md); audit này được chuyển sang kế hoạch mới, remote state vẫn chưa xác minh.

1. Read `docs/README.md`, `docs/02-architecture/README.md`, `docs/08-engineering/agent-collaboration.md` and this plan.
2. Read the active phase and confirm predecessor acceptance.
3. Coordinator assigns exclusive paths/task IDs, records the assignment, then starts at most three subagents.
4. Review handoffs, integrate one bounded change, verify, create a focused commit and update phase state.
5. Do not launch dependent work on unaccepted contracts or unresolved source/hosting assumptions.
