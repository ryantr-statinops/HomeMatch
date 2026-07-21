# Service Mapping cho HomeMatch

## Mục đích

Tài liệu này giải thích vì sao bài viết Todo microservices có nhiều service hơn bộ tài liệu migration hiện tại của HomeMatch.

Bài Todo là một ứng dụng demo để minh họa nhiều khái niệm cùng lúc: authentication, CRUD, user profile, message queue, background worker, reverse proxy, Docker và logging. Vì vậy số lượng service trong bài không phải là một mẫu bắt buộc cho mọi dự án.

## 1. Tech stack hiện tại của HomeMatch

### Public application

- Next.js 16
- TypeScript
- App Router
- Tailwind CSS v4
- shadcn/ui + `@base-ui/react`
- TanStack React Query
- Vercel

### Data và vận hành

- Supabase PostgreSQL: source of truth cho business data
- Supabase SDK: lớp truy cập dữ liệu hiện tại
- Google Drive: lưu ảnh
- `ImageCache` trong Supabase: mapping image path → Drive URL
- AppSheet: công cụ nội bộ cho admin/sale
- Zalo: kênh liên hệ và xử lý lead
- Vercel Web Analytics: analytics hiện tại

### Kiến trúc hiện tại

```text
AppSheet → Supabase PostgreSQL ← Next.js Website
                              └── ImageCache → Google Drive
Website → Zalo → Sale
```

Đây là một modular monolith ở phía website/data access, chưa phải microservices.

## 2. Các service trong bài Todo

| Thành phần trong bài | Vai trò | HomeMatch tương ứng |
|---|---|---|
| Frontend Vue.js | Giao diện người dùng | Next.js public web |
| Auth API Go | Đăng nhập, JWT | Chưa có trong MVP; tương lai thuộc Auth/RBAC |
| Todos API Node.js | CRUD Todo | Có thể tương ứng với Rooms hoặc Roommate module |
| Users API Java | Hồ sơ user | Không cần trong MVP vì khách không đăng ký tài khoản |
| Log Message Processor Python | Worker đọc message và ghi log | Chưa cần; tương lai có thể là worker xử lý analytics/audit |
| Redis | Message broker/cache | Chưa có và chưa cần ở quy mô hiện tại |
| Traefik | Reverse proxy/API gateway | Hiện Vercel đang đảm nhiệm public hosting/routing |
| Docker Compose | Chạy nhiều container local/server | Chưa có trong kiến trúc hiện tại |
| Zipkin handler | Endpoint phụ cho tracing/demo | Không có tương ứng hiện tại |

## 3. Vì sao `docs/06` chưa có các service đó?

### Auth API và Users API

MVP của HomeMatch cố ý không có login, register hoặc user profile. Khách chỉ xem phòng và bấm Zalo. Do đó tách Auth API và Users API lúc này sẽ tạo thêm code, database và vấn đề bảo mật nhưng chưa tạo ra giá trị sản phẩm.

Khi xây Admin Portal, HomeMatch mới cần:

```text
Auth/RBAC module
Admin/Sale user management
```

Hai phần này có thể nằm trong một backend modular monolith trước, không cần tách thành hai service độc lập ngay.

### Log Message Processor và Redis

Trong bài Todo, khi tạo Todo, Todos API gửi event vào Redis để worker ghi log. Đây là ví dụ về asynchronous communication.

HomeMatch hiện có luồng đơn giản hơn:

```text
User bấm Zalo → Sale xử lý trên Zalo
```

Nếu website chỉ cần ghi một lead đơn giản, synchronous HTTP/database write là đủ. Redis chỉ nên thêm khi có use case thật, ví dụ:

- xử lý lead bất đồng bộ với số lượng lớn;
- gửi notification;
- đồng bộ analytics;
- retry các tác vụ ngoài hệ thống;
- xử lý image cache theo hàng đợi.

### Traefik

Traefik phù hợp khi HomeMatch có nhiều container/backend service cần route:

```text
/api/rooms     → Rooms service
/api/roommates → Roommates service
/api/leads     → Leads service
/api/auth      → Auth service
```

Hiện tại public app deploy trên Vercel và gọi Supabase SDK trực tiếp. Chưa có nhiều backend container nên Traefik chưa bắt buộc.

### Docker và Docker Compose

Docker là cách đóng gói và chạy ứng dụng, không phải business service. Docker Compose là công cụ orchestration cho local hoặc một server nhỏ.

Nếu bắt đầu xây `apps/api` riêng, Docker Compose sẽ hữu ích để chạy:

```text
web + admin + api + local dependencies
```

Nhưng việc dùng Docker không tự động biến một ứng dụng thành microservices.

### Zipkin/Tracing

Tracing chỉ thực sự cần khi có nhiều service và cần theo dõi một request đi qua nhiều service. HomeMatch hiện chưa có distributed request flow nên chưa cần Zipkin.

## 4. Kiến trúc đề xuất theo từng giai đoạn

### Giai đoạn A — hiện tại: MVP

```text
Next.js public web
        │
        └── Supabase SDK → Supabase PostgreSQL
                              └── ImageCache → Google Drive
```

Giữ nguyên mô hình này cho đến khi public website và lead flow ổn định.

### Giai đoạn B — backend boundary

```text
Public Web ─┐
Admin Portal ─┼── Backend API modular monolith
             │          ├── Rooms module
             │          ├── Roommates module
             │          ├── Leads module
             │          ├── Auth/RBAC module
             │          └── Media module
             │
             └── Supabase PostgreSQL
```

Đây là bước nên làm trước khi nghĩ đến nhiều microservice độc lập.

### Giai đoạn C — chỉ tách service khi có nhu cầu

Chỉ cân nhắc tách riêng khi có bằng chứng vận hành hoặc scale:

```text
API Gateway/Reverse Proxy
 ├── Rooms service
 ├── Roommates service
 ├── Leads service
 ├── Auth service
 └── Background worker + queue
```

Không nên tách `Users service`, `Log service`, `Redis`, `Traefik` chỉ vì chúng xuất hiện trong một tutorial.

## 5. Kết luận

Bài Todo có nhiều service vì nó muốn trình diễn một hệ sinh thái microservices hoàn chỉnh. `docs/06` ít service hơn vì đang lựa chọn kiến trúc phù hợp với quy mô và scope thật của HomeMatch: một backend modular monolith, hai frontend và Supabase làm database chính.

Định hướng được cập nhật cho HomeMatch là:

1. Giữ MVP hiện tại.
2. Tạo backend boundary trước.
3. Thêm Admin Portal và Auth/RBAC.
4. Chỉ thêm Redis, worker, reverse proxy hoặc service độc lập khi có use case và số liệu chứng minh cần thiết.

