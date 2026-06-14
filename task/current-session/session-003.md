# Session 003 - Rebrand Royal Blue, Layout Fix & Navbar Redesign

## Session ID

SESSION-003

---

## Date

2026-06-14

---

## Goal

Hoàn thiện Phase 1.6 (Rebrand Royal Blue), sửa layout architecture, redesign navbar, thêm logo.

---

## Scope

1. Phase 1.6 — Rebrand Royal Blue (hoàn thiện)
2. Fix layout: chuyển Navbar/Footer vào layout.tsx
3. Navbar redesign: nền Royal Blue, chữ trắng, logo .webp
4. UI polish: xoá gradient, xoá decorative circles
5. Fix Turbopack error (downgrade tailwindcss)

---

## Out Of Scope

1. Không tạo Room/Roommate page
2. Không tích hợp Google Sheet API
3. Không thêm tính năng mới

---

## Deliverables

### Phase 1.6 — Rebrand Royal Blue ✅
- Brand colors: `#1E40AF` (Royal Blue)
- Fix `@theme inline` override bug (shadcn CSS vars overriding `@theme`)
- Fix Turbopack error: downgrade tailwindcss `v4.3.1` → `v4.0.7`
- Update docs/ui-spec.md, task/mvp-plan/01-project-setup.md
- Fix How It Works: 4→5 bước (thêm "Xem phòng")
- Fix responsive grid: md:grid-cols-3 lg:grid-cols-5

### Layout Architecture ✅
- Chuyển Navbar + Footer từ page.tsx vào layout.tsx
- Flex layout: min-h-screen flex-col + main flex-1

### Navbar Redesign ✅
- Nền: bg-primary (Royal Blue)
- Nav links: text-base text-white
- Nút Zalo: filled (bg-white text-primary)
- Logo: public/logo/logo.webp, rounded-lg, 35px

### UI Polish ✅
- Xoá bg-gradient-to-b Hero section
- Xoá decorative circles CTA section

---

## Notes

- Turbopack error was caused by Tailwind CSS v4.3.1 bug (markUsedVariable RangeError). Fixed by downgrading to v4.0.7.
- @theme inline from shadcn was overriding our @theme values via var(--accent) and var(--primary). Fixed by removing those mappings from @theme inline.

---

## Definition Of Done

- [x] Rebrand Royal Blue hoàn tất
- [x] Layout architecture fixed
- [x] Navbar redesigned with logo
- [x] Build thành công
- [x] Turbopack dev server hoạt động
- [x] Đã review và commit
