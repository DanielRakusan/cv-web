"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

function getLang() {
  return window.location.hash === "#/en" ? "en" : "cz";
}

function getVisitId(): string {
  const key = "dr_vid";
  let vid = localStorage.getItem(key);
  if (!vid) {
    vid = crypto.randomUUID();
    localStorage.setItem(key, vid);
  }
  return vid;
}

function getOwnerToken(): string {
  // Přečte ?owner=<token> z URL a uloží do localStorage
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get("owner");
  if (tokenFromUrl) {
    localStorage.setItem("dr_owner", tokenFromUrl);
    // Odstraní token z URL bez reloadu (čistší URL)
    const clean = window.location.pathname + window.location.hash;
    window.history.replaceState({}, "", clean);
  }
  return localStorage.getItem("dr_owner") ?? "";
}

export function VisitPing() {
  useEffect(() => {
    if (!siteConfig.renderApiUrl) return;

    let cancelled = false;
    const vid = getVisitId();
    const ownerToken = getOwnerToken();

    const ref = encodeURIComponent(document.referrer || "");

    const buildUrl = () => {
      const base = `${siteConfig.renderApiUrl}/health?lang=${getLang()}&vid=${vid}&ref=${ref}`;
      return ownerToken ? `${base}&owner_token=${ownerToken}` : base;
    };

    const ping = () => {
      if (cancelled) return;
      fetch(buildUrl(), { method: "GET" }).catch(() => {});
    };

    // Úvodní ping s retry (cold start)
    const delays = [0, 8_000, 20_000, 45_000, 90_000];
    const tryPing = async (attempt: number) => {
      if (cancelled) return;
      try {
        const r = await fetch(buildUrl(), { method: "GET" });
        if (r.ok) return;
      } catch { /* backend spi */ }
      const next = delays[attempt + 1];
      if (next !== undefined && !cancelled) setTimeout(() => tryPing(attempt + 1), next);
    };
    tryPing(0);

    // Heartbeat každých 5 minut
    const heartbeat = setInterval(ping, 5 * 60 * 1000);

    // Přepnutí jazyka
    window.addEventListener("hashchange", ping);

    // Návrat do tabu
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
