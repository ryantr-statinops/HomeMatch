# ⚙️ Tech Stack V2

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

Tailwind CSS

## UI Components

shadcn/ui + @base-ui/react

## Icons

Lucide Icons

---

# Hosting

## Frontend Hosting

Vercel

## CDN

Vercel Edge Network

## DNS

Vercel DNS (hoặc Cloudflare DNS nếu dùng custom domain)

---

# Data Source

## Primary Database

Supabase (PostgreSQL)

Vai trò:

Single Source of Truth (migrated từ Google Sheet)

---

# Image Storage

## Current

Google Drive (ảnh vẫn lưu trong Drive, path được resolve qua bảng ImageCache)

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

Supabase SDK (JavaScript client)

Vai trò:

* Đọc dữ liệu từ Supabase
* Resolve image path qua ImageCache table

---

# Analytics

## Website Analytics

Google Analytics

Theo dõi:

* Traffic
* Room Views
* Roommate Views

## Lead Tracking

Google Analytics Events

Theo dõi:

* Click Zalo
* Click Contact

---

# Deployment

Frontend

Vercel

API

Supabase SDK (trực tiếp từ Next.js)

Database

Supabase (PostgreSQL)

Image Cache

Supabase (ImageCache table)

Admin

AppSheet

---

# Future Migration Path

Phase 1 (MVP — hiện tại)

Google Sheet
↓
Apps Script
↓
Next.js

Phase 2 (hiện tại)

Supabase
↓
Supabase SDK
↓
Next.js

Phase 3 (tương lai)

PostgreSQL
↓
Cloudflare Workers
↓
Next.js

Frontend gần như không thay đổi trong toàn bộ lộ trình.
