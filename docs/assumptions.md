# Assumptions V1

## Product

- Website là công cụ tạo lead.
- Website không xử lý thanh toán.
- Website không xử lý hợp đồng.
- Website không xử lý đặt lịch.
- Website không thay thế đội sale.
-> Nhìn chung, Website là nơi show sản phẩm của startup này

---

## User

- Người dùng không cần đăng ký tài khoản.
- Người dùng không cần đăng nhập.
- Người dùng liên hệ qua Zalo.

---

## Room Data

- Dữ liệu phòng được quản lý tập trung.
- Dữ liệu hiện tại lưu trên Google Sheet.
- AppSheet tiếp tục được sử dụng cho đội sale.
- Website chỉ đọc dữ liệu từ nguồn dữ liệu trung tâm.

---

## Roommate Data

- Chỉ admin được tạo bài ở ghép.
- Người dùng không được tự đăng bài.
- Mỗi bài ở ghép có thời hạn 14 ngày.
- Bài ở ghép luôn gắn với phòng thuộc hệ thống.

---

## Lead

- Lead phát sinh từ nút liên hệ Zalo.
- Sale là người xử lý toàn bộ lead.
- Website không phân công sale.

---

## MVP Scope

Bao gồm:

- Landing Page
- Room Listing
- Room Detail
- Roommate Listing
- Roommate Detail
- Contact via Zalo
- Admin Room Management
- Admin Roommate Management
- Lead Dashboard cơ bản

Không bao gồm:

- User Login
- User Profile
- User Self Posting
- Chat Realtime
- Booking
- Payment
- Mobile App
- AI Features

---

## Technical Assumptions

- Google Sheet là nguồn dữ liệu chính (Single Source of Truth).
- Website đọc dữ liệu từ Google Sheet thông qua API.
- Dữ liệu được thiết kế theo chuẩn database để dễ migrate sau này.
- Khi quy mô lớn hơn sẽ chuyển sang PostgreSQL hoặc Supabase.
  