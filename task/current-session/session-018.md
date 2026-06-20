# Session 018 — Cập nhật Room Detail & Price Format

## Mục tiêu
Cập nhật layout Room Detail, format giá, tỉ lệ ảnh gallery, và bỏ số nhà khỏi địa chỉ.

---

## Scope

### 1. ✅ Layout RoomDetail
- Gom RoomInfo + RoomAmenities + Zalo CTA vào cùng cột phải (lg:col-span-2)
- Gallery chiếm cột trái (lg:col-span-3)
- Bỏ border-top divider giữa các section

### 2. ✅ Price format
- Đổi format từ `7 tr` / `7 triệu` → `7.000.000đ`
- Bỏ `font-bold` khỏi giá (RoomCard + RoomInfo)

### 3. ✅ Gallery aspect ratio
- Đổi `aspect-[4/3]` → `aspect-[1/1]` (hình vuông)
- Thêm `object-left-top` để không che logo góc trái trên

### 4. ✅ Bỏ số nhà khỏi địa chỉ
- RoomCard, RoomInfo, RoomDetail breadcrumb

---

## Files đã sửa

| File | Thay đổi |
|------|----------|
| `src/app/rooms/[id]/page.tsx` | Xoá `soNha` khỏi breadcrumb title |
| `src/components/room/RoomCard.tsx` | Bỏ `soNha` badge, bỏ `font-bold` giá, thêm `object-left-top` |
| `src/components/room/RoomDetail.tsx` | Gom Amenities + Zalo CTA vào cùng cột phải |
| `src/components/room/RoomGallery.tsx` | `aspect-[4/3]` → `aspect-[1/1]`, thêm `object-left-top` |
| `src/components/room/RoomInfo.tsx` | Bỏ `soNha`, bỏ `font-bold` giá, format `7.000.000đ` |
| `src/components/roommate/RoommateCard.tsx` | Format budget `7.000.000đ` |

---

## Định nghĩa hoàn thành

- [x] Layout desktop: Gallery trái — Info + Amenities + Zalo CTA phải
- [x] Hiển thị giá `7.000.000đ/tháng`
- [x] Gallery tỉ lệ 1:1, không che logo
- [x] Địa chỉ không còn số nhà
- [x] `npm run build` không lỗi
