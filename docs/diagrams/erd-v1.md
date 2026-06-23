# ERD V3

## Overview

Entity Relationship Diagram cho hệ thống tìm phòng trọ và tìm người ở ghép.

Database: Supabase (PostgreSQL) — migrated từ Google Sheet.

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

    ImageCache {
        string path PK
        string drive_url
        timestamptz updated_at
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
        string SourceType
        string SourceID
        datetime CreatedAt
    }

    PHONGTRO ||--o{ HINHANH : contains
    PHONGTRO ||--o{ LICHHEN : booked_for
    PHONGTRO ||--o{ ROOMMATE : related_to
    PHONGTRO ||--o{ ImageCache : caches_main
    PHONGTRO ||--o{ LEAD : generates

    HINHANH ||--o{ ImageCache : caches_gallery

    SALE ||--o{ LICHHEN : handles
    ROOMMATE ||--o{ LEAD : generates
```

---

# Ghi chú thay đổi từ V2 → V3

| Thay đổi | Chi tiết |
|----------|----------|
| Database | Google Sheet → Supabase (PostgreSQL) |
| ImageCache | Bảng mới: mapping path ảnh → Google Drive URL |
| API Layer | Google Apps Script → Supabase SDK |
| Tên bảng | Tự động lowercase trong Supabase (`PHONGTRO` → `phongtro`) |
| LEAD | Cập nhật cấu trúc: LeadID, SourceType, SourceID, CreatedAt |
