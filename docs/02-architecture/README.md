# Kiến trúc
**Trạng thái:** target, chưa migrate source legacy.
- [System architecture](system-architecture.md)
- [Tech stack](tech-stack.md)
- [Repository structure](folder-structure.md)
- [ADR](decisions.md)
- [Glossary](../glossary.md)

FastAPI sở hữu domain/account isolation, Gateway mỏng. Public Binance WebSocket trực tiếp từ browser là ngoại lệ rõ ràng; browser training không phải server training job.
