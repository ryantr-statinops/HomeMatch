# Đo thành công
**Trạng thái:** kế hoạch đo; chưa có kết quả.

## Product
Đo người dùng hoàn tất luồng news → asset → watchlist, import portfolio thành công, lưu/chạy experiment, hiểu nhãn nguồn/stale/client-computed. Không dùng số click hoặc tổng người đăng ký làm bằng chứng model có giá trị.

## Data/operation
Đo completeness, candle gaps/duplicates, source freshness, timestamp conflicts, ingestion lag và corrections. Phân biệt publication-to-seen lag với transport lag. News rights/coverage là gate xuất bản.

## Browser Lab
Đo cold/warm load, memory, train duration, cancellation/recovery trên mẫu 5k/25k/50k rows và máy thử được ghi cấu hình. P02 khóa mức support sau đo; không cam kết mọi browser/mobile chạy model.

## Quant
So baseline/model trên cùng holdout và sample eligibility. Direction: log-loss/calibration và balanced metrics khi mất cân bằng; regression: MAE/error distribution; strategy: net P&L/drawdown/exposure/turnover có costs. Báo cáo cả thất bại, số thử và out-of-sample window; chưa có ngưỡng hoặc alpha được chứng minh.

## Acceptance
Chỉ đặt mục tiêu số sau khi có pilot baseline và dữ liệu. Mỗi threshold ghi owner, dataset, lý do và ngày; không sửa metric sau khi nhìn test để tuyên bố đạt.
