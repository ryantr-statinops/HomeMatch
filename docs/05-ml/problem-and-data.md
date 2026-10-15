# Bài toán ML và dữ liệu

> **Trạng thái:** mục tiêu thiết kế, chưa triển khai. Schema cuối cùng phụ thuộc tài liệu data và khảo sát nguồn crawl.

## Bài toán

1. Xếp hạng các tin đăng đang phù hợp với nhu cầu và ưu tiên của người thuê.
2. Tìm các tin tương tự để đưa ra lựa chọn thay thế.
3. Ước lượng khoảng giá chào thuê tham khảo từ các tin có đặc điểm tương đồng.

ML không quyết định điều kiện bắt buộc thay người dùng. Trước ranking, backend áp dụng các hard filters như ngân sách tối đa, loại chỗ ở hoặc điều kiện người dùng đánh dấu bắt buộc. Dữ liệu không đủ hoặc không tin cậy phải được thể hiện là chưa biết, không được biến thành một khẳng định thuận tiện.

## Input và feature

Feature candidate cho một listing gồm giá thuê và các phí đã chuẩn hóa, diện tích, loại hình, vị trí/độ chính xác vị trí, tiện ích, nội thất, quy định, thời điểm đăng/crawl, trạng thái freshness, mức đầy đủ dữ liệu và nội dung văn bản đã xử lý. Chỉ dùng ảnh khi có pipeline chất lượng, quyền sử dụng và đánh giá riêng.

Query của người thuê có thể gồm ngân sách tổng tháng, vị trí mong muốn, bán kính/điểm đến, loại phòng, điều kiện bắt buộc, sở thích có thể đánh đổi và mức ưu tiên. Không suy ra thuộc tính nhạy cảm hoặc đặc điểm cá nhân không cần thiết. Không đưa dữ liệu nhận dạng vào feature.

Feature phải có nguồn gốc và thời điểm hiệu lực. Với mọi trường số, lưu rõ missingness và đơn vị; không coi giá trị thiếu là 0. Chi phí tổng chỉ tính từ các thành phần có dữ liệu, đồng thời giữ các khoản chưa biết để UI/API giải thích giới hạn.

## Nhãn và phản hồi

Khi chưa có log hành vi đủ tin cậy, không tạo nhãn tương tác giả. Baseline recommendation dùng query khai báo kết hợp thuộc tính listing. Sau khi sản phẩm thu thập phản hồi, các sự kiện có thể dùng làm nhãn yếu:

- Xem chi tiết: tín hiệu quan tâm nhẹ, có thể bị ảnh hưởng bởi vị trí hiển thị.
- Lưu tin hoặc đưa vào so sánh: tín hiệu quan tâm mạnh hơn.
- Bỏ qua/ẩn: tín hiệu không phù hợp nếu hành động rõ ràng; không suy luận từ việc không click.
- Liên hệ: tín hiệu ý định mạnh nhưng có thể thiếu hoặc không quan sát được.

Sự kiện nên mang session ID ngẫu nhiên, listing ID, loại hành động, thời điểm và ngữ cảnh vị trí hiển thị. Không yêu cầu tên, email hay số điện thoại để cá nhân hóa. Có chính sách thời hạn lưu và xóa session; dữ liệu tương tác chỉ được bật làm nhãn khi đã kiểm tra chất lượng, consent/notice và bias do exposure.

## Chia dữ liệu và leakage

Snapshot listing có thể thay đổi theo thời gian. Feature của một mẫu chỉ được lấy từ trạng thái đã biết tại thời điểm truy vấn/hiển thị. Không dùng giá, trạng thái còn phòng, tiện ích hoặc chỉnh sửa được thu thập sau mốc dự đoán.

Các bản ghi thuộc cùng một phòng thực hoặc cụm tin trùng phải nằm cùng partition. Khi đo khả năng tổng quát sang tin mới, dùng group split theo room/duplicate cluster; khi mô phỏng vận hành, dùng time split theo thời điểm crawl/đăng. Không để cùng tin hoặc phiên bản gần trùng xuất hiện ở cả train và test. Lưu định nghĩa split để tái lập.
