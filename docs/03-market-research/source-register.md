# Source register và source gates

**Ngày review:** 2026-10-16. Phần lớn nguồn chỉ review documentation; P02 đã thử public Binance REST từ shell và một BTCUSDT stream trong Chrome như evidence dưới. Không tạo provider account hoặc ký agreement. `false` nghĩa chưa đạt evidence, không nhất thiết source không hỗ trợ.

## Evidence flags độc lập

- `documented`: có primary URL mô tả capability; không chứng minh feed hoạt động.
- `access-tested`: có test record ở region/browser/runner cụ thể, response schema, thời gian và quota.
- `rights-confirmed`: có evidence cho **đúng use case**; phải tách store, ML train, public display và redistribution.
- `approved`: coordinator chấp nhận mục đích/field/retention cụ thể sau các gate cần thiết; không suy ra từ ba flag khác.

Một source có thể documented=true nhưng rights=false. Quyền price không bao gồm news. Cờ true phải có evidence URL/document/date/owner; không lưu credential hoặc account identifiers riêng vào register public.

P02 `BIN-SPOT-PUBLIC access-tested` chỉ gồm [6 REST probes](../../task/research-terminal-plan/evidence/p02-binance-rest-probe.json) từ shell local (BTCUSDT/ETHUSDT, 15m/1h/1d, mỗi request 3 rows) và [một BTCUSDT trade stream trong Chrome desktop](../../task/research-terminal-plan/p02-browser-feasibility.md). Không chứng minh REST CORS, hosting/region khác, lịch sử dài, archive, source rights hoặc production availability. Owner: coordinator + browser spike agent; ngày 2026-10-16. `approved=false` không đổi.

| ID / provider + product | Lớp dữ liệu / access | documented | access-tested | rights-confirmed | approved | Store / ML / display / redistribute |
|---|---|---|---|---|---|---|
| BIN-SPOT-PUBLIC | Giá; public-only REST/WS, no key | true | true (phạm vi P02 bên trên) | false | false | Quyền store/ML/display/redistribute còn chờ; deployment region chưa kiểm |
| BIN-SPOT-ARCHIVE | Giá; download miễn phí có điều kiện | true | false | false | false | Terms v1.0/2026-08-26: CC BY-NC-SA4.0 + giới hạn use case; project fit chưa approved |
| KRAKEN-OHLCVT | Giá; public archive | true | false | false | false | Chưa xác nhận từng mục đích |
| SEC-RELEASES | News regulator; public website | true | false | false | false | Review content/third-party fields và attribution |
| CFTC-RSS | News regulator; RSS | true | false | false | false | Review metadata/full text/derived ML riêng |
| ETH-BLOG | News project; public blog | true | false | false | false | Review license theo nội dung, image và processing |
| BTC-CORE | News project; release notices | true | false | false | false | Review notices/content; software license không đủ |
| COINDESK-RSS | News báo chí; RSS candidate | false | false | false | false | URL candidate chưa xác minh được bằng browsing; chưa có rights/history/free-prod evidence |
| SEC-EDGAR | US filings/fundamentals; public API | true | false | false | false | Review access policy, attribution, attached third-party content |
| ALPACA-PRICE | US prices; account/free/paid tiers | true | false | false | false | Entitlements, feed, storage/training/display cần review |
| ALPACA-NEWS | US news; account/provider tiers | true | false | false | false | News rights tách price; vendor approval chưa có |
| OANDA-PRICE | FX prices; account/token-gated | true | false | false | false | Broker terms và commercial redisplay chưa xác nhận |
| DUKASCOPY-HISTORY | FX historical export; free tool theo docs | true | false | false | false | Automated access/store/train/display cần review; không blanket license |
| CFTC-COT | Futures positioning; public reports | true | false | false | false | Release lag, calendar và field-specific rights cần review |
| ECB-RATES | FX reference daily; public | true | false | false | false | Review attribution/ML/cache; không intraday feed |
| FED-RSS | Macro news; public RSS | true | false | false | false | Review field-specific rights |
| ECB-RSS | Macro news; public RSS | true | false | false | false | Review field-specific rights |
| BLS-API | Macro actual; public API registration/quota cần test | true | false | false | false | Review source direct và revision/vintage coverage |
| BEA-API | Macro actual; API account/key cần xác minh | true | false | false | false | Review direct-source purposes/quota |
| FRED | Macro aggregation; public/API key | true | false | false | false | ML và API cache bị hạn chế theo terms; không eligible hiện tại |
| SSI-DATA | VN prices; account/entitlement cần xác minh | true | false | false | false | Chưa xác minh phí/store/train/display |
| DNSE-DATA | VN prices; account/entitlement cần xác minh | true | false | false | false | Chưa xác minh phí/store/train/display |
| CAFEF-RSS | VN news; public RSS | true | false | false | false | Metadata/full text/ML/display chưa xác nhận |
| VIETSTOCK-RSS | VN news; official RSS directory | true | false | false | false | Feed access/history/store/ML/display chưa xác nhận |
| VNECONOMY-RSS | VN news; candidate URL browsing lỗi | false | false | false | false | Chưa xác minh capability hoặc quyền |
| HNX-DISCLOSURES | VN disclosures; public website | true | false | false | false | Third-party attachments và redistribution chưa rõ |
| VNSTOCK-SDK | VN data tooling; upstream tùy provider | true | false | false | false | License code không cấp quyền upstream data |

## Evidence URLs và quyết định tiếp theo

| Source | Evidence chính thức | Việc còn phải làm |
|---|---|---|
| Binance public | [Market data only](https://github.com/binance/binance-spot-api-docs/blob/master/faqs/market_data_only.md) | Region/CORS/CSP, rate/stream limits, terms |
| Binance archive | [Archive docs](https://github.com/binance/binance-public-data), [dataset terms](https://github.com/binance/binance-public-data/blob/master/TERMS_AND_CONDITIONS.md) | Checksum, timestamp units, rights scope |
| Kraken | [OHLCVT](https://support.kraken.com/articles/360047124832-downloadable-historical-ohlcvt-open-high-low-close-volume-trades-data) | Coverage/license per use |
| SEC / CFTC | [SEC releases](https://www.sec.gov/newsroom/press-releases), [CFTC RSS](https://www.cftc.gov/RSS/index.htm) | Source adapter and policy review |
| Project news | [Ethereum](https://blog.ethereum.org/), [Bitcoin Core](https://bitcoincore.org/en/releases/) | Stable interface, terms and fields |
| CoinDesk | [RSS candidate](https://www.coindesk.com/arc/outboundfeeds/rss/) | Browser research trả lỗi; cần xác minh URL/documentation rồi access test và permission |
| EDGAR | [API](https://www.sec.gov/search-filings/edgar-application-programming-interfaces) | Fair access and historical mapping |
| Alpaca | [Price](https://docs.alpaca.markets/us/docs/about-market-data-api), [news](https://docs.alpaca.markets/us/docs/historical-news-data) | Current plan plus redistribution agreement |
| OANDA | [Pricing](https://developer.oanda.com/rest-live-v20/pricing-ep/) | Token entitlement and history tests |
| Dukascopy / COT | [Historical export](https://www.dukascopy.com/swiss/english/marketwatch/historical/), [COT](https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm) | Source rights, release availability và adapter access tests |
| ECB | [Rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html), [RSS](https://www.ecb.europa.eu/home/html/rss.en.html) | Terms and timestamp/vintage mapping |
| Fed / BLS / BEA | [Fed RSS](https://www.federalreserve.gov/feeds/feeds.htm), [BLS](https://www.bls.gov/bls/api_features.htm), [BEA](https://apps.bea.gov/api/) | Direct source policy/revisions |
| FRED | [Legal terms](https://fred.stlouisfed.org/legal/) | Keep excluded from ML/cache pending suitable permission |
| SSI / DNSE | [SSI](https://guide.ssi.com.vn/ssi-products/tieng-viet/fastconnect-data/danh-sach-cac-api), [DNSE](https://developers.dnse.com.vn/docs/dnse/market-data/) | Account, quota, store/train/display |
| CafeF / HNX | [RSS](https://cafef.vn/index.rss), [disclosures](https://www.hnx.vn/en-gb/thong-tin-cong-bo-up-hnx.html) | Terms, news archive, adapter |
| Vietstock / VnEconomy | [Vietstock RSS](https://vietstock.vn/rss), [VnEconomy candidate](https://vneconomy.vn/rss.htm) | VnEconomy browsing lỗi; xác minh URL rồi review rights từng nguồn |
| Vnstock | [License](https://www.vnstocks.com/onboard/giay-phep-su-dung) | Verify each upstream data provider |

## Approval record phải có

Binance Vision: evidence terms đã tìm thấy, nhưng chưa xác nhận tính phù hợp với dự án. License không phải MIT cho dataset; mục đích thương mại/multi-user và artifacts public phải qua scope review theo [báo cáo Crypto](crypto.md#dataset-terms-ảnh-hưởng-scope). Dùng source miễn phí không đồng nghĩa được host dịch vụ retail; riêng API/live cần terms review riêng, không suy ngược từ archive.

Source ID, purpose, allowed fields, permitted audience, geography, allowed transformations/ML, storage and deletion policy, attribution, current quota evidence, owner, review/expiry date, terms hash và disable procedure. Không nhúng secret vào URLs hoặc sample payload.

Chưa khóa numeric quota hay retention khi chưa có evidence. Giá miễn phí ở personal tier không phải budget production. Khi terms thay đổi: disable use bị ảnh hưởng, đánh dấu snapshots restricted, review derivative artifacts và không silently chuyển nguồn.
