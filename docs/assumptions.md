# Assumptions V2

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
- Dữ liệu lưu trên Supabase (PostgreSQL) — migrated từ Google Sheet.
- AppSheet tiếp tục được sử dụng cho đội sale.
- Website đọc dữ liệu trực tiếp từ Supabase qua Supabase SDK.

---

## Roommate Data

- Chỉ admin được tạo bài ở ghép (qua AppSheet).
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

- Landing Page ✅
- Room Listing ✅
- Room Detail ✅
- Roommate Listing ⏸️ (Coming Soon — components ready, chờ data)
- Roommate Detail ❌ (Phase 6 — PENDING)
- Contact via Zalo ✅
- Admin Room Management (AppSheet — không phải website)
- Admin Roommate Management (AppSheet — không phải website)
- Lead Dashboard cơ bản (chưa implement)

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

- **Supabase (PostgreSQL)** là nguồn dữ liệu chính (Single Source of Truth).
- Website đọc dữ liệu từ Supabase qua Supabase SDK (`@supabase/supabase-js`).
- Google Sheet vẫn được dùng làm nguồn dữ liệu trung gian qua AppSheet.
- Image path từ AppSheet được resolve qua ImageCache table trong Supabase → Google Drive URL.
- Google Apps Script đã deprecated, không còn sử dụng.
  