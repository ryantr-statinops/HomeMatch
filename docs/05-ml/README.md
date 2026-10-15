# Machine Learning

> **Trạng thái:** tài liệu mô tả kiến trúc mục tiêu. Các mô hình và pipeline bên dưới chưa được triển khai hoặc đánh giá trên dữ liệu sản phẩm.

## Phạm vi

ML hỗ trợ người thuê tìm tin đăng phù hợp hơn qua xếp hạng cá nhân hóa, gợi ý tin tương tự và khoảng giá chào thuê tham khảo. FastAPI sở hữu nghiệp vụ sản phẩm; pipeline và inference ML viết bằng Python, giao tiếp qua hợp đồng nội bộ. API công khai được mô tả tại [API](../06-api/README.md).

## Đọc theo thứ tự

1. [Bài toán, dữ liệu và feature](problem-and-data.md)
2. [Recommendation và tin tương tự](recommendation.md)
3. [Ước lượng giá chào thuê](asking-price.md)
4. [Đánh giá và vòng đời model](evaluation-and-lifecycle.md)

## Nguyên tắc

- Bắt đầu bằng baseline có thể giải thích; chỉ thêm mô hình phức tạp khi baseline và dữ liệu tương tác chứng minh được giá trị.
- Tách tin đăng khỏi phòng thực. Mô hình dự đoán giá ước lượng giá chào trong tin đăng, không phải giá giao dịch.
- Người thuê không cần tài khoản ở giai đoạn đầu. Cá nhân hóa khởi đầu từ tiêu chí khai báo và có thể dùng session ID ẩn danh cho phản hồi.
- Địa bàn đủ dữ liệu được xác định từ nguồn crawl đã kiểm chứng; không ngoại suy độ phủ mô hình sang khu vực thiếu dữ liệu.
- Chưa có số liệu accuracy hay chất lượng mô hình nào được xác nhận. Mọi kết quả phải gắn với phiên bản dataset, model, thời điểm và giao thức đánh giá.
