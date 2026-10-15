# Quy tắc sản phẩm

Các quy tắc này áp dụng cho trải nghiệm tìm phòng cá nhân hóa mục tiêu. Chúng thay thế quy tắc sản phẩm cũ trong các tài liệu thuộc thư mục này; không xác nhận rằng code hiện tại đã tuân thủ.

## Người thuê và quyền riêng tư

1. Người thuê có thể tìm kiếm mà không đăng ký hoặc đăng nhập.
2. Sở thích và tin đã lưu của MVP được giữ cục bộ trên thiết bị.
3. Tương tác được gắn session ID ngẫu nhiên, không dùng dữ liệu nhận dạng trực tiếp trong ID.
4. Sản phẩm không được chặn tìm kiếm cơ bản khi người dùng không đồng ý lưu sở thích.

## Tin và dữ liệu

5. Một tin đăng là bản ghi từ nguồn; nhiều tin có thể nói về cùng một phòng. Không đồng nhất tin với phòng vật lý.
6. Giá hiển thị là giá chào thuê do tin cung cấp hoặc được chuẩn hóa từ tin, không mặc định là tổng chi phí hàng tháng.
7. Phí chưa biết phải biểu thị là chưa biết, không được hiển thị như miễn phí.
8. Trạng thái còn hiệu lực cần căn cứ lần xác minh/cập nhật gần nhất; tin quá cũ hoặc hết hạn phải có nhãn và xử lý phù hợp.
9. Độ phủ địa lý chỉ phản ánh các nguồn đã kiểm chứng và dữ liệu hiện có.

## Gợi ý và ML

10. Điều kiện bắt buộc của người dùng không thể bị điểm xếp hạng thấp ghi đè.
11. Giải thích gợi ý phải gắn với thuộc tính tin và ưu tiên người dùng đã khai báo hoặc thể hiện; không bịa lý do.
12. Khi chưa có hành vi lịch sử, dùng nhu cầu khai báo và baseline minh bạch.
13. Gợi ý tương tự dựa trên thuộc tính có sẵn; trường thiếu không được coi là không khớp.
14. Giá dự đoán là khoảng giá chào thuê tham khảo, chỉ hiển thị khi mẫu đủ và phải kèm bất định.
15. Nếu ML không sẵn sàng, tìm kiếm/filter cơ bản vẫn hoạt động và sản phẩm không giả vờ đã dùng mô hình.

## Quyết định người dùng

16. Không ép liên hệ qua một kênh duy nhất như Zalo làm mục tiêu sản phẩm.
17. Không có booking, payment, hợp đồng, chat realtime hay đăng tin người dùng trong MVP.
18. Không tạo dark pattern gây hiểu nhầm về độ khan hiếm, độ phù hợp, tính xác thực hoặc độ chính xác giá.
