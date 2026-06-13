# Sheet Design V1

## Purpose

Định nghĩa cấu trúc Google Sheet dùng cho MVP.

Google Sheet là Source of Truth của hệ thống.

Mọi API và AppSheet phải tuân thủ cấu trúc này.

---

# Sheet: PHONGTRO

## Description

Lưu thông tin phòng trọ.

## Columns

| Column | Type | Required |
|----------|----------|----------|
| IDPhong | string | Yes |
| HinhAnhChinh | string | Yes |
| SoNha | string | Yes |
| Duong | string | Yes |
| Phuong | string | Yes |
| KhuVuc | string | Yes |
| Gia | number | Yes |
| DienTich | number | No |
| HopDong | string | No |
| MayLanh | boolean | No |
| KeBep | boolean | No |
| Gac | boolean | No |
| TuLanh | boolean | No |
| NhaVS | boolean | No |
| CuaSo | boolean | No |
| DeXe | boolean | No |
| ThuCung | boolean | No |
| XeDien | boolean | No |
| GioGiac | string | No |
| MayGiat | boolean | No |
| Dien | number | No |
| Nuoc | number | No |
| PhiQuanLy | number | No |
| PhiGiuXe | number | No |
| TienIch | string | No |
| TrangThai | string | Yes |
| Slug | string | Yes |

---

## TrangThai

ACTIVE

RENTED

HIDDEN

---

# Sheet: HINHANH

## Description

Lưu danh sách ảnh của phòng.

## Columns

| Column | Type |
|----------|----------|
| IDAnh | string |
| IDPhong | string |
| HinhAnh | string |
| SortOrder | number |

---

# Sheet: ROOMMATE_POST

## Description

Nhu cầu ở ghép.

Admin tạo thủ công.

## Columns

| Column | Type |
|----------|----------|
| PostID | string |
| RoomID | string |
| PostType | string |
| CustomerName | string |
| CustomerPhone | string |
| Gender | string |
| School | string |
| Budget | number |
| Description | string |
| Status | string |
| ExpireAt | date |
| CreatedAt | datetime |

---

## PostType

LOOKING_FOR_ROOMMATE

NEED_ROOMMATE_FOR_ROOM

---

## Status

ACTIVE

MATCHED

EXPIRED

---

# Sheet: LEAD

## Description

Tracking lead từ website.

## Columns

| Column | Type |
|----------|----------|
| LeadID | string |
| SourceType | string |
| SourceID | string |
| CreatedAt | datetime |

---

## SourceType

ROOM

ROOMMATE

---

# Sheet: SALE

## Description

Danh sách sale.

## Columns

| Column | Type |
|----------|----------|
| IDSale | string |
| HoTen | string |
| SDT | string |
| Email | string |

---

# Sheet: LICHHEN

## Description

Quản lý lịch hẹn.

## Columns

| Column | Type |
|----------|----------|
| ID | string |
| IDPhong | string |
| Khach | string |
| SDTKhach | string |
| SaleNhapKhach | string |
| SaleDanKhach | string |
| NgayHen | date |
| KetQua | string |
| LyDoHuy | string |
| TienCocDaNhan | number |
| NgayBoSungCoc | date |
| NgayDonVao | date |
| HopDong | string |
| HoaHong | number |
| Thuong | number |