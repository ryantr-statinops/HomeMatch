# Session 019

## Session ID

SESSION-019

---

## Date

2026-06-22

---

## Goal

Fix lỗi hiển thị ảnh bị cắt ở RoomCard và thêm chế độ xem full màn hình cho RoomGallery.

---

## Context

Các tài liệu liên quan:

* docs/project-rules.md
* docs/system-architecture.md
* docs/folder-structure.md

---

## Scope

1. Kiểm tra và sửa lỗi ảnh bị cắt trong RoomCard (`object-left-top`)
2. Chỉ sửa RoomCard, giữ nguyên RoomGallery
3. Thêm nút expand ở góc dưới phải Gallery để bật fullscreen viewer
4. Tạo ImageViewer component dùng `@base-ui/react/dialog`

---

## Out Of Scope

1. Thay đổi cấu trúc dữ liệu ảnh
2. Sửa các component khác ngoài RoomCard và RoomGallery

---

## Deliverables

1. **RoomCard.tsx** — Xoá `object-left-top`, ảnh căn giữa thay vì neo góc trên
2. **ImageViewer.tsx** (mới) — Fullscreen lightbox:
   - Dùng `@base-ui/react/dialog` với backdrop tối
   - Embla carousel cho chuyển ảnh
   - Nút đóng (X) góc trên phải
   - Nút prev/next
   - Đếm số thứ tự ảnh
3. **RoomGallery.tsx** — Thêm:
   - Nút `Maximize2` ở góc dưới phải vùng ảnh
   - Click ảnh mở fullscreen
   - Tích hợp ImageViewer

---

## Notes

- Commit trước (12e7c67) đã thêm `object-left-top` vào cả RoomCard và Gallery
- `aspect-[4/3]` trên RoomCard + `object-left-top` khiến ảnh dọc bị cắt phần dưới → đã sửa
- `aspect-[1/1]` trên Gallery phù hợp với `object-left-top` nên giữ nguyên
- `@base-ui/react/dialog` import dạng `import { Dialog }` (namespace export, không dùng `* as`)

---

## Definition Of Done

* [x] Hoàn thành task
* [x] Không vi phạm project-rules
* [x] Không mở rộng scope
* [x] Build thành công (Next.js + TypeScript)
