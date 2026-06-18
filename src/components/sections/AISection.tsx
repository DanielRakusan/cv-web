"use client";

import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

// Claude — rounded square app icon + 6-arm asterisk (přesně jako originál)
function LogoClaude() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" width="100%" height="100%">
      <rect x="4" y="4" width="92" height="92" rx="22" opacity="0.2" />
      <g transform="translate(50,50)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <rect key={a} x="-6.5" y="-37" width="13" height="25" rx="6.5" transform={`rotate(${a})`} />
        ))}
      </g>
    </svg>
  );
}

// ChatGPT — OpenAI logo: 6 kruhů jako jeden compound path, evenodd vytvoří interlocking vzor
// fillRule="evenodd" funguje jen na jednom <path>, ne na více <circle> v <g>
function LogoChatGPT() {
  // R > cr → střed není pokryt → přirozená díra. Sousední kruhy se překrývají (lens cutout).
  // Nesousední kruhy (vzdálenost R√3 ≈ 38) se nepřekrývají (cr+cr=34 < 38) → 6 čistých lístků.
  const R = 22;
  const cr = 17;
  const d = [0, 60, 120, 180, 240, 300]
    .map((a) => {
      const rad = (a * Math.PI) / 180;
      const cx = +(R * Math.sin(rad)).toFixed(2);
      const cy = +(-R * Math.cos(rad)).toFixed(2);
      return `M ${cx - cr},${cy} a ${cr},${cr} 0 1,0 ${2 * cr},0 a ${cr},${cr} 0 1,0 ${-2 * cr},0`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" width="100%" height="100%">
      <g transform="translate(50,50)">
        <path d={d} fillRule="evenodd" />
      </g>
    </svg>
  );
}

// Gemini — 4-bodová hvězda s bezier křivkami (přesně jako originál)
function LogoGemini() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" width="100%" height="100%">
      <path d="M50 3 C51 29 71 49 97 50 C71 51 51 71 50 97 C49 71 29 51 3 50 C29 49 49 29 50 3Z" />
    </svg>
  );
}

// Wispr Flow — rounded square + 5 equalizer bars různých výšek
function LogoWispr() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" width="100%" height="100%">
      <rect x="4" y="4" width="92" height="92" rx="22" opacity="0.2" />
      <rect x="14" y="40" width="12" height="22" rx="6" />
      <rect x="30" y="24" width="12" height="54" rx="6" />
      <rect x="46" y="14" width="12" height="74" rx="6" />
      <rect x="62" y="28" width="12" height="46" rx="6" />
      <rect x="78" y="44" width="12" height="14" rx="6" />
    </svg>
  );
}

const VISUALS = [
  { Logo: LogoClaude,  color: "rgba(251,191,36,1)",  border: "rgba(251,191,36,.28)",  bg: "rgba(251,191,36,.06)",  badge: "rgba(251,191,36,.13)", comment: "rgba(251,191,36,.65)" },
  { Logo: LogoChatGPT, color: "rgba(74,222,128,1)",  border: "rgba(74,222,128,.28)",  bg: "rgba(74,222,128,.06)",  badge: "rgba(74,222,128,.13)",  comment: "rgba(74,222,128,.65)" },
  { Logo: LogoGemini,  color: "rgba(34,211,238,1)",  border: "rgba(34,211,238,.28)",  bg: "rgba(34,211,238,.06)",  badge: "rgba(34,211,238,.13)",  comment: "rgba(34,211,238,.65)" },
  { Logo: LogoWispr,   color: "rgba(167,139,250,1)", border: "rgba(167,139,250,.28)", bg: "rgba(167,139,250,.06)", badge: "rgba(167,139,250,.13)", comment: "rgba(167,139,250,.65)" },
] as const;

export function AISection() {
  const t = useContent();
  const [main, ...others] = t.aiSection.tools;
  const mainV = VISUALS[0];

  return (
    <SectionWrapper id="ai">
      <SectionHeader keyword={`// ${t.aiSection.sectionLabel.toLowerCase()}`} heading={t.aiSection.heading} />

      <p className="mb-10" style={{ color: "var(--text-muted)", maxWidth: "56ch", fontSize: ".93rem", lineHeight: 1.85 }}>
        {t.aiSection.description}
      </p>

      {/* Tool cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">

        {/* Claude — featured left card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border p-6 flex flex-col"
          style={{ borderColor: mainV.border, background: mainV.bg }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 flex-shrink-0" style={{ color: mainV.color }}>
              <LogoClaude />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold" style={{ color: "var(--text)", fontSize: ".95rem" }}>{main.name}</p>
              <p className="font-mono" style={{ fontSize: ".58rem", color: "var(--text-muted)", letterSpacing: ".08em", textTransform: "uppercase" }}>{main.maker}</p>
            </div>
            <span
              className="font-mono"
              style={{ fontSize: ".55rem", padding: "2px 8px", borderRadius: 3, border: `1px solid ${mainV.border}`, color: mainV.color, background: mainV.badge, letterSpacing: ".04em", whiteSpace: "nowrap" }}
            >
              {main.role}
            </span>
          </div>

          <p className="flex-1 mb-4" style={{ fontSize: ".88rem", color: "var(--text-muted)", lineHeight: 1.85 }}>
            {main.usage}
          </p>

          {main.limit && (
            <p className="font-mono" style={{ fontSize: ".63rem", color: "var(--text-faint)", letterSpacing: ".02em" }}>
              <span style={{ color: mainV.comment }}>{"// "}</span>{main.limit}
            </p>
          )}
        </motion.div>

        {/* ChatGPT · Gemini · Wispr — stacked right column */}
        <div className="flex flex-col gap-4">
          {others.map((tool, i) => {
            const v = VISUALS[i + 1];
            const Logo = v.Logo;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i + 1) * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border p-5 flex flex-col"
                style={{ borderColor: v.border, background: v.bg }}
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-7 h-7 flex-shrink-0" style={{ color: v.color }}>
                    <Logo />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold" style={{ color: "var(--text)", fontSize: ".88rem" }}>{tool.name}</p>
                    <p className="font-mono" style={{ fontSize: ".55rem", color: "var(--text-faint)", letterSpacing: ".07em", textTransform: "uppercase" }}>{tool.maker}</p>
                  </div>
                  <span
                    className="font-mono"
                    style={{ fontSize: ".53rem", padding: "2px 7px", borderRadius: 3, border: `1px solid ${v.border}`, color: v.color, background: v.badge, letterSpacing: ".04em", whiteSpace: "nowrap" }}
                  >
                    {tool.role}
                  </span>
                </div>

                <p style={{ fontSize: ".82rem", color: "var(--text-muted)", lineHeight: 1.75, marginBottom: tool.limit ? ".55rem" : 0 }}>
                  {tool.usage}
                </p>

                {tool.limit && (
                  <p className="font-mono" style={{ fontSize: ".6rem", color: "var(--text-faint)", letterSpacing: ".02em" }}>
                    <span style={{ color: v.comment }}>{"// "}</span>{tool.limit}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="mb-10" style={{ height: 1, background: "linear-gradient(to right, transparent, var(--border), transparent)" }} />

      {/* "Built with Claude" callout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 rounded-2xl border p-6"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            aria-hidden="true"
          >
            ⚡
          </div>
          <div>
            <div className="font-bold mb-1" style={{ color: "var(--text)" }}>
              {t.vibeSection.builtWith}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {t.vibeSection.builtDetail}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Workflow cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {t.vibeSection.skills.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border p-5"
            style={{
              borderColor: "var(--border)",
              background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))",
            }}
          >
            <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "var(--text-faint)" }}>
              {item.label}
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
