// robots.txt jako route handler: MetadataRoute.Robots neumí řádek Content-Signal.
const AI_AND_SEARCH_BOTS = [
  "bingbot",
  "msnbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "GoogleOther",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "meta-externalagent",
  "Bytespider",
];

const body = [
  "User-Agent: *",
  "Content-Signal: ai-train=yes, search=yes, ai-input=yes",
  "Allow: /",
  "Disallow: /api/",
  "Disallow: /_next/",
  "",
  ...AI_AND_SEARCH_BOTS.flatMap((bot) => [
    `User-Agent: ${bot}`,
    "Allow: /",
    "Disallow: /api/",
    "",
  ]),
  "Host: https://www.danielrakusan.cz",
  "Sitemap: https://www.danielrakusan.cz/sitemap.xml",
  "",
].join("\n");

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
