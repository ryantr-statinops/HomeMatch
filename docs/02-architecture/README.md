# Kiến trúc
**Trạng thái:** P01 đã có scaffold fixture; các service boundaries nghiệp vụ dưới đây vẫn là target, chưa có auth/feed/ledger/ML runtime.
- [System architecture](system-architecture.md)
- [Tech stack](tech-stack.md)
- [Repository structure](folder-structure.md)
- [ADR](decisions.md)
- [Glossary](../glossary.md)

FastAPI sở hữu domain/account isolation, Gateway mỏng. Public Binance WebSocket trực tiếp từ browser là ngoại lệ rõ ràng; browser training không phải server training job.
