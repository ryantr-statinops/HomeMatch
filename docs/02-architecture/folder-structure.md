# Repository structure mục tiêu

```text
apps/
  web/                 # React + Vite client
services/
  gateway/             # Go ingress mỏng
  api/                 # FastAPI domain API
  crawler/             # Go batch source adapters
  ml/                  # Python pipeline, evaluation, inference adapter
packages/
  contracts/           # API/event shared contract artifacts nếu cần
  web-ui/               # UI primitives dùng chung
data/                   # Chỉ fixture nhỏ, công khai, không chứa crawl dump thật
docs/                   # Product, architecture, data, API và operations docs
task/rebuild-plan/      # Giai đoạn implementation và orchestration
```

Đây là định hướng, không phải yêu cầu tạo mọi thư mục ngay lập tức. Chỉ thêm workspace/package khi có consumer cụ thể. Raw crawls, credentials, user data và model artifacts không commit vào Git. Mọi thay đổi cấu trúc thực thi phải cập nhật tài liệu và CI cùng giai đoạn.
