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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`px-6 py-24 ${className}`}
    >
      <div className="max-w-4xl mx-auto">{children}</div>
    </motion.section>
  );
}

type SectionHeaderProps = {
  label: string;
  heading: string;
};

export function SectionHeader({ label, heading }: SectionHeaderProps) {
  return (
    <div className="mb-14">
      <div
        className="text-xs font-bold tracking-widest uppercase mb-3"
        style={{ color: "var(--accent)" }}
      >
        {label}
      </div>
      <h2
        className="font-extrabold leading-none"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          letterSpacing: "-0.025em",
          color: "var(--text)",
        }}
      >
        {heading}
      </h2>
    </div>
  );
}
