"use client";

import { useContent } from "@/hooks/useContent";

export function Footer() {
  const t = useContent();

  return (
    <footer
      className="relative z-10 py-10 px-6 text-center border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>
          {t.footer.built}
        </span>
        <span
          className="flex items-center gap-2 text-xs"
          style={{ color: "rgba(134,239,172,0.7)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t.footer.available}
        </span>
      </div>
    </footer>
  );
}
