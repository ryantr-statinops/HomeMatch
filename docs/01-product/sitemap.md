# Sitemap mục tiêu

Sitemap mô tả sản phẩm tìm và khám phá tin cho người thuê. Đây là cấu trúc mục tiêu, chưa xác nhận các route đã được triển khai.

```text
Home / Khám phá
├── Bắt đầu tìm kiếm
│   └── Nhập nhu cầu / chỉnh bộ lọc
├── Kết quả
│   ├── Danh sách tin
│   ├── Bản đồ (tùy độ phủ và giai đoạn, chưa thuộc MVP mặc định)
│   └── So sánh tin đã chọn
├── Chi tiết tin /listings/:id
│   ├── Thông tin phòng và chi phí
│   ├── Lý do phù hợp
│   ├── Khoảng giá tham khảo (khi đủ cơ sở)
│   └── Tin tương tự
├── Tin đã lưu
├── Giải thích cách gợi ý / dữ liệu và phạm vi
└── Trạng thái hệ thống: không có kết quả, tải lỗi, dữ liệu chưa đủ
```

## Điều hướng

- Lối vào chính là khám phá/tìm kiếm, không phải luồng đăng tin.
- Tìm kiếm đã nhập cần duy trì khi mở tin chi tiết rồi quay lại.
- Lưu và so sánh phải khả dụng trên desktop và mobile, đồng thời thông báo giới hạn lưu cục bộ.
- Tên route là ví dụ định hướng; hợp đồng URL/API chính thức do tài liệu kiến trúc/API quyết định.
- Không đưa các khu vực roommate, sale, lead hay Admin cũ vào sitemap mục tiêu.
