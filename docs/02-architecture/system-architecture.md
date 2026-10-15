# System architecture

## Trạng thái

Đây là kiến trúc mục tiêu. Repository hiện vẫn có Next.js và các thành phần của sản phẩm cũ; chưa có React/Vite frontend, Go Gateway hoặc crawler mới hoàn chỉnh.

## Thành phần và ownership

| Thành phần | Công nghệ mục tiêu | Sở hữu |
|---|---|---|
| Web | React, Vite, React Router, TypeScript, Tailwind | Thu thập nhu cầu và trình bày kết quả cho người thuê |
| Gateway | Go | Routing, request ID, timeout, giới hạn truy cập và chuyển tiếp request |
| Product API | FastAPI | Tìm kiếm, listing lifecycle, preference/session, recommendation orchestration và API contracts |
| ML | Python | Dataset/features, baseline/model training, evaluation và inference adapter |
| Crawler | Go batch | Source adapters, crawl scheduling, raw capture và crawl run state |
| Structured store | PostgreSQL | Normalized listings/rooms, crawl metadata, interactions và model metadata |
| Artifact store | Object storage contract | Raw snapshots, ảnh nếu được phép lưu, export dataset và model artifact |

Gateway giữ mỏng và không nhân đôi validation nghiệp vụ. API gọi ML qua interface có timeout; khi provider không khả dụng, trả kết quả dựa trên ranking baseline hoặc đánh dấu phần ML unavailable theo hợp đồng API.

## Luồng dữ liệu

```text
Verified source -> Go crawler batch -> immutable raw snapshot
                                  -> normalization/dedup -> PostgreSQL
                                                    -> serving dataset/features
                                                    -> Python training/evaluation
                                                    -> versioned model artifact

Renter -> React/Vite -> Go Gateway -> FastAPI -> PostgreSQL
                                             -> Python ML inference (optional)
                                             -> anonymous interaction event
```

Tin đăng là thực thể quan sát từ nguồn. Phòng vật lý là thực thể hợp nhất có thể có nhiều tin đăng qua thời gian. Dữ liệu raw được truy vết về source và crawl run; dữ liệu normalized phải lưu trạng thái chất lượng và thời điểm quan sát.

## Runtime boundary

React/Vite có thể được build và host như frontend trên Vercel. FastAPI và Go HTTP handlers có thể đóng gói thành request APIs trên Vercel nếu qua kiểm tra giới hạn runtime, cold start, thời gian request và native dependencies. Tài liệu không giả định mọi workload phù hợp serverless.

Crawler, training và tác vụ dài chạy trên runner/batch environment riêng, không gắn vào request người dùng. Database và object storage là dịch vụ ngoài ứng dụng, chọn theo contract và chi phí sau khi thử nghiệm.

## Failure boundary

- Gateway timeout không làm crawler hay model job bị chạy đồng bộ.
- ML lỗi/hết hạn không ngăn tìm kiếm cơ bản.
- Không có listing phù hợp trả empty state; không nới hard filters âm thầm.
- Listing stale/expired được loại hoặc gắn trạng thái theo freshness policy.
- Crawler retry có idempotency theo source/listing observation.
- Model artifact luôn có version và metadata để quay lại bản đã được đánh giá.
