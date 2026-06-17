# Session 010 — DriveApp Image Resolution (Revoke OAuth + DriveApp)

## Session ID

SESSION-010

---

## Date

2026-06-17 → 2026-06-18

---

## Goal

Thay thế IMAGE_MAP Sheet bằng DriveApp để resolve ảnh từ Google Drive folder public, không cần tạo thêm tab trong database.

---

## Context

- Google Sheet lưu path AppSheet: `PHONGTRO_Images/xxx.jpg`
- File ảnh nằm trong Drive folder public: `https://drive.google.com/drive/folders/1VIzgVkAuViOCMNdqVI1_7k8pjSHkVm2e`
- Tài khoản có full access vào folder này
- Cần convert filename → fileId → URL embeddable
- URL thumbnail format cuối cùng: `https://drive.google.com/thumbnail?id={FILE_ID}&sz=w1000`
- Frontend cần `referrerPolicy="no-referrer"` trên `<img>` để Drive cho phép hiển thị

### Vấn đề trước đây

- Session 009 đã thử 3 lần dùng DriveApp nhưng fail vì OAuth scope `drive.readonly` không được authorize khi deploy
- Nguyên nhân gốc: user đã authorize script với scope cũ (chỉ Sheets), deploy mới không hiện popup lại
- Giải pháp tạm thời session 009 là dùng IMAGE_MAP Sheet mapping (filename → URL) — chưa hoàn thiện

---

## Scope

1. Xoá toàn bộ code IMAGE_MAP khỏi Apps Script
2. Thêm `drive.readonly` scope vào `appsscript.json`
3. Viết lại `resolveImageUrl()` dùng `DriveApp.getFolderById().getFilesByName()`
4. Đổi URL format từ `drive.usercontent.google.com` → `drive.google.com/thumbnail` (embed-friendly)
5. Thêm `referrerPolicy="no-referrer"` vào `<img>` trong RoomCard
6. Tạo session doc
7. Cập nhật next-plan.md

---

## Out Of Scope

- Không tạo tab IMAGE_MAP trong Sheet
- Không dùng Google Drive API key
- Không deploy Apps Script (user làm thủ công)

---

## Deliverables

### Apps Script (3 files)

| File | Thay đổi |
|------|----------|
| `apps-script/appsscript.json` | Thêm `drive.readonly` scope |
| `apps-script/rooms.js` | Xoá `buildImageMap()`, `_imageMap`. Viết lại `resolveImageUrl()` dùng `DriveApp.getFolderById()` + cache. Đổi URL sang `drive.google.com/thumbnail` |
| `apps-script/Code.js` | Xoá `IMAGE_MAP` khỏi `SHEET_NAME` |

### Frontend (1 file)

| File | Thay đổi |
|------|----------|
| `src/components/room/RoomCard.tsx` | Thêm `referrerPolicy="no-referrer"` vào `<img>` |

### Tasks (2 files)

- `task/current-session/session-010.md` — Tạo mới
- `task/next-plan.md` — Cập nhật

---

## Steps thủ công (user đã làm)

1. ✅ `clasp push -f` — push code lên Apps Script
2. ✅ Revoke OAuth cũ tại https://myaccount.google.com/permissions
3. ✅ Deploy new Web App từ editor → OAuth popup → Accept Drive scope
4. ✅ Cập nhật `.env.local` với URL mới
5. 🔁 Chuyển sang thumbnail URL + `referrerPolicy` — update deployment version
6. ✅ Ảnh hiển thị thành công trên RoomCard

---

## Files Changed

```
apps-script/appsscript.json          — +drive.readonly scope
apps-script/rooms.js                 — rewrite resolveImageUrl: DriveApp + thumbnail URL
apps-script/Code.js                  — xoá IMAGE_MAP constant
src/components/room/RoomCard.tsx     — +referrerPolicy="no-referrer"
task/current-session/session-010.md  — new
task/next-plan.md                    — update
```

---

## Lessons Learned

- `DriveApp` OAuth scope cần được authorize ngay từ deployment đầu tiên
- Deploy mới không tự động hiển thị lại popup authorization nếu đã authorize trước đó
- Cần **Revoke Access** trong Google Account Security trước khi deploy lại để buộc hiện popup đầy đủ
- Shared Drive folder (từ tài khoản khác) có thể không truy cập được qua `DriveApp.getFolderById()` dù đã có edit permission — nếu fail thì chuyển sang Google Drive API với API Key
- Google Drive file ID không thể suy ra từ tên file — mỗi file có ID ngẫu nhiên
- `DriveApp.getFolderById().getFilesByName()` là cách đơn giản nhất để tìm file trong folder cụ thể
- `drive.usercontent.google.com` chặn hiển thị trong `<img>` do cookie/referrer policy
- `drive.google.com/thumbnail?id={ID}&sz=w1000` là endpoint chuyên để embed ảnh ra web
- Cần `referrerPolicy="no-referrer"` trên `<img>` để Drive không chặn request

---

## Definition Of Done

- [x] Code đã thay đổi (4 files: 3 Apps Script + 1 Frontend)
- [x] Session documented
- [x] Revoke OAuth + Deploy thành công
- [x] Ảnh Drive hiển thị trên RoomCard
- [x] Git commit + push
