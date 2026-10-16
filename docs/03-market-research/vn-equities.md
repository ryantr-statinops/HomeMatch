# Cổ phiếu Việt Nam — hướng mở rộng tiếng Việt

**Khảo sát:** 2026-10-16; documentation-only, ngoài MVP.

## Nguồn giá và tin

[SSI FastConnect Data](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-data/danh-sach-cac-api) và [DNSE market data](https://developers.dnse.com.vn/docs/dnse/market-data/) có tài liệu API. Chưa xác nhận tài khoản/entitlement, phí, intraday retention, quota và quyền public redisplay trong môi trường dự án. API có documentation không chứng minh mọi endpoint miễn phí hoặc được lưu/training tùy ý.

[CafeF RSS](https://cafef.vn/index.rss) là ứng viên news tiếng Việt, [HNX disclosures](https://www.hnx.vn/en-gb/thong-tin-cong-bo-up-hnx.html) là nguồn công bố. Cần khảo sát thêm HOSE và investor relations theo nguồn. RSS metadata/link không tự cấp quyền toàn văn hoặc model processing. Không dựa trên private/undocumented endpoint làm contract sản phẩm.

[Vnstock license](https://www.vnstocks.com/onboard/giay-phep-su-dung) cần phân biệt license SDK và quyền upstream data. SDK hữu ích cho khảo sát nhưng không tự giải quyết việc lưu, huấn luyện hoặc đưa dữ liệu lên public terminal. Chưa chốt SDK/provider cho production.

## Provider matrix

| Provider | Capabilities documented / access model | Giới hạn và rights cần xác minh |
|---|---|---|
| [SSI FastConnect Data](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-data/danh-sach-cac-api) | Token bằng consumerID/secret tạo trên iBoard; securities/details, index components, daily/intraday OHLC | Account entitlement, phí, retention, rate limits và quyền ML/display; chưa feed test |
| [DNSE market data](https://developers.dnse.com.vn/docs/dnse/market-data/) | OHLC, trades, bid/ask, foreign investors, trading sessions và quyền/corporate events | API account/auth flow phải test theo endpoint; chưa xác nhận public/free production entitlement |
| [CafeF RSS](https://cafef.vn/index.rss) | Public news feed directory | RSS không cấp full-text/train/redisplay rights |
| [Vietstock RSS](https://vietstock.vn/rss) | Official RSS page candidate | Chưa test feed, historical archive, quotas hoặc rights |
| [VnEconomy candidate](https://vneconomy.vn/rss.htm) | RSS URL candidate; browsing lỗi | Chưa documented capability; cần xác minh official URL/interface |
| [HNX disclosures](https://www.hnx.vn/en-gb/thong-tin-cong-bo-up-hnx.html) | Corporate disclosures website | Interface/history/attachment rights cần source review |
| [Vnstock](https://www.vnstocks.com/onboard/giay-phep-su-dung) | SDK/tooling | Không đồng nhất SDK license với upstream data license |

Free, trial, paid và account-gated là các chiều riêng: có tài khoản không chứng minh được cấp mọi dữ liệu. Chưa tìm được evidence đủ để chốt một gói miễn phí/trial đáp ứng toàn bộ research và public-terminal requirements. P10 phải ghi entitlement test và agreement theo sản phẩm dữ liệu cụ thể.

## Features và trở ngại nghiên cứu

Returns/volume, market breadth, foreign flows, corporate announcements và fundamentals có thời điểm công bố. Cần handling phiên nghỉ trưa, auction, price limits, trading calendar, corporate actions, ticker/sàn thay đổi, delistings và quy tắc settlement. Backtest mô phỏng không được mặc định fill mọi mức giá tại close khi thanh khoản/biên độ không cho phép.

News extraction tiếng Việt cần dataset nhãn và audit asset mapping (mã viết tắt dễ trùng từ thường). Fundamentals phải giữ bản sửa và published/first_seen times. Không dùng báo cáo tài chính cuối cùng như dữ liệu có sẵn từ đầu kỳ.

## Gate mở rộng

Chọn broker/provider hợp lệ, xác minh display/store/train, đánh giá lịch sử và corporate actions; đo thực tế gaps/latency. Chưa có bằng chứng một gói miễn phí đáp ứng đồng thời mọi yêu cầu intraday, lưu trữ và public redistribution. Mục tiêu tiếng Việt hấp dẫn nhưng cần budget/licensing decision trước execution.
