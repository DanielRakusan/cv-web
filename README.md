# dr.rakusan_ — interaktivní portfolio

> 🌐 **[danielrakusan.cz](https://danielrakusan.cz)** &nbsp;·&nbsp; [English version →](./README.en.md)

Osobní portfolio / CV jako single-page webová aplikace. Tmavý design s monospace estetikou, plynulé animace, interaktivní Python terminál a oboustranná komunikace s FastAPI backendem.

---

## Funkce

- **Dvojjazyčnost** — přepínání CZ / EN bez refreshe stránky
- **Interaktivní Python terminál** — spouštění Python projektů z GitHubu přímo v prohlížeči přes WebSocket
- **Live stav backendu** — indikátor probuzení Render.com serveru (waking / ready / error)
- **Behavior tracking** — anonymní sledování pohybu myši, scrollu, kliků a doby zobrazení sekcí
- **PWA ready** — manifest, service worker, push notifikace (admin panel)
- **SEO** — OpenGraph, sitemap, robots.txt, strukturovaná metadata
- **Bezpečnostní hlavičky** — CSP, HSTS, X-Content-Type-Options, Permissions-Policy

---

## Tech stack

| Vrstva | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) |
| Jazyk | TypeScript |
| Styling | Tailwind CSS 4 |
| Animace | Framer Motion |
| Markdown | react-markdown |
| QR kódy | qrcode.react |
| Deployment | Vercel |
| Backend | FastAPI na Render.com → [cv-backend](https://github.com/DanielRakusan/cv-backend) |

---

## Struktura projektu

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, fonty, metadata
│   ├── page.tsx            # Hlavní stránka
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigace s přepínačem jazyka
│   │   ├── VisitPing.tsx       # Wake-up ping backendu při načtení
│   │   └── BehaviorTracker.tsx # Anonymní tracking chování
│   ├── sections/
│   │   ├── Hero.tsx            # Úvodní sekce s animovaným terminálem
│   │   ├── Skills.tsx          # Technické dovednosti
│   │   ├── Experience.tsx      # Pracovní zkušenosti
│   │   ├── Terminal.tsx        # Python terminál (WebSocket)
│   │   ├── AISection.tsx       # AI & vibe coding sekce
│   │   ├── VibeCoding.tsx
│   │   ├── WhyMe.tsx
│   │   ├── MasterPlan.tsx
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   └── background/
│       └── StarField.tsx       # Animované hvězdy na pozadí
├── config/
│   └── site.ts             # Centrální konfigurace (URL, sociální sítě)
├── content/
│   └── content.ts          # Veškerý text v CZ i EN
├── lib/
│   ├── terminal-api.ts     # API volání backendu (REST + WebSocket)
│   └── track.ts            # Behavior tracking helper
└── hooks/
    └── useTerminal.ts      # Hook pro WebSocket terminál
```

---

## Lokální vývoj

### Požadavky

- Node.js 20+
- npm

### Instalace

```bash
git clone https://github.com/DanielRakusan/cv-web.git
cd cv-web
npm install
```

### Proměnné prostředí

Vytvoř `.env.local`:

```env
# URL backendu (FastAPI na Render.com)
# Pro lokální vývoj bez backendu nechej prázdné — terminál nebude funkční
NEXT_PUBLIC_RENDER_API_URL=https://api.danielrakusan.cz
```

### Spuštění

```bash
npm run dev
```

Aplikace běží na [http://localhost:3000](http://localhost:3000).

---

## Deployment

Projekt je nasazen na **Vercel** s automatickým deployem při push na `main`.

Nastavení na Vercelu:
- **Framework preset:** Next.js
- **Environment variable:** `NEXT_PUBLIC_RENDER_API_URL` — URL Render.com backendu

---

## Python terminál

Sekce "Projekty" umožňuje spouštět Python skripty z GitHub repozitářů přímo v prohlížeči:

1. Backend (Render.com) naklonuje repozitář pomocí `GITHUB_TOKEN`
2. Spustí zadaný skript v sandboxu
3. `stdout` / `stderr` jsou posílány přes WebSocket do prohlížeče v reálném čase
4. Podporuje interaktivní vstup (`input()`)

Projekty se registrují v admin panelu backendu nebo v `src/config/site.ts`.

---

## Backend

Komunikace s FastAPI backendem probíhá přes:

| Endpoint | Popis |
|----------|-------|
| `GET /health` | Wake-up ping, zaznamenání návštěvy |
| `GET /projects` | Seznam dostupných Python projektů |
| `GET /projects/{id}/readme` | README projektu (CZ/EN) |
| `GET /projects/{id}/tree` | Souborový strom repozitáře |
| `GET /projects/{id}/file` | Obsah souboru |
| `WS /ws/run` | WebSocket pro spuštění a komunikaci se skriptem |
| `POST /track` | Anonymní behavior events |

Zdrojový kód backendu: **[cv-backend](https://github.com/DanielRakusan/cv-backend)**

---

## Dostupné skripty

```bash
npm run dev      # Vývojový server s hot reload
npm run build    # Produkční build
npm run start    # Spuštění produkčního buildu
npm run lint     # ESLint kontrola
```

---

## Licence

Kód je veřejný pro inspiraci. Nepoužívej obsah (texty, životopis, fotografie) bez svolení.
