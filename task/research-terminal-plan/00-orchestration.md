# Orchestration
**Trạng thái:** quy trình mục tiêu và assignment P00.

Coordinator sở hữu glossary, ADR/shared schemas, task board, integration, conflict resolution và commit trên main. Tối đa ba workers đồng thời, không shared-file edits. Subagents không stage/commit/switch hoặc sửa ngoài ownership.

## P00 ownership
- RT-DOC-SOURCE: docs/03-market-research, 04-data, 05-news-ingestion, 06-market-data.
- RT-DOC-ACCOUNT: docs/07-portfolio, 09-api.
- RT-DOC-LAB: docs/08-model-lab.
- Coordinator: docs index/glossary, 01-product, 02-architecture, 10-ui-ux, 11-engineering, 12-operations, task plan/archive và root README.

## Task packet và handoff
ID, objective, predecessor/input revision, owned paths, excluded scope, output contract, tests, exit, rollback. Handoff reports files, assumptions, source evidence, checks/results, unresolved decisions và risks. Coordinator accepts before dependent work begins.

## Waves
Khóa boundaries -> parallel docs authoring -> coordinator contracts review/integration -> independent/link/terminology/scope review -> focused commits. Nếu contract thay đổi, dừng downstream và cập nhật document owner trước; không xử lý bằng hai enum hoặc hai formula khác nhau.

## Commit rules
Main theo yêu cầu; mỗi domain hoặc phase một commit, không deletion-only làm mất replacement. Stage explicit paths; archive cả source/destination cùng commit để giữ rename. Không push/deploy tự động. Một file có thể thuộc nhiều consumers nhưng chỉ một owner commit.
