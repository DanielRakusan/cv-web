"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "@/hooks/useLanguage";
import { useContent } from "@/hooks/useContent";
import { siteConfig } from "@/config/site";

// ── Kontaktní data e-vizitky ────────────────────────────────────────
const CARD = {
  name:     "Daniel Rakušan",
  role:     "Junior AI & Python Developer",
  email:    siteConfig.social.email,
  github:   siteConfig.social.github,
  linkedin: "https://linkedin.com/in/daniel-rakusan",
  web:      siteConfig.siteUrl,
} as const;

// vCard 3.0 — po naskenování QR telefon nabídne „Přidat do kontaktů"
const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Rakušan;Daniel;;;",
  `FN:${CARD.name}`,
  "TITLE:Junior AI & Python Developer",
  `EMAIL;TYPE=INTERNET:${CARD.email}`,
  `URL:${CARD.web}`,
  `X-SOCIALPROFILE;type=github:${CARD.github}`,
  `X-SOCIALPROFILE;type=linkedin:${CARD.linkedin}`,
  "END:VCARD",
].join("\n");

// ── Ikony ───────────────────────────────────────────────────────────
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.5 7.5 0 0 1 8 4.84c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" rx="1.8" />
      <circle cx="5.6" cy="7.2" r="1.35" />
      <path d="M3.4 11c.3-1.2 1.1-1.8 2.2-1.8s1.9.6 2.2 1.8M9.6 6.6h3M9.6 9.2h2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

// ── E-vizitka mobile bottom sheet ───────────────────────────────────
function MobileContactSheet({ onClose }: { onClose: () => void }) {
  const u = useContent().vizitka;
  const downloadVcard = useCallback(() => {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "daniel-rakusan.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);


  // Styl pro každý řádek — konzistentní
  const rowStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "0.75rem",
    borderRadius: 14, padding: "0.85rem 1rem",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.09)",
    textDecoration: "none", color: "var(--txt)",
    touchAction: "manipulation",   // žádné 300ms delay, bez ovlivnění click
  };

  return (
    // Jeden flex-col kontejner — horní část = backdrop, dolní = sheet.
    // ŽÁDNÝ touchAction: none na outer divu → iOS Chrome syntetizuje click normálně.
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop — tap zavře */}
      <div
        className="flex-1"
        style={{ background: "rgba(0,0,0,.55)", backdropFilter: "blur(3px)" }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="rounded-t-2xl flex-shrink-0"
        style={{
          background: "rgba(4,4,18,.98)",
          borderTop: "1px solid rgba(255,255,255,.1)",
          boxShadow: "0 -24px 64px rgba(0,0,0,.7)",
          animation: "sheet-up .26s cubic-bezier(.22,1,.36,1) both",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,.15)" }} />
        </div>

        {/* Header */}
        <div className="px-6 pt-2 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}>
          <p className="font-mono" style={{ fontSize: ".58rem", color: "var(--cyan)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".35rem" }}>
            // {u.contact}
          </p>
          <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--txt)", lineHeight: 1.2, marginBottom: ".2rem" }}>
            {CARD.name}
          </p>
          <p className="font-mono" style={{ fontSize: ".67rem", color: "var(--sub)" }}>
            {CARD.role}
          </p>
        </div>

        {/* Řádky — stejný styl jako desktop */}
        <div className="flex flex-col gap-2 px-5 py-4">
          <a href={`mailto:${CARD.email}`} style={rowStyle}>
            <span style={{ color: "var(--cyan)", flexShrink: 0 }}><MailIcon /></span>
            <div className="min-w-0 flex-1">
              <div className="font-mono" style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".05em", marginBottom: ".1rem" }}>email:</div>
              <div className="font-mono truncate" style={{ fontSize: ".82rem", color: "var(--cyan)", fontWeight: 500 }}>{CARD.email}</div>
            </div>
          </a>

          <a href={CARD.linkedin} style={rowStyle}>
            <span style={{ color: "#93c5fd", flexShrink: 0 }}><LinkedInIcon /></span>
            <div className="min-w-0 flex-1">
              <div className="font-mono" style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".05em", marginBottom: ".1rem" }}>linkedin:</div>
              <div className="font-mono" style={{ fontSize: ".82rem", color: "#93c5fd", fontWeight: 500 }}>/in/daniel-rakusan</div>
            </div>
          </a>

          <a href={CARD.github} style={rowStyle}>
            <span style={{ color: "var(--txt)", flexShrink: 0 }}><GitHubIcon className="w-3.5 h-3.5" /></span>
            <div className="min-w-0 flex-1">
              <div className="font-mono" style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".05em", marginBottom: ".1rem" }}>github:</div>
              <div className="font-mono" style={{ fontSize: ".82rem", color: "var(--txt)", fontWeight: 500 }}>@DanielRakusan</div>
            </div>
          </a>

          <button
            type="button"
            onClick={() => { downloadVcard(); setTimeout(onClose, 400); }}
            style={{ ...rowStyle, cursor: "pointer", width: "100%", textAlign: "left", border: "1px solid rgba(34,211,238,.25)", background: "rgba(34,211,238,.05)" }}
          >
            <span style={{ color: "var(--cyan)", flexShrink: 0 }}><DownloadIcon /></span>
            <div className="min-w-0 flex-1">
              <div className="font-mono" style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".05em", marginBottom: ".1rem" }}>vcard:</div>
              <div className="font-mono" style={{ fontSize: ".82rem", color: "var(--cyan)", fontWeight: 500 }}>{u.saveContact}</div>
            </div>
          </button>
        </div>

        {/* Safe area */}
        <div style={{ height: "env(safe-area-inset-bottom, 16px)", minHeight: 16 }} />
      </div>

      <style>{`
        @keyframes sheet-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── E-vizitka (popover) ─────────────────────────────────────────────
function BusinessCard({ onClose, pos }: { onClose: () => void; pos: { top: number; right: number } }) {
  const t = useContent();
  const u = t.vizitka;
  const [zoom, setZoom] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyEmail = useCallback(() => {
    try {
      navigator.clipboard.writeText(CARD.email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      });
    } catch { /* schránka nemusí být dostupná */ }
  }, []);
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoom(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoom]);
  const downloadVcard = useCallback(() => {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "daniel-rakusan.vcf";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  // Všechny řádky ve stejné paletě webu (azurová); rozdíl dělá jen ikona a hover.
  const contactRows = [
    { icon: <MailIcon />,                        key: "mail",     label: "email",    value: CARD.email,           href: `mailto:${CARD.email}` },
    { icon: <GitHubIcon className="w-3 h-3" />, key: "github",   label: "github",   value: "@DanielRakusan",     href: CARD.github },
    { icon: <LinkedInIcon />,                    key: "linkedin", label: "linkedin", value: "/in/daniel-rakusan", href: CARD.linkedin },
    { icon: <GlobeIcon />,                       key: "web",      label: "web",      value: "danielrakusan.cz",   href: CARD.web },
  ];


  return (
    <div
      data-contact-card
      className="fixed rounded-2xl border z-50 overflow-hidden"
      style={{
        top: pos.top,
        right: pos.right,
        width: "min(340px, calc(100vw - 32px))",
        // průsvitné okno: pod ním je vidět rozmazaný obsah stránky
        background: "linear-gradient(155deg, rgba(34,211,238,.04) 0%, rgba(2,2,10,.18) 70%), rgba(2,2,10,.22)",
        borderColor: "rgba(255,255,255,.08)",
        backdropFilter: "blur(14px) saturate(1.2)",
        WebkitBackdropFilter: "blur(14px) saturate(1.2)",
        boxShadow: "0 20px 56px rgba(0,0,0,.45)",
      }}
    >
      {/* Tenká azurovo-fialová linka nahoře, stejný přechod jako akcenty na webu */}
      <div aria-hidden="true" style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--cyan) 30%, var(--violet) 70%, transparent)", opacity: .35 }} />

      {/* Editor tab bar */}
      <div style={{
        background: "transparent",
        borderBottom: "1px solid rgba(255,255,255,.05)",
        padding: ".42rem 1.1rem",
        display: "flex",
        alignItems: "center",
        gap: ".38rem",
      }}>
        {/* červená tečka zavírá okno jako v macOS */}
        <button
          type="button"
          onClick={onClose}
          aria-label={u.closeCard}
          title={u.close}
          className="group relative flex items-center justify-center"
          style={{ width: 11, height: 11, margin: -1.5, padding: 0, border: 0, background: "transparent", cursor: "pointer", flexShrink: 0 }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", display: "block" }} />
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ position: "absolute", fontSize: 7, lineHeight: 1, fontWeight: 700, color: "rgba(80,0,0,.8)" }}
            aria-hidden="true"
          >
            ×
          </span>
        </button>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e", flexShrink: 0 }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
        <span className="font-mono" style={{ fontSize: ".6rem", color: "var(--sub)", marginLeft: ".55rem", letterSpacing: ".04em" }}>
          contact.ts
        </span>
        <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "var(--cyan)", opacity: .7 }} />
      </div>

      {/* Hlavička */}
      <div className="px-5 pt-4 pb-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: ".25rem" }}>
          {CARD.name}
        </p>
        <p className="font-mono" style={{ fontSize: ".66rem", color: "var(--sub)", letterSpacing: ".01em" }}>
          {CARD.role} <span style={{ color: "var(--dim)" }}>·</span> {u.city}
        </p>
        <p className="font-mono inline-flex items-center gap-1.5 mt-2.5" style={{ fontSize: ".58rem", color: "var(--sub)", letterSpacing: ".04em", padding: ".15rem .5rem", borderRadius: 999, border: "1px solid rgba(255,255,255,.08)", background: "transparent" }}>
          <span className="card-pulse" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "block" }} />
          {t.hero.badge}
        </p>
      </div>

      {/* Tělo — QR + kontakty */}
      <div className="flex gap-3 px-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,.05)" }}>

        {/* QR kód */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="relative rounded-lg p-1.5 transition-transform duration-150 hover:scale-[1.04] card-qr"
            style={{ background: "#fff", boxShadow: "none", opacity: .92, border: 0, cursor: "zoom-in", margin: 4 }}
            title={u.zoomQr}
            aria-label={u.zoomQr}
          >
            <QRCodeSVG value={VCARD} size={70} bgColor="#ffffff" fgColor="#02020a" level="M" />
            <span aria-hidden="true" className="card-corner" style={{ top: -4, left: -4, borderTop: "1px solid rgba(34,211,238,.5)", borderLeft: "1px solid rgba(34,211,238,.5)" }} />
            <span aria-hidden="true" className="card-corner" style={{ bottom: -4, right: -4, borderBottom: "1px solid rgba(34,211,238,.5)", borderRight: "1px solid rgba(34,211,238,.5)" }} />
          </button>
          <p className="font-mono text-center" style={{ fontSize: ".5rem", color: "var(--dim)", lineHeight: 1.4 }}>
            {u.scan}
          </p>
        </div>

        {/* Kontaktní řádky — kódový styl */}
        <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
          {contactRows.map(({ icon, key, label, value, href }) => (
            <div key={key} className="card-row flex items-center rounded-lg" style={{ minWidth: 0 }}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2 py-1.5 flex-1 min-w-0"
                style={{ textDecoration: "none" }}
              >
                <span className="card-ico" style={{ flexShrink: 0 }}>{icon}</span>
                <div className="min-w-0 flex-1">
                  <span className="font-mono block" style={{ fontSize: ".58rem", color: "var(--dim)", letterSpacing: ".06em" }}>{label}:</span>
                  <span className="font-mono truncate block" style={{ fontSize: ".68rem", color: "var(--txt)", fontWeight: 500 }} title={value}>{value}</span>
                </div>
                {key !== "mail" && <span aria-hidden="true" className="card-arrow font-mono" style={{ fontSize: ".7rem", color: "var(--cyan)" }}>↗</span>}
              </a>
              {key === "mail" && (
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={u.copyMail}
                  title={copied ? u.copied : u.copyMail}
                  className="font-mono flex-shrink-0 mr-1.5"
                  style={{ fontSize: ".7rem", lineHeight: 1, padding: ".25rem 0", borderRadius: 6, border: "1px solid rgba(255,255,255,.1)", background: "transparent", color: copied ? "var(--green)" : "var(--sub)", cursor: "pointer", width: 22, textAlign: "center" }}
                >
                  {copied ? "✓" : "⧉"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3">
        <button
          type="button"
          onClick={downloadVcard}
          className="w-full flex items-center justify-center gap-2 rounded-lg py-2 font-mono transition-all duration-150"
          style={{
            fontSize: ".7rem", letterSpacing: ".06em",
            color: "var(--sub)",
            border: "1px solid rgba(255,255,255,.1)",
            background: "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,211,238,.07)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(34,211,238,.4)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--cyan)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.1)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--sub)"; }}
          title={u.saveTitle}
        >
          <DownloadIcon />
          {u.saveContact}
        </button>
      </div>

      <style>{`
        .card-row { border: 1px solid transparent; transition: background .15s, border-color .15s; }
        .card-row:hover { background: rgba(255,255,255,.04); border-color: rgba(34,211,238,.2); }
        .card-ico { color: var(--dim); opacity: 1; transition: color .15s, opacity .15s, transform .15s; }
        .card-row:hover .card-ico { color: var(--cyan); }
        .card-arrow { opacity: 0; transform: translate(-4px, 3px); transition: opacity .15s, transform .15s; }
        .card-row:hover .card-arrow { opacity: 1; transform: none; }
        .card-corner { position: absolute; width: 9px; height: 9px; pointer-events: none; }
        .card-pulse { animation: card-pulse 2s ease-in-out infinite; }
        @keyframes card-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,.55); } 50% { box-shadow: 0 0 0 4px rgba(74,222,128,0); } }
        @media (prefers-reduced-motion: reduce) { .card-pulse { animation: none; } }
      `}</style>

      {zoom && createPortal(
        <div
          data-contact-card
          role="dialog"
          aria-modal="true"
          aria-label={u.qrDialog}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: "rgba(2,2,10,.72)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", animation: "sheet-up .2s ease both" }}
          onClick={() => setZoom(false)}
        >
          <div
            className="relative rounded-2xl p-5 flex flex-col items-center gap-3"
            style={{ background: "rgba(10,12,30,.8)", border: "1px solid rgba(255,255,255,.12)", boxShadow: "0 24px 80px rgba(0,0,0,.6)" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label={u.close}
              className="absolute font-mono"
              style={{ top: 8, right: 12, fontSize: 20, lineHeight: 1, color: "var(--sub)", background: "none", border: 0, cursor: "pointer" }}
            >
              ×
            </button>
            <div className="rounded-xl p-3" style={{ background: "#fff" }}>
              <QRCodeSVG value={VCARD} size={300} bgColor="#ffffff" fgColor="#02020a" level="M" style={{ width: "min(70vw, 300px)", height: "auto", display: "block" }} />
            </div>
            <p className="font-mono" style={{ fontSize: ".68rem", color: "var(--sub)" }}>{u.scanBig}</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────
export function Navbar() {
  const { lang, setLang } = useLanguage();
  const t = useContent();
  const [scrolled,    setScrolled]    = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [cardPos, setCardPos] = useState({ top: 64, right: 24 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setPopoverOpen(false); setMenuOpen(false); }
    };
    const onMouseDown = (e: MouseEvent) => {
      // Na mobilu je MobileContactSheet mimo popoverRef → nechej ho zavřít přes backdrop,
      // ne přes tento listener (jinak mousedown uzavře modal dřív než <a> stihne navigovat).
      if (window.innerWidth < 640) return;
      if ((e.target as HTMLElement).closest?.("[data-contact-card]")) return;
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setPopoverOpen(false);
    };
    document.addEventListener("keydown",   onKey);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown",   onKey);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  // Zamknout scroll při otevřeném menu nebo sheetu
  useEffect(() => {
    document.body.style.overflow = (menuOpen || (popoverOpen && isMobile)) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, popoverOpen, isMobile]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: "#oMne",        label: t.nav.short.oMne        },
    { href: "#dovednosti",  label: t.nav.short.dovednosti  },
    { href: "#ai",          label: t.nav.short.ai          },
    { href: "#zkusenosti",  label: t.nav.short.zkusenosti  },
    { href: "#projekty",    label: t.nav.short.projekty    },
    { href: "#certifikaty", label: t.nav.short.certifikaty },
  ];

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 transition-all duration-300"
        style={{
          padding: ".85rem 5vw",
          background: menuOpen ? "rgba(2,2,10,.97)" : scrolled ? "rgba(2,2,10,.7)" : "rgba(2,2,10,.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${menuOpen ? "var(--b0)" : "transparent"}`,
        }}
      >
        {/* Logo */}
        <a
          href="#oMne"
          className="font-mono flex-shrink-0"
          style={{ fontSize: ".78rem", color: "var(--cyan)", textDecoration: "none", letterSpacing: ".06em" }}
          onClick={closeMenu}
        >
          dr.rakusan_
        </a>

        {/* Nav links — desktop */}
        <nav aria-label={t.vizitka.mainNav} className="hidden min-[800px]:flex items-center gap-3 min-[960px]:gap-4 xl:gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono whitespace-nowrap transition-colors duration-150"
              style={{ fontSize: ".65rem", color: "var(--sub)", textDecoration: "none", letterSpacing: ".05em", display: "flex", alignItems: "center", gap: "0.25rem" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--sub)")}
            >
              {l.href === "#ai" && (
                <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 9, height: 9, flexShrink: 0, animation: "ai-sparkle 2.4s ease-in-out infinite" }}>
                  <path d="M8 0 C8.4 4.8 11.2 7.6 16 8 C11.2 8.4 8.4 11.2 8 16 C7.6 11.2 4.8 8.4 0 8 C4.8 7.6 7.6 4.8 8 0Z"/>
                </svg>
              )}
              {l.label}
              {l.href === "#ai" && (
                <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 6, height: 6, flexShrink: 0, opacity: 0.6, animation: "ai-sparkle 2.4s ease-in-out infinite .9s" }}>
                  <path d="M8 0 C8.4 4.8 11.2 7.6 16 8 C11.2 8.4 8.4 11.2 8 16 C7.6 11.2 4.8 8.4 0 8 C4.8 7.6 7.6 4.8 8 0Z"/>
                </svg>
              )}
            </a>
          ))}
        </nav>
        <style>{`
          @keyframes ai-sparkle {
            0%, 100% { opacity: .45; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
          }
        `}</style>

        {/* Right: e-vizitka + lang switch + CTA + hamburger */}
        <div className="flex items-center gap-3">

          {/* E-vizitka popover — desktop: text button / mobil: kulatý icon */}
          <div ref={popoverRef} className="relative">
            {/* Desktop tlačítko s textem */}
            <button
              type="button"
              onClick={() => {
                const r = popoverRef.current?.getBoundingClientRect();
                if (r) setCardPos({ top: r.bottom + 8, right: Math.max(8, window.innerWidth - r.right) });
                setPopoverOpen(v => !v);
              }}
              aria-expanded={popoverOpen}
              aria-label={t.vizitka.openCard}
              className="font-mono hidden sm:flex items-center gap-1.5 transition-all duration-150"
              style={{
                fontSize: ".68rem",
                padding: ".4rem .7rem",
                border: `1px solid ${popoverOpen ? "var(--cyan)" : "var(--b1)"}`,
                borderRadius: 999,
                color: popoverOpen ? "var(--cyan)" : "var(--sub)",
                background: "rgba(255,255,255,.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                cursor: "pointer",
                letterSpacing: ".03em",
              }}
              onMouseEnter={e => { if (!popoverOpen) { e.currentTarget.style.borderColor = "var(--b2)"; e.currentTarget.style.color = "var(--txt)"; } }}
              onMouseLeave={e => { if (!popoverOpen) { e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.color = "var(--sub)"; } }}
            >
              <ContactIcon className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{t.vizitka.contact}</span>
            </button>

            {/* Mobilní kulatý icon — otevře bottom sheet */}
            <button
              type="button"
              onClick={() => setPopoverOpen(v => !v)}
              aria-label={t.vizitka.openContact}
              className="sm:hidden flex items-center justify-center flex-shrink-0"
              style={{
                width: 32, height: 32, borderRadius: "50%",
                border: `1px solid ${popoverOpen ? "var(--cyan)" : "var(--b1)"}`,
                background: popoverOpen ? "rgba(34,211,238,.08)" : "var(--s1)",
                color: popoverOpen ? "var(--cyan)" : "var(--sub)",
                cursor: "pointer",
              }}
            >
              <ContactIcon className="w-3.5 h-3.5" />
            </button>

            {/* Desktop popover */}
            {popoverOpen && !isMobile && createPortal(<BusinessCard onClose={() => setPopoverOpen(false)} pos={cardPos} />, document.body)}
          </div>

          {/* Lang switch */}
          <div
            className="flex rounded-full p-1"
            style={{ border: "1px solid var(--b1)", background: "var(--s1)" }}
          >
            {(["cz", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className="font-mono px-3 py-1.5 rounded-full transition-all duration-150"
                style={{
                  fontSize: ".72rem",
                  fontWeight: 700,
                  background: lang === l ? "#ffffff" : "transparent",
                  color: lang === l ? "#02020a" : "var(--sub)",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: ".04em",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA button — desktop */}
          <a
            href="#kontakt"
            className="font-mono hidden min-[960px]:inline-block whitespace-nowrap transition-all duration-150"
            style={{
              fontSize: ".68rem",
              padding: ".4rem .95rem",
              border: "1px solid var(--cyan)",
              borderRadius: 4,
              color: "var(--cyan)",
              textDecoration: "none",
              letterSpacing: ".03em",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--cyan)"; e.currentTarget.style.color = "#02020a"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--cyan)"; }}
          >
            {t.hero.ctaContact} →
          </a>

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            aria-label={menuOpen ? t.vizitka.closeMenu : t.vizitka.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            className="min-[800px]:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 flex-shrink-0"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
          >
            <span style={{
              display: "block", width: 20, height: 1.5, borderRadius: 2,
              background: "var(--cyan)",
              transition: "transform .22s, opacity .22s",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: 20, height: 1.5, borderRadius: 2,
              background: "var(--cyan)",
              transition: "opacity .22s",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 20, height: 1.5, borderRadius: 2,
              background: "var(--cyan)",
              transition: "transform .22s, opacity .22s",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </header>

      {/* ── Mobile kontakt bottom sheet ── */}
      {popoverOpen && isMobile && (
        <MobileContactSheet onClose={() => setPopoverOpen(false)} />
      )}

      {/* ── Mobile full-screen menu ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col min-[800px]:hidden"
          style={{ background: "rgba(2,2,10,.97)", paddingTop: 64 }}
        >
          <nav className="flex flex-col items-center justify-center flex-1 gap-0 pb-16">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="font-mono w-full text-center py-5 transition-colors duration-150"
                style={{
                  fontSize: "1rem",
                  color: "var(--sub)",
                  textDecoration: "none",
                  letterSpacing: ".1em",
                  borderBottom: "1px solid var(--b0)",
                  animation: `fade-up .3s cubic-bezier(.22,1,.36,1) ${i * .04}s both`,
                }}
              >
                {l.label}
              </a>
            ))}

            {/* CTA */}
            <a
              href={`mailto:${siteConfig.social.email}`}
              onClick={closeMenu}
              className="font-mono mt-10 px-10 py-3 rounded"
              style={{
                fontSize: ".82rem",
                background: "var(--cyan)",
                color: "#02020a",
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: ".04em",
                animation: "fade-up .3s cubic-bezier(.22,1,.36,1) .26s both",
              }}
            >
              {t.hero.ctaContact} ↗
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
