"use client";

import { useLanguage } from "./useLanguage";
import { content } from "@/content/content";

export function useContent() {
  const { lang } = useLanguage();
  return content[lang];
}
