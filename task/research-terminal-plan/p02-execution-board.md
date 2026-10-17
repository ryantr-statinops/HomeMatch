# P02 — execution board và decision log

Ngày 2026-10-16. Coordinator giữ contracts/shared files, review, git và handoff. Ba subagent theo yêu cầu người dùng đều dùng **GPT-6 Luna, effort medium**; mỗi agent có ownership độc quyền, không commit/chuyển nhánh. P02 trên `codex/p02-foundation-feasibility`, dựa trên P01 PR18, chưa thay production app.

## Board
| Task | Owner / exclusive paths | Trạng thái và evidence | Gate còn lại |
|---|---|---|---|
| P01 remote integration | Coordinator | PR18 merge commit `86f1009`; web/API/Go và Vercel Preview Comments pass; registry ghi đủ domains, Project IDs, current deployments; cả 3 Git connections ngắt và UI xác nhận success | P01 reset tích hợp xong; hosting/database đã xóa theo PR20 nhưng **retirement identity** (keys/OAuth/IAM/CI secrets) còn theo runbook |
| RT-FOUND-01 auth provider research | Luna auth; `p02-auth-feasibility.md` | Clerk/Auth0/Supabase được so sánh; Clerk là ứng viên spike, chưa approved | Email/domain/cost, token thực, privacy/retention và provider ADR |
| RT-FOUND-02 isolated identity/ownership contract | Luna auth; `experiments/auth-feasibility/` | JOSE offline spike với khóa ephemeral; xem số test và kết quả trong report | API dependency, transactional account DB, HTTP tenant tests, logout/SDK chưa triển khai |
| RT-FOUND-03 browser stream | Luna browser; `experiments/browser-feasibility/`, `p02-browser-feasibility.md` | Một Chrome desktop kết nối public BTCUSDT trade stream; không key, không proxy | Tab hidden/grace, reconnect/backoff, multiple tab, ETH/timeframe/CSP và deployment region |
| RT-FOUND-04 Pyodide | Cùng Luna browser | Ridge/Logistic chạy được trên 5k/25k/50k synthetic; xem report/evidence | Peak memory, uncached transfer budget, Firefox/Safari/mobile, full costs/backtest protocol |
| RT-FOUND-05 contracts/CI/quotas | Coordinator | Lock spike, giữ CI required names, thêm offline auth test job | Remote CI P02, storage/auth vendors, API deployment shape, browser support/caps chưa khóa |
| LEG retirement guidance | Luna retirement; runbook và `p02-legacy-status.md` | Runbook có official sources, rollback và evidence template; PR20 bổ sung evidence log 13 dòng và bảng đối chiếu quy trình A–F | Remote **identity** chưa xác minh: Cloud Project ID, service-account keys, OAuth grants, IAM, AppSheet, CI secrets, hai bản credential local |
| LEG Vercel host registry | Coordinator; `legacy-host-register.md` | Đã ghi domains, Project IDs, production deployment aliases, build baseline; cả 3 projects đã disconnect Git và không có deploy hooks; **PR20 ghi thêm 3 dòng change log xóa project 2026-10-17** | Domain registration `homematch.id.vn` còn đến 2028-06-24 và hosting WordPress WP-H1 là tài nguyên riêng; authoritative DNS chưa kiểm tra độc lập |
| Binance REST access probe | Coordinator; `experiments/market-access/`, evidence JSON | 6/6 public REST requests HTTP200 cho BTC/ETH ×15m/1h/1d; chỉ giữ metadata | Không chứng minh rights hoặc access từ browser/hosting; không bật source approval |

## Dependencies và quyết định
1. P01 code đã qua required CI. Legacy Git auto-deploy đã ngắt ở cả ba project; merge chỉ khi required checks vẫn xanh, không dùng force/bypass để bỏ checks.
2. Auth, browser và runbook có thể chạy song song vì không thay shared contracts. P02 spike không đòi quyền cloud mới hoặc credential legacy.
3. Clerk chỉ là ứng viên ưu tiên; chưa provision provider/DNS. Supabase nếu được chọn phải project mới, không mặc định dùng database legacy.
4. Pyodide 314.0.7 dùng cho harness đã pin; không tự áp dụng vào sản phẩm hoặc xem 50k là supported cap.
5. Access success không thay rights gate. Chỉ nến đóng được dùng làm feature; probe cho thấy nến cuối hiện vẫn mở.
6. Chưa có browser support matrix/memory budget/lifecycle acceptance nên P02 chưa complete. P03/P04 production ingestion không được nhận nhầm input “approved”.
7. Owner thực hiện retirement từ xa ngày 2026-10-17 ngoài board này và đã merge ở PR20: ba project Vercel, hai project Supabase và hai project Apps Script chuyển sang `deleted`. Board nhận đầu vào này như evidence đã ghi, **không** coi là P02 gate đóng.
8. Owner deletion không tương đương retirement hoàn tất. Runbook đối chiếu cho thấy hai sai lệch phải giữ nguyên trong báo cáo: Supabase production bị xóa khi chưa có backup/retention sign-off, và chưa có credential nào được revoke. Không tick lại các bước đó thành “đạt”.

## Kiểm tra, rollback và handoff
Offline auth tests phải dùng lock và generated keys; browser measurements gồm cache/device/runtime/split/version, không accuracy claim. Syntax/link checks và source-vs-production boundary được coordinator rà sau handoff. Không đưa raw news, private data hoặc credential vào evidence.

Rollback spike: revert commit hoặc bỏ thư mục experiment, không ảnh hưởng runtime app. Rollback disconnect Vercel: reconnect đúng repo/branch/config đã ghi sau review, không tạo deployment theo suy đoán. Key revoke/project delete không nằm trong rollback Git.

Next packet sau các gate: triển khai managed auth vào FastAPI/React bằng project sandbox mới, account DB constraints và storage interfaces; hoàn thiện stream lifecycle và browser support/memory measurements; sau đó mới mở P03/P04 theo source policy. Mỗi packet có owner/inputs/exit evidence riêng.
