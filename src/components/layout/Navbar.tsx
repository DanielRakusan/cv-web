"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "@/hooks/useLanguage";
import { useContent } from "@/hooks/useContent";
import { siteConfig } from "@/config/site";

// ── Kontaktní data e-vizitky ────────────────────────────────────────
const CARD = {
  name:     "Daniel Rakušan",
  role:     "Junior Python Backend Developer",
  city:     "Praha",
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
  "TITLE:Junior Python Backend Developer",
  `EMAIL;TYPE=INTERNET:${CARD.email}`,
  `URL:${CARD.web}`,
  `X-SOCIALPROFILE;type=github:${CARD.github}`,
  `X-SOCIALPROFILE;type=linkedin:${CARD.linkedin}`,
  "ADR;TYPE=HOME:;;Praha;;;CZ;",
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
  const downloadVcard = useCallback(() => {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "daniel-rakusan.vcf";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div
        className="fixed left-0 right-0 bottom-0 z-50 rounded-t-2xl"
        style={{
          background: "rgba(4,4,18,.98)",
          border: "1px solid var(--b1)",
          borderBottom: "none",
          boxShadow: "0 -24px 64px rgba(0,0,0,.7)",
          animation: "sheet-up .28s cubic-bezier(.22,1,.36,1) both",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--b2)" }} />
        </div>

        {/* Header */}
        <div className="px-6 pt-3 pb-5" style={{ borderBottom: "1px solid var(--b0)" }}>
          <p className="font-mono" style={{ fontSize: ".58rem", color: "var(--cyan)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".3rem" }}>
            // kontakt
          </p>
          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--txt)", lineHeight: 1.2, marginBottom: ".2rem" }}>
            {CARD.name}
          </p>
          <p className="font-mono" style={{ fontSize: ".68rem", color: "var(--sub)" }}>
            {CARD.role}
          </p>
        </div>

        {/* Action buttons — velké, snadno kliknutelné */}
        <div className="flex flex-col gap-3 px-6 py-5">
          <a
            href={`mailto:${CARD.email}`}
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-4 transition-all duration-150"
            style={{ background: "var(--cyan)", color: "#02020a", textDecoration: "none", fontWeight: 700 }}
          >
            <MailIcon />
            <div>
              <div style={{ fontSize: ".85rem", fontWeight: 700 }}>Napište mi e-mail</div>
              <div className="font-mono" style={{ fontSize: ".68rem", opacity: .7 }}>{CARD.email}</div>
            </div>
          </a>

          <a
            href={CARD.linkedin}
            target="_blank" rel="noreferrer"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-4 border transition-all duration-150"
            style={{ borderColor: "var(--b1)", background: "var(--s1)", color: "var(--txt)", textDecoration: "none" }}
          >
            <LinkedInIcon />
            <div>
              <div style={{ fontSize: ".85rem", fontWeight: 600 }}>LinkedIn</div>
              <div className="font-mono" style={{ fontSize: ".68rem", color: "var(--sub)" }}>/in/daniel-rakusan</div>
            </div>
          </a>

          <a
            href={CARD.github}
            target="_blank" rel="noreferrer"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-4 border transition-all duration-150"
            style={{ borderColor: "var(--b1)", background: "var(--s1)", color: "var(--txt)", textDecoration: "none" }}
          >
            <GitHubIcon className="w-4 h-4" />
            <div>
              <div style={{ fontSize: ".85rem", fontWeight: 600 }}>GitHub</div>
              <div className="font-mono" style={{ fontSize: ".68rem", color: "var(--sub)" }}>@DanielRakusan</div>
            </div>
          </a>

          <button
            type="button"
            onClick={() => { downloadVcard(); onClose(); }}
            className="flex items-center gap-3 rounded-xl px-4 py-4 border transition-all duration-150 w-full"
            style={{ borderColor: "rgba(34,211,238,.3)", background: "rgba(34,211,238,.05)", color: "var(--cyan)", cursor: "pointer", textAlign: "left" }}
          >
            <DownloadIcon />
            <div>
              <div style={{ fontSize: ".85rem", fontWeight: 600 }}>Uložit kontakt</div>
              <div className="font-mono" style={{ fontSize: ".68rem", opacity: .7 }}>stáhnout .vcf do telefonu</div>
            </div>
          </button>
        </div>

        {/* Safe area spacing pro iPhone */}
        <div style={{ height: "env(safe-area-inset-bottom, 16px)", minHeight: 16 }} />
      </div>

      <style>{`
        @keyframes sheet-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

// ── E-vizitka (popover) ─────────────────────────────────────────────
function BusinessCard({ onClose }: { onClose: () => void }) {
  const downloadVcard = useCallback(() => {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = "daniel-rakusan.vcf";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const contactRows = [
    { icon: <GitHubIcon className="w-3 h-3" />, label: "github",   value: "@DanielRakusan",      href: CARD.github },
    { icon: <MailIcon />,                        label: "mail",     value: CARD.email,             href: `mailto:${CARD.email}` },
    { icon: <LinkedInIcon />,                    label: "linkedin", value: "/in/daniel-rakusan",   href: CARD.linkedin },
    { icon: <GlobeIcon />,                       label: "web",      value: "danielrakusan.cz",     href: CARD.web },
  ];

  return (
    <div
      className="absolute right-0 top-full mt-2 rounded-xl border z-50"
      style={{
        width: "min(340px, calc(100vw - 32px))",
        background: "rgba(4,4,18,.97)",
        borderColor: "var(--b1)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 24px 64px rgba(0,0,0,.65)",
      }}
    >
      {/* Hlavička — jméno + role */}
      <div
        className="px-5 pt-5 pb-4"
        style={{ borderBottom: "1px solid var(--b0)" }}
      >
        <p
          className="font-mono"
          style={{ fontSize: ".6rem", color: "var(--cyan)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".35rem" }}
        >
          // e-vizitka
        </p>
        <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--txt)", lineHeight: 1.2, marginBottom: ".2rem" }}>
          {CARD.name}
        </p>
        <p className="font-mono" style={{ fontSize: ".68rem", color: "var(--sub)", letterSpacing: ".02em" }}>
          {CARD.role} · {CARD.city}
        </p>
      </div>

      {/* Tělo — QR + kontakty */}
      <div className="flex gap-4 px-5 py-4" style={{ borderBottom: "1px solid var(--b0)" }}>

        {/* QR kód */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
          <div
            className="rounded-lg p-2"
            style={{ background: "#fff" }}
            title="Naskenuj pro uložení kontaktu"
          >
            <QRCodeSVG
              value={VCARD}
              size={88}
              bgColor="#ffffff"
              fgColor="#02020a"
              level="M"
            />
          </div>
          <p className="font-mono text-center" style={{ fontSize: ".52rem", color: "var(--dim)", lineHeight: 1.3 }}>
            scan →<br />uložit kontakt
          </p>
        </div>

        {/* Kontaktní řádky */}
        <div className="flex flex-col justify-center gap-1.5 flex-1 min-w-0">
          {contactRows.map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 border transition-all duration-150"
              style={{
                borderColor: "var(--b0)",
                background: "var(--s1)",
                textDecoration: "none",
                minWidth: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--b0)"; }}
            >
              <span style={{ color: "var(--dim)", flexShrink: 0 }}>{icon}</span>
              <span
                className="font-mono truncate"
                style={{ fontSize: ".72rem", color: "var(--txt)" }}
                title={value}
              >
                {value}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer — stažení vCard */}
      <div className="px-5 py-3">
        <button
          type="button"
          onClick={downloadVcard}
          className="w-full flex items-center justify-center gap-2 rounded-lg py-2 border font-mono transition-all duration-150"
          style={{
            fontSize: ".72rem",
            color: "var(--cyan)",
            borderColor: "rgba(34,211,238,.25)",
            background: "rgba(34,211,238,.04)",
            cursor: "pointer",
            letterSpacing: ".04em",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,211,238,.1)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(34,211,238,.5)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(34,211,238,.04)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(34,211,238,.25)"; }}
          title="Stáhnout .vcf soubor — otevře se v aplikaci Kontakty"
        >
          <DownloadIcon />
          uložit kontakt (.vcf)
        </button>
      </div>
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
    const onKey   = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setPopoverOpen(false); setMenuOpen(false); }
    };
    const onClick = (e: MouseEvent)    => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setPopoverOpen(false);
    };
    document.addEventListener("keydown",    onKey);
    document.addEventListener("mousedown",  onClick);
    return () => {
      document.removeEventListener("keydown",   onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Zamknout scroll při otevřeném menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: "#oMne",        label: lang === "cz" ? "proč já"    : "why me"    },
    { href: "#dovednosti",  label: lang === "cz" ? "dovednosti" : "skills"    },
    { href: "#zkusenosti",  label: lang === "cz" ? "zkušenosti" : "experience"},
    { href: "#certifikaty", label: lang === "cz" ? "certifikáty": "certs"     },
    { href: "#projekty",    label: lang === "cz" ? "projekty"   : "projects"  },
    { href: "#kontakt",     label: lang === "cz" ? "kontakt"    : "contact"   },
  ];

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 transition-all duration-300"
        style={{
          padding: ".85rem 5vw",
          background: scrolled || menuOpen ? "rgba(2,2,10,.97)" : "rgba(2,2,10,.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${scrolled || menuOpen ? "var(--b0)" : "transparent"}`,
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
        <nav aria-label="Hlavní navigace" className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono transition-colors duration-150"
              style={{ fontSize: ".65rem", color: "var(--sub)", textDecoration: "none", letterSpacing: ".05em" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--sub)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: e-vizitka + lang switch + CTA + hamburger */}
        <div className="flex items-center gap-3">

          {/* E-vizitka popover — desktop: text button / mobil: kulatý icon */}
          <div ref={popoverRef} className="relative">
            {/* Desktop tlačítko s textem */}
            <button
              type="button"
              onClick={() => setPopoverOpen(v => !v)}
              aria-expanded={popoverOpen}
              aria-label="Otevřít e-vizitku"
              className="font-mono hidden sm:flex items-center gap-1.5 transition-all duration-150"
              style={{
                fontSize: ".68rem",
                padding: ".4rem .95rem",
                border: `1px solid ${popoverOpen ? "var(--cyan)" : "var(--b1)"}`,
                borderRadius: 4,
                color: popoverOpen ? "var(--cyan)" : "var(--sub)",
                background: "transparent",
                cursor: "pointer",
                letterSpacing: ".03em",
              }}
              onMouseEnter={e => { if (!popoverOpen) { e.currentTarget.style.borderColor = "var(--b2)"; e.currentTarget.style.color = "var(--txt)"; } }}
              onMouseLeave={e => { if (!popoverOpen) { e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.color = "var(--sub)"; } }}
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              kontakt
            </button>

            {/* Mobilní kulatý icon — otevře bottom sheet */}
            <button
              type="button"
              onClick={() => setPopoverOpen(v => !v)}
              aria-label="Otevřít kontakt"
              className="sm:hidden flex items-center justify-center flex-shrink-0"
              style={{
                width: 32, height: 32, borderRadius: "50%",
                border: `1px solid ${popoverOpen ? "var(--cyan)" : "var(--b1)"}`,
                background: popoverOpen ? "rgba(34,211,238,.08)" : "var(--s1)",
                color: popoverOpen ? "var(--cyan)" : "var(--sub)",
                cursor: "pointer",
              }}
            >
              <GitHubIcon className="w-3.5 h-3.5" />
            </button>

            {/* Desktop popover */}
            {popoverOpen && !isMobile && <BusinessCard onClose={() => setPopoverOpen(false)} />}
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
            className="font-mono hidden md:inline-block transition-all duration-150"
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
            aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 flex-shrink-0"
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
          className="fixed inset-0 z-40 flex flex-col md:hidden"
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
