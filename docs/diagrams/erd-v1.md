# 🗄️ ERD V1

## Overview

Entity Relationship Diagram cho MVP hệ thống tìm phòng trọ và tìm người ở ghép.

---

# Mermaid ERD

```mermaid
erDiagram

    PHONGTRO {
        string IDPhong PK
        string SoNha
        string Duong
        string Phuong
        string KhuVuc

        number Gia
        number DienTich

        string HopDong

        boolean MayLanh
        boolean KeBep
        boolean Gac
        boolean TuLanh
        boolean NhaVS
        boolean CuaSo
        boolean DeXe
        boolean ThuCung
        boolean XeDien
        boolean MayGiat

        string GioGiac

        number Dien
        number Nuoc
        number PhiQuanLy
        number PhiGiuXe

        string TienIch

        string TrangThai

        string Slug

        datetime CreatedAt
        datetime UpdatedAt
    }

    HINHANH {
        string IDAnh PK
        string IDPhong FK

        string HinhAnh

        number SortOrder

        datetime CreatedAt
    }

    ROOMMATE_POST {
        string PostID PK

        string RoomID FK

        string PostType

        string CustomerName
        string CustomerPhone

        string Gender
        string School

        number Budget

        string Description

        string Status

        date ExpireAt

        datetime CreatedAt
    }

    LICHHEN {
        string ID PK

        string IDPhong FK

        string SaleNhapKhach FK
        string SaleDanKhach FK

        string Khach
        string SDTKhach

        date NgayHen

        string KetQua
        string LyDoHuy

        number TienCocDaNhan

        date NgayBoSungCoc
        date NgayDonVao

        string HopDong

        number HoaHong
        number Thuong
    }

    SALE {
        string IDSale PK

        string HoTen

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

    SALE ||--o{ LICHHEN : handles

    PHONGTRO ||--o{ ROOMMATE_POST : supports

    PHONGTRO ||--o{ LEAD : generates

    ROOMMATE_POST ||--o{ LEAD : generates