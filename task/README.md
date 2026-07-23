# Task Workflow

## Purpose

Thư mục này quản lý kế hoạch triển khai, session log và hướng đi tiếp theo của dự án.

## Cách dùng với `docs/`

`docs/` là nguồn sự thật cho kiến trúc, sản phẩm, data và UI.

`task/` là nơi ghi:

- kế hoạch hiện tại
- thứ tự thực hiện
- log theo session
- việc đang chờ

## Active Plans

- `microservice-foundation-plan/`: kế hoạch triển khai backend boundary, Admin
  Portal và migration an toàn cho Vercel production.

## Workflow

1. Đọc `docs/README.md`.
2. Đọc các tài liệu cốt lõi:
   - `docs/01-product/project-rules.md`
   - `docs/02-architecture/system-architecture.md`
   - `docs/02-architecture/folder-structure.md`
   - `docs/03-data/database-structure.md`
3. Đọc `task/next-plan.md`.
4. Chốt scope cho session hiện tại.
5. Tạo `task/current-session/session-xxx.md`.
6. Thực hiện đúng phạm vi session.

## Rules

- Không tự mở rộng scope.
- Không tự thêm tính năng.
- Không tự thay đổi kiến trúc.
- Không tự thêm package không cần thiết.

Luôn ưu tiên:

- Đơn giản
- Dễ maintain
- Phù hợp MVP
