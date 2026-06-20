# Session 018 — Bỏ số nhà (soNha) khỏi hiển thị địa chỉ phòng

## Mục tiêu
Loại bỏ `soNha` khỏi địa chỉ hiển thị trên RoomCard, RoomInfo và breadcrumb Room Detail để chỉ còn Đường, Phường, Khu vực.

---

## Scope

1. ✅ `src/components/room/RoomCard.tsx` — bỏ `room.address.soNha` khỏi address badge
2. ✅ `src/components/room/RoomInfo.tsx` — bỏ `room.address.soNha` khỏi `addressParts`
3. ✅ `src/app/rooms/[id]/page.tsx` — bỏ `room.address.soNha` khỏi breadcrumb title

---

## Files đã sửa

| File | Thay đổi |
|------|----------|
| `src/components/room/RoomCard.tsx` | Xoá dòng `room.address.soNha` trong badge |
| `src/components/room/RoomInfo.tsx` | Xoá `room.address.soNha` khỏi mảng `addressParts` |
| `src/app/rooms/[id]/page.tsx` | Xoá `room.address.soNha` khỏi `addressParts` |

---

## Định nghĩa hoàn thành

- [x] Địa chỉ RoomCard chỉ hiển thị: Đường, Phường, Khu vực
- [x] Địa chỉ RoomInfo chỉ hiển thị: Đường, Phường, Khu vực
- [x] Breadcrumb title chỉ hiển thị: Đường, Phường
- [x] `npm run build` không lỗi
