"use client";

import { useCallback, useState } from "react";

interface SignatureData {
  id: number;
  name: string;
  theme: "light" | "dark";
  html: string;
}

const GMAIL_STEPS: [string, string][] = [
  ["Zkopírujte HTML", "Klikněte na zelené tlacitko 'Kopirovat HTML' níže."],
  ["Otevřete Gmail nastavení", "Gmail → ozubené kolo → Zobrazit všechna nastavení."],
  ["Sekce Podpis", "Záložka Obecné → sekce Podpis → klikněte 'Vytvořit nový'."],
  ["Vložte HTML kód", "V editoru klikněte na ikonu HTML → vložte zkopírovaný kód → OK."],
  ["Uložte nastavení", "Sjeďte dolů a klikněte na 'Uložit změny'."],
];

function wrapForPreview(html: string, dark: boolean) {
  const bg = dark ? "#111" : "#f0f4f8";
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:${bg};padding:16px;font-family:Arial,sans-serif}</style>
</head><body>${html}</body></html>`;
}

export function SignatureDisplay({ sig }: { sig: SignatureData | null }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!sig) return;
    try { await navigator.clipboard.writeText(sig.html); }
    catch {
      const ta = Object.assign(document.createElement("textarea"), { value: sig.html });
      document.body.appendChild(ta); ta.select();
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [sig]);

  /* Fallback — backend spí nebo není nakonfigurovaný */
  if (!sig) {
    return (
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>💤</div>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
          Backend se probouzí…
        </h2>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          Backend na Render.com se spouští. Obnovte stránku za chvíli.
        </p>
      </div>
    );
  }

  const dark = sig.theme === "dark";

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px 80px" }}>

      {/* Hlavička */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ color: "#4ade80", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>
          danielrakusan.cz / podpis
        </div>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 10, letterSpacing: "-0.02em" }}>
          Email podpis
        </h1>
        <p style={{ color: "#475569", fontSize: 14 }}>
          Varianta <strong style={{ color: "#94a3b8" }}>{sig.id} — {sig.name}</strong>
        </p>
      </div>

      {/* Náhled */}
      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.02)" }}>
          <span style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>
            // varianta {sig.id} — {sig.name}
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 4, background: dark ? "rgba(74,222,128,.1)" : "rgba(255,255,255,.06)", color: dark ? "#4ade80" : "#94a3b8", border: `1px solid ${dark ? "rgba(74,222,128,.2)" : "rgba(255,255,255,.08)"}` }}>
            {dark ? "Tmavý" : "Světlý"}
          </span>
        </div>
        <div style={{ background: dark ? "#111" : "#f0f4f8", padding: 16 }}>
          <iframe
            srcDoc={wrapForPreview(sig.html, dark)}
            style={{ width: "100%", height: 260, border: "none", borderRadius: 8, display: "block" }}
            title={`Email podpis — varianta ${sig.id}`}
            sandbox="allow-same-origin"
          />
        </div>
      </div>

      {/* Kopírovat */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <button
          onClick={handleCopy}
          style={{
            padding: "12px 36px", borderRadius: 12, border: "none", cursor: "pointer",
            background: copied ? "rgba(74,222,128,.2)" : "rgba(74,222,128,.9)",
            color: copied ? "#4ade80" : "#000",
            fontSize: 15, fontWeight: 700,
            transition: "all .2s",
            boxShadow: copied ? "none" : "0 4px 20px rgba(74,222,128,.25)",
          }}
        >
          {copied ? "✓ Zkopírováno!" : "Kopírovat HTML"}
        </button>
        <p style={{ color: "#475569", fontSize: 12, marginTop: 10 }}>
          Zkopíruje celý HTML kód podpisu do schránky.
        </p>
      </div>

      {/* Gmail návod */}
      <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "28px 32px" }}>
        <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 22, display: "flex", alignItems: "center", gap: 8 }}>
          <span>📧</span> Jak aplikovat do Gmailu
        </h2>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {GMAIL_STEPS.map(([title, desc], i) => (
            <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(74,222,128,.12)", border: "1px solid rgba(74,222,128,.3)", color: "#4ade80", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                {i + 1}
              </span>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.5 }}>{desc}</div>
              </div>
            </li>
          ))}
        </ol>
        <div style={{ marginTop: 18, padding: "10px 14px", background: "rgba(74,222,128,.05)", borderRadius: 8, border: "1px solid rgba(74,222,128,.12)" }}>
          <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>
            <span style={{ color: "#4ade80", fontWeight: 700 }}>Tip:</span>{" "}
            Funguje i v Outlook (Soubor → Možnosti → Pošta → Podpisy) a Apple Mail
            (Nastavení → Podpisy → nový → pravé tlačítko → Upravit jako HTML).
          </p>
        </div>
      </div>
    </div>
  );
}
