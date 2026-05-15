"use client";

import { useState, useEffect, type ReactNode } from "react";
import { LanguageContext, type LanguageContextValue } from "@/hooks/useLanguage";
import type { Lang } from "@/content/content";

function detectLang(): Lang {
  if (typeof window === "undefined") return "cz";
  const hash = window.location.hash.toLowerCase();
  return hash === "#/en" ? "en" : "cz";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cz");

  useEffect(() => {
    setLangState(detectLang());

    const onHashChange = () => setLangState(detectLang());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const setLang: LanguageContextValue["setLang"] = (l) => {
    setLangState(l);
    window.history.replaceState({}, "", l === "cz" ? "#/cz" : "#/en");
    document.documentElement.lang = l === "cz" ? "cs" : "en";
  };

  const value: LanguageContextValue = { lang, setLang };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
