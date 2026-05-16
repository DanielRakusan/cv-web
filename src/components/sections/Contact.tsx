"use client";

import { useContent } from "@/hooks/useContent";
import { siteConfig } from "@/config/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function Contact() {
  const t = useContent();

  const links = [
    {
      label: t.contact.ctaEmail,
      href: `mailto:${siteConfig.social.email}`,
      primary: true,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M1 6l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: t.contact.ctaLinkedin,
      href: siteConfig.social.linkedin,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M2.667 1.333A1.333 1.333 0 1 0 2.667 4a1.333 1.333 0 0 0 0-2.667zM1.333 5.333h2.667V14H1.333V5.333zm4 0H8v1.167h.04c.366-.694 1.26-1.427 2.594-1.427 2.774 0 3.286 1.826 3.286 4.2V14h-2.666v-4.193c0-.999-.018-2.286-1.393-2.286-1.394 0-1.607 1.09-1.607 2.213V14H5.333V5.333z" />
        </svg>
      ),
    },
    {
      label: t.contact.ctaGithub,
      href: siteConfig.social.github,
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.5 7.5 0 0 1 8 4.84c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
      ),
    },
  ];

  return (
    <SectionWrapper id="kontakt">
      <div className="text-center max-w-2xl mx-auto">
        <div>
          <div
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            {t.contact.sectionLabel}
          </div>
          <h2
            className="font-extrabold leading-none mb-6"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {t.contact.heading}
          </h2>
          <p
            className="text-lg leading-relaxed mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            {t.contact.description}
          </p>
        </div>

        {/* Info chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border"
            style={{ borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.06)", color: "rgba(134,239,172,0.9)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t.contact.availability}
          </span>
          <span
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border"
            style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text-muted)" }}
          >
            📍 {t.contact.location}
          </span>
        </div>

        {/* CTA tlačítka */}
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold tracking-wide border transition-all duration-150"
              style={
                link.primary
                  ? { background: "#ffffff", color: "#050505", borderColor: "transparent" }
                  : { borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }
              }
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (link.primary) {
                  el.style.background = "rgba(255,255,255,0.88)";
                  el.style.transform = "translateY(-1px)";
                  el.style.boxShadow = "0 8px 24px rgba(255,255,255,0.12)";
                } else {
                  el.style.borderColor = "var(--accent-border)";
                  el.style.background = "var(--accent-glow)";
                  el.style.color = "var(--accent)";
                  el.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (link.primary) {
                  el.style.background = "#ffffff";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                } else {
                  el.style.borderColor = "var(--border)";
                  el.style.background = "var(--surface)";
                  el.style.color = "var(--text)";
                  el.style.transform = "translateY(0)";
                }
              }}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
