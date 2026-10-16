# System architecture
**Trạng thái:** mục tiêu; code Next.js/Admin cũ vẫn tồn tại.

| Thành phần | Sở hữu |
|---|---|
| React/Vite web | UI, managed-auth client, private client state, stream lifecycle, browser Model Lab |
| Go Gateway HTTP | Routing, request ID, bounded requests/timeouts; không tự tính ledger/model |
| FastAPI | JWT/ownership, watchlist/ledger, dataset delivery policy, experiment config/results validation |
| Go ingestion | Scheduled news/history capture và source run metadata |
| Python pipeline | Chuẩn hóa/features/dataset/evaluation tooling; không nhận arbitrary user training jobs |
| Web Worker/Pyodide | Form-approved training/backtest trên thiết bị user |
| PostgreSQL | Metadata, source/version refs, ownership, ledger/config/result summaries |
| Object storage | Raw/dataset/artifact theo quyền và retention, không public bucket mặc định |

## Luồng
~~~text
Approved sources -> scheduled Go ingestion -> raw/versioned normalized data
                                              -> dataset snapshot + manifest
Browser -> Gateway -> FastAPI -> managed Auth/JWT + PostgreSQL/object storage
Browser -> public Binance WS (display only; no exchange keys)
Browser dataset -> Web Worker -> client-computed result -> owner API sync
~~~

News/history acquisition không phụ thuộc user đang online. Live stream phục vụ màn hình, không là nguồn duy nhất để xây lịch sử nghiên cứu. Browser quote không là authoritative proof cho ledger fill hay valuation lưu trên backend.

## Boundaries và failure
Managed Auth cấp token; FastAPI kiểm issuer/audience/expiry và ownership, không tin ownerId client gửi. Source quyền không cho train/display thì dataset route chặn tương ứng. Result client không đạt verified chỉ qua schema validation.

Browser WebSocket không cần server relay trong MVP; phải thử access/origin/region/CSP. Nếu không truy cập được, báo unavailable/historical; không proxy để vượt restrictions. Vercel chỉ xử lý web/HTTP API; không giả định giữ upstream socket. Batch runner chọn bằng evidence.

Worker crash không làm hỏng ledger. Dataset immutable; config lưu trước run; closing tab có thể interrupted. Account switch/logout đóng stream và hủy/xóa private worker state; không tự tiếp tục experiment cho account khác.
