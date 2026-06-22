# Session 019

## Session ID

SESSION-019

---

## Date

2026-06-22

---

## Goal

Fix lỗi hiển thị ảnh bị cắt ở RoomCard, thêm chế độ xem full màn hình cho RoomGallery, cải tiến bộ lọc phòng.

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
5. Xoá lọc diện tích (không có data)
6. Thay select giá bằng range slider 2 đầu (`@base-ui/react/slider`)
7. Thu nhỏ kích thước bộ lọc
8. Thêm bộ lọc tiện ích (amenities) với shadcn-style dialog
9. Fix chiều ngang amenities dialog bằng với select khu vực

---

## Out Of Scope

1. Thay đổi cấu trúc dữ liệu ảnh
2. Sửa các component khác ngoài RoomCard, RoomGallery, RoomFilter

---

## Deliverables

1. **RoomCard.tsx** — Xoá `object-left-top`, ảnh căn giữa thay vì neo góc trên
2. **ImageViewer.tsx** (mới) — Fullscreen lightbox:
   - Dùng `@base-ui/react/dialog` với backdrop tối
   - Embla carousel cho chuyển ảnh
   - Nút đóng (X) góc trên phải, nút prev/next, đếm số thứ tự ảnh
3. **RoomGallery.tsx** — Thêm:
   - Nút `Maximize2` ở góc dưới phải vùng ảnh
   - Click ảnh mở fullscreen, tích hợp ImageViewer
4. **RoomFilter.tsx** — Cải tiến:
   - Xoá bộ lọc diện tích
   - Thay select giá bằng range slider (0đ → 10tr, bước 500k) dùng `@base-ui/react/slider`
   - Thu nhỏ padding, font size, icon
   - Thay native select arrow bằng custom ChevronDown icon
   - Fix hiệu ứng arrow select: `onClick` → `onMouseDown` + swap icon thay vì rotate-180
   - Thêm amenities filter: button trigger "Tiện ích (X)" mở Dialog grid 2/3 cột
   - Amenities dialog nằm cùng hàng grid với select khu vực
   - Nút "Xoá tất cả" trong dialog amenities
5. **src/components/ui/dialog.tsx** (mới) — shadcn-style Dialog wrapper dùng `@base-ui/react/dialog`
6. **src/types/room.ts** — Thêm `amenities` vào `RoomFilterParams`
7. **src/services/room.service.ts** — Thêm logic lọc amenities (`every`)

---

## Notes

- Commit trước (12e7c67) đã thêm `object-left-top` vào cả RoomCard và Gallery
- `aspect-[4/3]` trên RoomCard + `object-left-top` khiến ảnh dọc bị cắt phần dưới → đã sửa
- `aspect-[1/1]` trên Gallery phù hợp với `object-left-top` nên giữ nguyên
- `@base-ui/react/dialog` import dạng `import { Dialog }` (namespace export, không dùng `* as`)
- `@base-ui/react` Slider dùng `Slider.Root` với 2 `Slider.Thumb` cho range slider
- Amenities dùng `Set<keyof RoomAmenities>` để toggle, filter dùng `every` để đảm bảo phòng có tất cả

---

## Definition Of Done

* [x] Hoàn thành task
* [x] Không vi phạm project-rules
* [x] Không mở rộng scope
* [x] Build thành công (Next.js + TypeScript)
