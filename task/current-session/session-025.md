# Session 025 — Codebase Update: Map MaPhong, LoaiPhong, DienTich vào type/service/UI

## Session ID

SESSION-025

---

## Date

2026-06-28

---

## Goal

Cập nhật codebase để sử dụng 3 cột mới từ PHONGTRO: `MaPhong`, `LoaiPhong`, `DienTich` — từ TypeScript types → service mapping → UI components.

---

## Context

Các tài liệu liên quan:

* `docs/diagrams/erd-v1.md` (V5)
* `docs/database_structure.md` (V5)
* `src/types/room.ts`
* `src/services/room.service.ts`
* `src/components/room/RoomCard.tsx`
* `src/components/room/RoomInfo.tsx`

---

## Scope

Những việc đã thực hiện:

1. Thêm `maPhong`, `loaiPhong` vào `Room` type trong `src/types/room.ts`
2. Map `maphong`, `loaiphong`, `dientich` trong `mapRoom()` ở `src/services/room.service.ts`
3. Thay `area: 0` hardcode bằng `parseArea(row.dientich)`
4. Thêm badge `LoaiPhong` + hiển thị `area` vào `RoomCard.tsx`
5. Thêm hiển thị `loaiPhong` + `area` vào `RoomInfo.tsx`
6. Commit & push từng file riêng biệt

---

## Deliverables

### 4 Files cần sửa

| File | Thay đổi |
|------|----------|
| `src/types/room.ts` | Thêm `maPhong?: string`, `loaiPhong?: string` |
| `src/services/room.service.ts` | Map 3 cột mới, thêm `parseArea()`, bỏ `area: 0` |
| `src/components/room/RoomCard.tsx` | Badge `loaiPhong` trên ảnh + `area` kế giá |
| `src/components/room/RoomInfo.tsx` | Hiển thị `loaiPhong` + `area` |

### UI Design

**RoomCard:**
- Góc trái ảnh: badge `LoaiPhong` (nền primary/80, chữ trắng)
- Kế giá: `• 25 m²` (nếu có)

**RoomInfo:**
- Dưới giá: badge `LoaiPhong` + `25 m²`

---

## Notes

* `RoomGallery.tsx` không bị ảnh hưởng (chỉ xử lý images)
* `RoomDetail.tsx` không cần sửa — `buildRoomText()` đã có `if (room.area)` sẽ tự hoạt động
* `RoomAmenities.tsx` không liên quan

---

## Definition Of Done

* [ ] Type + service mapping hoạt động
* [ ] RoomCard hiển thị loaiPhong + area
* [ ] RoomInfo hiển thị loaiPhong + area
* [ ] Build không lỗi (`npm run lint`)
* [ ] Mỗi file commit & push riêng biệt
* [ ] Không vi phạm project-rules
