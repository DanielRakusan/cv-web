"use client";

import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export function VibeCoding() {
  const t = useContent();

  return (
    <SectionWrapper id="vibecoding">
      <SectionHeader keyword={`// ${t.vibeSection.sectionLabel.toLowerCase()}`} heading={t.vibeSection.heading} />

      <p className="mb-10 text-base leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "56ch" }}>
        {t.vibeSection.description}
      </p>

      {/* "Built with vibe coding" callout */}
      <div
        className="mb-10 rounded-2xl border p-6"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            aria-hidden="true"
          >
            ⚡
          </div>
          <div>
            <div className="font-bold mb-1" style={{ color: "var(--text)" }}>
              {t.vibeSection.builtWith}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {t.vibeSection.builtDetail}
            </p>
          </div>
        </div>
      </div>

      {/* Skill cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {t.vibeSection.skills.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border p-5 transition-all duration-200"
            style={{
              borderColor: "var(--border)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-hover)";
              el.style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.background = "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))";
            }}
          >
            <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "var(--text-faint)" }}>
              {item.label}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
