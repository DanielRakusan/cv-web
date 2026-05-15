"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export function MasterPlan() {
  const t = useContent();

  return (
    <SectionWrapper id="plan">
      <SectionHeader label={t.masterPlan.sectionLabel} heading={t.masterPlan.heading} />

      <p className="mb-12 text-base leading-relaxed" style={{ color: "var(--text-muted)", maxWidth: "56ch" }}>
        {t.masterPlan.description}
      </p>

      <div className="flex flex-col gap-6">
        {t.masterPlan.phases.map((phase, i) => {
          const isDone = phase.status === "done";
          const isCurrent = phase.status === "current";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-5 items-start"
            >
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center flex-shrink-0 pt-1">
                <div
                  className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                  style={{
                    borderColor: isDone ? "#22c55e" : isCurrent ? "var(--accent)" : "var(--border)",
                    background: isDone ? "#22c55e" : isCurrent ? "var(--accent)" : "transparent",
                    boxShadow: isCurrent ? "0 0 8px var(--accent)" : isDone ? "0 0 6px rgba(34,197,94,0.5)" : "none",
                  }}
                />
                {i < t.masterPlan.phases.length - 1 && (
                  <div
                    className="w-px flex-1 mt-1"
                    style={{
                      minHeight: 40,
                      background: isDone
                        ? "linear-gradient(to bottom, rgba(34,197,94,0.4), rgba(34,197,94,0.1))"
                        : "var(--border)",
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div
                className="flex-1 rounded-2xl border p-5 pb-5"
                style={{
                  borderColor: isCurrent ? "var(--accent-border)" : "var(--border)",
                  background: isCurrent
                    ? "var(--accent-glow)"
                    : "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
                }}
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {phase.phase}
                  </span>
                  <span className="font-bold text-base" style={{ color: "var(--text)" }}>
                    {phase.label}
                  </span>
                  {isDone && (
                    <span
                      className="ml-auto text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(34,197,94,0.1)", color: "rgba(134,239,172,0.9)", border: "1px solid rgba(34,197,94,0.25)" }}
                    >
                      ✓ Done
                    </span>
                  )}
                  {isCurrent && (
                    <span
                      className="ml-auto text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                      style={{ background: "var(--accent-glow)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
                    >
                      Active
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 rounded-lg text-sm font-semibold border"
                      style={{
                        borderColor: isDone ? "rgba(34,197,94,0.2)" : isCurrent ? "var(--accent-border)" : "var(--border)",
                        background: isDone
                          ? "rgba(34,197,94,0.06)"
                          : isCurrent
                          ? "var(--accent-glow)"
                          : "var(--surface)",
                        color: isDone
                          ? "rgba(134,239,172,0.85)"
                          : isCurrent
                          ? "var(--accent)"
                          : "var(--text-faint)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
