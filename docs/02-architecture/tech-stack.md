# Technology stack
**Trạng thái:** scaffold P01 dùng Node 22.23.1/npm 10.9.8, Go 1.27.2, Python 3.11–3.13/uv 0.11.28. Phiên bản package thực tế nằm trong lockfiles; auth/storage/hosting và browser runtime vẫn cần spike P02.

| Lớp | Default |
|---|---|
| Web | React, Vite, React Router, TypeScript, Tailwind |
| Ingress | Go Gateway HTTP mỏng |
| Domain | FastAPI/Pydantic, managed Auth JWT |
| Ingestion | Go scheduled jobs |
| Data/research | Python tooling, versioned datasets |
| User training | Web Worker + Pyodide candidate, lazy-loaded; không Python install/desktop companion |
| Structured/artifact storage | PostgreSQL + object storage contracts, vendor bằng ADR P02 |
| Hosting | Vercel web/HTTP target; ingestion runner riêng |

[Pyodide](https://pyodide.org/en/stable/index.html) có scientific packages; chạy trong [Web Worker](https://pyodide.org/en/stable/usage/index.html) giúp tách UI. Điều đó chưa chứng minh mọi model/dataset hoạt động. Pin runtime/package bundle sau compatibility benchmark, không dùng latest. Managed Auth được chọn sau thử email/quota/token lifecycle; không tự viết password hashing.

Không đưa cloud LLM hoặc paid data vào dependency bắt buộc. Nếu thêm dịch/summary NLP phải có source rights, đánh giá chất lượng và ngân sách riêng.
