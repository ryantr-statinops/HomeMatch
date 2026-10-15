# Repository mục tiêu
**Trạng thái:** các thư mục dưới đã có scaffold P01; các trách nhiệm nghiệp vụ trong cây vẫn là mục tiêu. Hiện chỉ có UI/HTTP và CLI đọc fixture, chưa có stream manager, auth, worker training hoặc scheduled ingestion.

~~~text
apps/web/                 React/Vite, stream manager, browser-worker adapter
services/gateway/         Go HTTP ingress
services/api/             FastAPI account/domain
services/ingestion/       Go scheduled source adapters
services/research/        Python dataset/evaluation tooling
packages/contracts/       OpenAPI/event/manifest artifacts có consumers
data/fixtures/            Tiny synthetic hoặc licensed fixtures
docs/                     Canonical product/technical docs
task/research-terminal-plan/  Implementation phases
~~~

Thư mục worker thuộc web vì runtime browser, không tạo server worker queue cho training. Browser Python bundle/package assets được pin theo runtime manifest và deployment budget. Raw dumps, personal CSVs, credentials và binary model lớn không commit Git.

Inventory P01 xác định reusable UI và loại bỏ Next.js/Admin/domain cũ. Không tạo package/service trống chỉ để đủ cây thư mục; workspace/toolchain thực tế và scripts cập nhật cùng implementation phase.
