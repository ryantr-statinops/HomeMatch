# Luồng khám phá

## Entry

Trang khám phá cho biết khu vực nào có dữ liệu hiện tại và đưa người dùng đến bộ nhập nhu cầu. Không tự định vị hoặc xin quyền vị trí trước khi giải thích lợi ích; cho phép nhập khu vực thủ công.

## Nhập nhu cầu

Trình bày các trường theo nhóm dễ hiểu:

- Ngân sách và cách tính: giá thuê tối đa; chi phí phụ có thể chưa rõ.
- Khu vực/điểm đến và khoảng cách mong muốn nếu người dùng biết.
- Thời điểm cần thuê và loại chỗ ở.
- Điều kiện bắt buộc, ví dụ loại phòng hoặc quy định quan trọng.
- Sở thích có thể cân bằng như nội thất, diện tích, tiện ích hoặc gần điểm đến.

Cho phép bỏ qua trường không bắt buộc. Hiển thị coverage để người dùng biết hệ thống có thể tìm ở đâu. Tự khai báo là đủ để bắt đầu; không cần lịch sử hành vi.

## Xác nhận và chỉnh sửa

- Tóm tắt các điều kiện trước khi xem kết quả.
- Cho chỉnh bộ lọc ngay trong kết quả, giữ các lựa chọn hiện tại khi quay lại từ chi tiết tin.
- Phân biệt rõ hard filters và preferences; giải thích khi một preference ảnh hưởng thứ tự.
- Khi bộ lọc quá hẹp, gợi ý nới từng điều kiện mà không tự thay đổi điều kiện của người dùng.

## Handoff sang kết quả

Kết quả bắt đầu bằng số tin phù hợp và phạm vi dữ liệu theo thời điểm cập nhật. Nếu chỉ có baseline ranking hoặc chưa chạy model, UI không mô tả như cá nhân hóa đã học được từ người dùng. Luồng phải có trạng thái loading, no-results, lỗi tải và thử lại được mô tả trong [trạng thái UI](states-and-accessibility.md).
