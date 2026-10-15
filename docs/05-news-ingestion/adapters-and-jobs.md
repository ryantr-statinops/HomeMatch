# Source adapters và jobs

**Trạng thái:** contract mục tiêu; chưa crawl nguồn trong đợt docs.

## Source discovery

P04 chọn một nhóm nhỏ regulator/project sources và khảo sát financial RSS. Mỗi candidate phải có owner, URLs/docs/terms, permitted fields, access method, stable IDs, timestamps, pagination/update semantics, rate evidence, retention và approval purpose. Không có feed approved đồng nghĩa UI không được mô tả là news coverage toàn thị trường.

Ưu tiên API/RSS do nguồn công bố. Không dùng login cá nhân để scrape, không vượt paywall/CAPTCHA/region và không xoay IP để tránh giới hạn. robots.txt là thông tin vận hành bổ sung, không thay quyền nội dung. Nếu chỉ metadata được phép, adapter không fetch full article text hoặc images.

## Adapter contract

Input: source config version, permitted scope, cursor/checkpoint, optional time range và deadline. Output: source_item_id/canonical URL, observed_at UTC, published_at/source_updated_at nullable, allowed fields, raw hash/ref, parse status, next cursor, rate/deletion hints. Jobs phải phân biệt fetch success và parse completeness.

URL canonicalization chỉ bỏ tracking parameters đã biết; không xóa mọi query vì có thể làm mất identity. Redirect URL và original URL lưu riêng khi allowed. HTML sanitize trước display; fetched URLs phải allowlist và tránh SSRF/internal IP. Không log auth headers hoặc signed URLs.

## Job lifecycle

Schedule → source-policy check → fetch theo quota → persist allowed raw evidence → parse/version → dedup/map → quality gate → serving publish → checkpoint. Checkpoint chỉ tiến sau durable write; replay không tạo article trùng. Job có source-level lock/lease và timeout để ngăn overlap.

Respect response rate hints; retry lỗi tạm với exponential backoff+jitter và bounded attempts. 401/403/terms change disable source và alert; không retry vô hạn. 404/rút tin không tự xóa research history: tạo trạng thái theo source policy. Numeric poll interval/quota/batch size chốt P04 bằng evidence, không suy từ RSS tồn tại.

Backfill và incremental là hai mode riêng. Backfill giữ first_seen là lúc thu thực tế và research eligibility riêng; không tự biến published_at thành available_at. Trong outage, ghi gap window; lần chạy sau reconcile overlap để nhận tin sửa/rút.

Exit gate: source policy approved theo fields/purpose, adapter fixtures, access test ở runner region, replay/cursor tests, revision handling và report độ phủ. Chưa đạt thì chỉ dùng synthetic/demo source có nhãn.
