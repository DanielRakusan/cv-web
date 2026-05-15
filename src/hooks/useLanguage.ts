"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/content/content";

export type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "cz",
  setLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}
