# 📁 Folder Structure V1

## Overview

Project sử dụng:

* Next.js 16
* App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Cloudflare Pages
* Google Apps Script API

---

# Root Structure

```text
project-root/

├── apps-script/

├── docs/

├── public/

├── src/

├── .env.local

├── next.config.ts

├── package.json

└── README.md
```

---

# Docs

```text
docs/

├── business-flow.md
├── sitemap.md
├── user-journeys.md
├── assumptions.md

├── entities.md
├── database_structure.md

├── tech-stack.md
├── folder-structure.md
├── api-contracts.md

└── diagrams/
    └── erd-v1.md
```

Mục đích:

* Toàn bộ kiến trúc dự án.
* AI đọc trước khi generate code.

---

# Public

```text
public/

├── images/
├── icons/
└── logo/
```

Mục đích:

* Static Assets

---

# Source

```text
src/

├── app/
├── components/
├── features/
├── services/
├── lib/
├── hooks/
├── types/
├── constants/
└── configs/
```

---

# App Router

```text
src/app/

├── page.tsx

├── rooms/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx

├── roommates/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx

├── contact/
│   └── page.tsx

├── layout.tsx

├── loading.tsx

└── not-found.tsx
```

---

# Pages

## Home

```text
/
```

Nội dung:

* Hero Section
* Giới thiệu startup
* Hướng dẫn sử dụng
* CTA tìm phòng
* CTA tìm ở ghép

---

## Rooms

```text
/rooms
```

Nội dung:

* Danh sách phòng
* Bộ lọc
* Search

---

## Room Detail

```text
/rooms/[id]
```

Nội dung:

* Hình ảnh
* Giá
* Tiện ích
* Địa chỉ
* Nút Zalo

---

## Roommate Listing

```text
/roommates
```

Nội dung:

* Danh sách ở ghép
* Bộ lọc

---

## Roommate Detail

```text
/roommates/[id]
```

Nội dung:

* Thông tin phòng
* Nhu cầu ở ghép
* Nút Zalo

---

# Components

```text
src/components/

├── layout/
├── ui/
├── shared/
├── room/
└── roommate/
```

---

# Layout Components

```text
layout/

├── Navbar.tsx
├── Footer.tsx
└── Container.tsx
```

---

# Shared Components

```text
shared/

├── SectionTitle.tsx
├── EmptyState.tsx
├── Loading.tsx
└── ContactButton.tsx
```

---

# Room Components

```text
room/

├── RoomCard.tsx
├── RoomGallery.tsx
├── RoomFilter.tsx
├── RoomList.tsx
└── RoomDetail.tsx
```

---

# Roommate Components

```text
roommate/

├── RoommateCard.tsx
├── RoommateList.tsx
├── RoommateFilter.tsx
└── RoommateDetail.tsx
```

---

# Features

```text
src/features/

├── rooms/
└── roommates/
```

Mục đích:

Chứa business logic theo domain.

---

# Rooms Feature

```text
features/rooms/

├── api.ts
├── mapper.ts
├── schema.ts
└── utils.ts
```

---

# Roommates Feature

```text
features/roommates/

├── api.ts
├── mapper.ts
├── schema.ts
└── utils.ts
```

---

# Services

```text
src/services/

├── room.service.ts
├── roommate.service.ts
└── analytics.service.ts
```

Mục đích:

Kết nối API.

---

# Lib

```text
src/lib/

├── api-client.ts
├── google-analytics.ts
└── utils.ts
```

---

# Hooks

```text
src/hooks/

├── useRooms.ts
└── useRoommates.ts
```

---

# Types

```text
src/types/

├── room.ts
├── room-image.ts
├── roommate-post.ts
├── lead.ts
└── sale.ts
```

---

# Constants

```text
src/constants/

├── routes.ts
├── roommate-types.ts
└── room-status.ts
```

---

# Configs

```text
src/configs/

├── env.ts
└── site.ts
```

---

# Environment Variables

```env
NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_ZALO_URL=

NEXT_PUBLIC_GA_ID=
```

---

# Architectural Rules

## Rule 1

Page chỉ render UI.

Không chứa business logic.

---

## Rule 2

API call nằm trong:

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

Domain logic nằm trong:

```text
features/
```

---

## Rule 5

Không gọi trực tiếp Google Sheet từ UI.

Luôn thông qua API Layer.

---

# MVP Scope

Chỉ build:

* Home
* Rooms
* Room Detail
* Roommates
* Roommate Detail
* Zalo Contact

Không build:

* Login
* Dashboard
* Payment
* Booking
* Chat
* Mobile App

