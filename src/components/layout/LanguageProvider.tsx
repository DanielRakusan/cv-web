"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { LanguageContext, type LanguageContextValue } from "@/hooks/useLanguage";
import type { Lang } from "@/content/content";

const FADE_MS = 160;

function detectLang(): Lang {
  if (typeof window === "undefined") return "cz";
  const hash = window.location.hash.toLowerCase();
  return hash === "#/en" ? "en" : "cz";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cz");
  const [fading, setFading] = useState(false);
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
    setFading(true);
    timer.current = setTimeout(() => {
      setLangState(l);
      window.history.replaceState({}, "", l === "cz" ? "#/cz" : "#/en");
      document.documentElement.lang = l === "cz" ? "cs" : "en";
      setFading(false);
    }, FADE_MS);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
