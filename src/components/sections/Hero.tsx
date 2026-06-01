"use client";

import Image from "next/image";
import { useContent } from "@/hooks/useContent";
import { siteConfig } from "@/config/site";
import type { GitHubProfile } from "@/lib/github";

type HeroProps = {
  profile: GitHubProfile | null;
};

// CSS-based fade-up — stejný vizuální efekt jako framer-motion,
// ale server renderuje obsah bez opacity:0 → LCP se měří dříve.
function FadeUp({ delay, children, className }: { delay: number; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{ animation: `fade-up 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s both` }}
    >
      {children}
    </div>
  );
}

export function Hero({ profile }: HeroProps) {
  const t = useContent();
  const displayName = profile?.name ?? profile?.login ?? "Daniel Rakušan";
  const avatarUrl = profile?.avatar_url ?? `https://github.com/${siteConfig.githubUsername}.png?size=320`;

  return (
    <section
      id="oMne"
      className="relative z-10 min-h-screen flex items-center px-[5vw] pt-[88px] pb-[100px] sm:pb-24"
      style={{ maxWidth: 1060, margin: "0 auto" }}
    >
      {/* 2-col grid: photo left | text right — stacks on mobile */}
      <div className="w-full grid items-center hero-grid">
        {/* ── LEFT: Photo ── */}
        <FadeUp delay={0}>
          <div className="flex flex-col items-center gap-4">
            {/* Square photo with cyan corner frame */}
            <div className="relative hero-photo-wrap">
              <div
                className="relative overflow-hidden group hero-photo-wrap"
                style={{ borderRadius: 10 }}
              >
                <Image
                  src={avatarUrl}
                  alt={t.github.avatarAlt.replace("{name}", displayName)}
                  width={320}
                  height={320}
                  sizes="(max-width: 539px) 140px, (max-width: 767px) 190px, 210px"
                  className="w-full h-full object-cover block transition-all duration-300"
                  style={{ filter: "grayscale(8%)" }}
                  priority
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 hidden sm:flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4"
                  style={{ background: "rgba(2,2,10,0.82)" }}
                >
                  <a
                    href={`mailto:${siteConfig.social.email}`}
                    className="font-mono text-xs py-2 px-4 rounded w-full text-center font-bold transition-colors duration-150"
                    style={{ background: "var(--cyan)", color: "#02020a", letterSpacing: ".04em" }}
                  >
                    {t.hero.ctaContact} ↗
                  </a>
                  <a
                    href={siteConfig.social.github}
                    target="_blank" rel="noreferrer"
                    className="font-mono text-xs py-1.5 px-4 rounded w-full text-center border transition-all duration-150"
                    style={{ background: "rgba(255,255,255,.08)", color: "#fff", borderColor: "rgba(255,255,255,.22)" }}
                  >
                    GitHub
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank" rel="noreferrer"
                    className="font-mono text-xs py-1.5 px-4 rounded w-full text-center border transition-all duration-150"
                    style={{ background: "rgba(255,255,255,.08)", color: "#fff", borderColor: "rgba(255,255,255,.22)" }}
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              {/* Cyan corner frame */}
              <div className="photo-frame absolute pointer-events-none" style={{ inset: -3 }} />
            </div>

            {/* Availability badge below photo */}
            <div
              className="font-mono inline-flex items-center gap-2"
              style={{
                fontSize: ".6rem",
                padding: "4px 14px",
                border: "1px solid rgba(74,222,128,.24)",
                borderRadius: 100,
                color: "var(--green)",
                background: "rgba(74,222,128,.06)",
                letterSpacing: ".04em",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--green)",
                  animation: "pulse-dot 2.2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              {t.hero.badge}
            </div>
          </div>
        </FadeUp>

        {/* ── RIGHT: Text ── */}
        <div className="flex flex-col gap-5">
          {/* Eyebrow */}
          <FadeUp delay={0.1}>
            <div
              className="font-mono flex items-center gap-3 uppercase"
              style={{ fontSize: ".63rem", color: "var(--green)", letterSpacing: ".13em" }}
            >
              <span style={{ width: 18, height: 1, background: "var(--green)", flexShrink: 0 }} />
              {t.hero.eyebrow}
            </div>
          </FadeUp>

          {/* Name H1 */}
          <FadeUp delay={0.18}>
            <h1
              className="font-bold leading-tight"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                letterSpacing: "-.02em",
                color: "#fff",
                lineHeight: 1.05,
              }}
            >
              Daniel<br />
              <span style={{ color: "var(--cyan)" }}>Rakušan</span>
            </h1>
          </FadeUp>

          {/* Role in monospace */}
          <FadeUp delay={0.25}>
            <div
              className="font-mono"
              style={{ fontSize: "clamp(.65rem, 1.5vw, .8rem)", color: "var(--dim)", letterSpacing: ".04em" }}
            >
              {t.hero.role.toLowerCase().replace(/ /g, " · ")} · AI-assisted dev
            </div>
          </FadeUp>

          {/* Pitch */}
          <FadeUp delay={0.32}>
            <p
              className="font-semibold"
              style={{ fontSize: "clamp(.95rem, 2vw, 1.1rem)", color: "var(--txt)", lineHeight: 1.55, maxWidth: 480 }}
            >
              {t.hero.pitch}
            </p>
          </FadeUp>

          {/* Body */}
          <FadeUp delay={0.38}>
            <p style={{ fontSize: ".9rem", color: "var(--sub)", lineHeight: 1.85, maxWidth: 470 }}>
              {t.hero.description}
            </p>
          </FadeUp>

          {/* Tech pills */}
          <FadeUp delay={0.44}>
            <div className="flex flex-wrap gap-1.5">
              {t.hero.pills.map((pill, i) => (
                <span
                  key={i}
                  className="font-mono"
                  style={{
                    fontSize: ".58rem",
                    padding: "2px 9px",
                    borderRadius: 3,
                    border: "1px solid",
                    letterSpacing: ".03em",
                    color: pill.color === "cyan" ? "var(--cyan)"
                      : pill.color === "green" ? "var(--green)"
                      : pill.color === "violet" ? "var(--violet)"
                      : "var(--amber)",
                    borderColor: pill.color === "cyan" ? "rgba(34,211,238,.28)"
                      : pill.color === "green" ? "rgba(74,222,128,.28)"
                      : pill.color === "violet" ? "rgba(167,139,250,.28)"
                      : "rgba(251,191,36,.28)",
                  }}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* CTA buttons */}
          <FadeUp delay={0.5}>
            <div className="flex flex-wrap gap-2 mb-10 sm:mb-0">
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="font-mono inline-flex items-center gap-1.5 transition-all duration-150"
                style={{
                  fontSize: ".7rem",
                  padding: ".54rem 1.18rem",
                  borderRadius: 4,
                  background: "var(--cyan)",
                  color: "#02020a",
                  border: "1px solid var(--cyan)",
                  fontWeight: 600,
                  letterSpacing: ".03em",
                  textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#67e8f9")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--cyan)")}
              >
                {t.hero.ctaContact} ↗
              </a>
              <a
                href="#projekty"
                className="font-mono inline-flex items-center gap-1.5 transition-all duration-150"
                style={{
                  fontSize: ".7rem",
                  padding: ".54rem 1.18rem",
                  borderRadius: 4,
                  background: "transparent",
                  color: "var(--green)",
                  border: "1px solid rgba(74,222,128,.4)",
                  letterSpacing: ".03em",
                  textDecoration: "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--green)";
                  e.currentTarget.style.background = "rgba(74,222,128,.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(74,222,128,.4)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", animation: "pulse-dot 2.2s ease-in-out infinite", flexShrink: 0 }} />
                {t.hero.liveDemo}
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank" rel="noreferrer"
                className="font-mono inline-flex items-center gap-1.5 transition-all duration-150"
                style={{
                  fontSize: ".7rem",
                  padding: ".54rem 1.18rem",
                  borderRadius: 4,
                  background: "transparent",
                  color: "var(--sub)",
                  border: "1px solid var(--b1)",
                  letterSpacing: ".03em",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.color = "var(--sub)"; }}
              >
                GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank" rel="noreferrer"
                className="font-mono inline-flex items-center gap-1.5 transition-all duration-150"
                style={{
                  fontSize: ".7rem",
                  padding: ".54rem 1.18rem",
                  borderRadius: 4,
                  background: "transparent",
                  color: "var(--sub)",
                  border: "1px solid var(--b1)",
                  letterSpacing: ".03em",
                  textDecoration: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.color = "var(--sub)"; }}
              >
                LinkedIn
              </a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono"
        style={{ fontSize: ".58rem", color: "var(--dim)", letterSpacing: ".1em", animation: "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) 1s both" }}
      >
        <span className="uppercase">{t.hero.scrollHint}</span>
        <div style={{ animation: "scroll-bounce 1.8s ease-in-out infinite" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
