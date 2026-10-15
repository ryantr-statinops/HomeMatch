# Lưu và so sánh tin

## Lưu tin

- Cho lưu/bỏ lưu từ thẻ kết quả và trang chi tiết.
- MVP giữ danh sách trên thiết bị, không yêu cầu đăng nhập.
- Nói rõ dữ liệu lưu gắn với trình duyệt/thiết bị; không hứa đồng bộ đa thiết bị.
- Khi local storage không khả dụng hoặc bị xóa, cung cấp thông báo dễ hiểu và giữ các chức năng xem/tìm kiếm hoạt động.
- Khi mở tin đã lưu, cập nhật trạng thái mới nhất có sẵn; nếu tin đã stale/expired, vẫn cho xem thông tin với cảnh báo.

## So sánh

- Cho chọn một số lượng nhỏ tin để so sánh; giới hạn chính xác sẽ được chốt trong usability validation.
- Dùng cùng hàng thuộc tính: giá chào, phí đã biết, khu vực, khoảng cách nếu đáng tin, diện tích, loại phòng, nội thất/tiện ích và freshness.
- Đánh dấu trường thiếu bằng trạng thái văn bản nhất quán.
- Cho bỏ một lựa chọn mà không mất các tin còn lại.
- Trên mobile, ưu tiên chuyển đổi giữa các tin hoặc cuộn ngang có chỉ báo; không ép bảng rộng khó thao tác.

## Quyền riêng tư và vòng đời

Sở thích/lưu tin ở local và session tương tác ẩn danh là hai mục đích khác nhau. Giao diện cài đặt cần giải thích dữ liệu nào nằm trên thiết bị, dữ liệu nào gửi để đo tương tác, và cách xóa dữ liệu local. Hành vi retention của session do tài liệu dữ liệu/vận hành quyết định.
