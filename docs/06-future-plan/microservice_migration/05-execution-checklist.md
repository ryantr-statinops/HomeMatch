# Execution Checklist

## Phase 0 - Prepare

- [ ] Chốt naming cho `apps/web`, `apps/admin`, `apps/api`
- [ ] Chốt shared package nào cần có
- [ ] Chốt source control strategy cho migration
- [ ] Chốt environment variables cho từng app

## Phase 1 - Foundation

- [ ] Tạo structure monorepo hoặc structure tương đương
- [ ] Tách public UI và admin UI
- [ ] Đặt backend service làm điểm truy cập duy nhất cho data
- [ ] Chuẩn hóa shared types và schemas

## Phase 2 - Read APIs

- [ ] Port room listing sang backend
- [ ] Port room detail sang backend
- [ ] Port roommate listing sang backend
- [ ] Port roommate detail sang backend
- [ ] Verify parity với behavior hiện tại

## Phase 3 - Write APIs

- [ ] Tạo lead endpoint
- [ ] Tạo CRUD endpoint cho phòng
- [ ] Tạo CRUD endpoint cho roommate posts
- [ ] Thêm validation và error mapping

## Phase 4 - Admin Portal

- [ ] Build login / role guard
- [ ] Build room management screens
- [ ] Build roommate management screens
- [ ] Build lead review screens

## Phase 5 - Media

- [ ] Giữ Google Drive
- [ ] Đưa image resolve vào backend
- [ ] Đảm bảo fallback khi thiếu mapping

## Phase 6 - Hardening

- [ ] Thêm logging
- [ ] Thêm audit trail
- [ ] Thêm health check
- [ ] Thêm monitoring
- [ ] Kiểm tra regression trước khi rollout

