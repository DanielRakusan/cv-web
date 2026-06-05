"use client";

import type { SignatureVariant } from "@/data/signatures";

/* Vizitka se zobrazí přímo — bez iframu, bez admin prvků.
   Lidé na ni klikají z emailového podpisu. */

export function BusinessCard({ sig }: { sig: SignatureVariant }) {
  return (
    <div
      style={{ maxWidth: 520, width: "100%" }}
      dangerouslySetInnerHTML={{ __html: sig.html }}
    />
  );
}
