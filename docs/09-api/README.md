# API contracts

**Trạng thái:** API mục tiêu chưa triển khai; routes legacy không chứng minh có capability Research Terminal.

1. [Auth và HTTP conventions](auth-and-http.md).
2. [Capability contracts](capabilities.md).
3. [Dataset, experiment và event contracts](datasets-experiments-events.md).

Business API theo `/api/v1`, browser → Go Gateway → FastAPI. Browser public Binance WebSocket là ngoại lệ trực tiếp theo [ADR](../02-architecture/decisions.md), không có broker secret. Provider Auth được chốt P02. API không nhận executable code hoặc tạo server training job mặc định.
