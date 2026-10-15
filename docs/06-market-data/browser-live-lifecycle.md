# Browser live lifecycle

**Trạng thái:** ADR mục tiêu; P02 phải spike region, browser/CSP và provider limits trước implementation approval.

[Binance public-only URLs](https://github.com/binance/binance-spot-api-docs/blob/master/faqs/market_data_only.md) mô tả public REST và `data-stream.binance.vision` không cần API key; không hỗ trợ user-data streams. Browser kết nối public WebSocket trực tiếp là ngoại lệ được ghi nhận với Gateway. API account/portfolio/experiments vẫn qua Gateway/FastAPI. Không có exchange trading key trong frontend/server của MVP.

## Subscription owner

Một tab có một subscription manager làm owner, reference-count nhu cầu screens/widgets; components không tự mở sockets. Chỉ subscribe BTC/ETH và stream cần thiết, theo quota evidence. MVP quản lý theo từng tab; không hứa dedup socket giữa nhiều tab. P02 phải kiểm thử nhiều tab và đặt local concurrency cap; thiếu khả năng hỗ trợ thì báo degraded, không mở vô hạn.

States: idle → connecting → snapshot/reconcile → live → stale/reconnecting → suspended/closed. UI phân biệt giá hiện tại, stale và last observed. Message chứa event/source time và local received_at; event time mới không tự chứng minh network latency nhỏ nếu clock sai.

## Lifecycle

Login/active route có nhu cầu: lấy snapshot phù hợp, mở stream và reconcile overlap/buffer theo spike protocol. Khi tab hidden hoặc mất application heartbeat: bắt đầu grace timer cấu hình; quá grace thì unsubscribe/close và đánh dấu suspended. P02 khóa grace/heartbeat/timeouts và browser behavior bằng evidence, không dùng background timers như bảo đảm chính xác.

Logout đóng ngay, xóa subscriptions và private cached state. Page teardown dùng best effort close; network/browser termination tự kết thúc socket, server không dựa event unload để bảo đảm cleanup. Đóng tab không tiếp tục live hoặc worker training.

Khi visible/heartbeat trở lại: refresh snapshot và REST-backfill nến thiếu trước khi live. Không coi WebSocket tự replay đủ thời gian offline. Reconnect dùng backoff+jitter, bounded retries, resubscription idempotent và freshness checks. Khi provider bắt reconnect theo giới hạn connection hiện hành, xử lý cùng state machine; numeric limits đọc current docs ở P02, không copy từ trí nhớ.

Browser region blocked/CSP/network fail: thông báo unavailable, có historical view theo quyền nguồn. Không proxy để vượt hạn chế vùng. Không âm thầm thay sàn; đổi venue là ADR và instrument identity mới.

## Acceptance scenarios

- Hai widgets cùng instrument không mở socket trùng trong tab; unmount một widget không ngắt widget còn lại.
- Tab ẩn qua grace, browser throttle heartbeat, offline/online, logout trong reconnect và đóng route.
- Message trễ/trùng/out-of-order, nến provisional đổi nhiều lần, reconnect mất đoạn.
- Snapshot/stream race không hiển thị timestamp lùi hoặc thêm candle duplicate.
- Browser unsupported/region denial hiển thị degraded, không gửi khóa hoặc credentials.
- Historic/news ingestion vẫn chạy theo scheduler khi không có người dùng online.
