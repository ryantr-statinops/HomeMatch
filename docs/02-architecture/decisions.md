# Architecture decisions

**Trạng thái:** quyết định mục tiêu, chưa triển khai; thay thế ADR rental trong Git history.

| ID | Quyết định | Trạng thái |
|---|---|---|
| RT-ADR-001 | React/Vite/React Router/TypeScript/Tailwind; UI tiếng Việt | Accepted |
| RT-ADR-002 | Go Gateway HTTP màng; FastAPI sở hữu domain và kiểm tra ownership/JWT | Accepted |
| RT-ADR-003 | Go ingestion theo lịch, độc lập phiên người dùng | Accepted boundary; runner chốt P02/P09 |
| RT-ADR-004 | Browser Web Worker training/backtest; Pyodide là phương án spike đầu tiên | Accepted capability; runtime chưa test |
| RT-ADR-005 | Binance Spot BTCUSDT/ETHUSDT; candles 15m/1h/1d | Accepted scope; source access/rights cần gate |
| RT-ADR-006 | Browser public Binance WebSocket không key, theo tab hoạt động | Accepted ngoại lệ; region/CSP/lifecycle test P02 |
| RT-ADR-007 | PostgreSQL cho metadata/ledger; object storage cho snapshots/artifacts qua interface | Accepted; vendor chưa chọn |
| RT-ADR-008 | Managed Auth, không tự lưu/hash password | Accepted; provider chốt bằng ADR P02 |
| RT-ADR-009 | Portfolio spot long/cash, weighted-average cost, base USDT; manual/CSV | Accepted; không execution |
| RT-ADR-010 | Experiment/results private theo owner; browser output là client-computed | Accepted |
| RT-ADR-011 | Vercel web/HTTP APIs sau kiểm chứng; ingestion chạy riêng | Accepted target; không giữ định Vercel giữ WebSocket upstream |
| RT-ADR-012 | Funding/OI, cổ phiếu Mỹ, FX, Việt Nam | Deferred qua source gates |
| RT-ADR-013 | Dark mode default; light theme qua semantic tokens | Accepted (frontend) |
| RT-ADR-014 | Accent `#21684e`; semantic accent tokens + market up/down colors riêng | Accepted (frontend) |
| RT-ADR-015 | Inter (UI) + JetBrains Mono (numeric/terminal) với fallback stacks | Accepted (frontend) |
| RT-ADR-016 | TanStack Query (server state) + React state (local UI) + URL params (shareable); không Zustand nếu chưa có nhu cầu chứng minh | Accepted (frontend) |
| RT-ADR-017 | TradingView Lightweight Charts cho financial time series; kiểm tra deps/component hiện có trước migrate | Accepted (frontend) |
| RT-ADR-018 | Tailwind CSS + CSS variables; semantic tokens, không hardcode theme colors trong components | Accepted (frontend) |

## Spike và quyết định tiếp theo

P02 ghi provider Auth/PostgreSQL/storage, email/quota, toolchain versions, Pyodide compatibility, browser support, dataset/features limits và lifecycle timeout. P03/P04 khóa source eligibility, retention/freshness theo evidence. Không thay phương án âm thầm hoặc ghi approved khi chưa kiểm chứng.

ADR tiếp theo ghi owner, ngày, alternatives, rationale, evidence, impact và trigger xem lại. Không đổi tên thư mục repo/domain deploy trong docs.

## Frontend ADRs (locked 2026-10-17)

### RT-ADR-013 — Dark mode default
- **Quyết định:** Dark by default; light theme supported through semantic design tokens.
- **Rationale:** Data-dense tools ship dark first (Pixel Show). Semantic tokens cho phép switch theme mà không đổi hex trong components.
- **Impact:** Cần token system với dark/light variants; components chỉ dùng token, không hardcode.
- **Trigger xem lại:** user research cho thấy light-first demand cao.

### RT-ADR-014 — Accent color
- **Quyết định:** Keep `#21684e`; define semantic accent tokens và separate market up/down colors.
- **Rationale:** Giữ palette hiện tại (đang dùng trong styles.css), tránh migration. Market up/down dùng semantic colors riêng (--color-up/--color-down) khác accent.
- **Impact:** Cần tách accent (brand) khỏi up/down (market signal).
- **Trigger xem lại:** rebrand hoặc accessibility contrast failure.

### RT-ADR-015 — Typography
- **Quyết định:** Inter cho UI, JetBrains Mono cho numeric/terminal data, với fallback stacks.
- **Rationale:** Two-font split (Pixel Show): tabular numbers cần mono, prose/UI cần sans. Fallback stacks đảm bảo offline/CI.
- **Impact:** Cần load fonts (self-hosted hoặc CDN với fallback). Components dùng `--font-sans` / `--font-mono`.
- **Trigger xem lại:** font loading performance issue.

### RT-ADR-016 — State management
- **Quyết định:** TanStack Query (server state) + React state (local UI) + URL params (shareable); không Zustand nếu chưa có nhu cầu chứng minh.
- **Rationale:** Tách rõ server cache vs local UI vs shareable state. Tránh thêm dependency chưa cần.
- **Impact:** Cần thêm `@tanstack/react-query` khi implement data fetching (Phase 2). URL params cho filters (instrument, interval).
- **Trigger xem lại:** demonstrated need cho global client state (e.g., complex cross-component UI state).

### RT-ADR-017 — Charts
- **Quyết định:** Prefer TradingView Lightweight Charts cho financial time series. Inspect existing deps/components trước khi migrate; tránh migration không cần thiết.
- **Rationale:** Lightweight Charts tối ưu cho candlestick time series, bundle nhỏ. Hiện chưa có chart component nào, nên không có migration cost.
- **Impact:** Thêm dependency khi implement candle chart (Phase 2). Components phải cleanup subscriptions/event handlers.
- **Trigger xem lại:** bundle size hoặc feature gap (e.g., cần indicator overlays không support).

### RT-ADR-018 — CSS approach
- **Quyết định:** Tailwind CSS + CSS variables; semantic tokens, không hardcode theme colors trong components.
- **Rationale:** Đã dùng Tailwind + CSS vars. Lock để tránh drift. Components dùng token classes (`text-primary`, `bg-surface`) không hex.
- **Impact:** Cần migrate hardcoded hex (nếu có) sang tokens. Document token usage.
- **Trigger xem lại:** Tailwind v4 breaking changes hoặc design tooling change.
