# Đánh giá và vòng đời model

> **Trạng thái:** quy trình đề xuất, chưa có model được phát hành.

## Giao thức đánh giá

- Recommendation: đánh giá offline bằng Recall@K, NDCG@K và coverage; có baseline content/weighted ranking làm đối chứng. Với tương tác, báo rõ exposure bias và không dùng click thô như relevance ground truth.
- Giá chào thuê: MAE và median absolute error cho khả năng diễn giải, thêm RMSE khi cần nhạy với sai số lớn; đo pinball loss/coverage cho khoảng dự đoán.
- Similar listings: đánh giá precision/relevance theo tập được gán nhãn hoặc rà soát thủ công, duplicate leakage và khả năng thay thế hợp lý.
- Báo cáo theo lát cắt khu vực, loại phòng, khoảng giá, độ mới, độ đầy đủ và chất lượng vị trí. Không chỉ báo một điểm trung bình.

Tách test theo thời gian để phản ánh dữ liệu tương lai và group theo phòng/cụm trùng để tránh leakage. Validation dùng để chọn model và hiệu chỉnh; test giữ lại đến khi chốt candidate. Nếu dữ liệu ít, ưu tiên đánh giá thủ công có rubric, kèm giới hạn kết luận; không tuyên bố accuracy đại diện toàn thị trường.

## Điều kiện bật model

Model candidate cần vượt baseline trên tiêu chí đã định trước, không làm suy giảm nghiêm trọng lát cắt quan trọng, có phân tích bất định, kiểm tra input/missingness, đo latency và có fallback. Ngưỡng số cụ thể được chốt sau khi có dataset và yêu cầu sản phẩm; không đặt số giả trong tài liệu hiện tại.

## Registry và phát hành

Mỗi artifact phát hành gắn model version, code revision, feature contract, training dataset/snapshot, split definition, metrics, cấu hình và ngày tạo. Model artifacts lưu ở object storage; metadata phục vụ tra cứu. Inference nhận feature theo contract, kiểm tra schema và trả version để quan sát.

Triển khai theo candidate/staging trước, so sánh với baseline bằng shadow hoặc canary khi hạ tầng cho phép. Theo dõi lỗi schema, tỷ lệ fallback, latency, freshness, phân phối input và chất lượng khi có nhãn trễ. Có thể rollback về model trước hoặc baseline mà không cần đổi dữ liệu gốc. Retraining chỉ sau khi có dữ liệu mới đủ chất lượng và đánh giá lại đầy đủ; không tự động thay model chỉ vì lịch chạy.
