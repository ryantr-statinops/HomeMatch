# Trạng thái giao diện và accessibility

## Trạng thái bắt buộc

| Trạng thái | Cách thể hiện |
|---|---|
| Đang tải | Skeleton có kích thước ổn định, thông báo tiến trình nếu chờ lâu; tránh nhấp nháy bố cục. |
| Không có kết quả | Nói rõ không có tin phù hợp với điều kiện hiện tại; đề xuất bộ lọc có thể nới và nút chỉnh nhu cầu. |
| Lỗi tải | Nêu việc tải thất bại, giữ bộ lọc, cung cấp thử lại. |
| ML unavailable | Tiếp tục tìm kiếm theo baseline/filter; giải thích khi thứ tự gợi ý bị ảnh hưởng. |
| Thiếu dữ liệu | Dùng “Chưa có thông tin”; không thay bằng 0 hoặc suy đoán. |
| Stale | Nêu rõ lần xác minh/cập nhật gần nhất nếu có và cảnh báo trước quyết định. |
| Expired | Gắn nhãn hết hạn, tránh đề xuất như lựa chọn hiện hành; gợi ý tin tương tự còn hiệu lực. |
| Ước lượng chưa đủ tin cậy | Không hiển thị con số; giải thích thiếu dữ liệu so sánh. |
| Cold start | Gợi ý theo yêu cầu đã khai báo, kèm giải thích không cần lịch sử trước đó. |
| Lưu local thất bại | Thông báo giới hạn lưu trên thiết bị, không làm hỏng tìm kiếm hoặc kết quả. |

## Accessibility

- Toàn bộ luồng tìm kiếm, lọc, lưu, so sánh và quay lại phải thao tác được bằng bàn phím.
- Có thứ tự focus rõ, focus indicator dễ nhận biết, nhãn/legend cho control và thông báo lỗi gắn với trường liên quan.
- Dùng heading có cấu trúc; thành phần tương tác có tên truy cập được.
- Không chỉ dùng màu để biểu đạt phù hợp, freshness hoặc lỗi.
- Tôn trọng giảm chuyển động; chuyển động không được che nội dung hoặc trì hoãn thao tác.
- Thiết kế ở mức zoom và kích thước chữ lớn vẫn đọc được, không yêu cầu thao tác chính xác nhỏ.
- Ảnh có alt text phù hợp; ảnh trang trí dùng cách xử lý để screen reader bỏ qua.

## Responsive và mobile

- Trường nhập và nút hành động chính có kích thước chạm phù hợp, không đặt thao tác nguy hiểm sát nhau.
- Bộ lọc có thể mở/đóng nhưng số filter đang bật luôn dễ nhận ra.
- Thẻ kết quả giữ thông tin quyết định quan trọng trước khi cuộn.
- So sánh phải thay đổi cách trình bày trên màn hình hẹp, giữ tiêu đề tin/thuộc tính nhận diện được.

## Kiểm tra chấp nhận

- Hoàn thành một lần tìm kiếm chỉ bằng bàn phím.
- Screen reader nhận biết được tiêu đề, label, trạng thái lưu và thông báo no-results/lỗi.
- No-results, stale và expired vẫn truyền đạt đầy đủ khi không có màu.
- Ở viewport hẹp, không mất giá, trạng thái dữ liệu hay hành động chính.
