# Next action
Canonical roadmap: [Research Terminal](research-terminal-plan/README.md). Đây là pointer, không là roadmap thứ hai.

## Current state
- PR #17 và PR #18 đã merge vào main; P01 reset nằm trong `86f1009`.
- Target: Binance Spot BTCUSDT/ETHUSDT, multi-account news/portfolio, browser Model Lab.
- P00 documentation và P01 repository reset hoàn tất. Ba Git connections Vercel legacy đã ngắt, hosts/deployments được ghi trong registry. P02 có isolated Auth/browser/market-access spikes; app vẫn fixture, chưa auth/feed/ML production.

## Tiếp theo
Theo [P02 execution board](research-terminal-plan/p02-execution-board.md): hoàn thiện provider/account/storage và browser lifecycle/memory gates. Dùng [runbook legacy](../docs/12-operations/legacy-retirement-runbook.md) để retirement theo evidence; credential cũ chưa được thu hồi và không dùng cho scaffold.
