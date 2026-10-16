# Foundation feasibility experiments

Các spike tách khỏi app production, không đọc credential legacy hoặc bật feed mặc định. Tài liệu quyết định/gates ở [P02](../task/research-terminal-plan/03-foundation-feasibility.md).

- [Auth/JWT](auth-feasibility/README.md): test offline bằng RSA keys sinh trong RAM, chưa chọn provider hoặc triển khai auth API.
- [Browser harness](browser-feasibility/index.html): chạy bằng static server chỉ trỏ vào thư mục này theo [hướng dẫn và báo cáo](../task/research-terminal-plan/p02-browser-feasibility.md); direct public stream chỉ khi operator bấm Connect, runtime CDN chỉ tải khi Run. Không phục vụ repo root vì có thể lộ ignored secrets.
- [Market access](market-access/README.md): CLI network opt-in, chỉ lưu metadata; không phải historical ingestion hoặc source-rights approval.

Không import spike vào app/service runtime; chuyển logic đã kiểm chứng vào implementation sau review và bổ sung contracts/tests phù hợp. Mọi kết quả browser là `client-computed` trên dữ liệu synthetic.
