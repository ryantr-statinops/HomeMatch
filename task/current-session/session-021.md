# Session 021

## Session ID

SESSION-021

---

## Date

2026-06-24

---

## Goal

1. Setup Vercel Web Analytics
2. Thêm loading skeleton cho trang `/rooms/[id]`
3. Ghi lại session log

---

## Context

- Dự án đã migrate lên Supabase, cần theo dõi traffic production
- Trang `/rooms/[id]` là async server component, fetch `getRoomById()` không có loading UI
- User thấy màn trắng khi navigate từ `/rooms/` → `/rooms/[id]`
- Session-020 đã ghi lại quá trình migrate

---

## Scope

1. Cài đặt `@vercel/analytics` package
2. Thêm `<Analytics />` vào root layout
3. Tạo `RoomDetailSkeleton` component (spinner trung tâm)
4. Tạo `loading.tsx` trong `/rooms/[id]/`
5. Build verify sạch lỗi
6. Commit & push lên GitHub
7. Tạo session log (file này)

---

## Out Of Scope

1. Cấu hình Dashboard Vercel (bật/tắt Analytics) — user tự làm
2. Google Analytics

---

## Deliverables

### Modified Files

1. **package.json** / **package-lock.json** — Thêm dependency `@vercel/analytics`
2. **src/app/layout.tsx** — Import `<Analytics />` từ `@vercel/analytics/react`, render trong `<body>` sau `<Footer />`

### New Files

3. **src/components/room/RoomDetailSkeleton.tsx** — Spinner `Loader2` xoay + text "Đang tải..." căn giữa, `min-h-[60vh]`
4. **src/app/rooms/[id]/loading.tsx** — Next.js loading page: breadcrumb skeleton (`animate-pulse`) + `RoomDetailSkeleton` ở content area
5. **task/current-session/session-021.md** — Session log này

---

## Notes

### Implementation Steps — Vercel Analytics

1. `npm install @vercel/analytics`
2. Thêm `import { Analytics } from "@vercel/analytics/react"` vào `src/app/layout.tsx`
3. Render `<Analytics />` sau `<Footer />`
4. Build OK với `npx next build`
5. Commit `1f2c03b` với message `"feat: add Vercel Web Analytics"`
6. Push lên `main`

### Implementation Steps — Loading Skeleton

1. Tạo `RoomDetailSkeleton.tsx`: `Loader2` icon với `animate-spin` + text "Đang tải..." trong `flex min-h-[60vh] items-center justify-center`
2. Tạo `loading.tsx` trong `/rooms/[id]/`: layout bg-gray-50, breadcrumb skeleton (`animate-pulse`), content là `RoomDetailSkeleton`
3. Build OK

### User Steps After Deploy

- Vào Vercel Dashboard → project → **Analytics** tab → Enable Web Analytics
- Redeploy (Deployments → ... → Redeploy)

---

## Definition Of Done

* [x] Hoàn thành task
* [x] Không vi phạm project-rules
* [x] Không mở rộng scope
* [x] Build sạch (0 errors)
* [x] Commit & push thành công

---

## Commits

- `1f2c03b` — feat: add Vercel Web Analytics
