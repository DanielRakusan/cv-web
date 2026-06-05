"use client";
import { useEffect, useState } from "react";
const BACKEND = process.env.NEXT_PUBLIC_RENDER_API_URL ?? "";
export default function PodpisPage() {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!BACKEND) return;
    fetch(`${BACKEND}/api/signature`, { cache: "no-store" })
      .then(r => r.json()).then((d: { html?: string }) => setHtml(d.html ?? "")).catch(() => {});
  }, []);
  async function copy() {
    if (!html) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }) })]);
    } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: html });
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  }
  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "32px 24px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={copy} style={{ padding: "8px 20px", borderRadius: "8px", border: "1px solid #22c55e", background: copied ? "#22c55e" : "transparent", color: copied ? "#fff" : "#22c55e", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
          {copied ? "✓ zkopírováno" : "Zkopírovat podpis"}
        </button>
        <span style={{ marginLeft: "12px", fontSize: "12px", color: "#9ca3af" }}>→ vložit do Gmailu (Nastavení → Podpis → ikona HTML → Ctrl+V)</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
