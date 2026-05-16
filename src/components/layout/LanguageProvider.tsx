"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { LanguageContext, type LanguageContextValue } from "@/hooks/useLanguage";
import type { Lang } from "@/content/content";

const WIPE_MS = 750;

function detectLang(): Lang {
  if (typeof window === "undefined") return "cz";
  const hash = window.location.hash.toLowerCase();
  return hash === "#/en" ? "en" : "cz";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cz");
  const [wiping, setWiping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLangState(detectLang());
    const onHashChange = () => setLangState(detectLang());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const setLang: LanguageContextValue["setLang"] = (l) => {
    if (l === lang) return;
    if (timer.current) clearTimeout(timer.current);

    setLangState(l);
    window.history.replaceState({}, "", l === "cz" ? "#/cz" : "#/en");
    document.documentElement.lang = l === "cz" ? "cs" : "en";

    setWiping(true);
    timer.current = setTimeout(() => setWiping(false), WIPE_MS);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {wiping && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: 180,
            pointerEvents: "none",
            zIndex: 9999,
            animation: `lang-wipe-sweep ${WIPE_MS}ms cubic-bezier(0.4,0,0.2,1) forwards`,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(34,211,238,.03) 20%, rgba(34,211,238,.14) 48%, rgba(255,255,255,.09) 58%, rgba(34,211,238,.06) 75%, transparent 100%)",
          }}
        />
      )}
      {children}
    </LanguageContext.Provider>
  );
}
