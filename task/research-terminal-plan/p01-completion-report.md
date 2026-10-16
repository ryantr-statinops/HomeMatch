# P01 — repository reset: kết quả local

Ngày 2026-10-16. Baseline: `cac773f` ([PR #17](https://github.com/ryantr-statinops/HomeMatch/pull/17), documentation đã merge/pull main). [PR #18](https://github.com/ryantr-statinops/HomeMatch/pull/18) merge thành công, merge commit `86f100913f94dfdb93b2102e43bb430db3a12929`; ba CI jobs và Vercel Preview Comments thành công. Ba Git connections Vercel đã ngắt trước merge; production domains/deployments được giữ. Chưa hoàn tất retirement tài nguyên ngoài repo.

## Phạm vi đã làm
Giữ docs/history và 4 UI primitives có consumer. Thay Next/Admin/rental bằng React/Vite fixture shell, Go Gateway, FastAPI read-only, Go fixture ingestion validator và Python fixture inspector. Gỡ tracked Apps Script/ImageCache, Google SDK dependency, Supabase schema/seed và branding/DB PDF cũ. Không chạy SQL, không đổi database, IAM, key, Sheet/Drive, triggers hoặc deployment.

Fixture ghi rõ synthetic; không chứng minh dữ liệu Binance/news, permission sử dụng source hoặc năng lực ML. Không có auth, portfolio, live stream, user training/backtest. Ignored env/key/venv cũ được giữ nguyên; runtime mới không load chúng. Root env example chỉ có localhost gateway config.

## Verification
| Kiểm tra | Kết quả |
|---|---|
| npm install rồi npm ci từ lock | Pass; 168 packages, không còn dependencies Next/Supabase/googleapis trong lock |
| Environment boundaries, synthetic fixture validation | Pass |
| Node tooling tests | 2 pass |
| ESLint, TypeScript, Vite production build sau npm ci | Pass; JS khoảng 329 kB / gzip 106 kB |
| FastAPI fixture/error/legacy removal tests | 13 pass; isolated venv, không credential |
| Research CLI unit tests | 4 pass, gồm malformed object, non-synthetic và unclosed candle |
| Gateway/ingestion Go tests + gofmt | Pass; loopback tests cần quyền localhost của môi trường agent |
| Ingestion CLI | 2 articles, synthetic=true, fixture-only; không network |
| HTTP smoke | Vite route + Vite proxy → gateway → FastAPI health/news/market; 200, synthetic marker, request ID |
| Internal Markdown links docs/active plan/entrypoints | 149 links hợp lệ sau tích hợp report |
| GitHub checks | `Public Web and contracts`, `FastAPI and OpenAPI`, `Gateway and fixture ingestion` đều success; [snapshot](evidence/p01-pr18-status.json) |

Go 1.27.2 được tải từ archive chính thức, kiểm SHA256 trước chạy; không cài global. Node 22.23.1/npm 10.9.8; API kiểm local bằng Python 3.11.15/uv 0.11.28, CI chọn Python 3.12 trong supported range. Pyodide chưa chọn phiên bản hay benchmark. Dependency test stack có cảnh báo Starlette deprecate httpx TestClient; hiện tests pass, cần theo dõi trước nâng dependency.

Các lệnh tái lập: [root setup](../../README.md), [API](../../services/api/README.md), [Gateway](../../services/gateway/README.md), [ingestion](../../services/ingestion/README.md), [research](../../services/research/README.md). Khi review discovery phát hiện CLI chưa xử lý candle null; đã thêm validation object và test hồi quy trước commit.

## Commit map
| Commit | Đơn vị thay đổi |
|---|---|
| `02b657d` | Kế hoạch và inventory P01 |
| `162865e` | Shared synthetic fixtures |
| `0d3a2cd` | Go Gateway |
| `a5ccdfa` | Fixture ingestion CLI |
| `27bd9b7` | FastAPI/OpenAPI và gỡ contracts API cũ |
| `e38581c` | Research inspector |
| `68775a5` | Vite thay Next/Admin, workspace/lock/security/CI |
| `66fb14a` | Gỡ tracked Google migration integrations |
| `e3090f4` | Gỡ database artifacts legacy |
| `b0d7ae9` | Gỡ branding/data artifacts cũ |

Report, entrypoints và current-state docs nằm trong commit bàn giao sau các commit trên; không rewrite lịch sử.

## Pending và bước tiếp theo
1. Review và chạy remote CI của nhánh reset trước merge; hosting framework/root/build config cần được thiết kế ở P02, không reuse cấu hình Next production theo mặc định.
2. [Legacy audit](legacy-integrations-audit.md): remote consumers, Google triggers/IAM/keys, CI/deployment secrets và database state chưa xác minh. Không đánh dấu revoked/disabled hoặc xóa file key local trước workflow retirement.
3. [P02](03-foundation-feasibility.md): khóa Auth/provider decisions, account isolation, Binance browser stream/access và Pyodide feasibility. Không xây feature thật dựa trên fixture validation.

Rollback source bằng revert từng commit/subsystem, quay về baseline `cac773f` nếu cần. Không dùng ignored credential hoặc snapshot fixture làm bằng chứng cloud rollback. Các task phụ thuộc chỉ nhận input sau coordinator chấp nhận evidence tương ứng.
