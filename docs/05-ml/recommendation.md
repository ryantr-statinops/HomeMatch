# Recommendation và tin tương tự

> **Trạng thái:** mục tiêu thiết kế. Chưa có ranking model được huấn luyện trên dữ liệu sản phẩm.

## Luồng xếp hạng

1. FastAPI lấy candidate listings từ dữ liệu phục vụ, loại tin hết hạn/không đủ điều kiện hiển thị và áp dụng hard filters.
2. Khi chưa có model, baseline tính điểm từ độ phù hợp với ngân sách, khoảng cách, loại phòng và tiện ích/sở thích khai báo. Chuẩn hóa các thành phần về cùng chiều điểm; các trọng số mặc định được cấu hình và ghi phiên bản.
3. Trả thứ tự cùng các lý do có thể kiểm chứng từ feature đầu vào, chẳng hạn phù hợp khoảng ngân sách hoặc gần vị trí đã chọn.
4. Khi có phản hồi đủ chất lượng, đánh giá learning-to-rank hoặc mô hình tương tác offline trước khi bật. Không thay baseline chỉ vì chỉ số train tốt hơn.

Hard filter và soft preference phải được phân biệt. Preference có thể đánh đổi; điều kiện bắt buộc không được bù bằng điểm cao ở yếu tố khác. Nếu không có kết quả, trả trạng thái rỗng và cho biết nhóm bộ lọc có thể nới lỏng mà không tự ý nới điều kiện.

## Cold start và phản hồi

Cold start dùng nhu cầu khai báo, content features và ranking baseline. Không cần hồ sơ tài khoản. Có thể lưu sở thích cục bộ trên thiết bị; phản hồi gửi server nếu có session ID ẩn danh. Session mới bắt đầu ở baseline, sau đó chỉ điều chỉnh thứ hạng khi có đủ tín hiệu được kiểm định.

Phản hồi không đồng nghĩa với nhãn tuyệt đối. Click bị ảnh hưởng bởi thứ tự hiển thị; impression và vị trí cần được ghi nhận nếu dùng click để học. Bỏ qua không phải bằng chứng không thích nếu người dùng chưa thấy tin hoặc chưa có cơ hội tương tác.

## Tin tương tự

Similarity dùng thuộc tính listing đã chuẩn hóa như khu vực ở cấp độ dữ liệu đáng tin cậy, khoảng giá, diện tích, loại hình, tiện ích và trạng thái. Tín hiệu văn bản chỉ bổ sung, không làm mất hard constraints. Loại chính tin nguồn và các bản ghi cùng duplicate cluster khỏi kết quả thay thế. Kết quả phải còn hiệu lực theo freshness policy.

## Giải thích và fallback

Mỗi lý do hiển thị phải liên kết tới thuộc tính quan sát được; không tạo giải thích hậu nghiệm không thể kiểm tra. Hạn chế số lý do và tránh ngôn ngữ chắc chắn khi dữ liệu vị trí/phí chưa đầy đủ.

Nếu model service lỗi, phiên bản model không tương thích, kết quả quá hạn hoặc latency vượt ngưỡng, FastAPI quay về ranking baseline nếu dữ liệu candidate còn dùng được. Nếu cả baseline lẫn dữ liệu đều không sẵn sàng, trả lỗi dịch vụ có thể retry, không trả danh sách rỗng giả như thể đã tìm kiếm thành công.
