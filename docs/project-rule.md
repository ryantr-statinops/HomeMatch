# Project Rules V1

## Purpose

Tài liệu này định nghĩa các nguyên tắc cốt lõi của dự án.

Mọi thành viên, AI Agent, Cline, Claude Code hoặc công cụ tự động phải tuân thủ các quy tắc bên dưới.

Nếu có xung đột giữa code và tài liệu, tài liệu trong thư mục `docs/` là nguồn tham chiếu chính.

---

# 1. Product Rules

## Rule P1

Website là nền tảng tạo lead.

Không phải hệ thống quản lý phòng trọ.

---

## Rule P2

Mục tiêu chính:

* Tìm phòng trọ
* Tìm người ở ghép
* Tạo lead cho đội sale

---

## Rule P3

Toàn bộ liên hệ khách hàng đi qua Zalo.

Website không xử lý chat nội bộ.

---

## Rule P4

Website không xử lý thanh toán.

---

## Rule P5

Website không xử lý đặt phòng trực tuyến.

---

## Rule P6

Website không có chức năng đăng ký tài khoản trong MVP.

---

## Rule P7

Website không có chức năng đăng nhập trong MVP.

---

# 2. Room Rules

## Rule R1

Tất cả phòng hiển thị trên website đều thuộc hệ thống công ty.

---

## Rule R2

Người dùng không được tự đăng phòng.

---

## Rule R3

Người dùng không được chỉnh sửa dữ liệu phòng.

---

## Rule R4

Thông tin phòng được quản lý tại Google Sheet.

---

## Rule R5

Google Sheet là nguồn dữ liệu chính (Source of Truth).

---

# 3. Roommate Rules

## Rule RM1

Người dùng không được tự tạo bài đăng ở ghép.

---

## Rule RM2

Mọi bài đăng ở ghép được tạo bởi Admin.

---

## Rule RM3

Thông tin bài đăng được thu thập từ Sale.

---

## Rule RM4

Mỗi bài đăng ở ghép phải liên kết với một phòng trong hệ thống.

---

## Rule RM5

Bài đăng ở ghép có thời hạn mặc định là 14 ngày.

---

## Rule RM6

Khi hết hạn, trạng thái chuyển sang:

```text
EXPIRED
```

---

# 4. Lead Rules

## Rule L1

Lead phát sinh từ:

* Trang phòng
* Trang ở ghép

---

## Rule L2

Lead được tính khi người dùng bấm liên hệ.

---

## Rule L3

MVP chỉ cần tracking lead cơ bản.

---

# 5. Data Rules

## Rule D1

Google Sheet là database của MVP.

---

## Rule D2

Không truy cập Google Sheet trực tiếp từ Frontend.

---

## Rule D3

Frontend chỉ làm việc với API Layer.

---

## Rule D4

Mọi dữ liệu phải có ID duy nhất.

Ví dụ:

```text
ROOM001
POST001
SALE001
LEAD001
```

---

## Rule D5

Không lưu dữ liệu trùng lặp nếu đã tồn tại quan hệ dữ liệu.

---

# 6. Architecture Rules

## Rule A1

Kiến trúc hệ thống:

```text
User
↓
Next.js Website
↓
Apps Script API
↓
Google Sheet
```

---

## Rule A2

Frontend không được đọc Google Sheet trực tiếp.

---

## Rule A3

Google Apps Script là lớp API duy nhất trong MVP.

---

## Rule A4

AppSheet là hệ thống nội bộ.

Không public.

---

# 7. Frontend Rules

## Rule F1

Sử dụng:

* Next.js
* TypeScript
* Tailwind
* shadcn/ui

---

## Rule F2

Không sử dụng JavaScript thuần.

TypeScript là bắt buộc.

---

## Rule F3

Page chỉ render UI.

Không chứa business logic.

---

## Rule F4

Business logic nằm trong:

```text
src/features/
```

---

## Rule F5

API call nằm trong:

```text
src/services/
```

---

## Rule F6

Type definitions nằm trong:

```text
src/types/
```

---

# 8. MVP Scope Rules

## MVP Must Have

* Landing Page
* Danh sách phòng
* Chi tiết phòng
* Danh sách ở ghép
* Chi tiết ở ghép
* Bộ lọc cơ bản
* Nút liên hệ Zalo

---

## MVP Nice To Have

* SEO nâng cao
* Analytics Dashboard

---

## MVP Out Of Scope

* Login
* Register
* Chat
* Booking
* Payment
* Notification
* Mobile App
* AI Features

---

# 9. Deployment Rules

## Rule DEP1

Frontend deploy bằng Cloudflare Pages.

---

## Rule DEP2

API deploy bằng Google Apps Script.

---

## Rule DEP3

Database sử dụng Google Sheet.

---

# 10. AI Agent Rules

## Rule AI1

Không tự ý thêm tính năng ngoài phạm vi MVP.

---

## Rule AI2

Không tự ý thay đổi kiến trúc hệ thống.

---

## Rule AI3

Không tự ý thêm authentication.

---

## Rule AI4

Không tự ý thêm database mới.

---

## Rule AI5

Không tự ý thêm state management library nếu chưa được yêu cầu.

---

## Rule AI6

Luôn đọc các file trong thư mục `docs/` trước khi generate code.

---

## Rule AI7

Ưu tiên đơn giản, dễ bảo trì, dễ triển khai.

---

# MVP Success Criteria

MVP được xem là hoàn thành khi:

* Người dùng xem được danh sách phòng.
* Người dùng xem được chi tiết phòng.
* Người dùng xem được danh sách ở ghép.
* Người dùng xem được chi tiết ở ghép.
* Người dùng có thể liên hệ qua Zalo.
* Sale có thể tiếp tục quy trình chốt khách hiện tại.
* Không làm thay đổi quy trình vận hành đang sử dụng AppSheet.

```
```
