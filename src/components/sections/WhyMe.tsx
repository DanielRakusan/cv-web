"use client";

import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

const icons = ["🐍", "🔧", "⚡", "🤖"];

export function WhyMe() {
  const t = useContent();

  return (
    <SectionWrapper id="whyMe">
      <SectionHeader keyword={`// ${t.whyMe.sectionLabel.toLowerCase()}`} heading={t.whyMe.heading} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {t.whyMe.cards.map((card, i) => (
          <div key={i}>
            <div
              className="h-full p-6 rounded-2xl border transition-all duration-200 group cursor-default"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent-border)";
                el.style.background = "var(--accent-glow)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 32px rgba(59,130,246,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.background = "var(--surface)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="text-2xl mb-4">{icons[i]}</div>
              <h3
                className="font-bold text-base mb-2 tracking-tight"
                style={{ color: "var(--text)" }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Highlights grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {t.highlights.items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 py-3 px-4 rounded-xl border transition-all duration-150"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-hover)";
              el.style.background = "var(--surface-hover)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.background = "var(--surface)";
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: "var(--accent)" }}
            />
            <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
