"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function SectionWrapper({ id, children, className = "" }: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`${className}`}
      style={{ padding: "5rem 5vw", maxWidth: 1060, margin: "0 auto" }}
    >
      {children}
    </motion.section>
  );
}

type SectionHeaderProps = {
  keyword: string;   // e.g. "// proč mě najmout"
  heading: string;   // e.g. "Co dostanete"
  sub?: string;
};

export function SectionHeader({ keyword, heading, sub }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: "2.6rem" }}>
      <div
        className="font-mono"
        style={{ fontSize: ".6rem", color: "var(--green)", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: ".4rem" }}
      >
        {keyword}
      </div>
      <h2
        className="font-bold"
        style={{
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          color: "#fff",
          letterSpacing: "-.01em",
          lineHeight: 1.2,
        }}
      >
        {heading}
      </h2>
      <div style={{ width: 30, height: 2, background: "var(--cyan)", marginTop: ".65rem" }} />
      {sub && (
        <p style={{ fontSize: ".9rem", color: "var(--sub)", marginTop: ".7rem", maxWidth: 560, lineHeight: 1.7 }}>
          {sub}
        </p>
      )}
    </div>
  );
}
