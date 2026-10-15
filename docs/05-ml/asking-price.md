# Ước lượng giá chào thuê

> **Trạng thái:** mục tiêu nghiên cứu. Chưa có model, tập dữ liệu chuẩn hoặc kết quả accuracy được xác nhận.

## Ý nghĩa đầu ra

Ước lượng khoảng giá chào thuê của một tin dựa trên listing tương đồng. Đây không phải giá giao dịch, định giá tài sản, cam kết giá hay dự báo giá tương lai. Giao diện và API cần gọi đúng là giá chào tham khảo, kèm thời điểm dữ liệu và mức độ bất định.

## Target và feature

Target khởi đầu là giá thuê tháng được trích từ tin đăng và chuẩn hóa đơn vị tiền/kỳ hạn. Nếu dữ liệu không cho phép tách phí, ghi nhận giá thuê chưa gồm/đã gồm/không rõ; không trộn các loại target. Xem xét log-price hoặc robust loss khi phân phối lệch, nhưng chọn cách cuối sau phân tích dữ liệu.

Feature candidate: khu vực và chất lượng geocoding, diện tích, loại hình, phòng riêng/chung nếu được xác định, nội thất, tiện ích, giá trị phí được quan sát, thời điểm đăng/crawl và chất lượng trích xuất. Không dùng listing ID, URL hay biến proxy gây ghi nhớ dữ liệu. Không dùng dữ liệu sau thời điểm dự đoán.

## Baseline và đầu ra bất định

Baseline so sánh gồm median của nhóm tin tương đồng theo khu vực/loại hình, và một mô hình tabular đơn giản nếu kích thước/độ phủ dữ liệu cho phép. Baseline không có mẫu đủ tương tự phải báo insufficient evidence.

Đầu ra v1 là khoảng dự đoán hoặc phân vị kèm cỡ mẫu/hỗ trợ dữ liệu, không chỉ một giá điểm. Hiệu chỉnh coverage của khoảng trên tập validation theo các lát cắt đủ dữ liệu. Không hiển thị khoảng có độ bất định quá lớn như một khuyến nghị chính xác; fallback sang thống kê nhóm có gắn giới hạn hoặc trạng thái chưa đủ dữ liệu.

## Phạm vi và công bằng dữ liệu

Chỉ bật ước lượng trong khu vực, loại nhà và khoảng thời gian có độ phủ được xác nhận. Đánh giá sai số riêng theo khu vực, mức giá, loại hình và độ đầy đủ dữ liệu; báo rõ nơi model không được hỗ trợ. Giá listing có thể bị sai, cũ hoặc trùng. Deduplicate theo phòng/cụm tin và kiểm tra ngoại lệ trước khi train.
