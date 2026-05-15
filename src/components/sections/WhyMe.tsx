"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

const icons = ["⚡", "🔧", "📚", "🧠"];

export function WhyMe() {
  const t = useContent();

  return (
    <SectionWrapper id="whyMe">
      <SectionHeader label={t.whyMe.sectionLabel} heading={t.whyMe.heading} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {t.whyMe.cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
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
          </motion.div>
        ))}
      </div>

      {/* Highlights grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {t.highlights.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
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
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
