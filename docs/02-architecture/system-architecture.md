# System Architecture V3

## Overview

Hệ thống được xây dựng theo mô hình:

User
↓
Website
↓
Supabase SDK
↓
Supabase (PostgreSQL) + Google Drive

Mục tiêu:

* Tạo lead
* Hiển thị phòng trọ
* Hiển thị nhu cầu ở ghép
* Hỗ trợ sale vận hành

---

# High Level Architecture

```text
┌──────────────┐
│    User      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Next.js Web │
│    Vercel    │
└──────┬───────┘
       │
       ├──────────────────────────────────┐
       ▼                                  ▼
┌──────────────┐              ┌──────────────────────┐
│   Supabase   │              │ ImageCache (Supabase) │
│  (PostgreSQL)│◄─────────────│  path → drive_url     │
└──────┬───────┘              └──────────────────────┘
       │
       ▼
┌──────────────┐
│ Google Drive │
│ (Image files)│
└──────────────┘
```

---

# User Layer

## Responsibilities

* Tìm phòng
* Tìm ở ghép
* Xem thông tin
* Liên hệ Zalo

## Direct Access

Không có quyền truy cập:

* Supabase (trực tiếp)
* Google Drive
* AppSheet

---

# Website Layer

## Technology

* Next.js
* TypeScript
* Tailwind
* shadcn/ui + @base-ui/react

## Responsibilities

* Render giao diện
* SEO
* Hiển thị dữ liệu (qua Supabase SDK)
* Điều hướng sang Zalo

## Data Flow

* Gọi Supabase SDK từ service layer (`room.service.ts`, `roommate.service.ts`)
* Resolve image path qua `ImageCache` table
* Không còn Apps Script proxy

---

# API Layer

## Technology

Supabase SDK (`@supabase/supabase-js`)

## Responsibilities

* Đọc dữ liệu từ Supabase
* Chuyển đổi dữ liệu thành kiểu TypeScript
* Resolve image path → Drive URL qua ImageCache

---

# Data Layer

## Technology

Supabase (PostgreSQL)

## Single Source of Truth

Toàn bộ dữ liệu được quản lý tại đây (migrated từ Google Sheet).

## Image Storage

Google Drive (ảnh gốc) + ImageCache table (mapping path → URL)

## Tables

* phongtro
* hinhanh
* roommate
* lichhen
* sale
* lead
* imagecache (phụ trợ)

---

# Image Resolution Flow

```text
Database stores: "PHONGTRO_Images/abc.jpg"
       │
       ▼
room.service.ts queries:
  SELECT drive_url FROM imagecache WHERE path = 'PHONGTRO_Images/abc.jpg'
       │
       ▼
Returns: "https://drive.google.com/thumbnail?id=FILEID&sz=w1000"
       │
       ▼
Browser loads ảnh trực tiếp từ Google Drive CDN
```

---

# Admin Layer

## Technology

AppSheet

## Responsibilities

* Quản lý phòng
* Quản lý lịch hẹn
* Quản lý sale
* Quản lý bài ở ghép

---

# Analytics Layer

## Technology

Vercel Web Analytics ✅ (đã enable)

Google Analytics ⚠️ (đã cấu hình env var `NEXT_PUBLIC_GA_ID` nhưng chưa implement integration)

## Tracking Events (tương lai)

room_view

roommate_view

zalo_click

lead_created

---

# Contact Layer

## Technology

Zalo

## Responsibilities

* Tư vấn khách hàng
* Chốt phòng
* Hỗ trợ ở ghép

---

# Security Principles

## Rule 1

Database không public — chỉ gọi qua Supabase SDK với anon key.

## Rule 2

ImageCache table có RLS policy chỉ cho phép SELECT với anon.

## Rule 3

Service role key chỉ dùng cho migration script, không expose ra client.

## Rule 4

AppSheet là công cụ nội bộ. Không public.

---

# Deleted Components (từ V1)

* Google Apps Script API
* Api Proxy (`/api/proxy`)
* `api-client.ts`
* `resolveImageUrl()` trong Apps Script

---

# Lịch sử thay đổi

| Version | Ngày | Thay đổi |
|---------|------|----------|
| V1 | 2026-06-13 | Thiết kế ban đầu (Google Sheet + Apps Script) |
| V2 | 2026-06-23 | Migrate lên Supabase, thêm ImageCache, xoá Apps Script |
| V3 | 2026-06-26 | Sync analytics layer: Vercel Web Analytics + Google Analytics (chưa implement) |
