"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

function getLang() {
  return window.location.hash === "#/en" ? "en" : "cz";
}

export function VisitPing() {
  useEffect(() => {
    if (!siteConfig.renderApiUrl) return;

    let cancelled = false;

    const ping = () => {
      if (cancelled) return;
      fetch(`${siteConfig.renderApiUrl}/health?lang=${getLang()}`, { method: "GET" }).catch(() => {});
    };

    // Úvodní ping s retry (cold start)
    const delays = [0, 8_000, 20_000, 45_000, 90_000];
    const tryPing = async (attempt: number) => {
      if (cancelled) return;
      try {
        const r = await fetch(`${siteConfig.renderApiUrl}/health?lang=${getLang()}`, { method: "GET" });
        if (r.ok) return;
      } catch { /* backend spi */ }
      const next = delays[attempt + 1];
      if (next !== undefined && !cancelled) setTimeout(() => tryPing(attempt + 1), next);
    };
    tryPing(0);

    // Heartbeat každých 5 minut — aktualizuje last_seen
    const heartbeat = setInterval(ping, 5 * 60 * 1000);

    // Přepnutí jazyka → okamžitý ping s novým lang
    window.addEventListener("hashchange", ping);

    // Návrat do tabu → ping
    const onVisibility = () => { if (document.visibilityState === "visible") ping(); };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      clearInterval(heartbeat);
      window.removeEventListener("hashchange", ping);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
