# System Architecture V1

## Overview

Hệ thống được xây dựng theo mô hình:

User
↓
Website
↓
API
↓
Google Sheet

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
│ Cloudflare   │
│    Pages     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Apps Script  │
│     API      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Google Sheet │
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

* Google Sheet
* AppSheet

---

# Website Layer

## Technology

* Next.js
* TypeScript
* Tailwind
* shadcn/ui

## Responsibilities

* Render giao diện
* SEO
* Hiển thị dữ liệu
* Điều hướng sang Zalo

## Does Not Handle

* Database trực tiếp
* Quản lý sale
* Chỉnh sửa dữ liệu

---

# API Layer

## Technology

Google Apps Script

## Responsibilities

* Đọc dữ liệu từ Google Sheet
* Chuyển đổi thành JSON
* Cung cấp API cho Website

## Endpoints

GET /rooms

GET /rooms/:id

GET /roommate-posts

GET /roommate-posts/:id

POST /leads

---

# Data Layer

## Technology

Google Sheet

## Single Source of Truth

Toàn bộ dữ liệu được quản lý tại đây.

## Tables

* PHONGTRO
* HINHANH
* ROOMMATE_POST
* LICHHEN
* SALE
* LEAD

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

Google Analytics

## Tracking Events

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

Google Sheet không public.

---

## Rule 2

Website không truy cập trực tiếp Google Sheet.

---

## Rule 3

Tất cả dữ liệu đi qua API Layer.

---

## Rule 4

AppSheet là công cụ nội bộ.

Không public.

---

# Future Evolution

## Phase 1

Google Sheet
+
Apps Script

## Phase 2

Supabase
+
Cloudflare Workers

## Phase 3

PostgreSQL
+
Cloudflare Workers

Frontend giữ nguyên.
