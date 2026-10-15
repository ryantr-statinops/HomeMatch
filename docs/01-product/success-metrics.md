# Chỉ số thành công

Các chỉ số này là mục tiêu đo lường cho MVP; chưa có baseline hoặc kết quả được xác nhận. Đặt baseline sau khi có dữ liệu crawl được kiểm chứng và luồng đo lường hoạt động.

## Chất lượng tìm kiếm

- Tỷ lệ phiên tìm kiếm có ít nhất một kết quả còn hiệu lực.
- Tỷ lệ người dùng mở chi tiết từ kết quả.
- Tỷ lệ người dùng lưu hoặc đưa một tin vào so sánh.
- Tỷ lệ phiên kết thúc không có tương tác hữu ích; phân tích theo bộ lọc và coverage.
- Tỷ lệ gợi ý đáp ứng điều kiện bắt buộc, mục tiêu là 100% trên tập kiểm thử.

## Mức phù hợp và tin cậy

- Đánh giá hữu ích do người dùng chủ động gửi sau khi xem gợi ý.
- Tỷ lệ gợi ý có explanation hợp lệ, kiểm chứng được từ thuộc tính tin và preference.
- Tỷ lệ tin stale/expired được phát hiện trước khi người dùng dựa vào kết quả.
- Tỷ lệ field quan trọng bị thiếu theo nguồn/khu vực.
- Tỷ lệ tin trùng còn xuất hiện riêng biệt trong kết quả.

## ML và giá tham khảo

- So sánh ranking với baseline đơn giản trên tập đánh giá có nhãn, dùng split tránh rò rỉ giữa các tin trùng/cùng phòng.
- Đo chất lượng khoảng giá bằng coverage của khoảng dự đoán và độ rộng khoảng, phân nhóm theo khu vực và loại hình khi đủ mẫu.
- Đo riêng chất lượng trên cold-start và khu vực ít dữ liệu.
- Không đặt ngưỡng accuracy cố định trước khi biết phân phối và chất lượng dataset; mọi ngưỡng phát hành phải được ghi trong tài liệu ML cùng bằng chứng.

## Guardrails

- Theo dõi tỷ lệ lỗi API/trải nghiệm và thời gian tải kết quả.
- Theo dõi phần trăm kết quả không đáp ứng hard filters; phải bằng 0.
- Theo dõi tỷ lệ hiển thị ước lượng giá khi điều kiện dữ liệu không đủ; phải bằng 0.
- Không dùng click đơn lẻ như nhãn khẳng định người dùng hài lòng.
