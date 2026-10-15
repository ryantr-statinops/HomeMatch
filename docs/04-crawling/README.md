# Thu thập dữ liệu

> **Trạng thái: tài liệu mục tiêu, chưa triển khai.** Hiện chưa có nguồn dữ liệu hay độ phủ địa lý nào được xác minh để công bố. Không xem các ví dụ hoặc tiêu chí ở đây là xác nhận được phép crawl một website cụ thể.

Thư mục này định nghĩa quy trình khảo sát nguồn và contract vận hành cho crawler Go chạy theo batch. Crawler chỉ thu thập dữ liệu theo source review đã được chấp thuận; nó không chạy đồng bộ trong request tìm kiếm của người dùng.

## Đọc theo thứ tự

1. [Khảo sát và phê duyệt nguồn](source-discovery.md): checklist điều kiện, pilot và quyết định độ phủ.
2. [Thiết kế crawler và source adapter](crawler-design.md): boundary, idempotency, rate limit, retry và lưu raw artifacts.
3. [Chạy batch, lỗi và vận hành](operations-and-failures.md): scheduling, checkpointing, metrics, dừng khẩn cấp và recovery.
4. [Kiểm thử và exit gates](testing-and-exit-gates.md): fixture, replay, failure scenarios và tiêu chí cho phép phát hành dữ liệu.

Data model/lifecycle được định nghĩa trong [tài liệu dữ liệu](../03-data/README.md). Các API cụ thể thuộc `docs/06-api/`; tài liệu này không ấn định wire format cho crawler hoặc service.

## Thứ tự thực hiện

Trước tiên khảo sát các nguồn khả thi và chọn pilot theo chất lượng, điều kiện sử dụng, độ phủ và chi phí. Chỉ sau khi review nguồn mới triển khai adapter. Chỉ công bố vùng có dữ liệu đủ mới và đạt quality gates đã đo.

