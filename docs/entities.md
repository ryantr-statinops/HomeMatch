# Entities V1

## Overview

Các thực thể chính trong hệ thống:

1. Room
2. RoomImage
3. RoommatePost
4. Appointment
5. Sale
6. Lead

---

# Room

## Description

Đại diện cho một phòng trọ thuộc hệ thống.

## Responsibilities

* Hiển thị trên website
* Được tìm kiếm và lọc
* Có thể phát sinh lead
* Có thể phát sinh nhu cầu ở ghép

## Relationships

Room
├── RoomImage
├── Appointment
├── RoommatePost
└── Lead

---

# RoomImage

## Description

Hình ảnh thuộc về một phòng.

## Responsibilities

* Hiển thị gallery ảnh
* Hiển thị thumbnail

## Relationships

RoomImage
└── Room

---

# RoommatePost

## Description

Bài đăng tìm người ở ghép.

## Business Rules

* Chỉ Admin tạo
* Không cho phép user tự đăng
* Luôn liên kết với một phòng trong hệ thống

## Post Types

### HAVE_ROOM

Đã có phòng.

Cần thêm người ở chung.

### NEED_ROOMMATE

Muốn thuê phòng.

Cần thêm người để thuê chung.

## Relationships

RoommatePost
├── Room
└── Lead

---

# Appointment

## Description

Lịch hẹn xem phòng.

## Responsibilities

* Theo dõi khách xem phòng
* Theo dõi trạng thái chốt phòng
* Theo dõi hoa hồng sale

## Relationships

Appointment
├── Room
└── Sale

---

# Sale

## Description

Nhân viên sale.

## Responsibilities

* Tiếp nhận khách
* Tư vấn
* Dẫn khách xem phòng
* Chốt phòng

## Relationships

Sale
└── Appointment

---

# Lead

## Description

Sự kiện phát sinh khi người dùng quan tâm phòng hoặc nhu cầu ở ghép.

## Source Types

### ROOM

Lead từ phòng trọ.

### ROOMMATE

Lead từ bài ở ghép.

## Relationships

Lead
├── Room
└── RoommatePost
