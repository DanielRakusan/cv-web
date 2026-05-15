"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export function Skills() {
  const t = useContent();

  return (
    <SectionWrapper id="dovednosti">
      <SectionHeader label={t.skills.sectionLabel} heading={t.skills.heading} />

      <div className="space-y-8">
        {t.skills.groups.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: gi * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-start gap-4"
          >
            <div
              className="flex-shrink-0 w-full sm:w-36 text-xs font-bold tracking-widest uppercase pt-1"
              style={{ color: "var(--text-faint)" }}
            >
              {group.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.tags.map((tag, ti) => (
                <motion.span
                  key={ti}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.05 + ti * 0.04, duration: 0.35 }}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold border cursor-default transition-all duration-150 select-none"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--surface)",
                    color: "var(--text-muted)",
                  }}
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
                    el.style.color = "var(--text-muted)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
