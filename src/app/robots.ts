import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Bing / MSN crawlery — explicitně vítány
      {
        userAgent: "bingbot",
        allow: "/",
      },
      {
        userAgent: "msnbot",
        allow: "/",
      },
      // AI crawlery — explicitně vítány (indexují pro AI odpovědi)
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "GoogleExtendedBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      // OpenAI SearchGPT crawler
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      // Meta AI crawler
      {
        userAgent: "meta-externalagent",
        allow: "/",
      },
    ],
    sitemap: "https://www.danielrakusan.cz/sitemap.xml",
    host: "https://www.danielrakusan.cz",
  };
}
