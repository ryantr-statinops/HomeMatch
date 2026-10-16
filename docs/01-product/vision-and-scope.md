# Vision và phạm vi
**Trạng thái:** target, chưa triển khai.

Research Terminal giúp retail trader người Việt đọc tin theo tài sản, đối chiếu phản ứng giá, theo dõi danh mục và kiểm tra giả thuyết bằng model đơn giản. Giá trị chính là research workflow có evidence, không phải lời hứa dự báo đúng hoặc lợi nhuận.

## Người dùng
- Retail trader intraday cần biết sự kiện mới, thời điểm nhận và bối cảnh giá/volume.
- Người giữ lệnh vài ngày/tuần cần theo dõi exposure và news liên quan danh mục.
- Người học/nghiên cứu cần dựng baseline có thể tái lập, hiểu leakage và chi phí.

## MVP
Binance Spot BTCUSDT/ETHUSDT; candles 15m/1h/1d; UI tiếng Việt. News có provenance và event mapping; nguồn được duyệt mới phục vụ đúng phạm vi quyền. Có account/workspace private, watchlist, live theo tab, portfolio manual/CSV và browser Model Lab. Base portfolio là USDT, không giả định USD/VND ngang giá.

## Ngoài MVP
Không real-order execution, không khóa sàn, không margin/short/leverage/liquidation. Funding/OI là mở rộng dữ liệu, chưa là mặc định. Không arbitrary Python, training server, deep learning hoặc tuning không giới hạn. US equities, FX và VN equities giữ trong khảo sát, chưa hỗ trợ sản phẩm.

## Current versus target
Source hiện tại thuộc HomeMatch legacy; codebase reset, auth mới, data ingestion, Pyodide và live browser chưa triển khai. Không lấy dataset cũ hoặc credential cũ làm mặc định cho sản phẩm mới. Public demo là workspace mẫu riêng, không công khai danh mục/experiment người dùng.
