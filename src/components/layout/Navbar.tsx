"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useContent } from "@/hooks/useContent";
import { siteConfig } from "@/config/site";
import type { GitHubProfile } from "@/lib/github";

type NavbarProps = {
  profile: GitHubProfile | null;
};

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopoverOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const displayName = profile?.name ?? profile?.login ?? "Daniel Rakušan";

  function normalizeUrl(val: string | null | undefined) {
    if (!val) return "";
    return /^https?:\/\//i.test(val) ? val : "https://" + val;
  }

  const profileItems = profile
    ? [
        { label: t.github.publicInfo.split(" ")[0], value: "@" + profile.login, href: profile.html_url },
        profile.location ? { label: t.github.location, value: profile.location } : null,
        profile.email ? { label: t.github.email, value: profile.email, href: "mailto:" + profile.email } : null,
        profile.blog ? { label: t.github.website, value: profile.blog, href: normalizeUrl(profile.blog) } : null,
        profile.company ? { label: t.github.company, value: profile.company } : null,
        profile.twitter_username
          ? { label: t.github.social, value: "@" + profile.twitter_username, href: "https://x.com/" + profile.twitter_username }
          : null,
      ].filter(Boolean)
    : [];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: scrolled ? "10px 24px" : "16px 24px",
        background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Avatar + jméno */}
        <div className="flex items-center gap-3">
          <div
            className="rounded-full overflow-hidden flex-shrink-0 border transition-all duration-200"
            style={{
              width: 34,
              height: 34,
              borderColor: "var(--border)",
              background: "var(--surface)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile?.avatar_url ?? `https://github.com/${siteConfig.githubUsername}.png?size=68`}
              alt={t.github.avatarAlt.replace("{name}", displayName)}
              width={34}
              height={34}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span
            className="text-sm font-semibold tracking-wide hidden sm:block"
            style={{ color: "var(--text)" }}
          >
            {displayName}
          </span>
        </div>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {(["oMne", "dovednosti", "zkusenosti", "certifikaty", "projekty", "kontakt"] as const).map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="px-3 py-1.5 rounded-lg text-sm transition-all duration-150"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        {/* Pravá strana */}
        <div className="flex items-center gap-2">
          {/* GitHub popover */}
          {profileItems.length > 0 && (
            <div ref={popoverRef} className="relative">
              <button
                type="button"
                onClick={() => setPopoverOpen((v) => !v)}
                aria-expanded={popoverOpen}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-150 border"
                style={{
                  borderColor: popoverOpen ? "var(--accent-border)" : "var(--border)",
                  background: popoverOpen ? "var(--accent-glow)" : "var(--surface)",
                  color: popoverOpen ? "var(--accent)" : "var(--text)",
                }}
                onMouseEnter={(e) => {
                  if (!popoverOpen) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!popoverOpen) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                  }
                }}
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </button>

              {popoverOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-2xl border p-5 z-50"
                  style={{
                    width: "min(340px, calc(100vw - 32px))",
                    background: "rgba(8,8,8,0.95)",
                    borderColor: "var(--border)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  <p
                    className="text-center text-xs font-bold tracking-widest uppercase mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.github.publicInfo}
                  </p>
                  {profile?.bio && (
                    <p className="text-center text-sm mb-4" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                      {profile.bio}
                    </p>
                  )}
                  <div className="flex flex-col gap-2">
                    {profileItems.map((item, i) => {
                      if (!item) return null;
                      const Tag = item.href ? "a" : "div";
                      return (
                        <Tag
                          key={i}
                          {...(item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})}
                          className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-150"
                          style={{
                            borderColor: "var(--border)",
                            background: "var(--surface)",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                            (e.currentTarget as HTMLElement).style.background = "var(--accent-glow)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                          }}
                        >
                          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--text-faint)" }}>
                            {item.label}
                          </span>
                          <span className="text-sm font-semibold text-right" style={{ color: "var(--text)" }}>
                            {item.value}
                          </span>
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Language switch */}
          <div
            className="flex rounded-full border p-1"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            {(["cz", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className="px-3 py-1.5 rounded-full text-sm font-bold tracking-wide transition-all duration-150"
                style={{
                  background: lang === l ? "#ffffff" : "transparent",
                  color: lang === l ? "#050505" : "var(--text-muted)",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
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
