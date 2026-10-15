# Vision và phạm vi MVP

## Vision

HomeMatch giúp người thuê tìm và đánh giá tin phòng phù hợp với nhu cầu của họ. Người dùng mô tả ngân sách, khu vực và ưu tiên; sản phẩm lọc điều kiện bắt buộc, xếp hạng các tin phù hợp, giải thích thứ tự gợi ý, đưa ra lựa chọn tương tự và cung cấp khoảng giá chào thuê tham khảo khi dữ liệu đủ tốt.

Sản phẩm phục vụ người thuê nói chung, không giới hạn ở sinh viên hay một nhóm nghề nghiệp. Địa bàn khả dụng được xác định bởi nguồn dữ liệu đã được kiểm chứng và chất lượng dữ liệu thực tế. Không hứa hẹn độ phủ toàn quốc nếu hệ thống chưa có dữ liệu tương ứng.

## Người dùng và nhu cầu chính

- Người đang tìm chỗ thuê: muốn thu hẹp danh sách nhanh theo ngân sách, vị trí, thời điểm chuyển vào và tiện ích.
- Người đang cân nhắc một tin: muốn hiểu tin phù hợp ở điểm nào, thiếu thông tin gì và có lựa chọn gần giống nào.
- Người so sánh nhiều lựa chọn: muốn nhìn thấy điểm khác nhau về chi phí, vị trí, diện tích, tiện ích và tình trạng tin.

## Use cases ưu tiên

1. Khai báo hoặc điều chỉnh nhu cầu tìm phòng mà không phải tạo tài khoản.
2. Duyệt danh sách được xếp hạng theo mức phù hợp, với lý do dễ hiểu.
3. Mở một tin, kiểm tra chi tiết, thời điểm xác minh và các trường thông tin còn thiếu.
4. Xem tin tương tự khi tin hiện tại không phù hợp, đã hết hạn hoặc không còn khả dụng.
5. So sánh một số tin và lưu tin trên thiết bị để quay lại.
6. Tham khảo khoảng giá chào thuê của các tin tương đồng, kèm mô tả giới hạn dữ liệu.
7. Gửi phản hồi đơn giản như lưu, bỏ qua hoặc mở tin; gắn tương tác với session ID ẩn danh để cải thiện đánh giá trải nghiệm.

## Phạm vi MVP mục tiêu

- Luồng tìm kiếm cho người thuê nói chung, có thể bắt đầu từ nhu cầu tự khai báo.
- Lọc điều kiện bắt buộc và xếp hạng dựa trên các ưu tiên người dùng chọn; giải thích những yếu tố ảnh hưởng đến gợi ý.
- Danh sách, trang chi tiết, tin tương tự, so sánh và lưu cục bộ.
- Trạng thái dữ liệu rõ ràng: thiếu, cũ, hết hạn hoặc chưa xác minh.
- Khoảng giá chào thuê tham khảo chỉ xuất hiện khi có đủ nhóm tin tương đồng và đánh giá chất lượng phù hợp.
- Không yêu cầu tài khoản. Sở thích và tin đã lưu tồn tại cục bộ; tương tác sản phẩm dùng session ID không định danh.
- Độ phủ tìm kiếm được thông báo theo dữ liệu thực tế đã kiểm chứng.

## Ngoài phạm vi MVP

- Đăng tin bởi người thuê/chủ nhà, đặt phòng, thanh toán, hợp đồng hoặc chat trong ứng dụng.
- Dịch vụ ghép người ở, quản lý sale/lead, cổng Admin CRUD cho hoạt động kinh doanh cũ.
- Đăng nhập bắt buộc, hồ sơ định danh hoặc đồng bộ sở thích giữa nhiều thiết bị.
- Khẳng định phòng còn trống nếu trạng thái chưa được xác minh gần đây.
- Đưa ra “giá giao dịch” hoặc dự báo giá tương lai từ dữ liệu giá chào thuê.
- Mô hình học sâu hoặc mô hình cá nhân hóa dựa trên hành vi trước khi có dữ liệu tương tác đủ chất lượng.

## Trạng thái hiện tại và mục tiêu

Repository hiện có website và backend từ sản phẩm trước, cùng các phần Admin/API đang phát triển. Chúng không đồng nghĩa với việc sản phẩm mới đã có recommendation, mô hình giá hay trải nghiệm cá nhân hóa. Trong đợt tái cấu trúc này, tài liệu mô tả **target state**; mã nguồn, dữ liệu và triển khai sẽ được đánh giá ở các giai đoạn sau.

## Nguyên tắc phát hành

- Khả năng nào chưa có dữ liệu hoặc chưa qua kiểm định phải được ẩn hoặc gắn nhãn giới hạn.
- Người dùng có thể sử dụng tìm kiếm cơ bản ngay cả khi ML không khả dụng.
- Mọi gợi ý phải có căn cứ giải thích được từ nhu cầu và thuộc tính tin.
- Khoảng giá phải thể hiện đây là ước lượng từ giá chào thuê, đi kèm độ bất định và thời điểm dữ liệu.
- Không suy diễn dữ liệu thiếu thành giá trị chắc chắn.
