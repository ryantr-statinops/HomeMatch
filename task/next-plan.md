# Next action

Canonical roadmap: [Next plan](next-plan.md). Đây là pointer, không là roadmap thứ hai.

## Current state

- Idea mới đã chốt: Research Terminal v2 — news-first crypto research workspace cho retail trader VN.
- Binance Spot BTCUSDT/ETHUSDT, candles 15m/1h/1d, UI tiếng Việt.
- Codebase hiện tại: fixture shell (React/Vite + FastAPI + Go Gateway + OpenAPI contracts + synthetic fixtures).
- Chưa có feed thật, portfolio, Model Lab runtime, auth (không dùng auth provider cũ).
- Legacy product code và credential đã được gỡ khỏi tracked source.

## Tiếp theo

Theo roadmap idea mới:

1. **Phase 1 — Foundation & Contracts:** Cập nhật OpenAPI contracts cho idea mới; triển khai FastAPI endpoints theo contract; tách routing web thành `/terminal/market`, `/terminal/news`, `/terminal/portfolio` (placeholder).
2. **Phase 2 — Market Data View:** Hiển thị BTC/ETH, bảng nến, watchlist từ fixture.
3. **Phase 3 — News Feed:** News-first theo tài sản, lọc theo BTC/ETH.
4. **Phase 4 — Portfolio Manual/CSV:** Nhập holdings thủ công hoặc import CSV, tính P&L đơn giản.
5. **Phase 5 — Evaluation & Security Gate:** Kiểm tra source rights, audit dependencies, xác nhận không có credential legacy.
6. **Phase 6 — Live Stream & Source Rights:** Kết nối public WebSocket Binance (nếu source rights được xác nhận).

Bắt đầu Phase 1 ngay: cập nhật OpenAPI contracts và FastAPI endpoints.
