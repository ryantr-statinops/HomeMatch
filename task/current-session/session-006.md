# Session 006 — Docs & Code Sync with Google Sheet

## Session ID

SESSION-006

---

## Date

2026-06-16

---

## Goal

Đồng bộ toàn bộ docs và Apps Script code với cấu trúc Google Sheet thật (DATABASE_HomeMatch).

Xoá bỏ các giả định thiết kế cũ, cập nhật theo dữ liệu thực tế.

---

## Context

Google Sheet thật: `https://docs.google.com/spreadsheets/d/1UjDU0PIRIAoNx8f56WQ6v67yP7hJf5J5MdfS7y95rCw/edit`

Cấu trúc Sheet đã được đọc qua CSV export và browser automation.

---

## Scope

1. Cập nhật docs/database_structure.md → V3
2. Cập nhật docs/sheet-design.md → V3
3. Cập nhật docs/diagrams/erd-v1.md → V2
4. Cập nhật docs/api-contracts.md → V3
5. Đồng bộ apps-script/Code.js — SHEET_NAME (ROOMMATE_POST → ROOMMATE)
6. Đồng bộ apps-script/rooms.js — mapRoom: parseBool, parseCost, mapStatus
7. Đồng bộ apps-script/roommates.js — mapRoommatePost: mapPostType, parseBudget
8. Tạo session-006.md
9. Cập nhật task/next-plan.md
10. Commit + Push

---

## Out Of Scope

1. Không deploy Apps Script (chờ clasp setup)
2. Không xoá mock data frontend
3. Không xây Room Detail page

---

## Thay đổi chính

### PHONGTRO — Cột thực tế khác với thiết kế cũ

| Thay đổi | Mô tả |
|----------|-------|
| ❌ Không có | `DienTich`, `CreatedAt`, `UpdatedAt` |
| ✅ Có thêm | `BanCong`, `ThangMay`, `Lau`, `HoaHong`, `GhiChu`, `IDChuNha`, `NgayTao`, `NgayCapNhat` |
| 🔄 Kiểu dữ liệu | Dùng text "Có"/"Không" thay vì boolean |
| 🔄 TrangThai | Dùng "Trống"/"Đã thuê"/"Ẩn" thay vì "ACTIVE" |
| 🔄 Chi phí | Dạng "3.800đ/kWh" thay vì số |

### ROOMMATE — Khác hoàn toàn với thiết kế cũ

- Tab name: `ROOMMATE` (không phải `ROOMMATE_POST`)
- 14 cột tiếng Việt, khác với 12 cột tiếng Anh thiết kế ban đầu
- PostType mapping: `LOOKING_FOR_ROOMMATE` → `HAVE_ROOM`, `NEED_ROOMMATE_FOR_ROOM` → `NEED_ROOMMATE`

### SALE — Thêm cột

- Thêm: ChucVu, QLCTV, STK, NganHang

### HINHANH — Thêm cột

- Thêm: CreatedAt

### LICHHEN & LEAD

- Chưa xác nhận được cấu trúc đầy đủ (do AppSheet quản lý)

---

## Files Changed

### Docs (4 files)
- `docs/database_structure.md` — Rewrite to V3
- `docs/sheet-design.md` — Rewrite to V3
- `docs/diagrams/erd-v1.md` — Rewrite to V2
- `docs/api-contracts.md` — Rewrite to V3

### Code (3 files)
- `apps-script/Code.js` — Fix SHEET_NAME.ROOMMATE
- `apps-script/rooms.js` — Add parseBool, parseCost, mapStatus
- `apps-script/roommates.js` — Rewrite for actual ROOMMATE columns

### Task (2 files)
- `task/current-session/session-006.md` — Created
- `task/next-plan.md` — Updated

---

## Lessons Learned

- Google Sheet thực tế có cấu trúc khác đáng kể so với thiết kế ban đầu
- Các giá trị dùng tiếng Việt (VD: "Có"/"Không", "Trống") cần parse layer
- Chi phí lưu dạng text "3.800đ/kWh" cần hàm parse chuyên biệt
- AppSheet tự động quản lý một số cột (NgayTao, NgayCapNhat...)

---

## Definition Of Done

- [x] Tất cả docs cập nhật theo Sheet thật
- [x] Apps Script code đồng bộ với Sheet thật
- [x] Code parse được giá trị tiếng Việt (Có/Không, Trống...)
- [x] Code parse được chi phí dạng text (3.800đ/kWh → 3800)
- [x] Đã review
- [ ] Đã commit + push
