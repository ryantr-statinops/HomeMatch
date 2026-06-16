# Session 008 — RoomCard Rebuild, Codebase Cleanup & parseCost Fix

## Session ID

SESSION-008

---

## Date

2026-06-17

---

## Goal

- Clean up codebase (xoá thư mục rỗng, sửa types, dọn dependencies)
- Rebuild RoomCard với layout mới
- Fix parseCost (giá nước sai)
- Tạo docs/setup-guide.md
- Deploy parseCost fix lên Apps Script

---

## Scope

1. Codebase cleanup
2. RoomCard rebuild
3. parseCost fix
4. Tạo setup guide
5. Deploy Apps Script v4
6. Update docs & tasks

---

## Thay đổi chính

### 1. Codebase Cleanup

- Xoá thư mục rỗng: `src/features/`, `src/hooks/`, `src/components/roommate/`
- Sửa `RoomAmenities` type: thêm `banCong`, `thangMay` (đồng bộ API)
- Sửa `RoommatePost` type: thêm `needCount`, `desiredArea`
- Thêm `floor` vào `Room` type
- Xoá `autoprefixer` khỏi `package.json`, `postcss.config.mjs`
- Xoá dòng trống trong `package.json`

### 2. RoomCard Rebuild

Layout cũ → Layout mới:

| Thành phần | Trước | Sau |
|------------|-------|-----|
| Badge ảnh | Giá tiền | Địa chỉ (số nhà + đường + phường + khu vực) |
| Thông tin | Diện tích (luôn = 0) | ❌ Bỏ |
| | — | ✅ Lầu (`floor`) |
| | — | ✅ Giá điện (`costs.dien`) |
| | — | ✅ Giá nước (`costs.nuoc`) |
| | — | ✅ Trạng thái (Còn trống/Đã thuê) |
| Tiện ích | Chỉ `mayLanh` | 6 tiện ích: Máy lạnh, Tủ lạnh, Kệ bếp, Cửa sổ, Thang máy, Để xe |

### 3. parseCost Fix

**Vấn đề:** `parseCost("25.000đ/m3")` → `250003`

**Nguyên nhân:** `replace(/[^0-9]/g, "")` giữ số `3` từ `/m3`.

**Fix:** Dùng `match(/^\d+/)` chỉ lấy chữ số đầu tiên sau khi bỏ dấu chấm.

### 4. Apps Script Deploy

- Push code: `clasp push -f`
- Version 4: "Fix parseCost: parse leading digits only"
- Deploy v4 (Web App từ editor): `AKfycbzYnZYiTCIaYYAjVEZsiG6tNAgbFhEfFyzvfAzhjHpHhrvrTrV9HJ8nUGZuMKBqZWJ3`

### 5. Tài liệu mới

- `docs/setup-guide.md` — Hướng dẫn setup & cấu hình API chi tiết

---

## Files Changed

### Code
- `apps-script/rooms.js` — Fix parseCost
- `src/types/room.ts` — Thêm banCong, thangMay, floor
- `src/types/roommate-post.ts` — Thêm needCount, desiredArea
- `src/components/room/RoomCard.tsx` — Rebuild layout
- `package.json` — Xoá autoprefixer, dòng trống
- `postcss.config.mjs` — Xoá autoprefixer plugin
- `.env.local` — Cập nhật URL deploy v4

### Docs & Tasks
- `docs/setup-guide.md` — Tạo mới
- `task/current-session/session-007.md` — Fix URL deploy
- `task/current-session/session-008.md` — Tạo mới
- `task/next-plan.md` — Cập nhật

---

## Lessons Learned

- `clasp redeploy` làm mất cấu hình Web App → deploy từ editor UI là an toàn nhất
- Khi tạo Web App deployment, phải chọn đúng **Version** mới nhất
- `parseCost` dùng `match(/^\d+/)` an toàn hơn `replace(/[^0-9]/g, "")`
- `autoprefixer` không cần với Tailwind v4 (tự động xử lý vendor prefixes)

---

## Definition Of Done

- [x] Codebase sạch, xoá thư mục rỗng
- [x] Types đồng bộ với API response
- [x] RoomCard rebuild với layout mới
- [x] parseCost fix + deploy v4
- [x] API trả về giá nước đúng (25000)
- [x] Build + Lint pass
- [x] Docs & tasks cập nhật
- [x] Commit + Push
