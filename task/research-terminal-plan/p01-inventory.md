# P01 — inventory và kế hoạch thực thi
**Ngày:** 2026-10-16. **Baseline:** cac773f, PR #17 đã merge, main đã pull fast-forward. **Nhánh:** codex/p01-repository-reset. **Trạng thái:** repository reset hoàn tất kiểm tra local; chưa push/review CI trên remote hoặc retirement tài nguyên bên ngoài. P01 toàn phase còn các việc remote pending.

## Giữ / bỏ / thay
| Nhóm | Quyết định |
|---|---|
| docs, task history, Git history | Giữ, cập nhật current state/status và setup theo kết quả |
| Button/Dialog/Container/cn | Đọc và chuyển primitives React không phụ thuộc Next sang apps/web; chỉ giữ khi được dùng |
| src rental, apps/admin, root Next config | Gỡ tracked code và cấu hình Next/Admin; thay Vite fixture shell |
| packages/api-client, api-spec | Gỡ contracts rental generated; thay packages/contracts với API reset |
| services/api | Giữ ý tưởng envelope/health, viết lại scaffold không Auth/Supabase/rental dependency |
| apps-script + clasp, build-image-cache | Gỡ tracked integrations/scripts; không tự revoke credential hoặc xóa Cloud/Sheet/Drive |
| supabase migrations/seed/config | Gỡ artifacts của schema cũ khỏi active repo; không chạy SQL hoặc drop DB |
| assets DB.pdf, logo HomeMatch/public logo | Gỡ branding/data artifacts cũ; lịch sử vẫn trong Git |
| root .env.local và ignored service-account key | Giữ nguyên, không đọc/in giá trị, không stage; ngừng consumer legacy trong code mới |
| node_modules/.next/old venv | Generated local artifacts, không source; dọn theo exact paths sau khi replacement sẵn sàng |

## Work packages
1. RT-RESET-01 (coordinator): inventory, baseline, shared synthetic fixtures; ghi decisions/removal scope trước mutation.
2. RT-RESET-03-WEB (web agent, apps/web only): React/Vite/Router/Tailwind shell, reusable UI, đọc fixture, health probe optional; không live/auth/model features.
3. RT-RESET-04-GO (Go agent, services/gateway và services/ingestion only): stdlib HTTP gateway health/proxy + fixture-only CLI, tests offline.
4. RT-RESET-04-PY (Python agent, services/api/services/research/packages/contracts only): clean FastAPI health/demo + export contract, stdlib research fixture CLI, tests.
5. Coordinator: remove tracked legacy paths ngoài ownership, workspace/package lock, CI/security scripts/setup, integration verification và commits nhỏ.
6. RT-RESET-02/LEG remote state: chưa truy cập Cloud/Vercel/DB; không đánh dấu retired. Những việc cần owner/account evidence vẫn pending.

## Contracts / giới hạn
data/fixtures/news.json và market.json là synthetic, schema_version=1, source_id=fixture-only, is_synthetic=true. Không lấy tin/giá thật, không dùng dữ liệu/secret legacy. Web loads fixture by default; health probe qua /api/v1/health là optional. FastAPI 127.0.0.1:8000; Go gateway 127.0.0.1:8080; Vite 127.0.0.1:5173. Gateway chuyển /api/* sang API, không upstream sàn.

## Verify / exit
Lock toolchains/dependencies từ metadata chính thức, không latest trong lockfile. npm lint/typecheck/build, API tests+OpenAPI diff, Go tests+CLI, research CLI và fixture/secret-boundary checks. Test explicit localhost HTTP roundtrip; default không cần env secrets hoặc cloud. Nếu thiếu Go/Python toolchain, lấy runtime chính thức có checksum hoặc ghi limitation, không bịa test pass.

P01 repository reset chỉ complete khi fixture stack và CI gates tương ứng pass. Remote credential retirement là trạng thái riêng. P02 Auth/provider/real data/Pyodide/stream feasibility chưa triển khai.

## Kết quả local và bàn giao
- Đã chuyển 4 UI primitives được dùng; thay Next/Admin bằng Vite; FastAPI fixture không phụ thuộc Supabase/Auth/Google.
- [Manifest 90 tracked file legacy được gỡ ngoài API](p01-removed-files.txt); API có danh sách file removal riêng trong commit `27bd9b7`. Một số UI được Git nhận diện là move, không phải mất code.
- Generated caches `.next`, Admin `.next`, API-client node_modules và `next-env.d.ts` đã dọn theo exact paths; npm ci thay node_modules bằng dependencies mới. Venv/env/key legacy được giữ để xử lý riêng.
- [Verification, commit map và pending](p01-completion-report.md). Required CI job names được giữ, nhưng CI mới chưa chạy trên GitHub vì branch chưa push.

## Kế hoạch tiếp tục
1. RT-RESET-05: review diff/CI của nhánh reset trước merge; không bật production deployment cũ cho scaffold.
2. LEG-01/02: account owner xác nhận resource IDs/owners, consumers, triggers, deployment env và backup/retention. Chỉ ghi metadata an toàn.
3. LEG-05/06: lập thay đổi cụ thể để dừng workload, revoke quyền/keys và xóa bản local sau xác nhận; remote tasks không gộp với code removal.
4. P02 RT-FOUND tasks: managed Auth isolation, storage/provider ADR, Binance access/stream và Pyodide benchmark. Chỉ mở P03/P04 ingestion thật khi source gates được chấp nhận.

## Rollback / commits
Giữ commit theo inventory, web, services, removal/tooling và verification/status. Không rewrite lịch sử hoặc xóa tài nguyên ngoài workspace. Nhánh PR riêng vì main bắt buộc reviews/checks; không tự merge/push cleanup vào deployment hiện tại trong lượt này.
