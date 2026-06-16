# DATABASE_STRUCTURE V3

## Tổng Quan

**Tên File:** DATABASE_HomeMatch

**Loại:** Google Sheet

**URL:** `https://docs.google.com/spreadsheets/d/1UjDU0PIRIAoNx8f56WQ6v67yP7hJf5J5MdfS7y95rCw/edit`

**Mục đích:**

* Quản lý dữ liệu phòng trọ (PHONGTRO)
* Quản lý hình ảnh phòng (HINHANH)
* Quản lý nhu cầu ở ghép (ROOMMATE)
* Quản lý lịch hẹn khách xem phòng (LICHHEN)
* Quản lý nhân viên sale (SALE)
* Theo dõi lead phát sinh từ website (LEAD)

**Kiến trúc hiện tại:**

```text
Google Sheet (Source of Truth)
        │
        ├── AppSheet (Sales Operations)
        │
        └── Website (Lead Generation via Apps Script API)
```

---

# Database V1 Architecture

```mermaid
erDiagram

    PHONGTRO ||--o{ HINHANH : contains
    PHONGTRO ||--o{ LICHHEN : booked_for
    PHONGTRO ||--o{ ROOMMATE : related_to

    SALE ||--o{ LICHHEN : manages

    PHONGTRO ||--o{ LEAD : generates
    ROOMMATE ||--o{ LEAD : generates
```

---

# Bảng PHONGTRO

## Mục đích

Lưu trữ thông tin phòng trọ.

## Fields

| Field | Type | Description | Ghi chú |
|-------|------|-------------|---------|
| IDPhong | String | Mã phòng duy nhất | PK, do AppSheet tự sinh |
| HinhAnhChinh | String | URL ảnh đại diện | |
| SoNha | String | Số nhà | |
| Duong | String | Đường | |
| Phuong | String | Phường/Xã | |
| KhuVuc | String | Khu vực | VD: "Quận 7", "Thủ Đức" |
| HopDong | String | Loại hợp đồng | VD: "6-12 tháng" |
| Gia | Number | Giá thuê | Số (VD: 7000000) |
| MayLanh | String | Có máy lạnh | "Có" / "Không" |
| KeBep | String | Có kệ bếp | "Có" / "Không" |
| Gac | String | Có gác | "Có" / "Không" |
| TuLanh | String | Có tủ lạnh | "Có" / "Không" |
| NhaVS | String | Có nhà vệ sinh | "Riêng" / "Chung" / "Không" |
| CuaSo | String | Có cửa sổ | "Có" / "Không" |
| BanCong | String | Có ban công | "Có" / "Không" |
| DeXe | String | Chỗ để xe | "Bãi để xe" / "Không" / "Có" |
| ThuCung | String | Cho phép thú cưng | "Có" / "Không" |
| XeDien | String | Hỗ trợ xe điện | "Có" / "Không" |
| GioGiac | String | Quy định giờ giấc | "Tự do" / "23h đóng cửa" |
| MayGiat | String | Có máy giặt | "Có" / "Không" / "Riêng" |
| ThangMay | String | Có thang máy | "Có" / "Không" |
| Lau | String | Tầng/lầu | VD: "Lầu 6" |
| Dien | String | Giá điện | VD: "3.800đ/kWh" |
| Nuoc | String | Giá nước | VD: "25.000đ/m3" |
| PhiQuanLy | String | Phí quản lý | VD: "130.000đ/phòng" |
| PhiGiuXe | String | Phí giữ xe | VD: "100.000đ/xe" |
| TienIch | Text | Mô tả tiện ích | |
| TrangThai | String | Trạng thái phòng | "Trống" / "Đã thuê" / "Ẩn" |
| HoaHong | String | Hoa hồng (cho Sale) | VD: "40-70%" |
| GhiChu | Text | Ghi chú | |
| IDChuNha | String | Link Zalo/Nhom chủ nhà | |
| Slug | String | URL SEO | Có thể để trống |
| NgayTao | DateTime | Ngày tạo | Do AppSheet tự ghi |
| NgayCapNhat | DateTime | Ngày cập nhật | Do AppSheet tự ghi |

## Giá trị TrangThai (thực tế)

| Giá trị | Ý nghĩa |
|---------|---------|
| Trống | Phòng trống, có thể cho thuê |
| Đã thuê | Phòng đã có người ở |
| Ẩn | Không hiển thị trên website |

> **Lưu ý:** TrangThai dùng tiếng Việt (khác với code cũ dùng "ACTIVE"). Code API cần map "Trống" → ACTIVE.

---

# Bảng HINHANH

## Mục đích

Lưu danh sách hình ảnh của từng phòng.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| IDAnh | String | Mã ảnh (PK) |
| IDPhong | String | Liên kết phòng (FK → PHONGTRO.IDPhong) |
| HinhAnh | String | URL ảnh |
| SortOrder | Number | Thứ tự hiển thị |
| CreatedAt | DateTime | Ngày tạo |

## Quan hệ

```text
PHONGTRO (1)
    ↓
HINHANH (N)
```

---

# Bảng ROOMMATE

## Mục đích

Lưu nhu cầu ở ghép hiển thị trên website.

> **Ghi chú:** Tên tab trong Sheet là `ROOMMATE` (khác với code cũ dùng `ROOMMATE_POST`).

## Business Rule

* Chỉ Admin được tạo bài đăng (qua AppSheet).
* Người dùng không được tự đăng bài.
* Thông tin được thu thập thông qua Sale.
* Mỗi bài đăng liên kết với một phòng trong hệ thống.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| IDBai | String | Mã bài đăng (PK) |
| KieuBaiDang | String | Loại bài đăng |
| IDPhong | String | Mã phòng (FK → PHONGTRO.IDPhong) |
| TenKhachHang | String | Tên khách hàng |
| SDTKhach | String | Số điện thoại khách |
| SoNguoiCanTuyen | String | Số người cần tuyển |
| KhuVucMongMuon | String | Khu vực mong muốn |
| GioiTinh | String | Giới tính |
| SchoolOrWork | String | Trường học / Nơi làm việc |
| TaiChinh | String | Tài chính / Ngân sách |
| MoTaNhuCau | Text | Mô tả nhu cầu |
| TrangThai | String | Trạng thái |
| NgayTao | DateTime | Ngày tạo |
| Thoihan | Date | Thời hạn |

## KieuBaiDang

```text
LOOKING_FOR_ROOMMATE  → Cần tìm người ở ghép
NEED_ROOMMATE_FOR_ROOM → Cần người thuê chung phòng
```

## TrangThai

```text
Đang hiển thị → ACTIVE
Đã kết thúc   → CLOSED
```

---

# Bảng LICHHEN

## Mục đích

Quản lý lịch hẹn xem phòng (do AppSheet quản lý).

> **Lưu ý:** Tab này do AppSheet tự động quản lý. Cấu trúc chi tiết cần đối chiếu với AppSheet.

## Fields (xác nhận)

| Field | Type | Description |
|-------|------|-------------|
| ID | String | Mã lịch hẹn (PK) |

> Các field khác do AppSheet quản lý (IDPhong, Khach, SDTKhach, NgayHen...).

---

# Bảng SALE

## Mục đích

Quản lý nhân viên sale.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| IDSale | String | Mã sale (PK) |
| HoTen | String | Họ tên |
| ChucVu | String | Chức vụ |
| QLCTV | String | Quản lý CTV |
| STK | String | Số tài khoản |
| NganHang | String | Ngân hàng |
| SDT | String | Số điện thoại |
| Email | String | Email |

---

# Bảng LEAD

## Mục đích

Theo dõi lead phát sinh từ website.

> **Lưu ý:** Tab này do website ghi thông qua API. Cấu trúc chi tiết cần đối chiếu với AppSheet.

## Fields (xác nhận)

| Field | Type | Description |
|-------|------|-------------|
| LeadID | String | Mã lead (PK) |

> Các field khác (SourceType, SourceID, CreatedAt) do API ghi vào.

---

# Quan Hệ Dữ Liệu

```text
PHONGTRO
├── HINHANH (1:N — qua IDPhong)
├── LICHHEN (1:N — qua IDPhong)
├── ROOMMATE (1:N — qua IDPhong)
└── LEAD (1:N — qua IDPhong)

SALE
└── LICHHEN (1:N — qua IDSale)

ROOMMATE
└── LEAD (1:N — qua IDBai)
```

---

# MVP Scope

Website sử dụng:

* PHONGTRO — Hiển thị danh sách & chi tiết phòng
* HINHANH — Hiển thị hình ảnh phòng
* ROOMMATE — Hiển thị bài đăng ở ghép

AppSheet sử dụng:

* PHONGTRO — Quản lý phòng
* HINHANH — Quản lý ảnh
* LICHHEN — Quản lý lịch hẹn
* SALE — Quản lý sale
* ROOMMATE — Quản lý bài ở ghép

Analytics sử dụng:

* LEAD — Theo dõi lead

---

# Future Expansion

Khi quy mô vượt quá giới hạn Google Sheet:

```text
Google Sheet
        ↓
PostgreSQL / Supabase
```

Database schema được thiết kế để migrate mà không cần thay đổi business logic.

---

# Lịch sử thay đổi

| Version | Ngày | Thay đổi |
|---------|------|----------|
| V1 | 2026-06-13 | Cấu trúc thiết kế ban đầu |
| V2 | 2026-06-14 | Cập nhật sau Phase 2A code |
| V3 | 2026-06-16 | Đồng bộ với Google Sheet thật (DATABASE_HomeMatch) |
