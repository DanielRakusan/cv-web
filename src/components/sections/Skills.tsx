"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

type TierProps = {
  label: string;
  sub: string;
  tags: readonly string[];
  accent: "cyan" | "green" | "dim";
  icon: string;
  delay: number;
};

function Tier({ label, sub, tags, accent, icon, delay }: TierProps) {
  const colors = {
    cyan: {
      border: "rgba(34,211,238,.25)",
      bg: "rgba(34,211,238,.05)",
      tagBorder: "rgba(34,211,238,.22)",
      tagBg: "rgba(34,211,238,.06)",
      tagColor: "var(--cyan)",
      labelColor: "var(--cyan)",
      iconBg: "rgba(34,211,238,.12)",
    },
    green: {
      border: "rgba(74,222,128,.25)",
      bg: "rgba(74,222,128,.05)",
      tagBorder: "rgba(74,222,128,.22)",
      tagBg: "rgba(74,222,128,.06)",
      tagColor: "var(--green)",
      labelColor: "var(--green)",
      iconBg: "rgba(74,222,128,.12)",
    },
    dim: {
      border: "var(--b1)",
      bg: "var(--s1)",
      tagBorder: "var(--b1)",
      tagBg: "rgba(255,255,255,.03)",
      tagColor: "var(--sub)",
      labelColor: "var(--dim)",
      iconBg: "rgba(255,255,255,.06)",
    },
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border p-5"
      style={{ borderColor: colors.border, background: colors.bg }}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
          style={{ background: colors.iconBg }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <p
            className="font-mono font-bold"
            style={{ fontSize: ".7rem", color: colors.labelColor, letterSpacing: ".06em" }}
          >
            {label}
          </p>
          <p
            className="font-mono"
            style={{ fontSize: ".58rem", color: "var(--dim)", letterSpacing: ".04em", marginTop: 1 }}
          >
            {sub}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono transition-all duration-150 cursor-default"
            style={{
              fontSize: ".7rem",
              padding: "3px 10px",
              borderRadius: 4,
              border: `1px solid ${colors.tagBorder}`,
              background: colors.tagBg,
              color: colors.tagColor,
              letterSpacing: ".02em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const t = useContent();

  return (
    <SectionWrapper id="dovednosti">
      <SectionHeader
        keyword={`// ${t.skills.sectionLabel.toLowerCase()}`}
        heading={t.skills.heading}
      />

      <div className="flex flex-col gap-4">
        <Tier
          label={t.skills.active.label}
          sub={t.skills.active.sub}
          tags={t.skills.active.tags}
          accent="green"
          icon="✓"
          delay={0}
        />
        <Tier
          label={t.skills.growing.label}
          sub={t.skills.growing.sub}
          tags={t.skills.growing.tags}
          accent="cyan"
          icon="→"
          delay={0.08}
        />
        <Tier
          label={t.skills.base.label}
          sub={t.skills.base.sub}
          tags={t.skills.base.tags}
          accent="dim"
          icon="⚙"
          delay={0.16}
        />
      </div>
    </SectionWrapper>
  );
}
