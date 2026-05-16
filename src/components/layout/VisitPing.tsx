"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

export function VisitPing() {
  useEffect(() => {
    if (!siteConfig.renderApiUrl) return;

    const lang = window.location.hash === "#/en" ? "en" : "cz";
    const url = `${siteConfig.renderApiUrl}/health?lang=${lang}`;
    const delays = [0, 8_000, 20_000, 45_000, 90_000];
    let cancelled = false;

    const tryPing = async (attempt: number) => {
      if (cancelled) return;
      try {
        const r = await fetch(url, { method: "GET" });
        if (r.ok) return;
      } catch {
        // backend spi
      }
      const next = delays[attempt + 1];
      if (next !== undefined && !cancelled) {
        setTimeout(() => tryPing(attempt + 1), next);
      }
    };

    tryPing(0);
    return () => { cancelled = true; };
  }, []);

  return null;
}
