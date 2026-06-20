# ⚙️ Tech Stack V1

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

shadcn/ui

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

Google Sheet

Vai trò:

Single Source of Truth

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

## MVP

Google Apps Script

Vai trò:

* Đọc dữ liệu từ Google Sheet
* Trả dữ liệu JSON cho Website

---

## Future

Cloudflare Workers

Khi hệ thống cần hiệu năng cao hơn.

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

Google Apps Script

Database

Google Sheet

Admin

AppSheet

---

# Future Migration Path

Phase 1

Google Sheet
↓
Apps Script
↓
Next.js

Phase 2

Supabase
↓
Cloudflare Workers
↓
Next.js

Phase 3

PostgreSQL
↓
Cloudflare Workers
↓
Next.js

Frontend gần như không thay đổi trong toàn bộ lộ trình.
