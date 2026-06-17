# Session 009 — Image Resolution: Drive URLs via IMAGE_MAP Sheet

## Session ID

SESSION-009

---

## Date

2026-06-17

---

## Goal

Fix RoomCard images not displaying because Google Sheet stores AppSheet relative paths (e.g. `PHONGTRO_Images/xxx.jpg`) instead of public image URLs.

---

## Context

- API response `image` field: `"PHONGTRO_Images/2026616144133.HinhAnhChinh.074555.jpg"`
- These are AppSheet virtual paths, not actual image URLs
- Images are stored in a shared Google Drive folder: `https://drive.google.com/drive/folders/1VIzgVkAuViOCMNdqVI1_7k8pjSHkVm2e`
- Files are public, folder has edit access
- Google Drive file ID format: `https://drive.usercontent.google.com/download?id={FILE_ID}&export=view`

---

## Attempts Made

### Attempt 1 — DriveApp.getFilesByName() ❌

Thêm hàm `resolveImageUrl()` trong Apps Script dùng `DriveApp.getFilesByName()` để tìm file theo tên. Kết quả: Drive scope không được authorize cho Web App deployment.

### Attempt 2 — Scan AppSheet folder ❌

Cải tiến: tìm file trong folder `PHONGTRO_Images` trước, fallback search toàn bộ Drive. Thêm `testDrive` debug action. Kết quả: Vẫn lỗi Drive scope.

### Attempt 3 — Drive folder ID mapping ❌

Dùng `DriveApp.getFolderById(DRIVE_IMAGE_FOLDER_ID)` để quét folder Drive đã biết, build filename→fileId map. Kết quả: DriveApp.getFolderById() yêu cầu `drive.readonly` scope mà Web App chưa được cấp.

### Nguyên nhân gốc

- `appsscript.json` đã khai báo `drive.readonly` scope
- Khi deploy Web App mới từ editor, popup authorization không hiển thị Drive scope vì user đã authorize script trước đó với scope cũ (chỉ Sheets)
- Cần **Revoke quyền cũ** trong Google Account Security trước khi deploy lại

---

## Giải pháp hiện tại: IMAGE_MAP Sheet 🟡

Để tránh phụ thuộc vào DriveApp OAuth, chuyển sang cơ chế mapping từ Sheet:

### Thay đổi code

| File | Thay đổi |
|------|----------|
| `apps-script/rooms.js` | Xoá toàn bộ code DriveApp. Thêm `buildImageMap()` + `resolveImageUrl()` đọc từ tab `IMAGE_MAP` |
| `apps-script/Code.js` | Thêm `IMAGE_MAP` vào `SHEET_NAME`. Xoá `testDrive` action |
| `apps-script/appsscript.json` | Xoá `drive.readonly` scope, chỉ giữ `spreadsheets` |

### Cách hoạt động

1. Tạo tab `IMAGE_MAP` trong Sheet với 2 cột: `FileName` | `ImageURL`
2. `buildImageMap()` đọc Sheet 1 lần, cache trong `_imageMap` (per-request)
3. `resolveImageUrl()` lấy tên file từ path AppSheet, tra map → trả URL

### Status

- [x] Code đã push lên Apps Script (version 14)
- [ ] Tạo tab `IMAGE_MAP` trong Sheet
- [ ] Điền dữ liệu filename → Drive URL
- [ ] Deploy Web App version 14
- [ ] Kiểm tra ảnh hiển thị

---

## Files Changed

### Apps Script (3 files)
- `apps-script/rooms.js` — Rewrite resolveImageUrl: xoá DriveApp, dùng IMAGE_MAP sheet
- `apps-script/Code.js` — Thêm IMAGE_MAP constant, xoá testDrive
- `apps-script/appsscript.json` — Xoá drive.readonly scope

### Tasks (2 files)
- `task/current-session/session-009.md` — Tạo mới
- `task/next-plan.md` — Cập nhật

---

## Lessons Learned

- `DriveApp` OAuth scope cần được authorize ngay từ deployment đầu tiên
- Deploy mới không tự động hiển thị lại popup authorization nếu đã authorize trước đó
- Cần **Revoke Access** trong Google Account Security trước khi deploy lại để buộc hiện popup đầy đủ
- Shared Drive folder (từ tài khoản khác) có thể không truy cập được qua `DriveApp.getFolderById()` dù đã có edit permission
- Google Drive file ID không thể suy ra từ tên file — mỗi file có ID ngẫu nhiên
- Endpoint CDN: `https://drive.usercontent.google.com/download?id={FILE_ID}&export=view`
- `clasp undeploy <deploymentId>` — xoá deployment cũ

---

## Next Steps

1. Revoke OAuth quyền cũ → deploy lại version 14 → thử DriveApp lần cuối
2. Nếu DriveApp vẫn không được: tạo tab `IMAGE_MAP`, điền filename→URL mapping
3. Tiếp tục Phase 4: Room Detail page

---

## Definition Of Done

- [x] Session documented
- [ ] Drive images rendering in RoomCard
- [ ] next-plan.md updated
- [ ] Git commit + push
