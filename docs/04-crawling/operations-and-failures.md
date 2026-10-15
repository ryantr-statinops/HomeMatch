# Batch operations và xử lý lỗi

> **Trạng thái: mục tiêu, chưa triển khai.** Chưa có lịch chạy production hay SLO nào được thiết lập.

## Kích hoạt và lập lịch

Crawler Go chạy như batch worker qua scheduler hoặc trigger có kiểm soát; không gắn crawl dài vào API request. Local/dev chạy trên fixtures và dry-run mặc định. Production schedule chỉ được bật cho source đã review và có owner. Tần suất lấy từ review source và freshness target, không áp dụng chu kỳ chung cho mọi nguồn.

## Trạng thái run

Một run kết thúc với trạng thái phân biệt hoàn tất, hoàn tất một phần, thất bại, bị hủy hoặc bị chặn bởi eligibility/policy. Lưu checkpoint, trang cuối xác nhận, counters, error categories và artifact refs. Không ghi raw payload/PII vào trạng thái log.

Một batch được coi là sẵn sàng cho downstream khi persistence hoàn tất, pagination đạt điều kiện adapter, parser không phát hiện schema drift chưa xử lý và quality gate được chấp nhận. Batch chưa đạt ở quarantine để xem xét; không publish mặc định.

## Quan sát vận hành

Metrics theo source và run: duration, requests, bytes, pages/items discovered, committed, rejected/quarantined, retry/throttle/timeout/parse failures, freshness, dedup candidates, schema drift và cost/storage. Dashboard/alert phải phân biệt lỗi crawler với nguồn hết dữ liệu hoặc thay cấu trúc.

Alerts khi source policy hết review, thất bại tăng bất thường, freshness vượt mục tiêu, parse quality tụt, dung lượng/chi phí tăng hoặc cleanup/takedown lỗi. Ngưỡng được đặt sau baseline pilot.

## Recovery

- Lỗi transient: tiếp tục từ checkpoint hoặc replay idempotent.
- Schema drift: dừng hoặc quarantine source, lưu metadata lỗi an toàn, cập nhật fixture/parser rồi replay trong phạm vi được phép.
- Lỗi lưu trữ: đánh dấu item/run chưa committed, retry có giới hạn; không phát hành orphan data.
- Partial crawl: không chạy expiry inference dựa trên tập thiếu; theo dõi đủ một full successful cycle trước khi đánh giá biến mất.
- Takedown/policy issue: suspend source trước, chặn serving liên quan, sau đó thực hiện suppression/purge theo data retention workflow và ghi kết quả.
- Backfill: có giới hạn concurrency/budget; giữ thời gian quan sát thật, không giả định backfill timestamp là ngày nguồn đăng.

## Security and cost controls

Secrets nằm trong secret manager/environment runtime, tách dev/staging/prod và không đi vào image/repository. Worker bị giới hạn outbound domain theo source allowlist khi khả thi; giới hạn CPU/memory/response size/run duration và storage budget. Bản raw/media có quyền đọc hạn chế; URL signing không được ghi log.

## Exit gate vận hành

Cho phép schedule định kỳ khi run có metrics/logs an toàn, retry/idempotency/checkpoint qua kiểm chứng, alert/suspend thao tác được, có recovery/takedown exercise, cost estimate trong giới hạn được duyệt và owner nhận thông báo lỗi actionable.

