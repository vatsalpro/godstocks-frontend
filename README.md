# GodStocks Frontend

The web frontend for **GodStocks**, a market research and analysis platform for informational and educational use. It is a single-page, dependency-free app: plain HTML, CSS and JavaScript in one file, with no build step.

> GodStocks is not investment advice. Nothing in the UI is a recommendation to buy or sell securities.

## Features

**Landing page**
- Responsive hero with an illustrative market preview
- Sections for Features, How it works, Pricing and About, with smooth scrolling from the top navigation
- Scroll-reveal animations and hover effects (disabled for users who prefer reduced motion)
- Pricing cards loaded live from the backend (`/api/plans`)

**Authentication**
- Sign in and Create account in one panel, with accessible tabs
- Client-side validation: email format, 8+ character password, confirm password
- Show/hide password, loading state and clear error messages
- Session is restored on reload from the backend's HTTP-only cookie (`/api/me`)

**Market ticker**
- SENSEX and NIFTY 50 bar under the header, refreshed every 30 seconds from `/api/indices`
- Shows real data only. It displays "—" and "Live index feed not connected" until the backend has a market data provider. It never shows made-up prices.

**Dashboard (after sign-in)**
- Overview with an interactive chart (1W / 1M / 3M) and summary stats
- Watchlist with search, sortable columns, add and remove
- Account menu with a sign-out confirmation

> The dashboard chart and watchlist prices currently use **sample data** for illustration and are labelled as such. Wire them to `/api/quotes` and `/api/watchlist` for live data.

**Quality**
- Responsive layout (desktop sidebar becomes a bottom bar on mobile)
- Keyboard and screen-reader support: ARIA roles, focus styles, live regions
- Strict-CSP friendly: no third-party scripts, only Google Fonts

## Tech

HTML5, CSS3 (custom properties, grid, backdrop-filter) and vanilla JavaScript (ES2020, `fetch`, `IntersectionObserver`). Fonts: DM Serif Display and Inter via Google Fonts.

## Getting started

Requires **Node.js 18+** to run the optional dev server. You can also open `index.html` through any static server.

```bash
git clone https://github.com/vatsalpro/godstocks-frontend.git
cd godstocks-frontend
npm start
```

Open http://localhost:5173.

The dev server ([dev-server.js](dev-server.js)) serves `index.html` and proxies `/api/*` to the backend, so the session cookie works on one origin.

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `5173` | Port for the frontend dev server |
| `BACKEND_URL` | `http://localhost:3000` | GodStocks backend to proxy `/api` to |

Example: `BACKEND_URL=https://api.example.com PORT=8080 npm start` (on PowerShell, set `$env:BACKEND_URL` first).

Without a backend the landing page still loads. Sign-in and sign-up report a network error, the ticker shows "—", and pricing says "Plans coming soon".

## Backend API used

The frontend expects a same-origin backend that exposes:

| Method | Endpoint | Used for |
|---|---|---|
| `POST` | `/api/register` | Create account (`email`, `password`, optional `mobile`) |
| `POST` | `/api/login` | Sign in (sets an HTTP-only `gs` cookie) |
| `POST` | `/api/logout` | Sign out |
| `GET` | `/api/me` | Restore the session on page load |
| `GET` | `/api/plans` | Pricing section |
| `GET` | `/api/indices` | SENSEX / NIFTY ticker (`{SENSEX:{status,price,change_pct,delayed}, NIFTY:{...}}`) |

All non-GET requests send `application/json` with `credentials: "include"`.

## Deployment

It is a static site. Host `index.html` on any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3) and route `/api/*` to the backend with a rewrite or reverse proxy, so the frontend and API share one origin. Cookies are `Secure` in production, so serve over HTTPS.

## Project structure

```
godstocks-frontend/
├── index.html      # Entire app: markup, styles and scripts
├── dev-server.js   # Static server with /api proxy (no dependencies)
├── package.json
└── README.md
```

## Roadmap

- Replace sample dashboard data with live `/api/quotes` and `/api/watchlist`
- Screens for tournaments, wallet, plan purchase (Razorpay checkout) and AI chat. The backend APIs exist.
- Forgot-password and email verification flows
- Split `index.html` into modules

## Contact

careers@godstockss.in
