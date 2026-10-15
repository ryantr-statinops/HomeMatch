# Development workflow
**Trạng thái:** local fixture workflow đã có trong P01; nghiệp vụ/provider vẫn target.

P01 chuyển reusable UI và gỡ domain/runtime legacy bằng commit nhỏ. [README setup](../../README.md) và [API setup](../../services/api/README.md) mô tả lệnh hiện có. `npm ci`, `npm run security:env-boundaries`, `npm run fixtures:check`, `npm run test:tooling`, `npm run lint`, `npm run typecheck`, `npm run build` là các checks web. Go dùng `go -C services/gateway test ./...` và `go -C services/ingestion test ./...`. API dùng frozen uv lock và pytest; OpenAPI xuất vào `packages/contracts/openapi.json`. P02 mới chọn managed auth/storage và khóa browser runtime sau spike.

Local mặc định dùng fixtures synthetic/licensed, không gọi sàn/nguồn thật hoặc legacy credential. Network source tests là nhóm opt-in, ghi provider/date/region và không chạy bằng production account trong CI.

API contract, manifest và enums có owner. FastAPI OpenAPI/client schema thay cùng implementation; worker message/config/artifact schema versioned để JS/Python không lệch. Money dùng decimal contract; browser quote chỉ display, không là bằng chứng fill.

Data snapshots và run configs phải pin source/code/runtime/feature versions, timezone và seed. Không commit private CSV/raw news lớn/credential/model binaries. Khi source thay terms hoặc schema, cập nhật source register và consumers, không chỉ sửa adapter.

Mỗi change gắn task ID, phạm vi, verification và rollback. Các routine checks chỉ chạy mức phù hợp; network/model benchmarks cần evidence, không mô phỏng kết quả đạt.
