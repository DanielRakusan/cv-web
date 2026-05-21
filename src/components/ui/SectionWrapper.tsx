"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

// CSS IntersectionObserver — stejný efekt jako framer-motion whileInView,
// ale bez závislosti → framer-motion zůstane jen v lazy-loaded sekcích.
export function SectionWrapper({ id, children, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          obs.disconnect();
        }
      },
      { rootMargin: "-60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`section-fade section-padding ${className}`}
      style={{ maxWidth: 1060, margin: "0 auto" }}
    >
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  keyword: string;
  heading: string;
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
