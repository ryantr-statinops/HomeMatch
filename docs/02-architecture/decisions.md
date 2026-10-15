# Architecture decisions

| ID | Quyết định | Trạng thái |
|---|---|---|
| ADR-001 | Frontend dùng React/Vite/React Router/TypeScript/Tailwind | Accepted |
| ADR-002 | Go Gateway giữ mỏng; FastAPI sở hữu nghiệp vụ và API domain | Accepted |
| ADR-003 | ML pipeline và inference logic dùng Python; model/provider là boundary riêng | Accepted |
| ADR-004 | Go crawler là batch workload độc lập | Accepted |
| ADR-005 | PostgreSQL cho dữ liệu cấu trúc; object storage qua abstraction cho artifacts | Accepted, vendor TBD |
| ADR-006 | Request workloads hướng tới Vercel; crawl/training chạy trên batch runtime riêng | Accepted, runtime validation required |
| ADR-007 | Listing là dữ liệu nguồn; room là thực thể hợp nhất riêng | Accepted |
| ADR-008 | Không bắt buộc renter account trong giai đoạn đầu; interaction dùng anonymous session | Accepted, privacy review required |
| ADR-009 | Coverage theo nguồn crawl được xác minh | Accepted |

## Cần quyết định sau discovery

- Nguồn đầu tiên, điều khoản truy cập, robots/rate policy và quyền lưu/hiển thị nội dung.
- Provider PostgreSQL/object storage và thời hạn lưu raw/artifact.
- Phạm vi geography/categories dựa trên coverage đo được.
- Anonymous interaction retention, consent và xóa session.
- Vercel request runtime có đáp ứng workload thực sau load/cold-start test không.
- Crawler scheduling/queue/observability provider.

Mọi quyết định sau phải ghi rationale, alternatives, evidence, owner và trigger để xem lại.
