# Foundation feasibility experiments

Thư mục này chứa các spike tách khỏi app production cho idea mới. Hiện chưa có spike nào. Khi thêm spike, đảm bảo:

- Không đọc credential legacy hoặc bật feed mặc định.
- Không import spike vào app/service runtime.
- Chuyển logic đã kiểm chứng vào implementation sau review và bổ sung contracts/tests phù hợp.
- Mọi kết quả browser là `client-computed` trên dữ liệu synthetic.
