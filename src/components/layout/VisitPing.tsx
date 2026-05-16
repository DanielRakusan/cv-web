"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

export function VisitPing() {
  useEffect(() => {
    if (!siteConfig.renderApiUrl) return;

    let cancelled = false;
    const url = `${siteConfig.renderApiUrl}/health`;
    const delays = [0, 8_000, 20_000, 45_000, 90_000]; // 0s, 8s, 20s, 45s, 90s

    const tryPing = async (attempt: number) => {
      if (cancelled) return;
      try {
        const r = await fetch(url, { method: "GET" });
        if (r.ok) return; // zaznameno — hotovo
      } catch {
        // backend spi nebo nedostupny
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
