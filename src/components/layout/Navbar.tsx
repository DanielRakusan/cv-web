"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useContent } from "@/hooks/useContent";
import { siteConfig } from "@/config/site";
import type { GitHubProfile } from "@/lib/github";

type NavbarProps = { profile: GitHubProfile | null };

export function Navbar({ profile }: NavbarProps) {
  const { lang, setLang } = useLanguage();
  const t = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPopoverOpen(false); };
    const onClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setPopoverOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);

  function normalizeUrl(val: string | null | undefined) {
    if (!val) return "";
    return /^https?:\/\//i.test(val) ? val : "https://" + val;
  }

  const profileItems = profile ? [
    { label: "GitHub", value: "@" + profile.login, href: profile.html_url },
    profile.location ? { label: t.github.location, value: profile.location } : null,
    profile.email ? { label: t.github.email, value: profile.email, href: "mailto:" + profile.email } : null,
    profile.blog ? { label: t.github.website, value: profile.blog, href: normalizeUrl(profile.blog) } : null,
    profile.company ? { label: t.github.company, value: profile.company } : null,
  ].filter(Boolean) : [];

  const navLinks = [
    { href: "#oMne", label: lang === "cz" ? "proč já" : "why me" },
    { href: "#dovednosti", label: lang === "cz" ? "dovednosti" : "skills" },
    { href: "#zkusenosti", label: lang === "cz" ? "zkušenosti" : "experience" },
    { href: "#certifikaty", label: lang === "cz" ? "certifikáty" : "certs" },
    { href: "#projekty", label: lang === "cz" ? "projekty" : "projects" },
    { href: "#kontakt", label: lang === "cz" ? "kontakt" : "contact" },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 transition-all duration-300"
      style={{
        padding: ".85rem 5vw",
        background: scrolled ? "rgba(2,2,10,.85)" : "rgba(2,2,10,.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "var(--b0)" : "transparent"}`,
      }}
    >
      {/* Logo */}
      <a
        href="#oMne"
        className="font-mono flex-shrink-0"
        style={{ fontSize: ".78rem", color: "var(--cyan)", textDecoration: "none", letterSpacing: ".06em" }}
      >
        dr.rakusan_
      </a>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-6">
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

      {/* Right: GitHub popover + lang switch + CTA */}
      <div className="flex items-center gap-3">
        {/* GitHub popover */}
        {profileItems.length > 0 && (
          <div ref={popoverRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setPopoverOpen(v => !v)}
              aria-expanded={popoverOpen}
              className="font-mono flex items-center gap-1.5 transition-all duration-150"
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
              GitHub
            </button>
            {popoverOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-xl border p-4 z-50"
                style={{
                  width: "min(300px, calc(100vw - 32px))",
                  background: "rgba(4,4,16,.96)",
                  borderColor: "var(--b1)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 20px 60px rgba(0,0,0,.6)",
                }}
              >
                <p className="font-mono text-center mb-3" style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".1em", textTransform: "uppercase" }}>
                  {t.github.publicInfo}
                </p>
                {profile?.bio && (
                  <p className="text-center text-xs mb-3" style={{ color: "var(--sub)", lineHeight: 1.6, fontSize: ".8rem" }}>{profile.bio}</p>
                )}
                <div className="flex flex-col gap-1.5">
                  {profileItems.map((item, i) => {
                    if (!item) return null;
                    const Tag = item.href ? "a" : "div";
                    return (
                      <Tag
                        key={i}
                        {...(item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})}
                        className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border transition-all duration-150"
                        style={{ borderColor: "var(--b0)", background: "var(--s1)", textDecoration: "none" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,.3)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--b0)"; }}
                      >
                        <span className="font-mono" style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".08em", textTransform: "uppercase" }}>{item.label}</span>
                        <span style={{ fontSize: ".78rem", color: "var(--txt)", fontWeight: 500 }}>{item.value}</span>
                      </Tag>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

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

        {/* CTA button */}
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
          {lang === "cz" ? "Napište mi →" : "Get in touch →"}
        </a>
      </div>
    </header>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.5 7.5 0 0 1 8 4.84c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
