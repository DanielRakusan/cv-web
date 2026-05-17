"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/track";

/**
 * Neviditelná komponenta — sleduje lidské signály a posílá je na backend.
 *
 * Trackuje:
 *  - první pohyb myší   → human_signal  (robot vs člověk)
 *  - maximální hloubku scrollu → scroll
 *  - čas strávený na stránce  → page_time  (na pagehide)
 *
 * CTA kliky jsou trackovány přímo v Contact.tsx přes data-track atributy.
 */
export function BehaviorTracker() {
  const scrollDepth   = useRef(0);
  const humanSent     = useRef(false);
  const startTime     = useRef(Date.now());
  const scrollSent    = useRef(false);   // posíláme jen při pagehide, ne průběžně

  useEffect(() => {
    // ── Mouse move → human signal ──────────────────────────────────────────
    const onMouseMove = () => {
      if (humanSent.current) return;
      humanSent.current = true;
      trackEvent("human_signal", { mouse: true });
      document.removeEventListener("mousemove", onMouseMove);
    };

    // ── Scroll depth ───────────────────────────────────────────────────────
    const onScroll = () => {
      const el  = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const depth = Math.round(((window.scrollY) / max) * 100);
      if (depth > scrollDepth.current) scrollDepth.current = depth;
    };

    // ── Page hidden → send final summary ──────────────────────────────────
    const sendSummary = () => {
      if (scrollDepth.current > 5 && !scrollSent.current) {
        scrollSent.current = true;
        trackEvent("scroll", { depth: scrollDepth.current });
      }
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds > 3) {
        trackEvent("page_time", { seconds });
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendSummary();
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll",      onScroll,      { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide",    sendSummary);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll",      onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide",    sendSummary);
    };
  }, []);

  return null;
}
