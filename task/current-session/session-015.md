# Session 015 — Kế hoạch Deployment (Phase 9)

## Mục tiêu
Deploy frontend Next.js lên Cloudflare Pages + giữ nguyên Apps Script API backend.

---

## Kiến trúc production

```
Browser → Cloudflare Pages (CDN) → /api/proxy (Cloudflare Function / Worker)
                                              ↓
                                      Google Apps Script Web App (v23)
                                              ↓
                                      Google Sheet (DATABASE)
```

## Vấn đề cần giải quyết

Next.js có API route (`/api/proxy`) và ISR (`/rooms/[id]`), cần server-side runtime. Cloudflare Pages thuần static (`output: export`) **không** hỗ trợ 2 tính năng này.

**Giải pháp:** dùng `@cloudflare/next-on-pages` — chuyển Next.js thành Cloudflare Workers/Functions.

---

## Kế hoạch triển khai

### Bước 1 — Chuẩn bị

| Việc | Công cụ |
|------|---------|
| Có tài khoản Cloudflare | [dash.cloudflare.com](https://dash.cloudflare.com) |
| Có domain (tuỳ chọn) | VD: `homematch.com` hoặc dùng `*.pages.dev` |
| Cài `@cloudflare/next-on-pages` | `npm install -D @cloudflare/next-on-pages` |
| Cài Wrangler CLI | `npm install -D wrangler` |

### Bước 2 — Cấu hình

1. Thêm `wrangler.toml`:
```toml
name = "homematch"
compatibility_date = "2025-04-01"
pages_build_output_dir = ".vercel/output/static"
compatibility_flags = ["nodejs_compat"]
```

2. Sửa `package.json` scripts:
```json
{
  "scripts": {
    "pages:build": "npx @cloudflare/next-on-pages",
    "pages:deploy": "npm run pages:build && wrangler pages deploy .vercel/output/static",
    "pages:preview": "npm run pages:build && wrangler pages dev .vercel/output/static"
  }
}
```

3. Cập nhật `next.config.ts`:
```ts
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}
```

### Bước 3 — Deploy lên Cloudflare Pages

#### Cách A: CLI (nhanh)
```bash
npm run pages:deploy
```

#### Cách B: Cloudflare Dashboard (thủ công — khuyến nghị)
1. Vào **Cloudflare Dashboard → Workers & Pages → Pages**
2. **Create → Connect to Git**
3. Chọn repository `ryantr-statinops/HomeMatch`
4. Cấu hình build:
   - **Framework:** `Next.js`
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output:** `.vercel/output/static`
   - **Root directory:** `/`
5. **Environment Variables (Production):**
   - `NEXT_PUBLIC_API_URL` = URL Apps Script deploy (hiện tại)
   - `NEXT_PUBLIC_SITE_URL` = URL Cloudflare Pages (VD: `https://homematch.pages.dev`)
   - `NEXT_PUBLIC_ZALO_URL` = Zalo OA link
   - `NEXT_PUBLIC_GA_ID` = Google Analytics ID (tuỳ chọn)
6. **Deploy**

### Bước 4 — Custom domain (tuỳ chọn)
1. Trong Cloudflare Pages → project → **Custom domains**
2. **Set up custom domain** → nhập domain (VD: `homematch.com`)
3. Trỏ DNS về Cloudflare (nếu chưa dùng Cloudflare DNS)
4. Đợi SSL auto-provision (~1-2 phút)

### Bước 5 — Verify sau deploy

| Kiểm tra | Mong đợi |
|----------|----------|
| `https://homematch.pages.dev/` | Homepage hiển thị |
| `https://homematch.pages.dev/rooms` | Danh sách phòng load được |
| `https://homematch.pages.dev/rooms/{id}` | Chi tiết phòng ISR hoạt động |
| `/api/proxy?action=getRooms` | Proxy gọi được Apps Script |
| Ảnh phòng | Hiển thị đúng (Drive thumbnail) |
| Zalo button | Mở đúng link |

---

## Environment Variables cho production

| Variable | Value | Nguồn |
|----------|-------|-------|
| `NEXT_PUBLIC_API_URL` | `https://script.google.com/macros/s/{deployId}/exec` | `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | `https://homematch.pages.dev` | Cloudflare Pages URL |
| `NEXT_PUBLIC_ZALO_URL` | (theo Zalo OA) | `.env.local` |
| `NEXT_PUBLIC_GA_ID` | (tuỳ chọn) | Google Analytics |

---

## Rủi ro

| Rủi ro | Giảm thiểu |
|--------|------------|
| `@cloudflare/next-on-pages` không tương thích với Next.js 16 | Kiểm tra docs, có thể fallback về Vercel |
| API proxy CORS trên Cloudflare Functions | Test kỹ sau deploy |
| ISR không hoạt động trên Cloudflare | Chuyển sang SSR hoặc static generation |
| Drive ảnh bị chặn referrer | Đã có `referrerPolicy="no-referrer"` — OK |
| Build fail do dependency không tương thích edge runtime | Kiểm tra log build, fix từng cái |

---

## Định nghĩa hoàn thành

- [ ] `@cloudflare/next-on-pages` build thành công
- [ ] Production URL hoạt động (homepage, rooms, detail)
- [ ] API proxy hoạt động (rooms load được)
- [ ] Ảnh hiển thị đúng
- [ ] Zalo button hoạt động
- [ ] Domain (nếu có) hoạt động HTTPS
