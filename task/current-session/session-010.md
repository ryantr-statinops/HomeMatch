# Session 010 — DriveApp Image Resolution (Revoke OAuth + DriveApp)

## Session ID

SESSION-010

---

## Date

2026-06-17

---

## Goal

Thay thế IMAGE_MAP Sheet bằng DriveApp để resolve ảnh từ Google Drive folder public, không cần tạo thêm tab trong database.

---

## Context

- Google Sheet lưu path AppSheet: `PHONGTRO_Images/xxx.jpg`
- File ảnh nằm trong Drive folder public: `https://drive.google.com/drive/folders/1VIzgVkAuViOCMNdqVI1_7k8pjSHkVm2e`
- Tài khoản có full access vào folder này
- Cần convert filename → fileId → URL: `https://drive.usercontent.google.com/download?id={FILE_ID}&export=view`

### Vấn đề trước đây

- Session 009 đã thử 3 lần dùng DriveApp nhưng fail vì OAuth scope `drive.readonly` không được authorize khi deploy
- Nguyên nhân gốc: user đã authorize script với scope cũ (chỉ Sheets), deploy mới không hiện popup lại
- Giải pháp tạm thời session 009 là dùng IMAGE_MAP Sheet mapping (filename → URL) — chưa hoàn thiện

---

## Scope

1. Xoá toàn bộ code IMAGE_MAP khỏi Apps Script
2. Thêm `drive.readonly` scope vào `appsscript.json`
3. Viết lại `resolveImageUrl()` dùng `DriveApp.getFolderById().getFilesByName()`
4. Tạo session doc
5. Cập nhật next-plan.md

---

## Out Of Scope

- Không tạo tab IMAGE_MAP trong Sheet
- Không dùng Google Drive API key
- Không thay đổi frontend code
- Không deploy Apps Script (user làm thủ công)

---

## Deliverables

### Apps Script (3 files)

| File | Thay đổi |
|------|----------|
| `apps-script/appsscript.json` | Thêm `drive.readonly` scope |
| `apps-script/rooms.js` | Xoá `buildImageMap()`, `_imageMap`. Viết lại `resolveImageUrl()` dùng `DriveApp.getFolderById()` + cache |
| `apps-script/Code.js` | Xoá `IMAGE_MAP` khỏi `SHEET_NAME` |

### Tasks (2 files)

- `task/current-session/session-010.md` — Tạo mới
- `task/next-plan.md` — Cập nhật

---

## Steps thủ công (user cần làm)

1. **Push code lên Apps Script:**
   ```bash
   clasp push -f
   ```

2. **Revoke OAuth cũ:**
   - Vào https://myaccount.google.com/permissions
   - Tìm "MatchHome API" → **Remove Access**

3. **Deploy Web App mới từ editor:**
   - Mở https://script.google.com → project MatchHome
   - Deploy > New deployment
   - Type: Web App, Execute as: Me, Who has access: Anyone
   - Chọn version mới nhất → Deploy
   - Popup OAuth sẽ hiện → chọn tài khoản → **Accept (cho phép Drive)** → Copy Web App URL

4. **Cập nhật `.env.local`** với Web App URL mới (nếu URL thay đổi)

5. **Kiểm tra:**
   ```bash
   npm run dev
   ```
   - Mở trình duyệt → kiểm tra ảnh Room Card hiển thị

---

## Files Changed

```
apps-script/appsscript.json     — +drive.readonly scope
apps-script/rooms.js            — rewrite resolveImageUrl: DriveApp thay IMAGE_MAP
apps-script/Code.js             — xoá IMAGE_MAP constant
task/current-session/session-010.md — new
task/next-plan.md               — update
```

---

## Lessons Learned

- `DriveApp` OAuth scope cần được authorize ngay từ deployment đầu tiên
- Deploy mới không tự động hiển thị lại popup authorization nếu đã authorize trước đó
- Cần **Revoke Access** trong Google Account Security trước khi deploy lại để buộc hiện popup đầy đủ
- Shared Drive folder (từ tài khoản khác) có thể không truy cập được qua `DriveApp.getFolderById()` dù đã có edit permission — nếu fail thì chuyển sang Google Drive API với API Key
- Google Drive file ID không thể suy ra từ tên file — mỗi file có ID ngẫu nhiên
- `DriveApp.getFolderById().getFilesByName()` là cách đơn giản nhất để tìm file trong folder cụ thể

---

## Definition Of Done

- [x] Code đã thay đổi (3 files)
- [x] Session documented
- [ ] Revoke OAuth + Deploy thành công
- [ ] Ảnh Drive hiển thị trên RoomCard
- [ ] Git commit + push
