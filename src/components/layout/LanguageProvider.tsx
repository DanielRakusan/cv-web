"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { LanguageContext, type LanguageContextValue } from "@/hooks/useLanguage";
import type { Lang } from "@/content/content";

const WIPE_MS = 750;
const STORAGE_KEY = "portfolio-lang";

function isLang(value: string | null): value is Lang {
  return value === "cz" || value === "en";
}

function detectHashLang(): Lang | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.toLowerCase();
  if (hash === "#/en" || hash.startsWith("#/en/")) return "en";
  if (hash === "#/cz" || hash.startsWith("#/cz/")) return "cz";
  return null;
}

function detectLang(fallback: Lang = "cz"): Lang {
  if (typeof window === "undefined") return fallback;
  const hashLang = detectHashLang();
  if (hashLang) return hashLang;

  const storedLang = window.localStorage.getItem(STORAGE_KEY);
  return isLang(storedLang) ? storedLang : fallback;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cz");
  const [wiping, setWiping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initialLang = detectLang();
    document.documentElement.lang = initialLang === "cz" ? "cs" : "en";
    const initialTimer = window.setTimeout(() => setLangState(initialLang), 0);

    const onHashChange = () => {
      const hashLang = detectHashLang();
      if (!hashLang) return;

      setLangState(hashLang);
      window.localStorage.setItem(STORAGE_KEY, hashLang);
      document.documentElement.lang = hashLang === "cz" ? "cs" : "en";
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const setLang: LanguageContextValue["setLang"] = (l) => {
    if (l === lang) return;
    if (timer.current) clearTimeout(timer.current);

    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
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
