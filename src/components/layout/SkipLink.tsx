"use client";

import { useContent } from "@/hooks/useContent";

// Odkaz „přeskočit na obsah“ pro klávesnici a čtečky, text podle jazyka webu
export function SkipLink() {
  const t = useContent();
  return (
    <a href="#oMne" className="skip-to-main">
      {t.common.skipLink}
    </a>
  );
}
