# Sheet Design V4

## Purpose

Định nghĩa cấu trúc Google Sheet dùng cho MVP.

Google Sheet là Source of Truth của hệ thống.

**File:** DATABASE_HomeMatch

**URL:** `https://docs.google.com/spreadsheets/d/1UjDU0PIRIAoNx8f56WQ6v67yP7hJf5J5MdfS7y95rCw/edit`

---

# Sheet: PHONGTRO

## Description

Lưu thông tin phòng trọ.

Quản lý bởi: AppSheet + Website (đọc)

## Columns

| Column | Type | Required | Ghi chú |
|--------|:----:|:--------:|---------|
| IDPhong | string | Yes | PK, do AppSheet sinh |
| MaPhong | string | No | Mã phòng rút gọn (VD: `P001`) |
| HinhAnhChinh | string | Yes | URL ảnh đại diện |
| LoaiPhong | string | No | Loại phòng (VD: `Phòng trọ`, `Căn hộ`, `Studio`) |
| SoNha | string | Yes | |
| Duong | string | Yes | |
| Phuong | string | Yes | |
| KhuVuc | string | Yes | VD: "Quận 7", "Thủ Đức" |
| HopDong | string | No | "6-12 tháng" |
| Gia | number | Yes | Giá thuê (VD: 7000000) |
| DienTich | number | No | Diện tích (VD: `25`, `30`), đơn vị m² |
| MayLanh | string | No | "Có" / "Không" |
| KeBep | string | No | "Có" / "Không" |
| Gac | string | No | "Có" / "Không" |
| TuLanh | string | No | "Có" / "Không" |
| NhaVS | string | No | "Riêng" / "Chung" / "Không" |
| CuaSo | string | No | "Có" / "Không" |
| BanCong | string | No | "Có" / "Không" |
| DeXe | string | No | "Bãi để xe" |
| ThuCung | string | No | "Có" / "Không" |
| XeDien | string | No | "Có" / "Không" |
| GioGiac | string | No | "Tự do" |
| MayGiat | string | No | "Có" / "Không" / "Riêng" |
| ThangMay | string | No | "Có" / "Không" |
| Lau | string | No | VD: "Lầu 6" |
| Dien | string | No | VD: "3.800đ/kWh" |
| Nuoc | string | No | VD: "25.000đ/m3" |
| PhiQuanLy | string | No | VD: "130.000đ/phòng" |
| PhiGiuXe | string | No | VD: "100.000đ/xe" |
| TienIch | string | No | Mô tả tiện ích |
| TrangThai | string | Yes | "Trống" / "Đã thuê" / "Ẩn" |
| HoaHong | string | No | VD: "40-70%" |
| GhiChu | string | No | Ghi chú nội bộ |
| IDChuNha | string | No | Link Zalo/Nhóm chủ nhà |
| Slug | string | No | URL SEO (có thể trống) |
| NgayTao | datetime | No | AppSheet tự ghi |
| NgayCapNhat | datetime | No | AppSheet tự ghi |

---

# Sheet: HINHANH

## Description

Lưu danh sách ảnh của phòng.

## Columns

| Column | Type | Required |
|--------|:----:|:--------:|
| IDAnh | string | Yes |
| IDPhong | string | Yes |
| HinhAnh | string | Yes |
| SortOrder | number | No |
| CreatedAt | datetime | No |

---

# Sheet: ROOMMATE

## Description

Nhu cầu ở ghép.

Admin tạo thủ công qua AppSheet.

## Columns

| Column | Type | Required | Ghi chú |
|--------|:----:|:--------:|---------|
| IDBai | string | Yes | PK |
| KieuBaiDang | string | Yes | LOOKING_FOR_ROOMMATE / NEED_ROOMMATE_FOR_ROOM |
| IDPhong | string | Yes | FK -> PHONGTRO.IDPhong |
| TenKhachHang | string | Yes | |
| SDTKhach | string | Yes | |
| SoNguoiCanTuyen | string | No | |
| KhuVucMongMuon | string | No | |
| GioiTinh | string | No | |
| SchoolOrWork | string | No | |
| TaiChinh | string | No | Ngân sách |
| MoTaNhuCau | string | No | |
| TrangThai | string | Yes | "Đang hiển thị" |
| NgayTao | datetime | No | |
| Thoihan | date | No | |

---

# Sheet: LEAD

## Description

Tracking lead từ website.

## Columns

| Column | Type | Required |
|--------|:----:|:--------:|
| LeadID | string | Yes |

> Tab này do AppSheet quản lý. Cấu trúc chi tiết cần đối chiếu từ AppSheet.

---

# Sheet: SALE

## Description

Danh sách sale.

## Columns

| Column | Type | Required |
|--------|:----:|:--------:|
| IDSale | string | Yes |
| HoTen | string | Yes |
| ChucVu | string | No |
| QLCTV | string | No |
| STK | string | No |
| NganHang | string | No |
| SDT | string | Yes |
| Email | string | No |

---

# Sheet: LICHHEN

## Description

Quản lý lịch hẹn.

## Columns

| Column | Type | Required |
|--------|:----:|:--------:|
| ID | string | Yes |

> Tab này do AppSheet quản lý. Cấu trúc chi tiết cần đối chiếu từ AppSheet.

---

# Lịch sử thay đổi

| Version | Ngày | Thay đổi |
|---------|------|----------|
| V1 | 2026-06-13 | Thiết kế ban đầu |
| V2 | 2026-06-14 | Cập nhật sau code review |
| V3 | 2026-06-16 | Đồng bộ với Google Sheet thật (DATABASE_HomeMatch) |
| V4 | 2026-06-28 | Thêm cột MaPhong, LoaiPhong, DienTich vào sheet PHONGTRO |
