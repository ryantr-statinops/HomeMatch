# ⚙️ Tech Stack V3

## Philosophy

Mục tiêu của hệ thống:

* Ra MVP trong 7 ngày.
* Chi phí thấp.
* Dễ maintain bởi 1 người.
* Tương thích tốt với AI Coding Tools.
* Dễ migrate sang database thực trong tương lai.

---

# Frontend

## Framework

Next.js 16

## Language

TypeScript

## Styling

Tailwind CSS v4

## UI Components

shadcn/ui + @base-ui/react

## Icons

Lucide Icons

## Animation

tw-animate-css (enter/exit animations, staggered entry)

## State Management

@tanstack/react-query (caching, deduplication)

---

# Hosting

## Frontend Hosting

Vercel

## CDN

Vercel Edge Network

## DNS

Vercel DNS (custom domain: homematch.id.vn)

---

# Data Source

## Primary Database

Supabase (PostgreSQL)

Vai trò:

Single Source of Truth (migrated từ Google Sheet)

---

# Image Storage

## Current

Google Drive (ảnh vẫn lưu trong Drive, path được resolve qua bảng ImageCache trong Supabase)

## Future

Supabase Storage (khi cần thiết có thể migrate)

---

# Admin System

## Admin Operations

AppSheet

Vai trò:

* Quản lý phòng
* Quản lý lịch hẹn
* Quản lý sale
* Quản lý nhu cầu ở ghép

---

# API Layer

## Current

Supabase SDK (JavaScript client) — gọi trực tiếp từ Next.js

Vai trò:

* Đọc dữ liệu từ Supabase (`supabase.from("table").select(...)`)
* Resolve image path qua ImageCache table

## Deprecated

Google Apps Script API — đã chuyển sang Supabase SDK (Phase 2 → Vercel deployment)

---

# Analytics

## Website Analytics

### Vercel Web Analytics

✅ Đã enable trên Vercel Dashboard

Theo dõi:

* Traffic
* Page views

### Google Analytics

⚠️ Đã cấu hình env var (`NEXT_PUBLIC_GA_ID`) nhưng chưa implement integration code.

---

# Deployment

| Component | Technology |
|-----------|-----------|
| Frontend | Vercel |
| API | Supabase SDK (trực tiếp từ Next.js) |
| Database | Supabase (PostgreSQL) |
| Image Cache | Supabase (ImageCache table) + Google Drive API |
| Admin | AppSheet |

---

# Future Migration Path

### Phase 1 (MVP — đã hoàn thành)

```
Supabase (PostgreSQL)
    ↓
Supabase SDK
    ↓
Next.js → Vercel
```

### Phase 2 (tương lai — nếu cần)

```
PostgreSQL (tự quản lý)
    ↓
Cloudflare Workers
    ↓
Next.js
```

Frontend gần như không thay đổi trong toàn bộ lộ trình.
