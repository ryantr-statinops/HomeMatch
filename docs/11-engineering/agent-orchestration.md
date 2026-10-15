# Agent orchestration
**Trạng thái:** quy trình thực hiện.

Coordinator khóa glossary, ADR, shared contracts, dependency board, integration và commits. Tối đa ba subagent hoạt động cùng lúc; mỗi assignment có task IDs, inputs accepted revision, paths độc quyền, exclusions, outputs, checks, exit và handoff.

## Waves
1. Coordinator khóa crypto scope, multi-account, browser training và live exception.
2. Song song: market research/data/news/market ingestion; account/portfolio/API; Model Lab/browser/evaluation.
3. Coordinator chấp nhận contracts; tích hợp product/UI/engineering/operations và roadmap.
4. Review chéo, kiểm links/domain consistency/current-target, sửa rồi commit nhỏ.

Subagent không git add/commit/switch, không sửa ngoài ownership, không đổi shared contract âm thầm. Khi cần thay schema/decision, báo coordinator để dừng dependent work và cập nhật owner document.

Handoff ghi files, assumptions, external evidence, checks/results, unresolved questions, risks và next dependency. Coordinator review rồi cập nhật status, không coi agent báo xong là nghiệm thu tự động. Commit chỉ tài liệu thuộc task hiện tại; không git add .; không push nếu chưa được yêu cầu.
