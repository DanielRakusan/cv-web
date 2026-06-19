"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

function getLang() {
  const hash = window.location.hash.toLowerCase();
  if (hash === "#/en" || hash.startsWith("#/en/")) return "en";
  if (hash === "#/cz" || hash.startsWith("#/cz/")) return "cz";

  const storedLang = window.localStorage.getItem("portfolio-lang");
  return storedLang === "en" ? "en" : "cz";
}

// Modul-level throttle — zabrání dvěma ping requestům do 10 sekund.
// Resetuje se jen při plném reloadu stránky (ne při re-renderech).
let _lastPingMs = 0;
function _sendPing(url: string): void {
  const now = Date.now();
  if (now - _lastPingMs < 10_000) return;
  _lastPingMs = now;
  // Timeout 8 s — při přepínání sítě (WiFi → data) fetch jinak visí donekonečna
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), 8_000);
  fetch(url, { method: "GET", signal: ctrl.signal }).catch(() => {});
}

function getVisitId(): string {
  const key = "dr_vid";
  // sessionStorage: vymaže se při zavření tabu → každé nové otevření = nová návštěva
  let vid = sessionStorage.getItem(key);
  if (!vid) {
    vid = crypto.randomUUID();
    sessionStorage.setItem(key, vid);
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
      _sendPing(buildUrl());  // throttlováno — max 1x za 10s
    };

    // Úvodní ping s retry (cold start Render)
    const delays = [0, 8_000, 20_000, 45_000, 90_000];
    const tryPing = async (attempt: number) => {
      if (cancelled) return;
      try {
        const url = buildUrl();
        if (attempt === 0) {
          // První pokus: throttle (ochrana před React Strict Mode double-mount a rychlým hashchange)
          const now = Date.now();
          if (now - _lastPingMs < 10_000) return;
          _lastPingMs = now;
        }
        // Retries (attempt > 0) obcházejí throttle — backend spal, musíme se probít
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 8_000);
        let succeeded = false;
        try {
          const r = await fetch(url, { method: "GET", signal: ctrl.signal });
          succeeded = r.ok;
        } finally {
          clearTimeout(timer);
        }
        if (succeeded) return;
      } catch { /* backend spi nebo timeout sítě */ }
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
