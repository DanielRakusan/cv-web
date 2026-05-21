import type { MetadataRoute } from "next";

const SITE_URL = "https://danielrakusan.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-05-15"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
