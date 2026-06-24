# Session 022

## Session ID

SESSION-022

---

## Date

2026-06-24

---

## Goal

Triển khai UX Animation Phase 2: Mobile menu, gallery crossfade, staggered sections.

---

## Context

- Phase 1 (Quick Wins) đã hoàn thành ở Session-021
- `tw-animate-css` + `@base-ui/react` đã sẵn sàng
- `docs/ux-animation-plan.md` tại mục **Phase 2** có plan chi tiết cho từng item
- Phase 1 đã có: click feedback, staggered entry, filter toggle fade, dialog speed

---

## Scope

1. **2.1 Mobile menu animation** (`src/components/layout/Navbar.tsx`)
   - Thêm backdrop overlay với `fade-in`/`fade-out`
   - Menu panel `data-open:slide-in-from-top-2 data-open:fade-in`
   - Dùng `@base-ui` Dialog hoặc Collapsible pattern
   - Tham khảo: `docs/ux-animation-plan.md` mục 2.1

2. **2.2 Gallery slide crossfade** (`src/components/room/RoomGallery.tsx`)
   - Cài `embla-carousel-fade` plugin
   - Thêm crossfade transition thay vì hard slide
   - Tham khảo: `docs/ux-animation-plan.md` mục 2.2

3. **2.3 Thumbnail hover zoom** (`src/components/room/RoomGallery.tsx`)
   - Thêm `overflow-hidden` + `hover:scale-110` cho thumb images
   - Tham khảo: `docs/ux-animation-plan.md` mục 2.3

4. **2.4 RoomDetail staggered sections** (`src/app/rooms/[id]/page.tsx` hoặc `RoomDetail.tsx`)
   - Gallery, RoomInfo, RoomAmenities, ContactButton xuất hiện lần lượt
   - `animate-in fade-in slide-in-from-bottom-4` với staggered delay
   - Tham khảo: `docs/ux-animation-plan.md` mục 2.4

5. **2.5 Amenity dialog staggered items** (`src/components/room/RoomFilter.tsx`)
   - Các nút tiện ích xuất hiện lần lượt khi dialog mở
   - Tham khảo: `docs/ux-animation-plan.md` mục 2.5

---

## Out Of Scope

- Phase 3 (Page Transitions, Scroll animations) — để session sau
- Phase 1 items — đã hoàn thành

---

## Deliverables

- Mobile menu: backdrop + slide-down animation
- Gallery: crossfade Embla plugin
- Thumbnail: hover zoom
- RoomDetail: staggered section entry
- Amenity dialog: staggered options entry
- Session log updates

---

## Notes

### Priority Order

1. Mobile menu animation — ảnh hưởng UX nhiều nhất (mobile users)
2. Gallery crossfade — visual improvement cho room detail
3. Thumbnail hover zoom — dễ nhất, vài dòng
4. RoomDetail staggered — tạo cảm giác premium
5. Amenity dialog staggered — cherry on top

### Implementation Reference

Xem `docs/ux-animation-plan.md` từ mục **Phase 2** — mỗi item có code mẫu và file cụ thể.

---

## Definition Of Done

* [ ] Hoàn thành tất cả Phase 2 items
* [ ] Không vi phạm project-rules
* [ ] Build sạch (0 errors)
* [ ] Commit & push từng item riêng

---

## References

- `docs/ux-animation-plan.md` — Plan chi tiết animation
- `src/components/layout/Navbar.tsx` — Mobile menu
- `src/components/room/RoomGallery.tsx` — Gallery + thumbnails
- `src/components/room/RoomDetail.tsx` — Detail sections
- `src/components/room/RoomFilter.tsx` — Amenity dialog
- `src/components/ui/dialog.tsx` — Dialog animation pattern
