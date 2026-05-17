import { NextRequest, NextResponse, after } from "next/server";

/**
 * Next.js Middleware — Vercel Edge, běží PŘED React hydratací.
 * Zachytí requesty crawlerů, kteří nespustí JS a nikdy nezavolají /health.
 *
 * after() garantuje dokončení fetch i po vrácení response (Next.js 15+).
 */

const RENDER_API = process.env.NEXT_PUBLIC_RENDER_API_URL ?? "";

const CRAWLER_PATTERNS = [
  // Search engines
  "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider", "yandexbot",
  "applebot", "amazonbot", "bytespider",
  // AI crawlers
  "gptbot", "chatgpt-user", "openai", "anthropic", "claudebot",
  "perplexitybot", "grok", "x.ai",
  "cohere-ai", "mistral", "gemini",
  // SEO tools
  "meta-externalagent", "ahrefsbot", "semrushbot", "mj12bot", "dotbot",
  // Social previews
  "facebookexternalhit", "twitterbot", "linkedinbot",
  "whatsapp", "telegrambot", "slackbot", "discordbot",
  // Hosting / infra
  "vercel", "netlify", "render",
  // Archives
  "ia_archiver", "archive.org_bot",
  // Generic catch-all
  "bot", "crawler", "spider",
];

function detectCrawler(ua: string): string | null {
  const lower = ua.toLowerCase();
  for (const p of CRAWLER_PATTERNS) {
    if (lower.includes(p)) return p;
  }
  return null;
}

/**
 * Vrátí true pokud UA vypadá jako normální prohlížeč (Chrome/Firefox/Safari/Edge).
 * Takoví návštěvníci spustí JS a zavolají /health sami — ping nepotřebují.
 * Cokoliv jiného (prázdné UA, curl, headless, neznámé boty…) ping dostane.
 */
function isLikelyBrowser(ua: string): boolean {
  if (!ua) return false;
  const u = ua.toLowerCase();
  // Headless prohlížeče JS spustí, ale nejsou reální uživatelé
  if (u.includes("headless") || u.includes("puppeteer") || u.includes("playwright")) return false;
  return u.includes("mozilla") && (
    u.includes("chrome") || u.includes("firefox") ||
    u.includes("safari") || u.includes("webkit") || u.includes("edg")
  );
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignoruj assety, API routes, Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.(ico|png|jpg|jpeg|svg|webp|pdf|woff2?|css|js|map|txt|xml)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const ua = req.headers.get("user-agent") ?? "";
  const crawlerMatch = detectCrawler(ua);

  // DEBUG — dočasné logování všech UA pro diagnostiku Groku
  if (pathname === "/" || pathname === "") {
    console.log(`[mw] ua="${ua}" crawler=${crawlerMatch ?? "none"} browser=${isLikelyBrowser(ua)}`);
  }

  // Ping pošleme pokud:
  //  a) UA odpovídá známému botu/crawleru, NEBO
  //  b) UA nevypadá jako normální prohlížeč (prázdné, curl, neznámý bot…)
  if (RENDER_API && (crawlerMatch || !isLikelyBrowser(ua))) {
    const ip      = getIp(req);
    const referer = req.headers.get("referer") ?? "";

    // after() = garantovaně doběhne i po odeslání response (Next.js 15+)
    after(async () => {
      try {
        await fetch(`${RENDER_API}/crawl-ping`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ip,
            ua:      ua.slice(0, 200),
            path:    pathname,
            crawler: crawlerMatch ?? "unknown",
            referer: referer.slice(0, 200),
          }),
        });
      } catch {
        // Tiché selhání — middleware nesmí crashnout kvůli analytics
      }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
