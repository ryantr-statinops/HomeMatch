# Quy tắc sản phẩm
**Trạng thái:** yêu cầu mục tiêu.

1. News là luồng khám phá chính; chart, portfolio và model cung cấp bối cảnh và kiểm chứng.
2. Mỗi account sở hữu workspace, watchlists, portfolio và experiments. Backend enforce quyền, không chỉ ẩn nút.
3. Chỉ hiển thị coverage/latency thực có; source unapproved không thành dữ liệu production.
4. Giá trị chưa biết khác 0. Tin cũ, giá cũ, nến mở và dữ liệu mẫu đều có nhãn.
5. Sentiment không đồng nghĩa signal; in-sample accuracy không chứng minh alpha.
6. Kết quả browser là client-computed; người dùng không thể tự gửi flag để có verified badge.
7. Experiment mặc định private; public demo/report là lựa chọn riêng, không suy ra từ đăng ký tài khoản.
8. Không thu khóa giao dịch sàn hoặc đặt lệnh; portfolio là ledger mô phỏng/theo dõi.
9. UI tiếng Việt, lưu UTC và hiển thị timezone. USDT không tự đổi thành USD/VND.
10. Login/logout và tab lifecycle kiểm soát live; thu news/history theo lịch độc lập.
11. Form Model Lab chỉ dùng danh sách feature/model được phép, không thực thi mã do người dùng nhập.
12. Truy cập miễn phí, quyền ML, quyền public display và chi phí hạ tầng là bốn câu hỏi riêng.

Managed Auth provider, giới hạn browser và ngưỡng freshness/quota phải được chốt có evidence ở các phase tương ứng; chưa ghi như tính năng đã có.
