"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/track";
import { siteConfig } from "@/config/site";

// Sekce webu — sledujeme dwell time pro každou
const SECTION_IDS = [
  "oMne", "whyMe", "zkusenosti", "projekty",
  "dovednosti", "certifikaty", "kontakt",
];

export function BehaviorTracker() {
  const mouseSent      = useRef(false);
  const startTime      = useRef(Date.now());
  const scrollDepth    = useRef(0);
  const scrollSent     = useRef(false);
  const timeSent       = useRef(false);

  // Scroll speed bot detection
  const lastScrollY    = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const maxScrollSpeed = useRef(0);    // px/s, peak
  const scrollSamples  = useRef<number[]>([]);  // rychlosti vzorků (max 300)
  const lastScrollDir  = useRef(0);    // 1 = dolů, -1 = nahoru
  const reversals      = useRef(0);    // počet otočení směru (zpět nahoru = čte)

  // Section dwell: sectionId → enter timestamp
  const sectionEnter   = useRef<Record<string, number>>({});

  useEffect(() => {
    // ── 0. page_load — odešle se ihned, dokazuje že tracking funguje ─────────
    if (!siteConfig.renderApiUrl) {
      console.warn("[BehaviorTracker] NEXT_PUBLIC_RENDER_API_URL není nastaveno — tracking vypnutý");
      return;
    }
    console.log("[BehaviorTracker] ✓ aktivní, backend:", siteConfig.renderApiUrl);

    // ── Referrer + zdroj ────────────────────────────────────────────────────
    const ref = document.referrer;
    const refDomain = ref
      ? (() => {
          try { return new URL(ref).hostname.replace(/^www\./, ""); }
          catch { return ref.slice(0, 100); }
        })()
      : "";

    // Kategorizace zdroje
    const getSource = (domain: string): string => {
      if (!domain) return "direct";
      if (/google\./i.test(domain))    return "google";
      if (/linkedin\.com/i.test(domain)) return "linkedin";
      if (/github\.com/i.test(domain))   return "github";
      if (/facebook\.|fb\.com/i.test(domain)) return "facebook";
      if (/instagram\.com/i.test(domain)) return "instagram";
      if (/t\.co|twitter\.com|x\.com/i.test(domain)) return "twitter/x";
      if (/wa\.me|whatsapp/i.test(domain)) return "whatsapp";
      if (/bing\./i.test(domain))      return "bing";
      if (/duckduckgo\./i.test(domain)) return "duckduckgo";
      return "other";
    };

    // UTM parametry z URL
    const urlParams = new URLSearchParams(window.location.search);

    // Detekce zařízení
    const ua = navigator.userAgent;
    const isMob = /Mobi|Android|iPhone|iPod/i.test(ua);
    const isTab = /iPad/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
    const device = isTab ? "tablet" : isMob ? "mobile" : "desktop";

    // Detekce prohlížeče
    const getBrowser = (s: string): string => {
      if (/Edg\//i.test(s))             return "Edge";
      if (/OPR\/|Opera\//i.test(s))     return "Opera";
      if (/SamsungBrowser/i.test(s))    return "Samsung";
      if (/Firefox\//i.test(s))         return "Firefox";
      if (/CriOS\//i.test(s))           return "Chrome iOS";
      if (/FxiOS\//i.test(s))           return "Firefox iOS";
      if (/Chrome\//i.test(s))          return "Chrome";
      if (/Safari\//i.test(s))          return "Safari";
      return "Other";
    };

    const source = urlParams.get("utm_source") || getSource(refDomain);

    trackEvent("page_load" as never, {
      path:            window.location.pathname,
      referrer:        ref.slice(0, 300),
      referrer_domain: refDomain,
      source,
      utm_source:      urlParams.get("utm_source")   ?? "",
      utm_medium:      urlParams.get("utm_medium")   ?? "",
      utm_campaign:    urlParams.get("utm_campaign") ?? "",
      utm_content:     urlParams.get("utm_content")  ?? "",
      device,
      screen:          `${screen.width}x${screen.height}`,
      browser:         getBrowser(ua),
      lang:            navigator.language,
      tz:              Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    // ── 1. Mouse movement / touch → human_signal ────────────────────────────
    const sendHuman = () => {
      if (mouseSent.current) return;
      mouseSent.current = true;
      trackEvent("human_signal", { mouse: true });
      document.removeEventListener("mousemove", sendHuman);
      document.removeEventListener("touchstart", sendHuman);
    };
    const onMouseMove = sendHuman;

    // ── 2. Scroll speed + depth ──────────────────────────────────────────────
    const onScroll = () => {
      const now    = Date.now();
      const rawDy  = window.scrollY - lastScrollY.current;
      const dy     = Math.abs(rawDy);
      const dt     = Math.max(now - lastScrollTime.current, 1);
      const speed  = Math.round((dy / dt) * 1000);  // px/s

      // Detekce otočení směru (scrollování zpět nahoru = čte)
      if (dy > 10) {  // ignoruj drobné otřesy
        const dir = rawDy > 0 ? 1 : -1;
        if (lastScrollDir.current !== 0 && dir !== lastScrollDir.current) {
          reversals.current++;
        }
        lastScrollDir.current = dir;
      }

      // Vzorky rychlosti (max 300, ignoruj nulové události)
      if (speed > 0 && scrollSamples.current.length < 300) {
        scrollSamples.current.push(speed);
      }

      if (speed > maxScrollSpeed.current) maxScrollSpeed.current = speed;
      lastScrollY.current    = window.scrollY;
      lastScrollTime.current = now;

      // Scroll depth (% of page)
      const el    = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0) {
        const d = Math.round((window.scrollY / total) * 100);
        if (d > scrollDepth.current) scrollDepth.current = d;
      }
    };

    // ── 3. Section dwell via IntersectionObserver ────────────────────────────
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            sectionEnter.current[id] = Date.now();
          } else {
            const entered = sectionEnter.current[id];
            if (entered) {
              const seconds = Math.round((Date.now() - entered) / 1000);
              delete sectionEnter.current[id];
              if (seconds >= 2) {   // ignore fly-bys
                trackEvent("section_view", { id, seconds });
              }
            }
          }
        },
        { threshold: 0.3 }   // 30 % sekce musí být viditelných
      );
      obs.observe(el);
      observers.push(obs);
    });

    // ── 4. Global click delegation ───────────────────────────────────────────
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button") as HTMLAnchorElement | HTMLButtonElement | null;
      if (!el) return;

      const tag  = el.tagName.toLowerCase();
      const text = (el.textContent ?? "").trim().slice(0, 60);
      const href = el instanceof HTMLAnchorElement ? (el.getAttribute("href") ?? "") : "";

      // Přeskočit čistě navigační / admin linky (admin je za loginem, tyhle kliky jsou naše)
      if (href.startsWith("/admin")) return;
      // Přeskočit prázdné kliky (např. menu toggle bez textu)
      if (!text && !href) return;

      trackEvent("click", { tag, text: text || "(icon)", href: href.slice(0, 120) });
    };

    // ── 5. Page hidden → flush pending data ─────────────────────────────────
    const flushOnHide = () => {
      // Doposlat dwell time pro sekce, které jsou stále ve viewportu
      Object.entries(sectionEnter.current).forEach(([id, entered]) => {
        const seconds = Math.round((Date.now() - entered) / 1000);
        if (seconds >= 2) trackEvent("section_view", { id, seconds });
      });
      sectionEnter.current = {};

      // Hloubka scrollu
      if (scrollDepth.current > 5 && !scrollSent.current) {
        scrollSent.current = true;
        trackEvent("scroll", { depth: scrollDepth.current });
      }

      // Rychlost scrollu — distribuce pro detekci botů vs čtenářů
      if (maxScrollSpeed.current > 0) {
        const samples = scrollSamples.current;
        const n = samples.length;
        const avg_pps  = n > 0 ? Math.round(samples.reduce((a, b) => a + b, 0) / n) : 0;
        // < 500 px/s = pomalé čtení; > 2000 px/s = rychlé skenování/bot
        const slow_pct = n > 0 ? Math.round(samples.filter(s => s <  500).length / n * 100) : 0;
        const fast_pct = n > 0 ? Math.round(samples.filter(s => s > 2000).length / n * 100) : 0;
        trackEvent("scroll_speed", {
          max_pps:   maxScrollSpeed.current,
          avg_pps,
          slow_pct,
          fast_pct,
          reversals: reversals.current,
          samples:   n,
        });
      }

      // Čas na stránce
      if (!timeSent.current) {
        timeSent.current = true;
        const seconds = Math.round((Date.now() - startTime.current) / 1000);
        if (seconds > 2) trackEvent("page_time", { seconds });
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flushOnHide();
    };

    // ── Registrace event listenerů ───────────────────────────────────────────
    document.addEventListener("mousemove",        onMouseMove,   { passive: true });
    document.addEventListener("touchstart",       sendHuman,     { passive: true });
    window.addEventListener  ("scroll",           onScroll,      { passive: true });
    document.addEventListener("click",            onDocClick,    { capture: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener  ("pagehide",         flushOnHide);

    return () => {
      document.removeEventListener("mousemove",        onMouseMove);
      document.removeEventListener("touchstart",       sendHuman);
      window.removeEventListener  ("scroll",           onScroll);
      document.removeEventListener("click",            onDocClick, { capture: true });
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener  ("pagehide",         flushOnHide);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return null;
}
