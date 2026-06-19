# Session 013 — Tối ưu hiệu năng load data từ Google Sheets

## Mục tiêu
Giảm thời gian load data từ Google Sheets, cải thiện trải nghiệm người dùng trên các trang danh sách (rooms, roommates).

---

## Chẩn đoán hiện tại

### Kiến trúc request
```
Client Component -> /api/proxy -> Google Apps Script -> Google Sheets
```

### Bottleneck đã xác định

| # | Vấn đề | File | Line | Mức độ |
|---|--------|------|------|--------|
| 1 | **Không cache client-side** — mỗi lần vào `/rooms` hoặc filter là fetch lại từ đầu | `RoomList.tsx` | 22-27 | 🔴 Cao |
| 2 | **Duplicate fetch** — `loadRooms()` và `loadAreas()` đều gọi `getRooms()` | `room.service.ts` | 43-51 | 🔴 Cao |
| 3 | **Đọc toàn bộ sheet mỗi request** — `getDataRange().getValues()` đọc hết rows, filter trong memory | `sheets.js` | 43 | 🟡 Trung bình |
| 4 | **Google Drive lookup cho ảnh** — mỗi request query Drive để resolve ảnh, 500ms-2s/ảnh | `rooms.js` | 201-247 | 🟡 Trung bình |
| 5 | **Không pagination** — trả về tất cả rooms trong 1 response | `rooms.js` | 21-61 | 🟢 Thấp |
| 6 | **Proxy không cache** — `/api/proxy` là pass-through, không cache layer nào | `route.ts` | 13-85 | 🟢 Thấp |

### Hiệu năng mong muốn
- Load danh sách lần đầu: < 2s (hiện tại có thể 3-8s tuỳ dung lượng sheet)
- Filter: response trong < 1s (hiện tại bằng thời gian load lại từ đầu)
- Chuyển trang detail: instant (hiện tại đã có ISR 60s)

---

## Giải pháp đề xuất

### 1. Thêm React Query (TanStack Query) cho client-side
- **File ảnh hưởng:** `RoomList.tsx`, `RoommateList.tsx`
- Cài `@tanstack/react-query`
- Wrap `loadRooms()`, `loadAreas()` bằng `useQuery` với `staleTime` và `gcTime`
- Tự động cache, deduplicate request, background refetch
- **Loại bỏ** duplicate fetch giữa `loadRooms()` và `getDistinctAreas()`

### 2. Cache layer trên Next.js API Proxy
- **File ảnh hưởng:** `src/app/api/proxy/route.ts`
- Thêm `force-cache` hoặc dùng `Map` in-memory cache với TTL
- Hoặc dùng `next: { revalidate: 60 }` giống room detail pattern

### 3. Tối ưu Apps Script
- **File ảnh hưởng:** `apps-script/rooms.js`, `apps-script/sheets.js`
- Thêm `CacheService` của Apps Script để cache sheet data trong 30-60s
- Cache resolved image URLs vào ScriptCache hoặc PropertiesService
- Giới hạn số rows trả về nếu có thể

### 4. Filter client-side thay vì server-side
- **File ảnh hưởng:** `RoomList.tsx`, `room.service.ts`
- Fetch all data 1 lần, filter trên client (nếu dataset < 500 rows)
- Giảm latency từ round-trip

---

## Scope

1. Cài đặt và cấu hình React Query
2. Áp dụng vào RoomList (ưu tiên cao nhất)
3. Thêm cache vào API proxy
4. Tối ưu Apps Script (CacheService)
5. Verify build không lỗi

## Out Of Scope

1. Rewrite toàn bộ backend (giữ nguyên Apps Script + Sheets)
2. Migration qua database thật (PostgreSQL, Firebase)
3. Tối ưu ảnh (lazy loading, next/image — đã có sẵn)
4. Roommate listing page (chưa active)

---

## Định nghĩa hoàn thành

- [ ] RoomList load < 2s lần đầu tiên
- [ ] Filter không gọi lại API (xử lý client-side hoặc cache)
- [ ] Không còn duplicate fetch `getRooms()` khi load page
- [ ] `npm run build` pass
- [ ] Kiểm tra trên production (sau khi deploy)
