"use client";

import { useEffect, useState } from "react";

const BACKEND = process.env.NEXT_PUBLIC_RENDER_API_URL ?? "";

export default function PodpisPage() {
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!BACKEND) return;
    fetch(`${BACKEND}/api/signature`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { html?: string }) => setHtml(d.html ?? ""))
      .catch(() => {});
  }, []);

  async function copy() {
    if (!html) return;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback — select the rendered element
      const el = document.getElementById("sig-preview");
      if (!el) return;
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      sel?.removeAllRanges();
      sel?.addRange(range);
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "32px 24px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={copy}
          style={{
            padding: "8px 20px",
            borderRadius: "8px",
            border: "1px solid #22c55e",
            background: copied ? "#22c55e" : "transparent",
            color: copied ? "#fff" : "#22c55e",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {copied ? "✓ zkopírováno" : "Zkopírovat podpis"}
        </button>
        <span style={{ marginLeft: "12px", fontSize: "12px", color: "#9ca3af" }}>
          → vložit do Gmailu (Nastavení → Podpis → Ctrl+V)
        </span>
      </div>

      <div
        id="sig-preview"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
