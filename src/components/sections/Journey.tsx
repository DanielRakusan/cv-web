"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

// Řádky Lua kódu — ComputerCraft turtle mining robot
const LUA_LINES = [
  { t: "comment",  s: "-- robot.lua  •  první pokus" },
  { t: "comment",  s: "-- Těžební robot v Lua" },
  { t: "blank",    s: "" },
  { t: "keyword",  s: "local", rest: " fuel = turtle.getFuelLevel()" },
  { t: "keyword",  s: "local", rest: " steps = 0" },
  { t: "blank",    s: "" },
  { t: "keyword",  s: "local function", rest: " mine()" },
  { t: "indent",   s: "  turtle.dig()" },
  { t: "indent",   s: "  turtle.forward()" },
  { t: "indent",   s: "  steps = steps + ", num: "1" },
  { t: "keyword2", s: "end" },
  { t: "blank",    s: "" },
  { t: "keyword",  s: "for", rest: " i = ", num: "1", rest2: ", ", num2: "64", rest3: " do" },
  { t: "indent",   s: "  mine()" },
  { t: "indent2",  s: "  if", rest: " turtle.detectDown() ", kw: "then" },
  { t: "indent",   s: "    turtle.digDown()" },
  { t: "keyword2", s: "  end" },
  { t: "keyword2", s: "end" },
  { t: "blank",    s: "" },
  { t: "fn",       s: 'print(', str: '"Hotovo! Kroků: "', rest: " .. steps)" },
];

const C = {
  keyword:  "var(--amber)",
  comment:  "var(--text-faint)",
  str:      "rgba(74,222,128,.9)",
  num:      "rgba(251,191,36,.7)",
  fn:       "var(--cyan)",
  text:     "var(--text-muted)",
};

function LuaLine({ line }: { line: typeof LUA_LINES[0] }) {
  if (line.t === "blank") return <div style={{ height: ".7em" }} />;
  if (line.t === "comment") return (
    <div><span style={{ color: C.comment }}>{line.s}</span></div>
  );
  if (line.t === "indent") return (
    <div>
      <span style={{ color: C.text }}>{line.s}</span>
      {line.num && <span style={{ color: C.num }}>{line.num}</span>}
    </div>
  );
  if (line.t === "indent2") return (
    <div>
      <span style={{ color: C.text }}>{line.s}</span>
      <span style={{ color: C.keyword }}>{line.rest}</span>
      <span style={{ color: C.keyword }}>{line.kw}</span>
    </div>
  );
  if (line.t === "keyword") return (
    <div>
      <span style={{ color: C.keyword }}>{line.s}</span>
      <span style={{ color: C.text }}>{line.rest ?? ""}</span>
      {line.num && <span style={{ color: C.num }}>{line.num}</span>}
      {line.rest2 && <span style={{ color: C.text }}>{line.rest2}</span>}
      {line.num2 && <span style={{ color: C.num }}>{line.num2}</span>}
      {line.rest3 && <span style={{ color: C.keyword }}>{line.rest3}</span>}
    </div>
  );
  if (line.t === "keyword2") return (
    <div><span style={{ color: C.keyword }}>{line.s}</span></div>
  );
  if (line.t === "fn") return (
    <div>
      <span style={{ color: C.fn }}>{line.s}</span>
      <span style={{ color: C.str }}>{line.str}</span>
      <span style={{ color: C.text }}>{line.rest}</span>
    </div>
  );
  return null;
}

function LuaTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 12,
        border: "1px solid rgba(251,191,36,.18)",
        background: "rgba(6,6,20,.95)",
        boxShadow: "0 16px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(251,191,36,.06)",
        overflow: "hidden",
        fontFamily: "var(--font-mono, monospace)",
      }}
    >
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: ".4rem",
        padding: ".5rem .9rem",
        background: "rgba(255,255,255,.03)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
        <span style={{ marginLeft: ".5rem", fontSize: ".6rem", color: "var(--text-faint)", letterSpacing: ".04em" }}>
          robot.lua
        </span>
        <span style={{ marginLeft: "auto", fontSize: ".55rem", color: "rgba(251,191,36,.5)", letterSpacing: ".04em" }}>
          Lua 5.2 · ComputerCraft
        </span>
      </div>

      {/* Code */}
      <div style={{ padding: ".75rem 1rem 1rem", fontSize: ".64rem", lineHeight: 1.65, overflowX: "auto" }}>
        {LUA_LINES.map((line, i) => (
          <LuaLine key={i} line={line} />
        ))}
        {/* Blinking cursor */}
        <div style={{ marginTop: ".4rem" }}>
          <span style={{ color: "var(--cyan)", fontSize: ".7rem" }}>▶ </span>
          <span style={{
            display: "inline-block", width: 7, height: "1em",
            background: "var(--cyan)", verticalAlign: "text-bottom", opacity: 0.85,
            animation: "cursor-blink 1.1s steps(1) infinite",
          }} />
        </div>
      </div>
      <style>{`@keyframes cursor-blink { 0%,49%{opacity:.85} 50%,100%{opacity:0} }`}</style>
    </motion.div>
  );
}

export function Journey() {
  const t = useContent();
  const { paragraphs, highlight } = t.journey;

  return (
    <SectionWrapper id="journey">
      <SectionHeader
        keyword={`// ${t.journey.sectionLabel.toLowerCase()}`}
        heading={t.journey.heading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left — text */}
        <div>
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: "var(--text-muted)",
                fontSize: ".97rem",
                lineHeight: 1.9,
                marginBottom: i < paragraphs.length - 1 ? "1.4rem" : 0,
              }}
              dangerouslySetInnerHTML={{
                __html: text.replace(
                  highlight,
                  `<span style="color:var(--amber);font-weight:600">${highlight}</span>`
                ),
              }}
            />
          ))}
        </div>

        {/* Right — Lua terminal */}
        <LuaTerminal />
      </div>
    </SectionWrapper>
  );
}
