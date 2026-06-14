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
| Phase 1.10 — Project Cleanup | ✅ DONE | — |
| Phase 2 — Google Sheet API | ⏳ PENDING | — |
| Phase 3 — Room Listing | ⏳ PENDING | — |
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
- Brand colors: Royal Blue `#1E40AF` cho primary, accent, primary-light
- Fix `@theme inline` override bug (shadcn CSS vars đè lên `@theme`)
- Fix Turbopack error: downgrade tailwindcss `v4.3.1` → `v4.0.7`
- Cập nhật `docs/ui-spec.md`, `task/mvp-plan/01-project-setup.md`
- Fix How It Works: thêm bước "Xem phòng" (4→5 bước)
- Fix responsive grid: `md:grid-cols-3 lg:grid-cols-5`

## Phase 1.7 — Layout Architecture ✅
- Chuyển Navbar + Footer từ `page.tsx` vào `layout.tsx`
- Flex layout: `min-h-screen flex-col` + main `flex-1` (sticky footer)
- Xoá import và JSX dư thừa khỏi `page.tsx`

## Phase 1.8 — Navbar Redesign ✅
- Nền: trắng → Royal Blue (`bg-primary`)
- Text: đổi màu cho brand, nav links, hamburger icon
- Nút Zalo: outline → filled (`bg-white text-primary`)
- Nav links: tăng cỡ chữ (`text-sm` → `text-base`), màu trắng
- Thêm logo `.webp`, bo tròn góc, tăng kích thước 32→35px

## Phase 1.9 — UI Polish ✅
- Xoá gradient fade Hero section (`bg-gradient-to-b` → `bg-white`)
- Xoá decorative circles CTA section
- Xoá badge "Nền tảng tìm phòng trọ hàng đầu"

## Phase 1.10 — Project Cleanup ✅
- Xoá `.gitkeep` không cần thiết (12 files)
- Xoá `public/icons/`, `public/images/` (empty)
- Tạo `.env.example`
- Move `shadcn` từ dependencies → devDependencies
- Fix docs: Next.js 15→16 (`folder-structure.md`, `tech-stack.md`, `mvp-plan/00-overview.md`)
- Fix `docs/ui-spec.md`: Featured Rooms → About + How It Works
- Fix system-architecture.md reference in `task/README.md`
- Code quality: fix `<a>` wrapping `<Button>` trong Navbar
- Code quality: fix `new Date().getFullYear()` → hardcode 2026 trong Footer
- Code quality: fix `min-h-screen` dư thừa trong `loading.tsx`, `not-found.tsx`
- Code quality: extract steps array vào `src/constants/how-it-works.ts`
- Shared component: `SectionTitle` + áp dụng vào `page.tsx`

---

# Current Priority

1. **Phase 2 — Google Sheet API** (Apps Script endpoints)
2. Phase 3 — Room Listing page
3. Phase 4 — Room Detail page
4. Phase 5 — Roommate Listing page
5. Phase 6 — Roommate Detail page
6. Phase 8 — Zalo Contact integration
7. Phase 9 — Deployment to Cloudflare Pages
8. Phase 10 — Final Review

---

# Files Need To Create (Future Phases)

## Types (Phase 3)
- `src/types/room.ts`
- `src/types/room-image.ts`
- `src/types/roommate-post.ts`
- `src/types/lead.ts`
- `src/types/sale.ts`

## Constants (Phase 3)
- `src/constants/routes.ts`
- `src/constants/roommate-types.ts`
- `src/constants/room-status.ts`

## Services (Phase 2-3)
- `src/services/room.service.ts`
- `src/services/roommate.service.ts`
- `src/services/analytics.service.ts`

## Features (Phase 3-6)
- `src/features/rooms/api.ts`
- `src/features/rooms/mapper.ts`
- `src/features/rooms/schema.ts`
- `src/features/rooms/utils.ts`
- `src/features/roommates/api.ts`
- `src/features/roommates/mapper.ts`
- `src/features/roommates/schema.ts`
- `src/features/roommates/utils.ts`

## Hooks (Phase 3)
- `src/hooks/useRooms.ts`
- `src/hooks/useRoommates.ts`

## Lib (Phase 2-3)
- `src/lib/api-client.ts`
- `src/lib/google-analytics.ts`

## Page Components (Phase 3-6)
- `src/components/room/RoomCard.tsx`
- `src/components/room/RoomGallery.tsx`
- `src/components/room/RoomFilter.tsx`
- `src/components/room/RoomList.tsx`
- `src/components/room/RoomDetail.tsx`
- `src/components/roommate/RoommateCard.tsx`
- `src/components/roommate/RoommateList.tsx`
- `src/components/roommate/RoommateFilter.tsx`
- `src/components/roommate/RoommateDetail.tsx`
- `src/components/shared/EmptyState.tsx`
- `src/components/shared/ContactButton.tsx`

## Pages (Phase 3-6)
- `src/app/rooms/page.tsx`
- `src/app/rooms/[slug]/page.tsx`
- `src/app/roommates/page.tsx`
- `src/app/roommates/[id]/page.tsx`

---

# Known Issues / Improvements

## Fixed ✅
- [x] **Navbar/Footer trong page.tsx** — Đã chuyển vào `layout.tsx`.
- [x] **Chưa có logo assets** — Đã thêm `public/logo/logo.webp`.
- [x] **`<a>` wrapping `<Button>`** — Đã fix style `<a>` trực tiếp.
- [x] **`new Date().getFullYear()` trong Footer** — Đã hardcode 2026.
- [x] **Chưa có SectionTitle shared component** — Đã tạo và áp dụng.
- [x] **Steps array trong page.tsx** — Đã chuyển vào `constants/how-it-works.ts`.

## Remaining
_(None — project is clean and ready for Phase 2)_
