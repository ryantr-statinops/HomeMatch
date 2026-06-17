# Session 011 — Phase 4: Room Detail Page

## Session ID

SESSION-011

---

## Date

2026-06-18

---

## Goal

Xây trang chi tiết phòng (`/rooms/[id]`) với carousel gallery, thông tin phòng, tiện ích, chi phí và nút Zalo.

---

## Context

- API endpoint `getRoomDetail` đã có sẵn (trả về PHONGTRO + HINHANH)
- `room.service.ts` đã có `getRoomById(id)`
- Zalo URL đã cấu hình trong `.env.local`
- Ảnh Drive đã fix ở Phase 3.7 (thumbnail URL + referrerPolicy)

---

## Scope

1. Cài `embla-carousel-react` cho gallery
2. Tạo `src/components/shared/ContactButton.tsx`
3. Tạo `src/components/room/RoomAmenities.tsx`
4. Tạo `src/components/room/RoomInfo.tsx`
5. Tạo `src/components/room/RoomGallery.tsx` (Embla carousel)
6. Tạo `src/components/room/RoomDetail.tsx` (layout chính)
7. Tạo `src/app/rooms/[id]/page.tsx` (server page)
8. Tạo session doc + update next-plan
9. Commit + push

---

## Out Of Scope

- Related rooms (future)
- Roommate Detail
- Zalo createLead API call (chỉ link Zalo)
- SEO meta tags

---

## Deliverables

### Components

| File | Chức năng |
|------|-----------|
| `src/components/shared/ContactButton.tsx` | Button Zalo dùng chung |
| `src/components/room/RoomAmenities.tsx` | Grid tiện ích (icon + label) |
| `src/components/room/RoomInfo.tsx` | Giá, địa chỉ, chi phí, quy định |
| `src/components/room/RoomGallery.tsx` | Embla carousel gallery |
| `src/components/room/RoomDetail.tsx` | Layout tổng thể |

### Page

| File | Chức năng |
|------|-----------|
| `src/app/rooms/[id]/page.tsx` | Server component fetch + render |

---

## Layout

```
┌──────────────────────────────────────────┐
│ Trang chủ / Danh sách phòng / [Tên phòng]│
├──────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────┐   │
│  │  CAROUSEL     │  │  Giá + Địa chỉ  │   │
│  │  GALLERY      │  │  Hợp đồng + Lầu │   │
│  │               │  │  Điện/Nước      │   │
│  │  ● ● ○ ○ ○    │  │  Trạng thái     │   │
│  └──────────────┘  └─────────────────┘   │
│                                           │
│  Chi phí khác: Điện / Nước / QL / Giữ xe  │
│                                           │
│  Tiện ích: [Máy lạnh] [Tủ lạnh] [...]    │
│                                           │
│  Mô tả + Quy định                         │
│                                           │
│  ┌──────────────────────────────────┐     │
│  │  📱 Liên hệ qua Zalo            │     │
│  └──────────────────────────────────┘     │
└──────────────────────────────────────────┘
```

---

## Definition Of Done

- [x] Component ContactButton
- [x] Component RoomAmenities
- [x] Component RoomInfo
- [x] Component RoomGallery (Embla)
- [x] Component RoomDetail
- [x] Page `/rooms/[id]`
- [ ] Build + lint pass
- [ ] Commit + push
- [ ] Session documented
