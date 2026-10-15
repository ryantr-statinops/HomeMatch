# Nguyên tắc giao diện

## Mục tiêu

Giúp người thuê hiểu nhanh tin nào đáng cân nhắc và vì sao, đồng thời không che giấu dữ liệu thiếu hoặc chưa chắc chắn.

## Nguyên tắc

- Bắt đầu từ nhu cầu của người thuê; ưu tiên tìm kiếm hơn quảng cáo hoặc luồng liên hệ.
- Dùng ngôn ngữ trực tiếp: giá chào thuê, phí chưa rõ, lần cập nhật gần nhất, lý do gợi ý.
- Tạo phân cấp thị giác cho giá, vị trí, điều kiện phù hợp và freshness; không để badge ML lấn át dữ liệu thực.
- Giải thích gợi ý bằng tối đa vài lý do có ý nghĩa và truy nguyên được.
- Phân biệt rõ dữ liệu nguồn, dữ liệu chuẩn hóa và ước lượng của hệ thống.
- Cung cấp lựa chọn chỉnh bộ lọc khi kết quả ít hoặc trống.
- Mobile-first: thao tác chính dùng được bằng một tay; so sánh nhiều tin có cách trình bày thích ứng.
- Màu sắc không phải phương tiện duy nhất để biểu đạt trạng thái; giữ tương phản và focus rõ.

## Thành phần và nội dung cần nhất quán

- Thẻ tin: ảnh (nếu có), giá chào, khu vực, diện tích, điểm phù hợp ngắn, thời điểm dữ liệu và trạng thái.
- Bộ lọc: phân biệt điều kiện bắt buộc với sở thích có thể đánh đổi.
- Huy hiệu: dùng từ rõ nghĩa như “Vừa xác minh”, “Cần cập nhật”, “Đã hết hạn”, “Ước lượng”.
- Ảnh không có hoặc tải lỗi: dùng placeholder có nhãn hỗ trợ, không làm vỡ bố cục.
- Các con số luôn kèm đơn vị; chi phí chưa rõ không được thay bằng số 0.

## Trạng thái triển khai

Đây là nguyên tắc target cho thiết kế mới. Stack UI, thư viện component và tokens dùng chung sẽ được chốt trong tài liệu kiến trúc/engineering.
