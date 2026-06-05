"use client";

import type { SignatureVariant } from "@/data/signatures";

/* Vizitka se zobrazí přímo — bez iframu, bez admin prvků.
   Lidé na ni klikají z emailového podpisu. */

export function BusinessCard({ sig }: { sig: SignatureVariant }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      {/* Samotná vizitka — renderuje se přímo jako HTML, ne v iframu */}
      <div
        style={{ maxWidth: 520, width: "100%" }}
        dangerouslySetInnerHTML={{ __html: sig.html }}
      />
    </div>
  );
}
