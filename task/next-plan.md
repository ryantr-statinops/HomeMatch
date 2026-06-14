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
| Phase 3 — Room Listing | ✅ DONE | — |
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
* Database Structure: DONE
* ERD V1: DONE
* Sheet Design: DONE
* Tech Stack: DONE
* Folder Structure: DONE
* System Architecture: DONE
* Project Rules: DONE

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

## Phase 1.6 — Rebrand Royal Blue ✅
- Brand colors: Royal Blue `#1E40AF` cho primary, accent
- Fix `@theme inline` override bug (shadcn CSS vars đè lên `@theme`)
- Fix Turbopack error: downgrade tailwindcss `v4.3.1` → `v4.0.7`

## Phase 1.7 — Layout Architecture ✅
- Chuyển Navbar + Footer từ `page.tsx` vào `layout.tsx`
- Flex layout: `min-h-screen flex-col` + main `flex-1` (sticky footer)

## Phase 1.8 — Navbar Redesign ✅
- Nền: trắng → Royal Blue (`bg-primary`)
- Nav links: trắng, tăng cỡ chữ (`text-sm` → `text-base`)
- Nút Zalo: filled (`bg-white text-primary`)
- Logo `.webp`, bo tròn, 35px

## Phase 1.9 — UI Polish ✅
- Xoá gradient Hero, decorative circles CTA, badge "Nền tảng..."
- Màu: `--color-primary-light: #3b82f6`, `--color-accent: #1e40af`

## Phase 1.10 — Project Cleanup ✅
- Xoá 12 `.gitkeep`, xoá `public/icons/`, `public/images/`
- Tạo `.env.example`, move `shadcn` → devDependencies
- Fix docs (Next.js 15→16, ui-spec sections)
- Fix code quality (Navbar <a> wrapping, Footer year, loading/not-found min-h-screen)
- Extract steps → constants, create SectionTitle + ValueCard components

## Phase 2A — Apps Script API ✅
- `apps-script/` folder: Code.js, sheets.js, rooms.js, roommates.js, leads.js, utils.js
- Cập nhật docs (api-contracts V2, folder-structure)

## Phase 2B — Frontend API Client ✅
- `src/lib/api-client.ts` — Fetch wrapper với mock fallback
- `src/types/room.ts`, `src/types/roommate-post.ts` — TypeScript types
- `src/constants/routes.ts` — Route constants
- `src/services/room.service.ts` — 6 mock rooms + filter
- `src/services/roommate.service.ts` — 3 mock posts

## Phase 3 — Room Listing ✅
- `src/components/room/RoomCard.tsx` — Card (ảnh, giá, địa chỉ, diện tích)
- `src/components/room/RoomFilter.tsx` — Blue card collapsed, filter panel expanded
- `src/components/room/RoomList.tsx` — Client component (loading/filter/empty states)
- `src/app/rooms/page.tsx` — Room listing page
- UI Polish: bỏ search text, bỏ description header, icon lọc

---

# Current Priority

1. ✅ Phase 2A — Apps Script API Code (cần user clasp push + deploy)
2. ✅ Phase 2B — Frontend API Client
3. ✅ Phase 3 — Room Listing
4. **Phase 4 — Room Detail page** `/rooms/[slug]`
5. Phase 5 — Roommate Listing page
6. Phase 6 — Roommate Detail page
7. Phase 8 — Zalo Contact integration
8. Phase 9 — Deployment to Cloudflare Pages
9. Phase 10 — Final Review

---

# Next Session Plan — Phase 4: Room Detail

**Mục tiêu:** Xây trang chi tiết phòng `/rooms/[slug]`

**Cần làm:**
- [ ] `src/app/rooms/[slug]/page.tsx` — Room detail page (server component)
- [ ] `src/components/room/RoomDetail.tsx` — Detail content component
- [ ] `src/components/room/RoomGallery.tsx` — Image gallery (carousel/thumbnails)
- [ ] `src/components/shared/ContactButton.tsx` — Zalo contact button

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

# Files Created (This Session)

## Phase 2B
- `src/lib/api-client.ts`
- `src/types/room.ts`
- `src/types/roommate-post.ts`
- `src/constants/routes.ts`
- `src/services/room.service.ts`
- `src/services/roommate.service.ts`

## Phase 3
- `src/components/room/RoomCard.tsx`
- `src/components/room/RoomFilter.tsx`
- `src/components/room/RoomList.tsx`
- `src/app/rooms/page.tsx`

## Shared
- `src/components/shared/ValueCard.tsx`
- `src/components/shared/EmptyState.tsx`
