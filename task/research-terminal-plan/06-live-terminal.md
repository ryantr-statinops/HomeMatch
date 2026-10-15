# P05 — Live terminal
**Trạng thái:** chưa bắt đầu.

## Mục tiêu và phụ thuộc
P02 browser feasibility + P03 market snapshots + P04 news contract.

## Ownership
Web agent owns news/asset/watchlist UX và stream manager; API agent owns account/feeds; coordinator integration.

## Phạm vi
UI tiếng Việt news-first, asset context, account watchlists. Browser public WS không exchange keys; một manager/tab, visibility/session lifecycle; no Vercel socket relay default.

## Input/output contracts
Output: source/time/quote labels, live/paused/stale/unavailable states; snapshot/backfill before resume; no source mixing.

## Tasks
RT-LIVE-01 account news screens; -02 watchlists/assets; -03 centralized subscription; -04 pause/resume/logout; -05 accessibility/E2E.

## Kiểm thử và nghiệm thu
Disconnect/24h-source lifecycle as documented, backoff, out-of-order/open bar, tab hide/freeze/resume, expired token/account switch, region/CSP failure; UI không giả realtime news.

Accepted news→asset→watchlist journey; private data không bleed giữa account. Demo sample/replay nhãn rõ. Heartbeat/grace theo P02, không hứa browser timer chính xác.

## Rollback và handoff
Disable live and use eligible snapshots/replay; no bypass proxy. Handoff P06/P07 cùng UI primitives.
