# Security và privacy
**Trạng thái:** policy mục tiêu.

Managed provider lưu password; FastAPI kiểm JWT issuer/audience/signature/expiry và workspace ownership. Mọi lookup/result/artifact/CSV phải scope account; không tin ownerId hoặc verified flag từ browser. Provider được chọn bằng ADR, không mặc định tái dùng project/key cũ.

- Không yêu cầu exchange trading keys; public price stream không gửi token app cho Binance.
- Source grants quyết định download/train/display; shared dataset không đồng nghĩa public bucket.
- CORS/CSP/allowed origins và request size/rate/timeouts được kiểm thử; không dùng proxy để né source restrictions.
- Form chỉ dùng model/features allowlist; không arbitrary Python, pickle hoặc executable artifacts.
- Browser result client-computed không được coi trusted proof; validate shape/bounds/size để bảo vệ sync.
- Cache/IndexedDB namespace theo account; logout xóa private state/worker buffers. Không hứa secure wipe vật lý.
- Portfolio CSV có thể chứa tài chính cá nhân; không logging body, không commit fixtures từ file thật; retention/export/delete phải được thông báo.
- Revoke/cancel session không đồng nghĩa xóa data server; account deletion là workflow riêng với retention obligations.
- Secrets cloud/DB/source chỉ ở service cần; audit legacy không in secret và retirement theo inventory.

Chưa có consent/privacy SLA đã vận hành. P02/P09 chốt provider claims, policies, deletion/retention và rate/cost budgets trước public release.
