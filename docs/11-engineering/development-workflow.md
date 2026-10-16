# Development workflow
**Trạng thái:** target.

P01 inventory reusable UI và gỡ domain/runtime legacy bằng commit nhỏ. P02 khóa language/package versions, lockfiles, managed auth provider, storage và scripts có thể tái lập. Chưa ghi lệnh mới như thể tồn tại; README setup phải được cập nhật bằng kết quả chạy thực ở phase đó.

Local mặc định dùng fixtures synthetic/licensed, không gọi sàn/nguồn thật hoặc legacy credential. Network source tests là nhóm opt-in, ghi provider/date/region và không chạy bằng production account trong CI.

API contract, manifest và enums có owner. FastAPI OpenAPI/client schema thay cùng implementation; worker message/config/artifact schema versioned để JS/Python không lệch. Money dùng decimal contract; browser quote chỉ display, không là bằng chứng fill.

Data snapshots và run configs phải pin source/code/runtime/feature versions, timezone và seed. Không commit private CSV/raw news lớn/credential/model binaries. Khi source thay terms hoặc schema, cập nhật source register và consumers, không chỉ sửa adapter.

Mỗi change gắn task ID, phạm vi, verification và rollback. Các routine checks chỉ chạy mức phù hợp; network/model benchmarks cần evidence, không mô phỏng kết quả đạt.
