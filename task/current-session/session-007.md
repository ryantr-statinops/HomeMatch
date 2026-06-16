# Session 007 — Deploy Apps Script API to Google Sheet

## Session ID

SESSION-007

---

## Date

2026-06-17

---

## Goal

Deploy Apps Script API code lên Google Sheet thật (DATABASE_HomeMatch).
Cập nhật frontend để kết nối đến API đã deploy.

---

## Context

Google Sheet thật: `DATABASE_HomeMatch`
Script ID: `1-ohEkoebv5XqZE1O6pfehTqRpUOmw48zGvcLX1Q5RCDWzLm9Ub_pWe32`
Clasp version: 3.3.0 (đã login)

---

## Scope

1. Kiểm tra clasp login & script hiện tại
2. Push code Apps Script (7 files)
3. Tạo version 2 + deploy
4. Fix appsscript.json timezone (America/New_York → Asia/Ho_Chi_Minh)
5. Force push lại + tạo version 3 + deploy production
6. Cập nhật .env.local với deploy URL mới
7. Cập nhật docs

---

## Out Of Scope

1. Không xây Room Detail page
2. Không thay đổi logic Apps Script code
3. Không deploy lên Cloudflare Pages

---

## Thay đổi chính

### Deploy thành công

| Item | Value |
|------|-------|
| Script Name | MatchHome API |
| Latest Version | @3 |
| Production Deploy ID | `AKfycbyMgfC3ncl0XXyxzx50-bm34_VLkyerpxTXLnOwOdJ2iV3mOvTY9sjo74f4ZZrvgYvg` |
| Production Deploy URL | `https://script.google.com/macros/s/AKfycbyMgfC3ncl0XXyxzx50-bm34_VLkyerpxTXLnOwOdJ2iV3mOvTY9sjo74f4ZZrvgYvg/exec` |

### appsscript.json

- timeZone: `America/New_York` → `Asia/Ho_Chi_Minh`

### .env.local

- `NEXT_PUBLIC_API_URL` cập nhật → URL deploy mới (version 3)

---

## Files Changed

- `apps-script/appsscript.json` — Fix timezone
- `.env.local` — Cập nhật API URL
- `task/current-session/session-007.md` — Tạo mới
- `task/next-plan.md` — Cập nhật

---

## Lessons Learned

- `clasp push` không detect được thay đổi trong `appsscript.json` → cần `clasp push -f`
- Sau khi tạo version mới cần đợi 1-2 giây trước khi deploy
- Deploy URL có dạng: `https://script.google.com/macros/s/{deployId}/exec`

---

## Definition Of Done

- [x] Clasp đã login và kết nối script
- [x] Code đã push thành công lên Google Apps Script
- [x] Version 3 đã deploy với URL production
- [x] .env.local đã cập nhật URL deploy mới
- [x] Frontend build vẫn OK
- [x] Đã review
