# Next Plan

## Purpose

File này mô tả trạng thái hiện tại của dự án và việc cần làm tiếp theo.

Mọi AI Agent phải đọc file này trước khi đề xuất hoặc thực hiện bất kỳ công việc nào.

---

# Current Project Status

## Development Phases

| Phase | Status | Commit |
|-------|--------|--------|
| Phase 1 — Project Setup | ✅ DONE | `08eb1bf` |
| Phase 1.5 — Landing Page | ✅ DONE | `b1c6ae6` |
| Phase 1.6 — Rebrand Royal Blue | ✅ DONE | `bd8d99f` |
| Phase 1.7 — Layout Architecture | ✅ DONE | `bd8d99f` |
| Phase 1.8 — Navbar Redesign | ✅ DONE | `bd8d99f` |
| Phase 1.9 — UI Polish | ✅ DONE | `bd8d99f` |
| Phase 1.10 — Project Cleanup | ✅ DONE | `624a64d` |
| Phase 2A — Apps Script API Code | ✅ DONE | — |
| Phase 2B — Frontend API Client | ✅ DONE | — |
| Phase 2.5 — Docs Sync with Sheet | ✅ DONE | — |
| Phase 2A.5 — Apps Script Deploy | ✅ DONE (v4) | — |
| Phase 3 — Room Listing | ✅ DONE | — |
| **Phase 3.5 — RoomCard Rebuild** | ✅ **DONE** | — |
| Phase 4 — Room Detail | ⏳ PENDING | — |
| Phase 5 — Roommate Listing | ⏳ PENDING | — |
| Phase 6 — Roommate Detail | ⏳ PENDING | — |
| Phase 8 — Zalo Contact | ⏳ PENDING | — |
| Phase 9 — Deployment | ⏳ PENDING | — |
| Phase 10 — Final Review | ⏳ PENDING | — |

## Planning Docs

* Business Flow: DONE
* Sitemap: DONE
* User Journeys: DONE
* Assumptions: DONE
* Database Structure: ✅ DONE (V3 — synced with real sheet)
* ERD: ✅ DONE (V2 — synced with real sheet)
* Sheet Design: ✅ DONE (V3 — synced with real sheet)
* API Contracts: ✅ DONE (V3 — synced with real sheet)
* Tech Stack: DONE
* Folder Structure: DONE
* System Architecture: DONE
* Project Rules: DONE
* Setup Guide: ✅ **DONE** (docs/setup-guide.md)

---

# Completed Work

## Phase 1 — Project Setup
- Next.js 16 project with App Router, TypeScript 6
- Tailwind CSS v4 + shadcn/ui + Lucide Icons
- ESLint v9 flat config, Cloudflare Pages config
- Full folder structure per docs
- .env.local, .gitignore, README.md

## Phase 1.5 — Landing Page / About Us
- Navbar (sticky, responsive, mobile menu)
- Footer (brand info, services, Zalo CTA)
- Container (max-width wrapper)
- Hero Section + About + How It Works + CTA
- Brand colors: Blue-600 (#2563EB) + White

## Phase 2A — Apps Script API ✅
- `apps-script/` folder: Code.js, sheets.js, rooms.js, roommates.js, leads.js, utils.js

## Phase 2B — Frontend API Client ✅
- `src/lib/api-client.ts` — Fetch wrapper với proxy server-side
- `src/types/room.ts`, `src/types/roommate-post.ts` — TypeScript types
- `src/services/room.service.ts`, `src/services/roommate.service.ts`
- `src/app/api/proxy/route.ts` — API proxy server-side (tránh CORS)

## Phase 2A.5 — Apps Script Deploy ✅
- Clasp deploy thành công (7 files)
- Timezone: `Asia/Ho_Chi_Minh`
- **Version 4** (Hotfix parseCost) — `AKfycbzYnZYiTCIaYYAjVEZsiG6tNAgbFhEfFyzvfAzhjHpHhrvrTrV9HJ8nUGZuMKBqZWJ3`

## Phase 3 — Room Listing ✅
- `src/components/room/RoomCard.tsx`, `RoomFilter.tsx`, `RoomList.tsx`
- `src/app/rooms/page.tsx`

## Phase 3.5 — RoomCard Rebuild ✅
- Badge: giá → địa chỉ (soNha + duong + phuong + khuVuc)
- Bỏ diện tích (luôn = 0)
- Thêm lầu, hợp đồng, giá điện, giá nước, trạng thái
- 6 tiện ích: Máy lạnh, Tủ lạnh, Kệ bếp, Cửa sổ, Thang máy, Để xe

## Phase 3.6 — Codebase Cleanup ✅
- Xoá thư mục rỗng: `src/features/`, `src/hooks/`, `src/components/roommate/`
- Types đồng bộ API: `banCong`, `thangMay`, `floor`, `needCount`, `desiredArea`
- Xoá `autoprefixer` (ko cần Tailwind v4)
- Fix `parseCost`: dùng `match(/^\d+/)` thay `replace(/[^0-9]/g, "")`
- Tạo `docs/setup-guide.md`

## Phase 3.7 — Image Resolution ✅
- **Vấn đề:** API trả về path AppSheet (`PHONGTRO_Images/xxx.jpg`) thay vì URL ảnh
- **Giải pháp (Session 010):** `resolveImageUrl()` dùng `DriveApp.getFolderById().getFilesByName()` để tìm file trong Drive folder public, trả về URL `drive.google.com/thumbnail`
- **Frontend:** Thêm `referrerPolicy="no-referrer"` vào `<img>` để Drive cho phép hiển thị
- **Kết quả:** Revoke OAuth → deploy lại với Drive scope → ảnh hiển thị thành công

## Apps Script Versions (after cleanup)
| Version | Description |
|---------|-------------|
| @15 | resolveImageUrl via DriveApp + thumbnail URL + cache (current) |
| @14 | resolveImageUrl via IMAGE_MAP (deprecated) |

> Tất cả deployments cũ đã xoá sạch bằng `clasp undeploy`

---

# Current Priority

1. ✅ Phase 2A — Apps Script API Code
2. ✅ Phase 2B — Frontend API Client
3. ✅ Phase 2.5 — Docs & Code Sync with Google Sheet
4. ✅ Phase 3 — Room Listing
5. ✅ Phase 2A.5 — Apps Script Deploy (v4)
6. ✅ **Phase 3.5 — RoomCard Rebuild**
7. ✅ **Phase 3.6 — Codebase Cleanup**
 8. ✅ **Phase 3.7 — Image Resolution** (fix Drive images)
9. **Phase 4 — Room Detail page** `/rooms/[slug]`
10. Phase 5 — Roommate Listing page
10. Phase 6 — Roommate Detail page
11. Phase 8 — Zalo Contact integration
12. Phase 9 — Deployment to Cloudflare Pages
13. Phase 10 — Final Review

---

# Next Session Plan — Phase 4: Room Detail

**Mục tiêu:** Xây trang chi tiết phòng `/rooms/[slug]`

**Cần làm:**
- [ ] `src/app/rooms/[slug]/page.tsx` — Room detail page (server component)
- [ ] `src/components/room/RoomDetail.tsx` — Detail content component
- [ ] `src/components/room/RoomGallery.tsx` — Image gallery (carousel/thumbnails)
- [ ] `src/components/shared/ContactButton.tsx` — Zalo contact button

**Lưu ý về ảnh cho Phase 4:** Giống Phase 3.7 — dùng DriveApp + thumbnail URL cho Gallery ảnh trong Room Detail. Hình ảnh phòng ở tab `HINHANH`, file ảnh trong cùng folder Drive `PHONGTRO_Images`. Code `resolveImageUrl()` đã dùng chung cho cả `hinhanhchinh` và gallery ảnh.

**Trang Room Detail gồm:**
- Breadcrumb: Trang chủ / Danh sách phòng / [Tên phòng]
- Image gallery (nhiều ảnh)
- Thông tin: giá, địa chỉ, diện tích, hợp đồng
- Tiện ích (grid checkboxes)
- Chi phí khác (điện, nước, phí quản lý, giữ xe)
- Mô tả phòng
- Nút "Liên hệ Zalo" (gọi API createLead)
- Related rooms (3 phòng cùng khu vực)

---

# Deploy Info

## Apps Script

| Item | Value |
|------|-------|
| Script Name | MatchHome API |
| Latest Version | @15 (resolveImageUrl via DriveApp + thumbnail) |
| Web App URL | (updated after deployment) |

## Yêu cầu

- SHEET_ID đã set trong Script Properties
- Web App deploy từ editor với "Execute as: Me" và "Who has access: Anyone"

---

# Files Created / Modified (Recent Sessions)

## Session 007 — Apps Script Deploy
- `task/current-session/session-007.md`
- `apps-script/appsscript.json` — timezone fix

## Session 008 — Cleanup + RoomCard + parseCost Fix
- `task/current-session/session-008.md`
- `apps-script/rooms.js` — parseCost fix
- `src/components/room/RoomCard.tsx` — rebuild
- `src/types/room.ts`, `src/types/roommate-post.ts` — update types
- `package.json`, `postcss.config.mjs` — cleanup
- `docs/setup-guide.md` — new setup guide
- `.env.local` — update URL v4

## Session 009 — Image Resolution via IMAGE_MAP Sheet
- `task/current-session/session-009.md`
- `apps-script/rooms.js` — rewrite resolveImageUrl: IMAGE_MAP + cache
- `apps-script/Code.js` — thêm IMAGE_MAP constant, xoá testDrive
- `apps-script/appsscript.json` — xoá drive.readonly scope

## Session 010 — DriveApp Image Resolution (Revoke OAuth + DriveApp)
- `task/current-session/session-010.md`
- `apps-script/rooms.js` — rewrite resolveImageUrl: DriveApp thay IMAGE_MAP + thumbnail URL
- `apps-script/Code.js` — xoá IMAGE_MAP khỏi SHEET_NAME
- `apps-script/appsscript.json` — thêm drive.readonly scope
- `src/components/room/RoomCard.tsx` — +referrerPolicy="no-referrer"
