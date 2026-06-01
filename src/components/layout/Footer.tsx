"use client";

import { useContent } from "@/hooks/useContent";

export function Footer({ lastUpdated }: { lastUpdated?: string }) {
  const t = useContent();

  return (
    <footer
      className="relative z-10 py-10 px-6 text-center border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {t.footer.built}
        </span>
        {lastUpdated && (
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            {t.footer.lastUpdated} {lastUpdated}
          </span>
        )}
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
