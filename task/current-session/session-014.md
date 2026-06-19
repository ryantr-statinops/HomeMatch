# Session 014 — Kế hoạch triển khai tối ưu hiệu năng

## Mục tiêu
Triển khai các giải pháp đã xác định ở Session 013, ưu tiên hiệu quả cao nhất với ít thay đổi nhất.

---

## Chiến lược

### Tiếp cận theo layers (từ ngoài vào trong)

```
Layer 1: Client cache  ← React Query (giảm request, deduplicate)
Layer 2: Proxy cache   ← In-memory cache trên /api/proxy (giảm request đến Apps Script)
Layer 3: Apps Script   ← CacheService + Drive cache (giảm thời gian xử lý)
Layer 4: Filter local  ← Chuyển filter từ server → client (loại bỏ round-trip)
```

Lý do: làm layer ngoài trước vì ít rủi ro nhất, dễ verify, và mang lại hiệu quả tức thì.

---

## Kế hoạch triển khai (Steps)

### Step 0 — Chuẩn bị
- [ ] Cài `@tanstack/react-query`
- [ ] Tạo `QueryProvider` wrapping root layout

### Step 1 — Xử lý duplicate fetch (room.service.ts)
- **Vấn đề:** `getDistinctAreas()` gọi lại `getRooms()`, cùng data fetch 2 lần
- **Giải pháp:** Tách logic lấy areas thành hàm riêng không phụ thuộc `getRooms()`, hoặc cho phép RoomList dùng chung cache của React Query
- **Cách làm:** Đơn giản nhất — cho `getDistinctAreas()` gọi API riêng `?action=getAreas` hoặc lấy từ dữ liệu đã cache sẵn. Ở phase này, React Query deduplicate sẽ tự xử lý nếu cùng key.

Thực tế: với React Query, nếu `loadRooms` và `loadAreas` cùng dùng `useQuery` với cùng key thì chỉ 1 request được gửi.

### Step 2 — Rewrite RoomList.tsx với React Query
- **File:** `src/components/room/RoomList.tsx`
- **Thay đổi:**
  - Bỏ `useState`/`useEffect`
  - Dùng `useQuery` cho rooms và areas
  - Filter gọi `setFilterParams` → `useQuery` tự refetch với params mới
  - `staleTime: 5 * 60 * 1000` (5 phút), `gcTime: 10 * 60 * 1000`

### Step 3 — Thêm cache vào API Proxy
- **File:** `src/app/api/proxy/route.ts`
- **Cách làm:** Dùng `Map<string, { data, timestamp }>` in-memory cache với TTL 60s
- Cache key = `action + params` hash
- Tự cleanup entries quá hạn

### Step 4 — Tối ưu Apps Script: Cache sheet reads
- **File:** `apps-script/sheets.js`
- **Cách làm:** Dùng `CacheService.getScriptCache()` để cache kết quả `readSheet()` trong 30-60 giây
- Cache key = `sheet_<tên sheet>`
- Clear cache khi có write (appendRow)

### Step 5 — Tối ưu Apps Script: Cache resolved image URLs
- **File:** `apps-script/rooms.js`
- **Cách làm:** Ngoài per-request cache (`_imageUrlCache`), thêm `CacheService` để cache giữa các request
- Cache key = `img_<path>`, TTL = 1 giờ

### Step 6 — Client-side filtering
- **File:** `src/components/room/RoomList.tsx` (củng cố sau Step 2)
- **Cách làm:** Fetch toàn bộ rooms 1 lần, filter trên client khi params thay đổi
- Không gọi lại API khi filter — chỉ lọc mảng trong memory
- Chỉ fetch lại khi `staleTime` hết hoặc manual refetch

### Step 7 — Verify
- [ ] `npm run build` không lỗi
- [ ] Test trên local: load rooms, filter, chuyển trang

---

## Thứ tự triển khai

```
Step 0 ──→ Step 1 ──→ Step 2 ──→ Step 3 ──→ Step 4+5 ──→ Step 6 ──→ Step 7
(Setup)   (Service)  (RoomList)  (Proxy)   (Apps Script) (Filter)  (Verify)
```

- Steps 0-2: Làm liền, có thể trong 1 session — đây là phần mang lại hiệu quả lớn nhất
- Step 3: Cache proxy — optional nhưng dễ làm
- Steps 4-5: Apps Script — cần deploy lại, verify kỹ
- Step 6: Client filter — thay đổi logic chính, test kỹ

---

## Files thay đổi

| File | Step | Loại thay đổi |
|------|------|---------------|
| `package.json` | 0 | Thêm dependency |
| `src/app/layout.tsx` | 0 | Thêm QueryProvider |
| `src/components/providers/QueryProvider.tsx` | 0 | **Tạo mới** |
| `src/components/room/RoomList.tsx` | 2, 6 | Rewrite |
| `src/services/room.service.ts` | 1 | Refactor |
| `src/app/api/proxy/route.ts` | 3 | Thêm cache |
| `apps-script/sheets.js` | 4 | Thêm CacheService |
| `apps-script/rooms.js` | 5 | Thêm CacheService |

---

## Rủi ro & Cách giảm thiểu

| Rủi ro | Mức | Giảm thiểu |
|--------|-----|------------|
| React Query thay đổi pattern render | Trung bình | Giữ nguyên UI cấu trúc component, chỉ thay data layer |
| Cache proxy trả data cũ | Thấp | TTL 60s, có thể config |
| Apps Script CacheService không hoạt động | Thấp | Fallback vẫn đọc sheet trực tiếp |
| Client filter sai logic | Trung bình | Viết test filter function riêng, so sánh với API filter |
| Build fail do @tanstack/react-query | Thấp | Cài đúng version, check peer dependencies |

---

## Định nghĩa hoàn thành

- [ ] Rooms page load < 2s (so với 3-8s hiện tại)
- [ ] Filter rooms KHÔNG gọi lại API
- [ ] Chuyển filter → kết quả hiển thị ngay lập tức (< 100ms)
- [ ] Không còn duplicate fetch khi vào rooms page
- [ ] `npm run build` pass
- [ ] Tất cả chức năng filter hoạt động đúng (khuVuc, giá, keyword)
