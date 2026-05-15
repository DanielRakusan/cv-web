"use client";

import { useEffect, useRef } from "react";

export function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const count = 90;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      const roll = Math.random();
      const size = roll < 0.6 ? 1 : roll > 0.9 ? 3 : 2;

      star.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        border-radius:50%;
        background:rgba(255,255,255,0.9);
        box-shadow:0 0 6px rgba(255,255,255,0.3);
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        animation:
          float-star ${8 + Math.random() * 10}s ${-Math.random() * 12}s linear infinite,
          pulse-star ${2 + Math.random() * 4}s ${-Math.random() * 5}s ease-in-out infinite;
      `;
      fragment.appendChild(star);
    }

    el.appendChild(fragment);
    return () => { el.innerHTML = ""; };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
}
