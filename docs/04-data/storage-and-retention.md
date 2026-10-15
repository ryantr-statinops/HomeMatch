# Storage, retention và quyền dữ liệu

**Trạng thái:** thiết kế mục tiêu; vendor, quota và retention cụ thể chưa khóa. Không tạo database hoặc xóa dữ liệu trong đợt documentation.

PostgreSQL lưu metadata, policy, normalized index và domain state; object storage qua interface lưu raw/snapshots. News full text chỉ lưu nếu được source approval cho phép. Object key không dùng secret hoặc user email. Policy kiểm soát cả download dataset tới browser, vì client training là một hình thức cung cấp dữ liệu cho user.

Trước ingestion, mỗi source phải có retention policy theo raw/normalized/derived, allowed purposes, audience, attribution và expiry. Khi quyền chưa rõ: không bật production ingestion/public dataset; fixture synthetic được đánh dấu để development. Không mặc định giữ raw/news vĩnh viễn.

Snapshots bất biến theo nội dung nhưng quyền truy cập có thể bị thu hồi: đánh dấu restricted/tombstoned, ngừng serving và giữ manifest tối thiểu khi được phép. Nếu policy buộc xóa bytes, report nói snapshot không còn tái lập được; không hứa immutable đồng nghĩa không thể xóa.

Account deletion xử lý portfolio/experiments bởi domain owner; shared public market data không trở thành sở hữu riêng của account. Log bỏ tokens, payload ledger và nội dung source không được phép. Backup/restore phải mang theo policy state, provenance và quyền truy cập; không chỉ restore prices rồi bỏ restrictions.

Review P03/P04 quyết định retention windows dựa vào terms, nhu cầu tái lập và budget. P09 đo storage/egress/backup và khóa quotas; không dùng “free” như SLO. [Source register](../03-market-research/source-register.md) là nơi giữ evidence và approval, không nhân bản trạng thái ở nhiều nơi.
