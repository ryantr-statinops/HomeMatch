# Technology stack

Các lựa chọn dưới đây là mục tiêu đã chốt ở mức kiến trúc; chưa đồng nghĩa dependencies đã được cài.

| Lớp | Lựa chọn | Lý do/ranh giới |
|---|---|---|
| Frontend | React + Vite + React Router + TypeScript + Tailwind | SPA nhẹ, build nhanh; dùng HTTP API thay server framework frontend cũ |
| Gateway | Go | Một ingress mỏng, kiểm soát timeout, request ID và giới hạn truy cập |
| Domain API | Python + FastAPI + Pydantic | Một nơi sở hữu rule sản phẩm, validation và OpenAPI |
| ML | Python ecosystem | Dùng chung ngôn ngữ cho data processing, training và inference |
| Crawler | Go batch | Tách thu thập khỏi request runtime và domain API |
| Structured data | PostgreSQL | Quan hệ, lọc, uniqueness và truy vấn listing |
| Artifacts | Object storage API | Raw snapshots, dataset exports và model files không phụ thuộc vendor |
| Request API hosting | Vercel target | Frontend và API được đánh giá riêng theo giới hạn runtime |
| Batch hosting | Runner riêng | Crawl/training có thời lượng dài và lịch chạy riêng |

Chưa chốt provider database/object storage, thư viện crawler, router Go, framework model, monorepo tool hoặc versions. Giai đoạn foundation phải benchmark/inventory rồi khóa các phiên bản trong lockfiles; không ghi `latest` làm yêu cầu tái lập.
