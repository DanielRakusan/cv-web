"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export function AISection() {
  const t = useContent();

  return (
    <SectionWrapper id="ai">
      <SectionHeader label={t.aiSection.sectionLabel} heading={t.aiSection.heading} />

      <p className="mb-12 text-base leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "56ch" }}>
        {t.aiSection.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {t.aiSection.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border p-6 transition-all duration-200"
            style={{
              borderColor: "var(--border)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border-hover)";
              el.style.background = "rgba(255,255,255,0.045)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.background = "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))";
            }}
          >
            <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>
              {item.title}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
