# Architecture decisions

**Trạng thái:** quyết định mục tiêu, chưa triển khai; thay thế ADR rental trong Git history.

| ID | Quyết định | Trạng thái |
|---|---|---|
| RT-ADR-001 | React/Vite/React Router/TypeScript/Tailwind; UI tiếng Việt | Accepted |
| RT-ADR-002 | Go Gateway HTTP mỏng; FastAPI sở hữu domain và kiểm tra ownership/JWT | Accepted |
| RT-ADR-003 | Go ingestion theo lịch, độc lập phiên người dùng | Accepted boundary; runner chốt P02/P09 |
| RT-ADR-004 | Browser Web Worker training/backtest; Pyodide là phương án spike đầu tiên | Accepted capability; runtime chưa test |
| RT-ADR-005 | Binance Spot BTCUSDT/ETHUSDT; candles 15m/1h/1d | Accepted scope; source access/rights còn gate |
| RT-ADR-006 | Browser public Binance WebSocket không key, theo tab hoạt động | Accepted ngoại lệ; region/CSP/lifecycle test P02 |
| RT-ADR-007 | PostgreSQL cho metadata/ledger; object storage cho snapshots/artifacts qua interface | Accepted; vendor chưa chọn |
| RT-ADR-008 | Managed Auth, không tự lưu/hash password | Accepted; provider chốt bằng ADR P02 |
| RT-ADR-009 | Portfolio spot long/cash, weighted-average cost, base USDT; manual/CSV | Accepted; không execution |
| RT-ADR-010 | Experiment/results private theo owner; browser output là client-computed | Accepted |
| RT-ADR-011 | Vercel web/HTTP APIs sau kiểm chứng; ingestion chạy riêng | Accepted target; không giả định Vercel giữ WebSocket upstream |
| RT-ADR-012 | Funding/OI, cổ phiếu Mỹ, FX, Việt Nam | Deferred qua source gates |

## Spike và quyết định tiếp theo

P02 ghi provider Auth/PostgreSQL/storage, email/quota, toolchain versions, Pyodide compatibility, browser support, dataset/features limits và lifecycle timeout. P03/P04 khóa source eligibility, retention/freshness theo evidence. Không thay phương án âm thầm hoặc ghi approved khi chưa kiểm chứng.

ADR tiếp theo ghi owner, ngày, alternatives, rationale, evidence, impact và trigger xem lại. Không đổi tên thư mục repo/domain deploy trong đợt docs.
