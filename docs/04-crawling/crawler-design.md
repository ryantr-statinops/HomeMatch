# Thiết kế crawler và source adapter

> **Trạng thái: mục tiêu, chưa triển khai.** Crawler được định hướng viết bằng Go, chạy theo batch; package, framework và runtime sẽ được chọn ở implementation phase sau khi kiểm chứng toolchain.

## Trách nhiệm

Crawler orchestration chịu trách nhiệm chọn source đã duyệt, tạo run, gọi adapter, áp dụng policy chung, lưu raw artifacts/metadata, phát hiện lỗi và báo cáo số liệu. Source adapter chịu trách nhiệm discovery/fetch theo đúng nguồn, phân trang, trích xuất source representation và phát hiện thay đổi cấu trúc. Chuẩn hóa field domain thuộc data processing layer để parser nguồn không tự quyết định business ranking.

```text
Scheduler/Manual trigger
        ↓
Run coordinator → source eligibility check → rate/retry policy
        ↓                                  ↓
Source adapter → fetched item + provenance → raw artifact store
        ↓
Normalize/validate → dedup/upsert snapshots → quality gate → serving eligibility
```

## Adapter contract ở mức khái niệm

Mỗi adapter phải cung cấp metadata/capabilities và các thao tác logic sau, không quy định wire shape:

- xác nhận source key/version cùng trạng thái enabled theo registry;
- tạo hoặc tiếp tục discovery session bằng checkpoint có thể serialize;
- trả về trang/item kèm source ID, canonical URL nếu có, observed time và raw payload/reference;
- báo hiệu hoàn tất pagination, retryable error, permanent error, throttling hoặc schema drift;
- đóng tài nguyên và để lộ counters cần thiết cho run metrics.

Adapter không tự bỏ qua robots/terms, vượt CAPTCHA, giả mạo danh tính, né kiểm soát truy cập hay tự đổi sang proxy. Nếu nguồn yêu cầu login, API key hoặc quyền đặc biệt, phải có review và credential policy riêng trước khi code.

## Batch run và idempotency

- Mỗi lần chạy có `run_id`, source key, adapter/parser version, thời gian bắt đầu/kết thúc, trạng thái, checkpoint, counters và error summary.
- Re-running cùng page/item phải an toàn: stable source identity + upsert/snapshot compare không tạo listing/snapshot lặp vô hạn.
- Checkpoint chỉ xác nhận sau khi kết quả tương ứng đã được ghi bền vững; crash giữa fetch và commit phải có thể replay an toàn.
- Raw artifact được ghi theo checksum/content identity nếu phù hợp, nhưng mỗi lần quan sát vẫn lưu provenance riêng.
- Partial failure được ghi nhận. Run không được báo success nếu phân trang bị thiếu, quality gate fail hoặc nhiều item chưa xử lý theo policy.
- Không đánh dấu tin biến mất khỏi một run partial/failed là expired.

## Tốc độ, timeout và retry

- Rate limit được cấu hình theo source, bảo thủ và có jitter; không song song hóa quá mức nếu source review không cho phép.
- Có connection/request timeout, giới hạn response bytes/decompression, concurrency cap và ngân sách tổng thời gian cho run.
- Tôn trọng tín hiệu throttling và cooldown; không retry dồn dập khi bị từ chối/429.
- Retry chỉ lỗi transient với exponential backoff + jitter và số lần hữu hạn. Lỗi parse/schema, policy denial, authorization hoặc nội dung không hợp lệ không được retry lặp vô hạn.
- Circuit breaker/suspend threshold theo source cần cắt run khi lỗi lặp hoặc điều kiện access thay đổi; cấu hình do ops kiểm soát.
- Agent phải redact credentials, personal contact data và URL có token khỏi logs.

## Lưu raw và chuyển tiếp

Raw fetch được lưu bền vững trước hoặc cùng transaction bảo đảm lineage trước khi normalized snapshot được đánh dấu hoàn tất. Metadata gồm source, run, fetched/observed time, content type, byte count, checksum và quyền/retention class. Nếu source policy không cho giữ raw body, chỉ lưu phần tối thiểu được duyệt cùng transform result/evidence hợp lệ.

Downstream data processing nhận reference tới artifact và record context; chi tiết schema/API message để dành cho tài liệu API. Khi persistence fail, item chưa được tính là committed và có thể replay.

## Quyền điều khiển

- Allowlist source được duyệt là điều kiện trước khi run; source `suspended/rejected` không thể khởi chạy kể cả gọi thủ công.
- Có thể dừng một run và vô hiệu future schedule theo source. Stop phải ngăn request mới và đóng worker đang chạy trong timeout.
- Cập nhật adapter phải qua fixture/replay tests và code review; version cũ vẫn ghi trong từng CrawlRun để có thể xác định dữ liệu được tạo bởi parser nào.

