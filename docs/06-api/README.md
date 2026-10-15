# API

> **Trạng thái:** hợp đồng mục tiêu cho sản phẩm mới; endpoint và schema hiện tại chưa triển khai theo tài liệu này.

## Đọc theo thứ tự

1. [API công khai qua Gateway](public-api.md)
2. [API nội bộ FastAPI và ML](internal-api.md)
3. [Hợp đồng sự kiện](events.md)

## Ranh giới

- Web client gọi Go Gateway; không truy cập database, FastAPI nội bộ hoặc model service trực tiếp.
- Gateway chịu routing, request ID, timeout, giới hạn truy cập và chuyển tiếp lỗi. Không chứa nghiệp vụ xếp hạng hay schema database.
- FastAPI sở hữu nghiệp vụ tìm kiếm/gợi ý/tin chi tiết và điều phối tới dữ liệu, ML inference.
- Python ML cung cấp nội bộ các khả năng ranking, similarity và asking-price estimate; không phải API công khai cho browser.
- Go crawler là batch producer, không được chạy trong request đồng bộ của người thuê.

## Quy ước chung

- Version public API theo prefix `/api/v1`; thay đổi phá vỡ tương thích tạo version mới. Chưa khóa danh sách route hoặc payload đầy đủ.
- Request có correlation/request ID; Gateway chuyển tiếp ID tới FastAPI và trả ID này trong response header để hỗ trợ tra cứu.
- Filter được validate và chuẩn hóa ở biên FastAPI; pagination có giới hạn tối đa và thứ tự ổn định.
- Lỗi có mã máy đọc được, thông điệp an toàn cho người dùng và request ID. Không trả stack trace, SQL, URL bí mật hoặc dữ liệu cá nhân.
- Listing có trạng thái dữ liệu/freshness; không diễn đạt thiếu dữ liệu như 0 hoặc false.
- API thiết kế anonymous-first: session ID ngẫu nhiên tùy chọn cho tương tác; không yêu cầu tài khoản.
