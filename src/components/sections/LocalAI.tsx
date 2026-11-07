"use client";

import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export function LocalAI() {
  const t = useContent();
  const { localAI } = t;

  return (
    <SectionWrapper id="localAI">
      <SectionHeader keyword={`// ${localAI.sectionLabel.toLowerCase()}`} heading={localAI.heading} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 items-start">
        {/* Text */}
        <div>
          <p className="mb-4" style={{ color: "var(--text-muted)", fontSize: ".93rem", lineHeight: 1.85 }}>
            {localAI.description}
          </p>
          <p className="mb-6" style={{ color: "var(--text-muted)", fontSize: ".93rem", lineHeight: 1.85 }}>
            {localAI.how}
          </p>
          <p className="font-mono" style={{ fontSize: ".7rem", color: "var(--text-faint)", letterSpacing: ".02em" }}>
            <span style={{ color: "var(--cyan)" }}>{"// "}</span>
            {localAI.plan}
          </p>
        </div>

        {/* Hardware */}
        <div
          className="rounded-2xl border p-6"
          style={{ borderColor: "rgba(34,211,238,.28)", background: "rgba(34,211,238,.05)" }}
        >
          {localAI.specs.map((spec, i) => (
            <div
              key={spec.label}
              className={i === 0 ? "pb-4" : "py-3 border-t flex items-baseline justify-between gap-4"}
              style={i === 0 ? undefined : { borderColor: "rgba(255,255,255,.08)" }}
            >
              {i === 0 ? (
                <>
                  <div className="font-mono mb-1" style={{ fontSize: ".6rem", color: "var(--text-faint)", letterSpacing: ".08em", textTransform: "uppercase" }}>
                    {spec.label}
                  </div>
                  <div className="font-bold" style={{ color: "var(--cyan)", fontSize: "1.6rem", letterSpacing: "-.01em" }}>
                    {spec.value}
                  </div>
                  <div className="font-mono mt-1" style={{ fontSize: ".62rem", color: "var(--text-faint)" }}>
                    {spec.hint}
                  </div>
                </>
              ) : (
                <>
                  <span className="font-mono" style={{ fontSize: ".65rem", color: "var(--text-faint)", letterSpacing: ".06em", textTransform: "uppercase" }}>
                    {spec.label}
                  </span>
                  <span className="font-bold" style={{ color: "var(--text)", fontSize: "1.05rem" }}>
                    {spec.value}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
