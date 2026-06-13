# Session 002 - About Us / Landing Page

## Session ID

SESSION-002

---

## Date

2026-06-13

---

## Goal

Xây dựng About Us Landing Page — giới thiệu startup MatchHome, sứ mệnh, quy trình hoạt động và CTA liên hệ.

---

## Context

Các tài liệu liên quan:

* docs/project-rules.md
* docs/ui-spec.md
* docs/business-flow.md
* docs/sitemap.md
* docs/folder-structure.md

---

## Scope

1. Tạo layout components: Navbar, Footer, Container
2. Build About Us / Landing Page tại src/app/page.tsx
3. Áp dụng brand style: Orange (#f97316), White, Dark Gray
4. Responsive, Mobile First

---

## Out Of Scope

1. Không tích hợp dữ liệu thật (chưa có API)
2. Không làm Room/Roommate features (phase sau)
3. Không thêm package mới ngoài stack

---

## Deliverables

### Layout Components
* Navbar - Navigation với logo + links
* Footer - Thông tin startup + Zalo CTA
* Container - Max-width wrapper

### Landing Page Sections
* Hero Section - Tiêu đề + mô tả + CTAs
* About Section - Giới thiệu startup
* How It Works - Quy trình 4 bước
* CTA Section - Liên hệ Zalo

---

## Notes

* Brand colors: Primary = Orange #f97316, Accent = Dark Gray #333
* Mobile First: 1 col mobile → 2 col tablet → 3 col desktop
* Các CTA tạm thời là placeholder, chưa link tới page thật

---

## Definition Of Done

* [x] Hoàn thành Navbar + Footer + Container
* [x] Landing page hiển thị đủ các section (Hero, About, How It Works, CTA)
* [x] Responsive (mobile + desktop)
* [x] Build thành công (npm run build)
* [x] Đã review (đã fix asChild, unused imports)
* [ ] Đã commit
