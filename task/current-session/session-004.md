# Session 004 - Project Cleanup & Organization

## Session ID

SESSION-004

---

## Date

2026-06-14

---

## Goal

Dọn dẹp dự án để dễ quản lý hơn — xoá file rác, cập nhật docs, fix code quality, tạo shared components.

---

## Scope

### Priority 1 — Dọn file rác & cấu trúc
- Xoá `.gitkeep` không cần thiết (12 files)
- Xoá `public/icons/`, `public/images/` (empty directories)
- Tạo `.env.example`
- Move `shadcn` từ dependencies → devDependencies

### Priority 2 — Cập nhật tài liệu
- Fix `docs/folder-structure.md`: Next.js 15→16, erd-v1.drawio→erd-v1.md
- Fix `docs/tech-stack.md`: Next.js 15→16
- Fix `task/mvp-plan/00-overview.md`: Next.js 15→16
- Fix `docs/ui-spec.md`: Featured Rooms→About, Featured Roommates→How It Works
- Fix `task/README.md`: system-architecture.md path

### Priority 3 — Code quality
- Fix `<a>` wrapping `<Button>` trong Navbar (invalid HTML)
- Fix `new Date().getFullYear()` → hardcode 2026 trong Footer
- Fix redundant `min-h-screen` trong loading.tsx, not-found.tsx
- Extract steps array vào `src/constants/how-it-works.ts`

### Priority 4 — Shared components
- Tạo `SectionTitle` shared component
- Áp dụng SectionTitle vào page.tsx

### Priority 5 — Task management
- Cập nhật `task/next-plan.md`
- Tạo session-004.md

---

## Out Of Scope

1. Không tạo Room/Roommate page
2. Không tích hợp Google Sheet API
3. Không thêm tính năng mới

---

## Deliverables

### Files Deleted
- 12 `.gitkeep` files
- `public/icons/`, `public/images/` directories

### Files Created
- `.env.example`
- `src/constants/how-it-works.ts`
- `src/components/shared/SectionTitle.tsx`

### Files Modified
- `package.json` — move shadcn to devDependencies
- `src/components/layout/Navbar.tsx` — fix <a> wrapping <Button>
- `src/components/layout/Footer.tsx` — hardcode 2026
- `src/app/loading.tsx` — remove redundant min-h-screen
- `src/app/not-found.tsx` — remove redundant min-h-screen
- `src/app/page.tsx` — use SectionTitle + howItWorksSteps
- `docs/folder-structure.md` — fix Next.js + erd file
- `docs/tech-stack.md` — fix Next.js version
- `docs/ui-spec.md` — fix sections
- `task/mvp-plan/00-overview.md` — fix Next.js version
- `task/README.md` — fix system-architecture path
- `task/next-plan.md` — add Phase 1.10

---

## Notes

- `<a>` wrapping `<Button>` was invalid HTML (nested interactive elements). Fixed by styling `<a>` directly with same classes.
- `new Date().getFullYear()` would freeze at build time for static site. Hardcoded to 2026.
- `loading.tsx` and `not-found.tsx` had `min-h-screen` which was redundant with layout's `flex min-h-screen flex-col` — caused potential overflow.
- How It Works steps array extracted from page.tsx to `constants/how-it-works.ts` for reusability.
- SectionTitle component created and applied to About and How It Works sections.

---

## Definition Of Done

- [x] All .gitkeep files removed
- [x] All docs updated to reflect actual project state
- [x] All code quality fixes applied
- [x] SectionTitle shared component created and used
- [x] Build thành công
- [x] Đã review
