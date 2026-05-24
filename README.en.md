# dr.rakusan_ — interactive portfolio

> 🌐 **[danielrakusan.cz](https://danielrakusan.cz)** &nbsp;·&nbsp; [Česká verze →](./README.md)

Personal portfolio / CV as a single-page web application. Dark design with monospace aesthetics, smooth animations, an interactive Python terminal, and two-way communication with a FastAPI backend.

---

## Features

- **Bilingual** — CZ / EN switching without page reload
- **Interactive Python terminal** — run Python projects from GitHub directly in the browser via WebSocket
- **Live backend status** — wake-up indicator for the Render.com server (waking / ready / error)
- **Behavior tracking** — anonymous tracking of mouse movement, scroll depth, clicks, and section dwell time
- **PWA ready** — manifest, service worker, push notifications (admin panel)
- **SEO** — OpenGraph, sitemap, robots.txt, structured metadata
- **Security headers** — CSP, HSTS, X-Content-Type-Options, Permissions-Policy

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Markdown | react-markdown |
| QR codes | qrcode.react |
| Deployment | Vercel |
| Backend | FastAPI on Render.com → [cv-backend](https://github.com/DanielRakusan/cv-backend) |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation with language toggle
│   │   ├── VisitPing.tsx       # Backend wake-up ping on page load
│   │   └── BehaviorTracker.tsx # Anonymous behavior tracking
│   ├── sections/
│   │   ├── Hero.tsx            # Hero section with animated terminal
│   │   ├── Skills.tsx          # Technical skills
│   │   ├── Experience.tsx      # Work experience
│   │   ├── Terminal.tsx        # Python terminal (WebSocket)
│   │   ├── AISection.tsx       # AI & vibe coding section
│   │   ├── VibeCoding.tsx
│   │   ├── WhyMe.tsx
│   │   ├── MasterPlan.tsx
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   └── background/
│       └── StarField.tsx       # Animated star field background
├── config/
│   └── site.ts             # Central config (URLs, social links)
├── content/
│   └── content.ts          # All text content in CZ and EN
├── lib/
│   ├── terminal-api.ts     # Backend API calls (REST + WebSocket)
│   └── track.ts            # Behavior tracking helper
└── hooks/
    └── useTerminal.ts      # Hook for WebSocket terminal
```

---

## Local Development

### Requirements

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/DanielRakusan/cv-web.git
cd cv-web
npm install
```

### Environment Variables

Create `.env.local`:

```env
# Backend URL (FastAPI on Render.com)
# Leave empty for local development without backend — terminal won't work
NEXT_PUBLIC_RENDER_API_URL=https://api.danielrakusan.cz
```

### Run

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

---

## Deployment

The project is deployed on **Vercel** with automatic deployment on push to `main`.

Vercel settings:
- **Framework preset:** Next.js
- **Environment variable:** `NEXT_PUBLIC_RENDER_API_URL` — Render.com backend URL

---

## Python Terminal

The "Projects" section lets you run Python scripts from GitHub repositories directly in the browser:

1. The backend (Render.com) clones the repository using `GITHUB_TOKEN`
2. Runs the specified script in a sandbox
3. `stdout` / `stderr` are streamed via WebSocket to the browser in real time
4. Supports interactive input (`input()`)

Projects are registered in the backend admin panel or in `src/config/site.ts`.

---

## Backend API

Communication with the FastAPI backend goes through:

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Wake-up ping, visit tracking |
| `GET /projects` | List of available Python projects |
| `GET /projects/{id}/readme` | Project README (CZ/EN) |
| `GET /projects/{id}/tree` | Repository file tree |
| `GET /projects/{id}/file` | File contents |
| `WS /ws/run` | WebSocket for running and communicating with a script |
| `POST /track` | Anonymous behavior events |

Backend source code: **[cv-backend](https://github.com/DanielRakusan/cv-backend)**

---

## Available Scripts

```bash
npm run dev      # Development server with hot reload
npm run build    # Production build
npm run start    # Start production build
npm run lint     # ESLint check
```

---

## License

The code is public for inspiration. Do not use the content (texts, CV information, photos) without permission.
