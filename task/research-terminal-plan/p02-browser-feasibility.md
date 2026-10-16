# P02 — Spike khả thi trên trình duyệt

**Trạng thái:** đã chạy được trên một máy Windows/Chrome. Chưa đủ bằng chứng để chốt giới hạn sản phẩm, danh sách trình duyệt hỗ trợ, quyền nguồn dữ liệu hay vòng đời production.

## Phạm vi spike

Mở [harness cô lập](../../experiments/browser-feasibility/index.html) bằng static server. Phần Binance kết nối trực tiếp một public BTCUSDT trade stream tại `wss://data-stream.binance.vision/ws/btcusdt@trade`, ghi state mở/message/error/close và trạng thái visible/hidden, đồng thời cho phép đóng socket thủ công. Harness không có API giao dịch, khóa sàn, thông tin tài khoản hay đường tải dữ liệu qua server.

Phần Pyodide chạy một pipeline cố định trên chuỗi giá tổng hợp có seed, với 5.000, 25.000 hoặc 50.000 dòng. Nó chèn missing values, tạo ba feature return/volatility, chia chuỗi theo thời gian 80/20, fit scaler chỉ trên train và chạy Ridge cùng LogisticRegression. Mã Python, solver, seed, package names và số dòng đều nằm trong allowlist của harness; không có code người dùng hoặc cài package theo chuỗi nhập vào. Lần đầu trong worker đo runtime/package load và import Python. Chạy tiếp dùng lại cùng worker để đo warm. Cancel gọi `Worker.terminate()`; lần sau khởi tạo worker mới. JSON tải xuống gồm timings, responsiveness và bản ghi hủy.

## Cách chạy an toàn

Từ thư mục gốc repo, chỉ phục vụ thư mục spike để không đưa các file khác trong repo vào static server:

```powershell
python -m http.server 8765 --bind 127.0.0.1 --directory experiments/browser-feasibility
```

Mở `http://127.0.0.1:8765/`. Trình duyệt cần Internet để tải Pyodide từ CDN. Không thêm harness vào dependency graph của app hoặc triển khai nó như sản phẩm.

## Runtime và provider contract

Harness pin Pyodide **314.0.7**, dùng URL versioned `cdn.jsdelivr.net/pyodide/v314.0.7/full/`. Đây là version trên [tài liệu Pyodide stable](https://pyodide.org/en/stable/usage/index.html) tại ngày 2026-10-16. [Package list chính thức](https://pyodide.org/en/stable/usage/packages-in-pyodide.html) của version này ghi NumPy 2.4.6, scikit-learn 1.8.0 và SciPy 1.18.0. Harness yêu cầu NumPy và scikit-learn; Pyodide tải dependency trong distribution. [Hướng dẫn Web Worker chính thức](https://pyodide.org/en/stable/usage/webworker.html) mô tả module worker.

[FAQ market-data-only của Binance](https://github.com/binance/binance-spot-api-docs/blob/master/faqs/market_data_only.md) mô tả `data-stream.binance.vision` là market data công khai không cần API key và không cung cấp user-data stream. [Tài liệu stream chính thức](https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md) hiện ghi thời hạn kết nối 24 giờ, server ping mỗi 20 giây, tối đa 5 message gửi vào mỗi giây, tối đa 1.024 stream mỗi connection và 300 lần thử kết nối mỗi 5 phút trên mỗi IP. Đây là giới hạn upstream, không phải quota sản phẩm hay cam kết về vùng truy cập. Harness mở một stream và không gửi subscribe-control message.

## Kết quả đo

Một lần chạy ngày 2026-10-16 trên Windows, Chrome **155.0.0.0**, `navigator.deviceMemory` báo 32 GB. Đây là một desktop Chrome; “cold” nghĩa là worker chưa nạp Pyodide trong page đó. Cache HTTP của browser/CDN chưa được xóa nên cold timings không phải phép đo tải mạng hoàn toàn lạnh. Mọi dòng là dữ liệu tổng hợp; không có lịch sử thị trường thật trong benchmark.

Bằng chứng authoritative cho revision `gap1-v1` là [JSON tải từ nút Download trên harness](../../experiments/browser-feasibility/evidence/chrome155-win32-gap1-initial.json). Phép chia train/test thực hiện trên original row index trước khi lọc: raw split `floor(0.8 * requestedRows)`, horizon một dòng, purge dòng `split−1`; train dùng index `< split−1`, test dùng index `>= split`. Như vậy nhãn cuối train kết thúc trước thời điểm feature đầu tiên ở test. `rowsUsed` là train+test sau khi loại invalid và purge; `rowsDropped` là invalid rows. Tất cả run bên dưới có `purgeRows=1`, `horizonRows=1`.

| Dòng yêu cầu | Worker | Dùng | Train / test | Runtime / package / import | Feature / fit / eval | Tổng worker | RAF p95 / max |
|---:|---|---:|---:|---:|---:|---:|---:|
| 5k | cold | 4.987 | 3.990 / 997 | 1.799 / 2.774 / 5.709 s | 234 / 31 / 4 ms | 10.564 s | 0,13 / 0,63 ms |
| 5k | warm | 4.987 | 3.990 / 997 | cached / cached / 0 ms | 201 / 5 / 3 ms | 218 ms | 0,03 / 0,13 ms |
| 25k | warm | 24.947 | 19.958 / 4.989 | cached / cached / 0 ms | 726 / 9 / 3 ms | 750 ms | 0,13 / 0,13 ms |

Cold 25k và cold/warm 50k sau gap chưa có trong evidence JSON hiện tại, nên không dùng các số cũ để đại diện revision mới. 50k vẫn là fixture case, nhưng chưa hoàn tất benchmark sau gap.

Report cũ trước gap đã đo các size 5k/25k/50k và cho thấy 50k chạy được trên máy này, nhưng nó không có purge và **chỉ là exploratory**. Các số đó không phải bằng chứng acceptance của revision hiện tại.

Ở `gap1-v1`, 5k cold dùng 4.987 rows; 25k warm dùng 24.947 rows. Không run được lưu trong JSON báo lỗi hoặc OOM. Trong các run authoritative, RAF delay p95 0,03–0,13 ms, max 0,13–0,63 ms. Đây chỉ là mẫu của một desktop Chrome mạnh; không phải cam kết responsiveness cho thiết bị khác.

Metrics chỉ để so pipeline với baseline trên synthetic noise, không phải alpha evidence. Với 5k, Ridge MSE là 0,00014356 so với zero-return baseline 0,00014367; Logistic accuracy là 49,85% so với majority-class baseline 49,45%. Với 25k warm, Ridge MSE 0,00014150 so với 0,00014156; Logistic accuracy 50,09% thấp hơn majority baseline 51,33%.

Browser không lộ transfer size cross-origin hoặc API đo memory worker/WASM trong phiên này. Chromium báo `navigator.deviceMemory = 32`, nhưng đây không phải peak memory của Pyodide. Vì vậy asset size và memory peak vẫn chưa đo được.

Cancellation sau gap chưa được ghi vào JSON authoritative. Lần cancel 50k và chạy lại 5k trước đó thuộc revision pre-gap, vì vậy chỉ tham khảo; cancel/recreate acceptance vẫn pending.

Public Binance socket kết nối trực tiếp, đạt state `live`, nhận 355 trade messages trong khoảng 6,2 giây, sau đó đóng thủ công với code 1000 và `wasClean=true`. Một message đầu được nhận khoảng 46 ms sau event timestamp; không kết luận network latency từ mẫu đó vì clock/event semantics chưa được hiệu chỉnh. Kết quả này chứng minh một lần direct connection ở vùng và mạng hiện tại; không chứng minh availability toàn vùng hoặc lifecycle đầy đủ.

## Baseline ứng viên và giới hạn chưa kiểm chứng

Baseline spike có thể chuyển cho coordinator xem xét: một tab, một public market-data socket, một worker đang chạy; pipeline cố định. Sau purge, 5k cold/warm và 25k warm chạy được trên desktop Chrome này. 50k vẫn là test case chưa đo sau purge. Đây chưa phải row cap được hỗ trợ: chỉ có một máy mạnh, dữ liệu đơn giản và chưa đo peak memory. Không khẳng định row count nào là giới hạn production.

Chưa kiểm thử Firefox/Safari/mobile, thiết bị ít RAM, tải qua cache mạng hoàn toàn lạnh, Binance region-denial/CSP failure, tab hidden/grace timing, tự reconnect/backoff/jitter, multi-tab concurrency cap, widget subscription sharing, snapshot/stream reconciliation, missing-candle REST backfill hoặc source-rights approval. Không đánh dấu lifecycle acceptance chỉ dựa trên một lần connect/close. Nếu stream bị từ chối theo vùng/mạng, ghi lỗi quan sát được và giữ trạng thái degraded; không proxy để vượt giới hạn.

## Handoff

Coordinator có thể chạy lại harness trong Chromium và Firefox, thêm Safari/mobile khi có thiết bị. Tải JSON sau các lần cold/warm và cancellation; ghi browser/OS/device, tình trạng cache mạng và lỗi chính xác. Chỉ sau khi có các lượt đó mới quyết định row/memory limits, browser support, background grace và retry policy. Không dùng kết quả spike làm source-rights approval hay bằng chứng model alpha.
