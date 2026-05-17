"use client";

/**
 * BehaviorTracker — sleduje chování návštěvníka a posílá signály na backend.
 *
 * Sleduje:
 *  1. Pohyb myší           → human_signal  (robot vs člověk)
 *  2. Rychlost scrollu     → scroll_speed  (bot = desetitisíce px/s)
 *  3. Hloubku scrollu      → scroll        (jak daleko dočetl)
 *  4. Sekce v viewportu    → section_view  (která sekce, jak dlouho)
 *  5. Kliky (všechna tlač.)→ click         (text, tag, href)
 *  6. Čas na stránce       → page_time     (celková délka návštěvy)
 *
 * Terminal run se trackuje přímo v useTerminal.ts.
 * CTA kliky (email/LinkedIn/GitHub) se trackují přímo v Contact.tsx.
 */

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/track";

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
  const maxScrollSpeed = useRef(0);   // px/s

  // Section dwell: sectionId → enter timestamp
  const sectionEnter   = useRef<Record<string, number>>({});

  useEffect(() => {
    // ── 1. Mouse movement → human_signal ────────────────────────────────────
    const onMouseMove = () => {
      if (mouseSent.current) return;
      mouseSent.current = true;
      trackEvent("human_signal", { mouse: true });
      document.removeEventListener("mousemove", onMouseMove);
    };

    // ── 2. Scroll speed + depth ──────────────────────────────────────────────
    const onScroll = () => {
      const now    = Date.now();
      const dy     = Math.abs(window.scrollY - lastScrollY.current);
      const dt     = Math.max(now - lastScrollTime.current, 1);
      const speed  = Math.round((dy / dt) * 1000);  // px/s

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

      // Rychlost scrollu (pro detekci botů)
      if (maxScrollSpeed.current > 0) {
        trackEvent("scroll_speed", { max_pps: maxScrollSpeed.current });
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
    window.addEventListener  ("scroll",           onScroll,      { passive: true });
    document.addEventListener("click",            onDocClick,    { capture: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener  ("pagehide",         flushOnHide);

    return () => {
      document.removeEventListener("mousemove",        onMouseMove);
      window.removeEventListener  ("scroll",           onScroll);
      document.removeEventListener("click",            onDocClick, { capture: true });
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener  ("pagehide",         flushOnHide);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return null;
}
