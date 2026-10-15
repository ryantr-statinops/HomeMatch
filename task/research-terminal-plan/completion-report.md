# P00 completion report — Research Terminal

**Ngày:** 2026-10-16. **Trạng thái:** documentation complete; P01–P10 chưa triển khai. Baseline trước đợt này: d09bba6. Không push hoặc đổi deployment.

## Kết quả
- 12 domain, 55 Markdown docs, glossary và indexed navigation cho Research Terminal crypto-first.
- 4 market reports và source register tách documented/access-tested/rights-confirmed/approved.
- Multi-account private portfolio/experiments, browser Web Worker training, active-tab public Binance streaming.
- Roadmap P00–P10, orchestration/ownership/dependencies và legacy retirement audit.
- Rental roadmap archived; audit Google giữ bằng chứng cũ và remote state chưa xác minh.

## Verification
Relative Markdown links kiểm trên toàn docs/task và root README; báo cáo này được thêm vào lần kiểm cuối (120 files). Mọi domain page có trong README index; Git whitespace check và path-scope check hoàn tất. Diff chỉ README/docs/task, không source code, credential, DB, deployment hay historical session logs. Không chạy runtime tests vì chưa triển khai runtime mới.

Coordinator review đã đồng bộ instrument identity, decimal money, fee USDT-only, config/run states và computation_origin=client-computed / verification_status=unverified. Browser training không bị biến thành queue server; logout/tab lifecycle và available_at không suy diễn từ ngày xuất bản.

## Còn chưa xác minh
- Access/region/CSP, source rights và news retention/display/ML; mọi approved/access-tested flags còn false.
- Binance Vision archive có terms riêng; cần review mục đích multi-account/public educational demo, derivatives và attribution; không coi repo MIT là data license.
- Managed Auth/storage providers, email quotas/cost, browser package/toolchain versions và supported limits cần ADR P02.
- Pyodide performance/cancel/memory; Binance browser socket behavior; chưa có feed test, dataset quality hoặc model scores.
- Legacy Cloud/OAuth/trigger/key retirement chưa thực hiện; không xóa tài nguyên ngoài repo từ audit.

## Commit map
Các commit dưới đây là từng đơn vị tài liệu/phase trước commit thêm báo cáo này. Commit của báo cáo xem Git log, không nhúng chính hash của nó vào chính file.

| Commit | Phạm vi |
|---|---|
| 63714eb | docs: define Research Terminal product and glossary |
| 36a4dd2 | docs: define browser-first research architecture |
| 4a99456 | docs: document four-market research and source gates |
| 2d0c12c | docs: replace rental data model with market lineage |
| 9fdfa91 | docs: define news ingestion and event intelligence |
| ed3f9a4 | docs: define Binance history and browser streaming |
| 311c417 | docs: define account-scoped USDT portfolio ledger |
| b3597a4 | docs: replace rental ML with browser Model Lab |
| b74a4b1 | docs: define account datasets and experiment APIs |
| 3b358d7 | docs: define Vietnamese news terminal experience |
| daebcce | docs: update engineering and account security rules |
| e8b1a1b | docs: define research deployment and recovery gates |
| bf83d91 | docs(plan): archive rental roadmap and carry legacy audit |
| 8fb557d | docs(plan): define Research Terminal orchestration |
| dc2b66b | docs(plan): define research documentation reset |
| 93abae6 | docs(plan): define legacy retirement and code reset |
| 021c1f5 | docs(plan): define auth and browser feasibility |
| 473d895 | docs(plan): define historical market pipeline |
| bb2a090 | docs(plan): define news intelligence phase |
| 9224f87 | docs(plan): define active-tab live terminal |
| ac7ba93 | docs(plan): define personal portfolio phase |
| 9c35d93 | docs(plan): define browser Model Lab phase |
| b3d004e | docs(plan): define quant and security validation |
| eae62a2 | docs(plan): define research release and showcase |
| e507004 | docs(plan): define gated market expansion |
| e36d556 | docs: publish Research Terminal documentation entrypoints |

## Bước tiếp theo
[RT-RESET-01 / P01](02-legacy-retirement-code-reset.md): lập exact inventory giữ/xóa/viết lại và đối chiếu [legacy audit](legacy-integrations-audit.md). Chưa tự bắt đầu removal hoặc provision môi trường trong P00.
