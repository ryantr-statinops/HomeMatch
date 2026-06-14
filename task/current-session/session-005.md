# Session 005 — Phase 2B + 3: Frontend API Client & Room Listing

## Session ID

SESSION-005

---

## Date

2026-06-14

---

## Goal

Xây Frontend với mock data (Phases 2B + 3) — API client, types, services, Room Listing page + components.

---

## Scope

1. Phase 2B — Frontend API Client (api-client, types, services)
2. Phase 3 — Room Listing page (RoomCard, RoomFilter, RoomList)
3. RoomFilter redesign: collapsed blue card → expanded filter panel
4. UI adjustments: remove search text, remove description, change icons

---

## Out Of Scope

1. Không deploy Apps Script (chờ user setup clasp)
2. Không xây Room Detail, Roommate pages

---

## Deliverables

### Phase 2B — Frontend API Client ✅
- `src/lib/api-client.ts` — Fetch wrapper với mock fallback
- `src/types/room.ts` — Room types
- `src/types/roommate-post.ts` — RoommatePost types
- `src/constants/routes.ts` — Route constants
- `src/services/room.service.ts` — 6 mock rooms + filter
- `src/services/roommate.service.ts` — 3 mock posts + filter

### Phase 3 — Room Listing ✅
- `src/components/room/RoomCard.tsx` — Card (ảnh, giá, địa chỉ, diện tích, tiện ích)
- `src/components/room/RoomFilter.tsx` — Blue card collapsed, filter panel expanded
- `src/components/room/RoomList.tsx` — Client component with loading/empty/filter states
- `src/app/rooms/page.tsx` — Room listing page

### Shared Components ✅
- `src/components/shared/ValueCard.tsx`
- `src/components/shared/EmptyState.tsx`

### UI Adjustments ✅
- RoomFilter: collapsed = blue card (Search icon → SlidersHorizontal), expanded = filter panel
- Removed search text input from filter
- Removed description "Khám phá..." from rooms page header
- Added taller padding (py-6 md:py-8)
- Fixed accent color definitions in globals.css

---

## Notes

- Dùng mock data, khi có API thật → set `NEXT_PUBLIC_API_URL` là chạy
- `getRoomBySlug` cần fix param khi chuyển sang API thật (xem TODO trong file)
- Giá trị: `#333333` cho accent, `#3B82F6` cho primary-light

---

## Definition Of Done

- [x] API client + types + services created
- [x] Room listing page + components created
- [x] RoomFilter redesigned with collapsed/expanded states
- [x] All UI adjustments applied
- [x] Build thành công
- [x] Đã review và commit
