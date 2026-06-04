import type { MetadataRoute } from "next";

const SITE_URL = "https://www.danielrakusan.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          cs: `${SITE_URL}/#/cz`,
          en: `${SITE_URL}/#/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
