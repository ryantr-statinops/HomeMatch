# Hosting và scheduling
**Trạng thái:** target, chưa provision.

Vercel host React/Vite và HTTP request APIs sau runtime validation. Không giữ Binance upstream WebSocket trên Vercel: browser tự dùng public market stream khi tab/session hoạt động. Server relay chỉ thêm bằng ADR và nhu cầu đã chứng minh.

Go scheduled jobs thu news/history trên runner riêng. News freshness intraday phụ thuộc lịch chạy/quota/source, không hứa realtime vì UI có price stream. Không chạy crawl/training dài trong API request. Local ingestion được dùng development; scheduler production chọn bằng evidence/cost ở P02/P09.

PostgreSQL chứa metadata/ledger/config/result summary; object storage chứa snapshots/artifacts trong access policy. Managed Auth provider chọn riêng theo JWT/email/quota/support; preview tách production. Browser dataset và Pyodide tải on-demand, versions pin và cache có policy; package download/bandwidth vẫn là chi phí.

Deployment code không làm source đã approved; source rights/region/access và quota vẫn cần release evidence. Không tự đổi domain hoặc old deployment trong đợt docs.
