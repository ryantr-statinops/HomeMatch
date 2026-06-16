# ERD V2

## Overview

Entity Relationship Diagram cho MVP hệ thống tìm phòng trọ và tìm người ở ghép.

Cập nhật theo Google Sheet thật (DATABASE_HomeMatch).

---

# Mermaid ERD

```mermaid
erDiagram

    PHONGTRO {
        string IDPhong PK
        string HinhAnhChinh
        string SoNha
        string Duong
        string Phuong
        string KhuVuc
        string HopDong
        number Gia
        string MayLanh
        string KeBep
        string Gac
        string TuLanh
        string NhaVS
        string CuaSo
        string BanCong
        string DeXe
        string ThuCung
        string XeDien
        string GioGiac
        string MayGiat
        string ThangMay
        string Lau
        string Dien
        string Nuoc
        string PhiQuanLy
        string PhiGiuXe
        string TienIch
        string TrangThai
        string HoaHong
        string GhiChu
        string IDChuNha
        string Slug
        datetime NgayTao
        datetime NgayCapNhat
    }

    HINHANH {
        string IDAnh PK
        string IDPhong FK
        string HinhAnh
        number SortOrder
        datetime CreatedAt
    }

    ROOMMATE {
        string IDBai PK
        string KieuBaiDang
        string IDPhong FK
        string TenKhachHang
        string SDTKhach
        string SoNguoiCanTuyen
        string KhuVucMongMuon
        string GioiTinh
        string SchoolOrWork
        string TaiChinh
        string MoTaNhuCau
        string TrangThai
        datetime NgayTao
        date Thoihan
    }

    LICHHEN {
        string ID PK
    }

    SALE {
        string IDSale PK
        string HoTen
        string ChucVu
        string QLCTV
        string STK
        string NganHang
        string SDT
        string Email
    }

    LEAD {
        string LeadID PK
    }

    PHONGTRO ||--o{ HINHANH : contains
    PHONGTRO ||--o{ LICHHEN : booked_for
    SALE ||--o{ LICHHEN : handles
    PHONGTRO ||--o{ ROOMMATE : related_to
    PHONGTRO ||--o{ LEAD : generates
    ROOMMATE ||--o{ LEAD : generates
```

---

# Ghi chú thay đổi từ V1 -> V2

| Thay đổi | Chi tiết |
|----------|----------|
| PHONGTRO | Thêm: BanCong, ThangMay, Lau, HoaHong, GhiChu, IDChuNha, NgayTao, NgayCapNhat |
| PHONGTRO | Xoá: DienTich, CreatedAt, UpdatedAt |
| PHONGTRO | Boolean -> String (Giá trị Việt: "Có"/"Không"/"Riêng") |
| ROOMMATE | Đổi tên từ ROOMMATE_POST -> ROOMMATE |
| ROOMMATE | Cấu trúc hoàn toàn mới (12 fields tiếng Việt) |
| SALE | Thêm: ChucVu, QLCTV, STK, NganHang |
| HINHANH | Thêm: CreatedAt |
| LICHHEN | Đang chờ xác nhận cấu trúc từ AppSheet |
| LEAD | Đang chờ xác nhận cấu trúc từ AppSheet |
