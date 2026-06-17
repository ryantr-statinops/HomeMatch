# Session 012 — Phase 5: Roommate Listing

## Mục tiêu
Xây trang danh sách bài ở ghép `/roommates` (filter + list), thay thế Coming Soon page.

## Kiến trúc

### Components mới

| Component | Path | Chức năng |
|-----------|------|-----------|
| RoommateCard | `src/components/roommate/RoommateCard.tsx` | Card hiển thị post type badge, customer info, budget, need count, description, Zalo + detail actions |
| RoommateFilter | `src/components/roommate/RoommateFilter.tsx` | Filter dropdown: postType, gender, khuVuc (giống RoomFilter style) |
| RoommateList | `src/components/roommate/RoommateList.tsx` | Client component — fetch API, filter, loading/empty state, grid |

### API Endpoint
- `GET ?action=getRoommatePosts` — đã có sẵn trong `apps-script/roommates.js`
- Filter params: `postType`, `gender`, `khuVuc`

## Chi tiết thay đổi

### RoommateCard
- Header: post type badge (`HAVE_ROOM` → "Có phòng, cần tìm người" / `NEED_ROOMMATE` → "Cần người thuê chung")
- Customer: tên + giới tính + trường học
- Khu vực mong muốn, budget (format đến triệu), số người cần tuyển
- Description excerpt (line-clamp-2)
- Footer: 2 nút — "Liên hệ Zalo" + "Xem chi tiết" (link đến `/roommates/[id]`)

### RoommateFilter
- Style giống RoomFilter (blue primary, collapsible)
- 3 trường: loại bài đăng (select), giới tính (select), khu vực (input text)

### RoommateList
- Pattern giống RoomList: fetch → render grid 3 cột
- Loading spinner, filtering indicator
- EmptyState khi không có kết quả

### Page
- Layout đơn giản: header + listing, giống `/rooms/page.tsx`
- Bỏ toàn bộ Coming Soon sections (hero, features, CTA)

## Build
`npm run build` — ✅ passes

## Status
- Components (RoommateCard, RoommateFilter, RoommateList) ✅ built
- Page: ⏸️ **reverted về Coming Soon** vì chưa có data ROOMMATE từ Sale

## Kích hoạt sau
Khi có data trong sheet ROOMMATE:
1. Kiểm tra API response thực tế
2. Uncomment / đổi `src/app/roommates/page.tsx` về listing
3. Test filter + card hiển thị
