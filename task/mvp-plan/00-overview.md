# 🚀 MVP Plan - Overview

## Purpose

Tài liệu này mô tả mục tiêu, phạm vi và kế hoạch triển khai MVP.

Mọi task trong thư mục `task/mvp-plan/` đều phải tuân thủ tài liệu này.

---

# Project Summary

Đây là nền tảng hỗ trợ:

1. Tìm phòng trọ
2. Tìm người ở ghép

Mục tiêu của hệ thống không phải là quản lý phòng trọ.

Mục tiêu chính là:

```text
Generate Leads
↓
Chuyển khách sang Zalo
↓
Sale xử lý
↓
Chốt phòng
```

---

# Business Model

## Flow 1 - Tìm phòng

Sinh viên

↓

Website

↓

Danh sách phòng

↓

Chi tiết phòng

↓

Liên hệ Zalo

↓

Sale tư vấn

↓

Hẹn xem phòng

↓

Chốt phòng

---

## Flow 2 - Tìm người ở ghép

Sinh viên

↓

Website

↓

Danh sách ở ghép

↓

Chi tiết bài đăng

↓

Liên hệ Zalo

↓

Sale hỗ trợ

---

## Flow 3 - Đã có phòng cần thêm người

Khách đang thuê phòng

↓

Liên hệ Sale

↓

Sale thu thập thông tin

↓

Admin tạo bài đăng

↓

Website hiển thị bài đăng

↓

Người khác liên hệ

↓

Sale kết nối

---

## Flow 4 - Muốn thuê phòng nhưng cần người thuê chung

Khách quan tâm một phòng

↓

Liên hệ Sale

↓

Sale thu thập thông tin

↓

Admin tạo bài đăng

↓

Website hiển thị bài đăng

↓

Tìm thêm người phù hợp

↓

Chốt phòng

---

# MVP Goal

Sau khi hoàn thành MVP:

Người dùng có thể:

* Xem danh sách phòng
* Tìm kiếm phòng
* Lọc phòng
* Xem chi tiết phòng

Người dùng có thể:

* Xem danh sách ở ghép
* Lọc bài ở ghép
* Xem chi tiết bài ở ghép

Người dùng có thể:

* Liên hệ Zalo

Đội Sale vẫn giữ nguyên quy trình vận hành hiện tại.

---

# MVP Success Criteria

MVP được xem là thành công khi:

## Product

* Website hoạt động ổn định
* Dữ liệu hiển thị chính xác
* Có thể tìm kiếm phòng

## Business

* Khách hàng liên hệ qua Zalo
* Sale tiếp nhận được lead

## Technical

* Deploy thành công lên Vercel
* Kết nối được Google Sheet
* Không cần database riêng

---

# MVP Scope

## Must Have

### Homepage

* Hero Section
* Giới thiệu startup
* Giới thiệu quy trình
* CTA tìm phòng
* CTA tìm ở ghép

---

### Rooms

* Danh sách phòng
* Search
* Filter theo khu vực
* Filter theo giá
* Filter theo diện tích

---

### Room Detail

* Hình ảnh
* Giá
* Địa chỉ
* Tiện ích
* Nút Zalo

---

### Roommate Listing

* Danh sách bài ở ghép
* Filter cơ bản

---

### Roommate Detail

* Thông tin ở ghép
* Thông tin phòng
* Nút Zalo

---

### Contact

* Chuyển sang Zalo

---

## Nice To Have

Không bắt buộc trong MVP.

* SEO nâng cao
* Tracking nâng cao
* Dashboard Analytics

---

## Out Of Scope

Không được triển khai trong MVP.

* Login
* Register
* User Profile
* Booking
* Payment
* Chat
* Notification
* Mobile App
* AI Features

---

# Data Source

## Single Source Of Truth

Google Sheet

Các bảng:

* PHONGTRO
* HINHANH
* ROOMMATE_POST
* LICHHEN
* SALE
* LEAD

---

# Tech Stack

Frontend

* Next.js 16
* TypeScript
* TailwindCSS
* shadcn/ui

Hosting

* Vercel

API

* Google Apps Script

Database

* Google Sheet

Admin

* AppSheet

Analytics

* Google Analytics

---

# Development Order

Mọi task phải được triển khai theo thứ tự.

## Phase 1

Project Setup

File:

```text
01-project-setup.md
```

---

## Phase 2

Google Sheet API

File:

```text
02-google-sheet-api.md
```

---

## Phase 3

Room Listing

File:

```text
03-room-list-page.md
```

---

## Phase 4

Room Detail

File:

```text
04-room-detail-page.md
```

---

## Phase 5 (⏸️ ON HOLD)

Roommate Listing

File:

```text
05-roommate-list-page.md
```

**Status:** Code ready (RoommateCard, Filter, List) — page giữ Coming Soon do chưa có data từ Sale.
**Kích hoạt:** Khi sheet ROOMMATE có dữ liệu, đổi `/roommates/page.tsx` sang listing.

---

## Phase 6

Roommate Detail

File:

```text
06-roommate-detail-page.md
```

---

## Phase 7

Homepage

File:

```text
07-homepage.md
```

---

## Phase 8

Zalo Contact

File:

```text
08-zalo-contact.md
```

---

## Phase 9 (🔧 CODE READY)

Deployment lên Vercel

File:

```text
09-deployment.md
```

**Status:** Code đã switch từ Cloudflare → Vercel (commit `a54ae9d`). Chờ deploy thực tế lên Vercel dashboard.

---

## Phase 10

Final Review

File:

```text
10-mvp-checklist.md
```

---

# Rules

Mọi task phải tuân thủ:

```text
docs/project-rules.md
```

Mọi kiến trúc phải tuân thủ:

```text
docs/system-architecture.md
```

Mọi cấu trúc dữ liệu phải tuân thủ:

```text
docs/database_structure.md
```

---

# Definition Of Done

MVP hoàn thành khi:

* Website deploy thành công
* Có thể xem phòng
* Có thể xem bài ở ghép
* Có thể liên hệ Zalo
* Sale tiếp tục vận hành như hiện tại
* Không làm thay đổi quy trình AppSheet hiện có

```
```
