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
| Phase 4 — Room Detail | ✅ DONE | `60431d3` |
| Phase 5 — Roommate Listing | ⏸️ ON HOLD (components ready, chưa có data, page giữ Coming Soon) | — |
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
 9. ✅ **Phase 4 — Room Detail page** `/rooms/[id]`
10. ✅ **Performance Optimization** — React Query, proxy cache, client filter, Apps Script CacheService
11. ⏸️ **Phase 5 — Roommate Listing page** (code ready, hidden — chờ data)
12. **Phase 6 — Roommate Detail page**
13. Phase 8 — Zalo Contact integration
14. Phase 9 — Deployment to Cloudflare Pages
15. Phase 10 — Final Review

## Performance Optimization — ✅ DONE (Session 013-014)
#### Frontend
- [x] **React Query (TanStack Query)** — cache + deduplicate cho RoomList
- [x] **Cache trên API proxy** — in-memory cache TTL 60s
- [x] **Filter client-side** — zero round-trip, filter instant
- [x] **Fix duplicate fetch** — getDistinctAreas là pure function
#### Apps Script
- [x] **CacheService cho sheet reads** — cache 30s trong sheets.js
- [x] **CacheService cho image URLs** — cache 1h trong rooms.js
- [x] **Deploy v22** — `AKfycbx71Jk_tsW2q5TLY1PEGl__y2fFheaV0WLD4N0OKgKHqicwfj-Ef6q99gBSJ9lxCSM`
- **Xem chi tiết:** `task/current-session/session-013.md`, `session-014.md`

---

# Next Session Plan — ⏸️ Tạm dừng Roommate Feature

**Tình trạng:** Phase 5 code đã sẵn sàng (RoommateCard, RoommateFilter, RoommateList) nhưng `/roommates` vẫn hiển thị Coming Soon vì chưa có data từ Sale.

**Chờ:**
- [ ] Sale có bài đăng ở ghép → import vào sheet ROOMMATE
- [ ] Kiểm tra API response thực tế
- [ ] Kích hoạt: đổi `src/app/roommates/page.tsx` từ Coming Soon → RoommateList

**Trong lúc chờ:**
- Chuyển sang các phase khác (Phase 9 — Deployment, Phase 1.5 — Homepage)

---

# Deploy Info

## Apps Script

| Item | Value |
|------|-------|
| Script Name | Homematch API |
| Latest Version | @22 (CacheService: sheet reads + image URLs) |
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

## Session 012 — Phase 5: Roommate Listing
- `task/current-session/session-012.md`
- `src/components/roommate/RoommateCard.tsx` — card với post type badge, customer info, budget, Zalo CTA
- `src/components/roommate/RoommateFilter.tsx` — filter postType + gender + khuVuc
- `src/components/roommate/RoommateList.tsx` — client component fetch + filter + grid
- `src/app/roommates/page.tsx` — thay Coming Soon bằng listing thật

## Session 011 — Phase 4: Room Detail Page
- `task/current-session/session-011.md`
- `src/app/rooms/[id]/page.tsx` — server component + zalo button
- `src/components/room/RoomDetail.tsx` — layout chính + ảnh chính fallback
- `src/components/room/RoomGallery.tsx` — Embla carousel + thumbnail dots
- `src/components/room/RoomInfo.tsx` — giá, địa chỉ, chi phí, quy định
- `src/components/room/RoomAmenities.tsx` — grid 12 tiện ích
- `src/components/shared/ContactButton.tsx` — shared Zalo button
- `apps-script/rooms.js` — fix filter type (number vs string), thêm HINHANH_Images folder

## Session 013-014 — Performance Optimization
- `task/current-session/session-013.md`, `session-014.md`
- `package.json` — +@tanstack/react-query
- `src/components/providers/QueryProvider.tsx` — mới
- `src/app/layout.tsx` — wrap QueryProvider
- `src/app/api/proxy/route.ts` — in-memory cache TTL 60s
- `src/components/room/RoomList.tsx` — React Query + client filter
- `src/services/room.service.ts` — filterRooms(), getDistinctAreas pure
- `apps-script/sheets.js` — CacheService 30s
- `apps-script/rooms.js` — CacheService 1h cho image URLs
