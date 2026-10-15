# Hành trình người dùng

Các luồng dưới đây mô tả trải nghiệm mục tiêu. Chúng chưa phải xác nhận về chức năng đang có trong sản phẩm hiện tại.

## Journey A — Bắt đầu tìm phòng

1. Người dùng mở trang khám phá và biết được khu vực nào đang có dữ liệu.
2. Nhập ngân sách, khu vực hoặc điểm đến, thời điểm cần thuê và các điều kiện bắt buộc.
3. Chọn các ưu tiên có thể đánh đổi, ví dụ gần hơn, rộng hơn hoặc có nội thất.
4. Xem lại nhu cầu đã chọn rồi nhận danh sách phù hợp.
5. Nếu không có kết quả, hệ thống chỉ ra bộ lọc nào đang giới hạn lựa chọn và cho phép nới từng điều kiện.

## Journey B — Đánh giá gợi ý

1. Người dùng xem các tin phù hợp theo thứ tự xếp hạng.
2. Mỗi tin hiển thị giá, vị trí, điểm nổi bật, tình trạng xác minh và lý do được gợi ý.
3. Người dùng mở chi tiết, kiểm tra ảnh, chi phí, tiện ích, thời điểm cập nhật và trường dữ liệu còn thiếu.
4. Có thể lưu tin, thêm vào so sánh, đánh dấu không phù hợp hoặc xem tin tương tự.
5. Sở thích tự khai báo vẫn được dùng ngay cả khi người dùng chưa có tương tác trước đó (cold start).

## Journey C — So sánh và lưu

1. Người dùng thêm các tin vào danh sách so sánh.
2. Giao diện trình bày cùng một tập thuộc tính theo cấu trúc nhất quán, làm rõ trường thiếu và dữ liệu cũ.
3. Người dùng lưu lựa chọn trên thiết bị mà không tạo tài khoản.
4. Khi quay lại, sản phẩm kiểm tra trạng thái tin mới nhất có sẵn và thông báo nếu tin đã hết hạn hoặc thay đổi.

## Journey D — Đọc khoảng giá tham khảo

1. Người dùng mở tin có đủ dữ liệu so sánh.
2. Sản phẩm hiển thị khoảng giá chào thuê ước lượng từ tin tương đồng, kèm thời điểm dữ liệu và giải thích ngắn.
3. Người dùng hiểu đây là tham khảo, không phải giá giao dịch hoặc cam kết thương lượng.
4. Nếu mẫu dữ liệu ít, cũ hoặc lệch khu vực, giao diện nói rõ chưa đủ cơ sở thay vì đưa ra con số thiếu tin cậy.

## Journey E — Session ẩn danh

1. Khi cần ghi nhận tương tác, client tạo hoặc dùng lại một session ID ngẫu nhiên, không chứa danh tính trực tiếp.
2. Sự kiện lưu, bỏ qua, xem chi tiết hoặc so sánh được gắn với session trong phạm vi chính sách dữ liệu.
3. Người dùng vẫn có thể xóa dữ liệu cục bộ; việc xóa hoặc hết hạn session không làm mất khả năng tìm kiếm cơ bản.

## Các nhánh lỗi phải có

- Không có kết quả: chỉ rõ điều kiện nào có thể nới; không làm như hệ thống đã tìm thấy phòng phù hợp.
- Dữ liệu stale/expired: gắn trạng thái gần vị trí ra quyết định, loại khỏi kết quả mặc định nếu trạng thái không còn đủ tin cậy.
- ML unavailable: quay về thứ tự lọc/heuristic đã định nghĩa và thông báo khi điều đó ảnh hưởng đáng kể đến trải nghiệm.
- Thiếu vị trí hoặc chi phí: không hiển thị giá trị như chắc chắn; cho phép người dùng cân nhắc tin với nhãn thiếu dữ liệu.
