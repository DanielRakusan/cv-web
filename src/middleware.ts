import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Middleware — běží na serveru (Vercel Edge) PŘED React hydratací.
 * Zachytí KAŽDÝ request, včetně crawlerů které nespustí JS.
 *
 * Posílá /crawl-ping na backend jen pro HTML page requesty (ne assety).
 * Crawleři (GPTBot, Googlebot, ...) tak budou viditelní v admin analytice.
 */

const RENDER_API = process.env.NEXT_PUBLIC_RENDER_API_URL ?? "";

// Crawler UA patterns (substring match, lowercase)
const CRAWLER_PATTERNS = [
  "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider",
  "yandexbot", "gptbot", "chatgpt-user", "openai", "anthropic",
  "claudebot", "perplexitybot", "meta-externalagent",
  "ahrefsbot", "semrushbot", "mj12bot", "dotbot", "rogerbot",
  "linkdexbot", "ia_archiver", "archive.org",
  "facebookexternalhit", "twitterbot", "linkedinbot",
  "whatsapp", "telegrambot", "slackbot", "discordbot",
  "bot", "crawler", "spider",
];

function detectCrawler(ua: string): string | null {
  const lower = ua.toLowerCase();
  for (const p of CRAWLER_PATTERNS) {
    if (lower.includes(p)) return p;
  }
  return null;
}

// Extrahuje IP z Vercel/proxy headers
function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignoruj assety, API routes, _next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|pdf|woff2?|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  const ua = req.headers.get("user-agent") ?? "";
  const crawlerMatch = detectCrawler(ua);

  // Posli asynchronní ping backendu (fire-and-forget, nezdržuje response)
  if (RENDER_API && (crawlerMatch || ua === "")) {
    const ip      = getIp(req);
    const referer = req.headers.get("referer") ?? "";

    // waitUntil není v middleware API — použijeme fetch bez await
    // Middleware musí okamžitě vrátit response, proto tiché odeslání
    fetch(`${RENDER_API}/crawl-ping`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ip,
        ua: ua.slice(0, 200),
        path: pathname,
        crawler: crawlerMatch ?? "unknown-bot",
        referer: referer.slice(0, 200),
      }),
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  // Spouštět na všech cestách kromě statických souborů
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
