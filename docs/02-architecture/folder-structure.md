# 📁 Folder Structure V2

## Overview

Project sử dụng:

* Next.js 16
* App Router
* TypeScript
* Tailwind CSS v4
* shadcn/ui + @base-ui/react
* Vercel (Hosting)
* Supabase SDK (Database API)

---

# Root Structure

```text
project-root/
├── apps-script/          # Google Apps Script (Deprecated)
├── docs/                 # Tài liệu dự án
├── scripts/              # Build scripts (build-image-cache.ts)
├── src/                  # Source code
├── task/                 # Task management & session logs
├── .env.local            # Environment variables
├── .gitignore
├── components.json       # shadcn/ui config
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

---

# Docs

```text
docs/
├── api-contracts.md          # API Contracts (Supabase SDK)
├── assumptions.md            # Product & Technical assumptions
├── business-flow.md          # Business flow diagrams
├── database_structure.md     # Supabase DB schema (V4)
├── entities.md               # Entity definitions
├── folder-structure.md       # This file
├── naming-convention.md      # Naming rules
├── project-rule.md           # Project rules & scope
├── rooms-listing-optimization.md  # Performance optimization plan
├── setup-guide.md            # Setup & configuration guide
├── sheet-design.md           # Google Sheet schema (deprecated)
├── sitemap.md                # Site map
├── tech-stack.md             # Tech stack
├── ui-spec.md                # UI specifications
├── user-journeys.md          # User journey maps
├── ux-animation-plan.md      # UX & animation plan
└── diagrams/
    ├── erd-v1.md
    └── system-architecture.md
```

Mục đích:

* Toàn bộ kiến trúc dự án.
* AI đọc trước khi generate code.

---

# Source

```text
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── configs/          # App configuration
├── constants/        # Constants & static data
├── lib/              # Utilities & Supabase client
├── services/         # Database service layer
└── types/            # TypeScript types
```

---

# App Router

```text
src/app/
├── page.tsx                  # Homepage (Hero, About, How It Works, Commitments, CTA)
├── layout.tsx                # Root layout (Navbar, Footer, QueryProvider)
├── loading.tsx               # Global loading state
├── not-found.tsx             # 404 page
├── globals.css               # Tailwind v4 config + animations
├── rooms/
│   ├── page.tsx              # Room listing (/rooms)
│   └── [id]/
│       ├── page.tsx          # Room detail (/rooms/[id]) — Server Component
│       └── loading.tsx       # Room detail skeleton
└── roommates/
    └── page.tsx              # Roommate listing (/roommates) — Coming Soon
```

> **Note:** `/roommates/[id]` chưa implement (Phase 6 — PENDING).

---

# Pages

## Home

```text
/
```

Nội dung:

* Hero Section (title, description, CTA tìm phòng, CTA tìm ở ghép)
* About Section (3 giá trị cốt lõi — ValueCard)
* How It Works (5 bước quy trình)
* Commitments Section (3 cam kết — CommitmentCard)
* CTA Section (Zalo + Xem danh sách phòng)

---

## Rooms

```text
/rooms
```

Nội dung:

* Danh sách phòng (RoomList)
* Bộ lọc (RoomFilter — khu vực, giá, tiện ích)
* Staggered entry animation

---

## Room Detail

```text
/rooms/[id]
```

Nội dung:

* Breadcrumb navigation
* Hình ảnh (Embla carousel với fade transition + thumbnails)
* Giá, địa chỉ, hợp đồng, lầu
* Chi phí khác (điện, nước, phí quản lý, giữ xe)
* Tiện ích (grid badges — 12 loại)
* Mô tả phòng
* Quy định (giờ giấc, thú cưng)
* Sao chép thông tin phòng
* Nút Zalo (ContactButton)

---

## Roommate Listing

```text
/roommates
```

Trạng thái: **Coming Soon** — hiển thị landing page giới thiệu tính năng.

> Components sẵn sàng: RoommateCard, RoommateFilter, RoommateList — chờ data từ Sale để kích hoạt.

---

## Roommate Detail

```text
/roommates/[id]
```

Trạng thái: **Chưa implement** (Phase 6 — PENDING)

---

# Components

```text
src/components/
├── layout/         # Layout components
├── providers/       # React context providers
├── room/            # Room domain components
├── roommate/        # Roommate domain components
├── shared/          # Shared/reusable components
└── ui/              # shadcn/ui base components
```

---

# Layout Components

```text
layout/
├── Container.tsx    # Max-width wrapper (Container)
├── Footer.tsx       # Footer (brand, services, Zalo CTA)
└── Navbar.tsx       # Sticky navbar (logo, nav links, Zalo button, mobile menu)
```

---

# Providers

```text
providers/
└── QueryProvider.tsx    # TanStack React Query provider
```

---

# Shared Components

```text
shared/
├── CommitmentCard.tsx   # Card component cho section Cam Kết
├── ContactButton.tsx    # Zalo contact CTA button
├── EmptyState.tsx       # Empty state với action
├── SectionTitle.tsx     # Section title + description
└── ValueCard.tsx        # Card component cho section About
```

---

# Room Components

```text
room/
├── ImageViewer.tsx          # Fullscreen image viewer (lightbox)
├── RoomAmenities.tsx        # Grid 12 tiện ích (badges)
├── RoomCard.tsx             # Card trong danh sách phòng
├── RoomDetail.tsx           # Layout chính phòng detail (Gallery + Info + Amenities + CTA)
├── RoomDetailSkeleton.tsx   # Skeleton loading cho room detail
├── RoomFilter.tsx           # Filter panel (khu vực, giá, tiện ích dialog)
├── RoomGallery.tsx          # Embla carousel + thumbnails + ImageViewer
├── RoomInfo.tsx             # Thông tin phòng (giá, địa chỉ, chi phí, quy định)
└── RoomList.tsx             # Client component: React Query + client filter + grid
```

---

# Roommate Components

```text
roommate/
├── RoommateCard.tsx     # Card bài đăng ở ghép (chưa dùng — Coming Soon)
├── RoommateFilter.tsx   # Filter (postType, gender, khuVuc) — chưa dùng
└── RoommateList.tsx     # Listing + filter — chưa dùng
```

> Các component này đã sẵn sàng nhưng `/roommates` page hiện hiển thị Coming Soon chờ data.

---

# UI Components (shadcn/ui)

```text
ui/
├── button.tsx          # Button component (cva + variants)
└── dialog.tsx          # Dialog component (@base-ui/react + DialogBackdrop + DialogContent)
```

---

# Services

```text
src/services/
├── lead.service.ts         # createLead() — ghi lead vào Supabase
├── room.service.ts         # getRooms(), getRoomById(), filterRooms(), getDistinctAreas()
└── roommate.service.ts     # getRoommatePosts(), getRoommatePostById()
```

Mục đích:

* Kết nối Supabase database.
* Resolve image path → URL qua ImageCache table.
* Map database rows → TypeScript types.

---

# Lib

```text
src/lib/
├── supabase/
│   └── client.ts       # Supabase client (createClient)
└── utils.ts            # cn() utility (clsx + tailwind-merge)
```

> **Note:** `api-client.ts` đã bị xóa khi migrate sang Supabase SDK.

---

# Types

```text
src/types/
├── room.ts              # Room, RoomImage, RoomAmenities, RoomCosts, RoomAddress, RoomFilterParams
└── roommate-post.ts     # RoommatePost, Customer, RoommateFilterParams
```

---

# Constants

```text
src/constants/
├── commitments.ts       # Data 3 cam kết homepage
├── how-it-works.ts      # Data 5 bước quy trình
└── routes.ts            # Route definitions (home, rooms, roomDetail, roommates, roommateDetail)
```

---

# Configs

```text
src/configs/
├── env.ts               # Environment variables (supabaseUrl, supabaseAnonKey, gaId)
└── site.ts              # Site config (name, description, url, zaloUrl, phone, facebookUrl)
```

---

# Environment Variables

```env
# Supabase (Bắt buộc)
NEXT_PUBLIC_SUPABASE_URL=https://rccszqpjeikcjrfmbzpl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...

# Zalo (Tuỳ chọn)
NEXT_PUBLIC_ZALO_URL=

# Site (Tuỳ chọn)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics (Tuỳ chọn — chưa implement)
NEXT_PUBLIC_GA_ID=
```

---

# Architectural Rules

## Rule 1

Page chỉ render UI.

Không chứa business logic.

---

## Rule 2

API call (database query) nằm trong:

```text
services/
```

---

## Rule 3

Type definitions nằm trong:

```text
types/
```

---

## Rule 4

Không gọi trực tiếp Google Sheet từ UI.

Supabase SDK là lớp API chính.

---

## Rule 5

Image path từ AppSheet được resolve qua:

```text
ImageCache table (Supabase) → Google Drive URL
```

---

# MVP Scope

Đã build:

* Home (Hero + About + How It Works + Commitments + CTA)
* Room Listing (filter + animation)
* Room Detail (gallery + info + amenities + CTA)
* Roommate Listing (Coming Soon — components ready)
* Zalo Contact (ContactButton)
* Deployment (Vercel)

Chưa build:

* Roommate Detail (`/roommates/[id]`)
* Lead Tracking (createLead chưa gọi từ UI)
* Login / Dashboard / Payment / Booking / Chat / Mobile App
