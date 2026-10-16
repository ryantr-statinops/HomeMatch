# Market data — Binance Spot trước

**Trạng thái:** nghiệp vụ ingestion/live lifecycle vẫn là thiết kế mục tiêu. P02 đã thử 6 public REST requests trong shell và một BTC trade stream trong Chrome desktop; xem [evidence và giới hạn](../../task/research-terminal-plan/p02-browser-feasibility.md), [REST probe](../../experiments/market-access/README.md). Chưa source-approved hoặc triển khai feed vào app.

1. [Historical ingestion và normalization](historical-ingestion.md)
2. [Browser live lifecycle](browser-live-lifecycle.md)

Scope: Binance Spot BTCUSDT/ETHUSDT, 15m/1h/1d. [Nguồn](../03-market-research/crypto.md), [data contracts](../04-data/data-model.md), [ADRs](../02-architecture/decisions.md).
