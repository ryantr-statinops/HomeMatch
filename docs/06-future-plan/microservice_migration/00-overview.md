# Microservice Migration - Overview

## Context

MatchHome hiện đang là một website tạo lead cho phòng trọ và ở ghép, với luồng chính:

- khách xem phòng hoặc bài ở ghép
- bấm liên hệ Zalo
- sale tiếp nhận lead
- sale/admin cập nhật dữ liệu vận hành

Kiến trúc hiện tại vẫn phù hợp cho MVP, nhưng khi thêm khu vực dành cho sale/admin thì cần tách rõ:

- public site cho khách
- admin portal cho sale/admin
- backend service làm nơi xử lý nghiệp vụ và truy cập dữ liệu

## Goal

- Giữ `Google Drive` cho ảnh như hiện tại
- Giữ `Supabase` làm database chính
- Tách UI public và UI admin ra khỏi business logic
- Dùng một backend service làm điểm truy cập duy nhất cho client

## Scope

### In scope

- public web
- admin portal
- backend API/service
- auth / role-based access
- CRUD phòng
- CRUD bài ở ghép
- lead tracking cơ bản
- image resolve từ Google Drive qua cơ chế mapping hiện tại

### Out of scope

- mobile app
- payment
- chat nội bộ
- booking engine
- AI features

## Current Assumption

Mô hình phù hợp nhất cho dự án này là:

- `modular monolith` ở tầng backend
- `2 frontend apps`
- `1 shared backend service`
- `1 source of truth database`
- `Google Drive` giữ vai trò media storage

## Next Documents

- `01-target-architecture.md`
- `02-stack-decision.md`
- `03-migration-phases.md`
- `04-risks-and-tradeoffs.md`

