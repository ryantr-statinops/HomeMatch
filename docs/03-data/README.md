# Dữ liệu

> **Trạng thái: tài liệu mục tiêu, chưa được triển khai.** Các entity, luồng và quy tắc dưới đây là định hướng cho sản phẩm tìm phòng cá nhân hóa. Chúng không mô tả schema/database đang chạy.

Thư mục này là nguồn sự thật cho mô hình dữ liệu, ý nghĩa field, lineage, chất lượng, vòng đời và lưu trữ. Kiến trúc dịch vụ nằm trong `../02-architecture/`; giao diện API cụ thể thuộc `../06-api/` khi tài liệu đó được hoàn thiện.

## Đọc theo thứ tự

1. [Mô hình khái niệm và từ điển dữ liệu](data-model.md): entity, quan hệ và cách phân biệt tin đăng với phòng vật lý.
2. [Vòng đời và chất lượng dữ liệu](data-lifecycle-and-quality.md): raw/normalized/serving, lineage, snapshots, deduplication, freshness và các quy tắc kiểm tra.
3. [Lưu trữ, quyền riêng tư và retention](storage-and-privacy.md): hợp đồng lưu trữ độc lập nhà cung cấp, dữ liệu nhạy cảm, retention và xóa.

## Nguyên tắc

- Một tin đăng (`Listing`) là nội dung của một nguồn tại một thời điểm; không mặc định nó là một phòng vật lý (`Room`).
- Giá lưu từ tin là giá chào thuê. Mô hình chỉ có thể ước lượng giá chào thuê tham khảo, không được gọi là giá giao dịch.
- Không xác định được giá trị phải biểu diễn là chưa biết/thiếu; không dùng `0` làm sentinel cho giá, phí, diện tích hoặc khoảng cách.
- Mọi giá trị chuẩn hóa phải truy ngược được về lần thu thập và nguồn gốc tương ứng.
- Khu vực phục vụ phụ thuộc vào nguồn đã được khảo sát và độ phủ được đo; chưa chốt một tỉnh/thành hay nguồn crawl cụ thể.

