# Session 001 - Project Setup

## Session ID

SESSION-001

---

## Date

2026-06-13

---

## Goal

Khởi tạo toàn bộ cấu trúc dự án Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui, thiết lập folder structure theo docs.

---

## Context

Các tài liệu liên quan:

* docs/project-rules.md
* docs/system-architecture.md
* docs/folder-structure.md
* docs/tech-stack.md
* docs/naming-convention.md

---

## Scope

1. Khởi tạo Next.js 16 project với TypeScript
2. Cài đặt Tailwind CSS v4, shadcn/ui, Lucide Icons
3. Tạo cấu trúc thư mục theo docs/folder-structure.md
4. Tạo file .env.local
5. Thiết lập next.config.ts cho Cloudflare Pages
6. Tạo README.md cơ bản
7. Bổ sung eslint.config.mjs, src/configs/env.ts, src/configs/site.ts

---

## Out Of Scope

1. Không viết business logic
2. Không tạo page/component UI (sẽ làm ở phase sau)
3. Không triển khai Google Sheet API
4. Không thêm package ngoài stack đã định

---

## Deliverables

### Root Files
* ✅ `package.json` — Scripts: dev, build, start, lint | Dependencies: next@16, react@19, react-dom@19
* ✅ `tsconfig.json` — Path alias @/*, strict mode
* ✅ `next.config.ts` — images.unoptimized: true (Cloudflare Pages)
* ✅ `postcss.config.mjs` — Sử dụng @tailwindcss/postcss (Tailwind v4)
* ✅ `eslint.config.mjs` — ESLint v9 flat config (npx eslint src/ — passed)
* ✅ `components.json` — shadcn/ui config
* ✅ `.env.local` — NEXT_PUBLIC_API_URL, ZALO_URL, GA_ID, SITE_URL
* ✅ `.gitignore` — Cho Next.js + env + build
* ✅ `README.md` — Thông tin dự án

### Source Files
* ✅ `src/app/layout.tsx` — Root layout với metadata
* ✅ `src/app/page.tsx` — Homepage placeholder
* ✅ `src/app/loading.tsx` — Loading component
* ✅ `src/app/not-found.tsx` — 404 page
* ✅ `src/app/globals.css` — Tailwind v4 (@import, @theme)
* ✅ `src/components/ui/button.tsx` — shadcn/ui Button
* ✅ `src/lib/utils.ts` — cn() utility
* ✅ `src/configs/env.ts` — Type-safe env reader
* ✅ `src/configs/site.ts` — Site-wide config

### Folder Structure
* ✅ `src/app/`
* ✅ `src/components/layout/`, `src/components/ui/`, `src/components/shared/`, `src/components/room/`, `src/components/roommate/`
* ✅ `src/features/rooms/`, `src/features/roommates/`
* ✅ `src/services/`, `src/lib/`, `src/hooks/`, `src/types/`, `src/constants/`, `src/configs/`
* ✅ `public/images/`, `public/icons/`, `public/logo/`
* ✅ .gitkeep files cho các thư mục rỗng

### Validation
* ✅ `npm run build` — Thành công (0 errors)
* ✅ `npx eslint src/` — Thành công (0 warnings)

---

## Notes

* **Node.js:** v24.16.0 | **npm:** 11.13.0
* **Next.js:** 16.2.9 | **React:** 19.2.7
* **Tailwind CSS:** v4.3.1 | **TypeScript:** 6.0.3
* **ESLint:** v9.39.4 (flat config)
* Project gốc: D:\01_Workspace\04_Personal_Showcase\HomeMatch
* Deploy target: Cloudflare Pages
* Cần điền các env vars thực tế trước khi deploy

---

## Definition Of Done

* [x] Khởi tạo Next.js project thành công
* [x] Cài đặt đủ dependencies (Tailwind, shadcn/ui, Lucide, ESLint)
* [x] Cấu trúc thư mục đúng docs/folder-structure.md
* [x] Project build được (npm run build)
* [x] ESLint chạy được (npx eslint src/)
* [x] Không vi phạm project-rules
* [x] Không mở rộng scope
* [x] Đã review
