"use client";

import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export function Experience() {
  const t = useContent();

  return (
    <SectionWrapper id="zkusenosti">
      <SectionHeader keyword={`// ${t.experience.sectionLabel.toLowerCase()}`} heading={t.experience.heading} />

      <div className="relative">
        {/* Vertikální linka */}
        <div
          className="absolute left-4 top-3 bottom-3 w-px hidden sm:block"
          style={{ background: "linear-gradient(to bottom, var(--accent-border), var(--border), transparent)" }}
          aria-hidden="true"
        />

        <div className="space-y-10">
          {t.experience.items.map((item, i) => (
            <div key={i} className="sm:pl-14 relative">
              {/* Dot na timeline */}
              <div
                className="absolute left-2 top-3 w-5 h-5 rounded-full border-2 hidden sm:flex items-center justify-center"
                style={{
                  borderColor: i === 0 ? "var(--accent)" : "var(--border)",
                  background: i === 0 ? "var(--accent-glow)" : "var(--bg)",
                }}
                aria-hidden="true"
              >
                {i === 0 && (
                  <span className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />
                )}
              </div>

              <div
                className="p-6 rounded-2xl border transition-all duration-200"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = i === 0 ? "var(--accent-border)" : "var(--border-hover)";
                  el.style.background = i === 0 ? "var(--accent-glow)" : "var(--surface-hover)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.background = "var(--surface)";
                }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3
                      className="font-bold text-base tracking-tight"
                      style={{ color: "var(--text)" }}
                    >
                      {item.role}
                    </h3>
                    <p
                      className="text-sm font-semibold mt-0.5"
                      style={{ color: i === 0 ? "var(--accent)" : "var(--text-muted)" }}
                    >
                      {item.company}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                      {item.period}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                      {item.location}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="px-2 py-0.5 rounded text-xs font-semibold border"
                      style={{
                        borderColor: "var(--border)",
                        background: "rgba(255,255,255,0.02)",
                        color: "var(--text-faint)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="space-y-2">
                  {item.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-2.5">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0 mt-2"
                        style={{ background: "var(--text-faint)" }}
                      />
                      <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
