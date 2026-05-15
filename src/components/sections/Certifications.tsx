"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export function Certifications() {
  const t = useContent();

  return (
    <SectionWrapper id="certifikaty">
      <SectionHeader label={t.certifications.sectionLabel} heading={t.certifications.heading} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {t.certifications.items.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="p-5 rounded-2xl border transition-all duration-200 cursor-default"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--accent-border)";
              el.style.background = "var(--accent-glow)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.background = "var(--surface)";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Check ikona */}
            <div className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border"
                style={{
                  borderColor: "rgba(34,197,94,0.3)",
                  background: "rgba(34,197,94,0.08)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7l3.5 3.5L12 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-sm leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {cert.title}
                </h3>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {cert.category}
                </p>
                <p
                  className="text-xs mt-2 font-semibold tracking-wide"
                  style={{ color: "var(--accent)" }}
                >
                  {t.certifications.completed} · {cert.date}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
