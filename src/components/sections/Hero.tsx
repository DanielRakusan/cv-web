"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { siteConfig } from "@/config/site";
import type { GitHubProfile } from "@/lib/github";

type HeroProps = {
  profile: GitHubProfile | null;
};

const ease = [0.22, 1, 0.36, 1] as const;

function FadeUp({ delay, children, className }: { delay: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero({ profile }: HeroProps) {
  const t = useContent();
  const displayName = profile?.name ?? profile?.login ?? "Daniel Rakušan";
  const avatarUrl = profile?.avatar_url ?? `https://github.com/${siteConfig.githubUsername}.png?size=320`;

  return (
    <section
      id="oMne"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Corner decorations */}
      <div aria-hidden="true" className="absolute inset-6 pointer-events-none">
        <span className="absolute top-0 left-0 w-20 h-20 border-t border-l" style={{ borderColor: "var(--border)" }} />
        <span className="absolute bottom-0 right-0 w-20 h-20 border-b border-r" style={{ borderColor: "var(--border)" }} />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto">
        {/* Desktop: 2-column | Mobile: single column centered */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Right column (desktop) / bottom (mobile): text */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left gap-7 flex-1 order-2 md:order-2">

            <FadeUp delay={0.1}>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border"
                style={{
                  borderColor: "rgba(34,197,94,0.3)",
                  background: "rgba(34,197,94,0.06)",
                  color: "rgba(134,239,172,0.9)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {t.hero.badge}
              </span>
            </FadeUp>

            <FadeUp delay={0.2} className="space-y-2">
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
                {t.hero.role}
                <span className="ml-2" style={{ color: "var(--text-faint)" }}>{t.hero.subRole}</span>
              </div>
              <h1
                className="font-extrabold leading-none uppercase"
                style={{
                  fontSize: "clamp(2.4rem, 7vw, 5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.92,
                }}
              >
                {t.hero.tagline.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease }}
              className="w-20 h-px origin-left hidden md:block"
              style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
            />
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease }}
              className="w-20 h-px md:hidden"
              style={{ background: "linear-gradient(to right, transparent, var(--border), transparent)" }}
            />

            <FadeUp delay={0.35}>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "44ch" }}>
                {t.hero.description}
              </p>
            </FadeUp>

            {/* CTA buttons */}
            <FadeUp delay={0.45}>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className="px-6 py-3 rounded-xl text-sm font-bold tracking-wide border transition-all duration-150"
                  style={{ background: "#ffffff", color: "#050505", borderColor: "transparent" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(255,255,255,0.88)";
                    el.style.transform = "translateY(-1px)";
                    el.style.boxShadow = "0 8px 24px rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#ffffff";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {t.hero.ctaContact}
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank" rel="noreferrer"
                  className="px-6 py-3 rounded-xl text-sm font-bold tracking-wide border transition-all duration-150"
                  style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--accent-border)";
                    el.style.background = "var(--accent-glow)";
                    el.style.color = "var(--accent)";
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.background = "var(--surface)";
                    el.style.color = "var(--text)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {t.hero.ctaLinkedin}
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank" rel="noreferrer"
                  className="px-6 py-3 rounded-xl text-sm font-bold tracking-wide border transition-all duration-150"
                  style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border-hover)";
                    el.style.background = "var(--surface-hover)";
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.background = "var(--surface)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {t.hero.ctaGithub}
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Left column (desktop) / top (mobile): avatar */}
          <FadeUp delay={0} className="flex-shrink-0 order-1 md:order-1">
            <div className="relative">
              <div
                className="rounded-full p-1.5 border"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  background: "radial-gradient(circle at top, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 65%)",
                  boxShadow: "0 14px 36px rgba(0,0,0,0.35), 0 0 0 8px rgba(255,255,255,0.02)",
                  width: 172,
                  height: 172,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt={t.github.avatarAlt.replace("{name}", displayName)}
                  width={156}
                  height={156}
                  className="rounded-full object-cover w-full h-full border"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Availability dot */}
              <span
                className="absolute bottom-3 right-3 w-4 h-4 rounded-full border-2"
                style={{ background: "#22c55e", borderColor: "#050505", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }}
                aria-label="Available"
              />
            </div>
          </FadeUp>
        </div>

        {/* Scroll hint */}
        <FadeUp delay={0.6}>
          <div className="flex flex-col items-center gap-2 mt-14" style={{ color: "var(--text-faint)" }}>
            <span className="text-xs font-semibold tracking-widest uppercase">{t.hero.scrollHint}</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
