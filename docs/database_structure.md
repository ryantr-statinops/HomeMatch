# 📊 DATABASE_FULL - Cấu Trúc Dữ Liệu

## 🗂️ Tổng Quan

**Tên File:** DATABASE_FULL  
**Loại:** Google Sheet  
**Mục đích:** Quản lý thông tin phòng trọ, hình ảnh, lịch hẹn và nhân viên sale  
**Trạng thái:** Đang sử dụng IMPORTRANGE để đồng bộ sang file đích

---

## 📋 Cấu Trúc Chi Tiết

```text
DATABASE_FULL/
│
├── 🏠 PHONGTRO (Thông tin phòng trọ)
│   ├── IDPhong (ID duy nhất của phòng)
│   ├── HinhAnhChinh (Link hình ảnh chính)
│   ├── SoNha (Số nhà)
│   ├── Duong (Tên đường)
│   ├── Phuong (Phường/Xã)
│   ├── KhuVuc (Khu vực)
│   ├── HopDong (Loại hợp đồng)
│   ├── Gia (Giá tiền/tháng)
│   ├── MayLanh (Điều hòa)
│   ├── KeBep (Bếp)
│   ├── Gac (Gác)
│   ├── TuLanh (Tủ lạnh)
│   ├── NhaVS (Nhà vệ sinh)
│   ├── CuaSo (Cửa sổ)
│   ├── DeXe (Để xe)
│   ├── ThuCung (Thú cưng)
│   ├── XeDien (Xe điện)
│   ├── GioGiac (Giờ giấc)
│   ├── MayGiat (Máy giặt)
│   ├── Dien (Tiền điện)
│   ├── Nuoc (Tiền nước)
│   ├── PhiQuanLy (Phí quản lý)
│   ├── PhiGiuXe (Phí giữ xe)
│   ├── TienIch (Tiện ích)
│   └── TrangThai (Trạng thái phòng)
│
├── 📷 HINHANH (Hình ảnh chi tiết)
│   ├── IDAnh (ID hình ảnh)
│   ├── IDPhong (ID phòng - liên kết với PHONGTRO)
│   └── HinhAnh (Link hình ảnh)
│
├── 📅 LICHHEN (Lịch hẹn xem phòng)
│   ├── ID (ID lịch hẹn)
│   ├── Khach (Tên khách)
│   ├── SDTKhach (Số điện thoại khách)
│   ├── IDPhong (ID phòng - liên kết với PHONGTRO)
│   ├── SaleNhapKhach (Sale nhập khách)
│   ├── SaleDanKhach (Sale dẫn khách)
│   ├── NgayHen (Ngày hẹn xem phòng)
│   ├── KetQua (Kết quả xem phòng)
│   ├── LyDoHuy (Lý do hủy - nếu có)
│   ├── TienCocDaNhan (Tiền cọc đã nhận)
│   ├── NgayBoSungCoc (Ngày bổ sung cọc)
│   ├── NgayDonVao (Ngày đón vào)
│   ├── HopDong (Số hợp đồng)
│   ├── HoaHong (Hoa hồng)
│   └── Thuong (Thưởng)
│
└── 👤 SALE (Thông tin nhân viên sale)
    ├── IDSale (ID nhân viên)
    ├── HoTen (Họ tên)
    ├── SDT (Số điện thoại)
    └── Email (Email liên lạc)
```

---

## 🔗 Quan Hệ Dữ Liệu

| Liên kết | Sheet nguồn | Sheet đích | Trường khóa |
|:----------:|:------------:|:-----------:|:-----------:|
| Hình ảnh - Phòng | HINHANH | PHONGTRO | IDPhong |
| Lịch hẹn - Phòng | LICHHEN | PHONGTRO | IDPhong |
| Lịch hẹn - Sale | LICHHEN | SALE | SaleNhapKhach, SaleDanKhach |

---

## 🔄 Đồng Bộ Dữ Liệu

**Phương pháp:** IMPORTRANGE  
**Tần suất cập nhật:** Real-time (2-5 giây)  
**Trạng thái:** ✅ Đang hoạt động

### Công thức IMPORTRANGE được sử dụng:
```
PHONGTRO: =IMPORTRANGE("1UjDU0PIRIAoNx8f56WQ6v67yP7hJf5J5MdfS7y95rCw", "PHONGTRO!A:Z")
HINHANH: =IMPORTRANGE("1UjDU0PIRIAoNx8f56WQ6v67yP7hJf5J5MdfS7y95rCw", "HINHANH!A:Z")
LICHHEN: =IMPORTRANGE("1UjDU0PIRIAoNx8f56WQ6v67yP7hJf5J5MdfS7y95rCw", "LICHHEN!A:Z")
SALE: =IMPORTRANGE("1UjDU0PIRIAoNx8f56WQ6v67yP7hJf5J5MdfS7y95rCw", "SALE!A:Z")
```

---

## 📝 Ghi chú

- Mọi thay đổi ở file gốc sẽ tự động cập nhật ở file đích
- Không thể chỉnh sửa trực tiếp dữ liệu ở file đích (chỉ xem)
- Để thay đổi dữ liệu, cần sửa ở file gốc DATABASE_FULL

---

**Cập nhật lần cuối:** 13/06/2026
