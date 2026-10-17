# Next action
Canonical roadmap: [Research Terminal](research-terminal-plan/README.md). Đây là pointer, không là roadmap thứ hai.

## Current state
- PR #17, #18, #19 và #20 đã merge vào `main`; P01 reset nằm trong `86f1009`, retirement updates trong `0a98e84`.
- Target: Binance Spot BTCUSDT/ETHUSDT, multi-account news/portfolio, browser Model Lab.
- P00 documentation và P01 repository reset hoàn tất. Ngày 2026-10-17 owner đã xóa ba project Vercel, hai project Supabase và hai project Apps Script HomeMatch; host/deployment lịch sử được giữ trong registry. P02 có isolated Auth/browser/market-access spikes; app vẫn fixture, chưa auth/feed/ML production.
- Rủi ro còn lại không nằm ở hosting mà ở **identity**: chưa có credential nào được revoke, hai bản credential local còn trên máy, domain iNET và hosting WordPress còn tồn tại.

## Tiếp theo
Theo [P02 execution board](research-terminal-plan/p02-execution-board.md): hoàn thiện provider/account/storage và browser lifecycle/memory gates. Song song, đóng nốt phần identity retirement theo [runbook legacy](../docs/12-operations/legacy-retirement-runbook.md) — cần owner cấp Google Cloud Project ID để lập inventory service-account key và OAuth grants trước khi disable/revoke; credential cũ không dùng cho scaffold và không xóa bản local trước khi upstream revoke được xác minh.
