import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Bing / MSN + AI crawlery (trénink i vyhledávání/citace) — explicitně vítány
      {
        userAgent: [
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
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.danielrakusan.cz/sitemap.xml",
    host: "https://www.danielrakusan.cz",
  };
}
