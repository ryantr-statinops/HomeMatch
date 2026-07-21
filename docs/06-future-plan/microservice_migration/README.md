# Microservice Migration Plan

Đây là bộ tài liệu kế hoạch hoàn chỉnh cho hướng chuyển đổi MatchHome sang mô hình public site + admin portal + backend service trung tâm.

## Cách đọc

1. Đọc `00-overview.md` để nắm bối cảnh và scope.
2. Đọc `01-target-architecture.md` để hiểu kiến trúc đích.
3. Đọc `02-stack-decision.md` để chốt stack và nguyên tắc.
4. Đọc `03-migration-phases.md` để biết thứ tự triển khai.
5. Đọc `04-risks-and-tradeoffs.md` để nắm rủi ro và đánh đổi.
6. Đọc `05-execution-checklist.md` để chuyển từ plan sang action.

## File Index

- `00-overview.md`: bối cảnh, mục tiêu, scope, assumption
- `01-target-architecture.md`: kiến trúc đích và boundary giữa các khối
- `02-stack-decision.md`: stack công nghệ và lý do chọn
- `03-migration-phases.md`: các phase chuyển đổi
- `04-risks-and-tradeoffs.md`: rủi ro và mitigation
- `05-execution-checklist.md`: checklist để triển khai từng bước

## Mục đích

- Lưu toàn bộ plan migration ở một nơi dễ tra cứu.
- Tách tài liệu chiến lược khỏi `task/` để tránh lẫn với session ngắn hạn.
- Làm nguồn tham chiếu duy nhất khi bắt đầu sửa kiến trúc.
