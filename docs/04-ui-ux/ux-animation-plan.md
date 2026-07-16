# UX & Animation Improvement Plan

## Status

- **Phase 1 (Quick Wins):** ✅ Done
  - 1.1 RoomCard click feedback: `active:scale-[0.98]` — commit `b4afc11`
  - 1.2 Button click feedback: `active:scale-95/90` trên 6 files — commit `e0eead3`
  - 1.3 RoomCard staggered entry: `animate-in fade-in slide-in-from-bottom-4` + `index * 50ms` — commit `1f211be`
  - 1.4 Filter panel toggle: fade opacity + `translate-y` + `ease-out duration-700` — thay vì max-h — commit `6c6c363`, `2316ff5`, `19b5aa6`, `f9622d7`
  - Dialog animation speed: thêm `duration-300` — commit `4939ebb`
- **Phase 2 (Component Animations):** ✅ Done
  - 2.1 Mobile menu: `translate-y-full` slide + backdrop overlay — commit `a399771`
  - 2.2 Gallery crossfade: `embla-carousel-fade` plugin — commit `bf7af3d`
  - 2.3 Thumbnail zoom: `hover:scale-110` — commit `4a12092`
  - 2.4 RoomDetail staggered: `animate-in fade-in slide-in-from-bottom-4` + delay — commit `91327bd`
  - 2.5 Amenity dialog staggered: `animate-in fade-in` + `index * 30ms` — commit `fa2815f`
- **Phase 3 (Page Transitions):** Pending

---

## Tech Stack

| Library | Version | Status | Dùng cho |
|---------|---------|--------|----------|
| `tw-animate-css` | ^1.4.0 | ✅ Đã cài | Enter/exit animations (`fade-in`, `zoom-in`, `slide-in-from-*`, `animate-in`) |
| `@base-ui/react` | ^1.5.0 | ✅ Đã cài | Dialog open/close states (gắn `data-open`/`data-closed`) |
| `embla-carousel-react` | ^8.6.0 | ✅ Đã cài | Gallery slide transitions |
| `framer-motion` | — | ❌ Chưa cài | Gesture, layout animation, spring physics — **chỉ thêm nếu cần** |

**Nguyên tắc:** Ưu tiên dùng `tw-animate-css` + CSS transitions trước. Chỉ thêm framer-motion khi thực sự cần gesture hoặc layout animation.

---

## Phase 1 — Quick Wins (Ưu tiên cao nhất)

### 1.1 Click feedback cho RoomCard

**File:** `src/components/room/RoomCard.tsx`

**Hiện tại:** Card hover có shadow + image scale, nhưng click không có phản hồi.

**Cần thêm:** `active:scale-[0.98]` vào thẻ `<Link>` bao ngoài card.

```tsx
// Trên thẻ <Link> wrapping cả card
<Link
  href={routes.roomDetail(room.id)}
  className="group overflow-hidden rounded-2xl ... active:scale-[0.98] transition-all duration-200"
>
```

**Hiệu ứng:** Khi click → card thu nhỏ 2% → release → về kích thước gốc (cảm giác "chạm" vật lý).

### 1.2 Click feedback cho buttons

**File:** Tất cả các nút (áp dụng global hoặc từng component)

**Pattern chung:** Thêm các class sau vào interactive elements:
- `active:scale-95` — buttons, filter chips, amenity toggles
- `transition-transform` — đảm bảo transition mượt

**Vị trí cần update:**

| Component | Element | Thêm |
|-----------|---------|------|
| `RoomFilter.tsx` | Button "Áp dụng", "Xoá tất cả" | `active:scale-95` |
| `RoomFilter.tsx` | Amenity toggle items | `active:scale-95` |
| `RoomDetail.tsx` | "Sao chép" button | `active:scale-95` |
| `ContactButton.tsx` | Zalo contact CTA | `active:scale-95` |
| `Navbar.tsx` | Zalo button | `active:scale-95` |
| `RoomGallery.tsx` | Prev/next arrows, expand button | `active:scale-90` |
| `ImageViewer.tsx` | Close, prev/next buttons | `active:scale-90` |

### 1.3 RoomCard staggered entry

**File:** `src/components/room/RoomList.tsx`

**Hiện tại:** Cards xuất hiện đồng loạt khi data loaded.

**Cần thêm:** `animate-in fade-in slide-in-from-bottom-4` với staggered delay dựa trên index.

```tsx
// Wrap từng card
{rooms.map((room, index) => (
  <div
    key={room.id}
    className="animate-in fade-in slide-in-from-bottom-4"
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <RoomCard room={room} />
  </div>
))}
```

**Hiệu ứng:** Cards lần lượt xuất hiện từ dưới lên, mỗi card cách nhau 50ms, tạo cảm giác danh sách "đang load" mượt mà.

### 1.4 Filter panel toggle animation

**File:** `src/components/room/RoomFilter.tsx`

**Hiện tại:** `{isOpen && (...)}` — content xuất hiện/ biến mất tức thì.

**Giải pháp cuối cùng (sau 4 lần iteration):**

Thay conditional render bằng absolute positioning để kiểm soát layout + pure opacity transition:

```tsx
<div className="relative rounded-2xl bg-primary shadow-lg shadow-blue-200">
  {/* Collapsed — absolute out-of-flow khi mở */}
  <div className={`flex items-center justify-between transition-opacity duration-150 ${
    isOpen ? "pointer-events-none absolute inset-0 opacity-0" : "cursor-pointer px-4 py-3"
  }`}>
    ...
  </div>

  {/* Expanded — absolute out-of-flow khi đóng */}
  <div className={`transition-all duration-700 ease-out ${
    isOpen ? "relative translate-y-0 opacity-100" : "pointer-events-none absolute inset-0 translate-y-4 opacity-0"
  }`}>
    ...
  </div>
</div>
```

**Key decisions:**
- `duration-150` cho collapsed (mờ nhanh khi đóng), `duration-700` + `ease-out` + `translate-y` cho expanded (mở chậm, mượt, trượt lên)
- Dùng `absolute inset-0` để invisible elements không chiếm layout space
- Bỏ `max-h` hoàn toàn — user không thích hiệu ứng "co lên"

---

## Phase 2 — Component Animations (Trung bình)

### 2.1 Mobile menu animation

**File:** `src/components/layout/Navbar.tsx`

**Hiện tại:** `{isOpen && (...)}` — menu xuất hiện tức thì, không overlay.

**Cần thay đổi:**

1. Thêm backdrop overlay với `fade-in`/`fade-out`
2. Menu panel `data-open:slide-in-from-top-2 data-open:fade-in data-open:animate-in`
3. Dùng `@base-ui` Dialog hoặc Collapsible cho mobile menu

```tsx
{isOpen && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 z-40 bg-black/50 data-open:fade-in data-closed:fade-out"
      onClick={() => setIsOpen(false)}
    />

    {/* Menu panel */}
    <div className="data-open:animate-in data-open:slide-in-from-top-2 data-open:fade-in
                    data-closed:animate-out data-closed:slide-out-to-top-2 data-closed:fade-out">
      {/* nav links */}
    </div>
  </>
)}
```

**Hiệu ứng:** Menu trượt xuống từ top + fade; bấm ra ngoài hoặc close → slide up + fade out.

### 2.2 Gallery slide crossfade

**File:** `src/components/room/RoomGallery.tsx`

**Hiện tại:** Embla Carousel mặc định hard slide (dịch chuyển cứng).

**Cần thay đổi (2 options):**

**Option A (CSS transition):** Thêm `transition` class vào Embla slide container:
```css
.embla__slide {
  transition: opacity 300ms ease;
}
```

**Option B (Plugin):** Cài `embla-carousel-fade`:
```
npm install embla-carousel-fade
```

```tsx
import Fade from 'embla-carousel-fade';
useEmblaCarousel({ loop: true }, [Fade()]);
```

### 2.3 Image hover zoom (gallery thumbnails)

**File:** `src/components/room/RoomGallery.tsx`

**Hiện tại:** Thumbnails đơn giản, hover chỉ đổi opacity.

**Cần thêm:** `overflow-hidden` + `transition-transform duration-300 hover:scale-110` cho thumb images.

### 2.4 RoomDetail staggered sections

**File:** `src/app/rooms/[id]/page.tsx`

**Hiện tại:** Gallery + RoomInfo + RoomAmenities + ContactButton xuất hiện cùng lúc.

**Cần thêm:** Wrap các section trong div với `animate-in fade-in` và staggered delay:

```tsx
<section className="...">
  <Container>
    <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '0ms' }}>
      <RoomGallery ... />
    </div>
    <div className="... animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
      <RoomInfo ... />
    </div>
    <div className="... animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '200ms' }}>
      <RoomAmenities ... />
    </div>
    <div className="... animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '300ms' }}>
      <ContactButton ... />
    </div>
  </Container>
</section>
```

### 2.5 Filter amenity dialog option animation

**File:** `src/components/room/RoomFilter.tsx` (amenities dialog)

**Hiện tại:** Amenity list items hiện ra đồng loạt.

**Cần thêm:** Staggered entry cho từng item trong dialog:

```tsx
{AMENITY_OPTIONS.map((opt, index) => (
  <div
    key={opt.key}
    className="animate-in fade-in"
    style={{ animationDelay: `${index * 30}ms` }}
  >
    {/* amenity toggle */}
  </div>
))}
```

---

## Phase 3 — Page Transitions (Thấp — tương lai)

### 3.1 Route transition

**Hiện tại:** Next.js navigate trang mới tức thì (hard cut).

**Cần thay đổi:** Dùng `next-view-transitions` (Next.js 15+ built-in) hoặc custom CSS view transitions:

```tsx
// app/layout.tsx
import { ViewTransitions } from "next-view-transitions";

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html>{children}</html>
    </ViewTransitions>
  );
}
```

**Cân nhắc:** View Transitions API chưa fully stable, và cần test trên các browser. Chỉ triển khai khi thực sự cần.

### 3.2 Scroll-triggered animations

**Hiện tại:** Không có scroll animation.

**Cần thay đổi:** Thêm `IntersectionObserver` pattern hoặc dùng `@starting-style` CSS (Chrome 117+) để trigger animation khi element vào viewport.

```css
@starting-style {
  .scroll-in {
    opacity: 0;
    transform: translateY(20px);
  }
}
.scroll-in {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.5s ease;
}
```

---

## Implementation Order

| Phase | Item | Effort | Impact | Dependencies |
|-------|------|--------|--------|-------------|
| 1 | 1.1 RoomCard click feedback | ⭐ | 🔥🔥🔥🔥 | ✅ Done `b4afc11` |
| 1 | 1.2 Button click feedback | ⭐ | 🔥🔥🔥 | ✅ Done `e0eead3` |
| 1 | 1.3 RoomCard staggered entry | ⭐ | 🔥🔥🔥 | ✅ Done `1f211be` |
| 1 | 1.4 Filter panel toggle | ⭐⭐ | 🔥🔥 | ✅ Done `6c6c363` `2316ff5` `19b5aa6` `f9622d7` |
| 1 | — Dialog animation speed | ⭐ | 🔥🔥 | ✅ Done `4939ebb` |
| 2 | 2.1 Mobile menu animation | ⭐⭐ | 🔥🔥🔥🔥 | ✅ Done `a399771` |
| 2 | 2.4 RoomDetail staggered sections | ⭐ | 🔥🔥 | ✅ Done `91327bd` |
| 2 | 2.2 Gallery crossfade | ⭐⭐ | 🔥🔥 | ✅ Done `bf7af3d` |
| 2 | 2.3 Thumbnail zoom | ⭐ | 🔥 | ✅ Done `4a12092` |
| 2 | 2.5 Amenity dialog staggered | ⭐ | 🔥 | ✅ Done `fa2815f` |
| 3 | 3.1 Route transitions | ⭐⭐⭐⭐ | 🔥🔥🔥 | next-view-transitions |
| 3 | 3.2 Scroll animations | ⭐⭐⭐ | 🔥🔥 | IntersectionObserver |

---

## Design Principles

1. **Không ảnh hưởng performance:** Animation chỉ chạy CSS GPU-accelerated properties (`transform`, `opacity`). Tránh animate `width`, `height`, `top`, `left`.
2. **Duration chuẩn:** 150-200ms cho micro-interactions (click, hover), 300-500ms cho page/component enter, 200-300ms cho exit.
3. **Easing:** Dùng `ease-out` cho enter (vào nhanh, chậm dần), `ease-in` cho exit (chậm dần vào cuối).
4. **Reduce motion:** Tôn trọng `prefers-reduced-motion` — dùng `motion-safe:` prefix:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

5. **Giới hạn animation-time cho staggered:** Không quá 500ms tổng delay (10 items × 50ms = 500ms) để tránh user chờ.

---

## References

- `src/components/room/RoomCard.tsx` — Card với hover effects
- `src/components/room/RoomList.tsx` — Grid render cards
- `src/components/room/RoomFilter.tsx` — Filter panel + amenities dialog
- `src/components/layout/Navbar.tsx` — Mobile menu
- `src/components/room/RoomDetail.tsx` — Detail page sections
- `src/components/room/RoomGallery.tsx` — Image gallery
- `src/app/globals.css` — Tailwind v4 config + tw-animate-css
- `docs/tech-stack.md` — Tech stack
- `docs/ui-spec.md` — UI specifications
