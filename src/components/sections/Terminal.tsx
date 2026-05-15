"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { useTerminal } from "@/hooks/useTerminal";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { terminalProjects, siteConfig } from "@/config/site";

// Parsuje ANSI escape sekvence na CSS barvy
function parseAnsi(text: string): { segments: { text: string; color?: string; bold?: boolean }[] } {
  const segments: { text: string; color?: string; bold?: boolean }[] = [];
  const ansiRegex = /\x1b\[([0-9;]*)m/g;
  let lastIndex = 0;
  let currentColor: string | undefined;
  let currentBold = false;

  const ansiColors: Record<string, string> = {
    "30": "#555", "31": "#f87171", "32": "#4ade80", "33": "#fbbf24",
    "34": "#60a5fa", "35": "#c084fc", "36": "#22d3ee", "37": "#e5e7eb",
    "90": "#6b7280", "91": "#f87171", "92": "#4ade80", "93": "#fbbf24",
    "94": "#60a5fa", "95": "#c084fc", "96": "#22d3ee", "97": "#ffffff",
  };

  let match: RegExpExecArray | null;
  while ((match = ansiRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), color: currentColor, bold: currentBold });
    }
    const codes = match[1].split(";");
    for (const code of codes) {
      if (code === "0" || code === "") { currentColor = undefined; currentBold = false; }
      else if (code === "1") { currentBold = true; }
      else if (ansiColors[code]) { currentColor = ansiColors[code]; }
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), color: currentColor, bold: currentBold });
  }

  return { segments };
}

function TerminalLine({ type, text }: { type: string; text: string }) {
  const { segments } = parseAnsi(text);
  const baseColor =
    type === "stderr" ? "#f87171" :
    type === "system" ? "rgba(255,255,255,0.35)" :
    type === "input" ? "#60a5fa" :
    "rgba(255,255,255,0.85)";

  return (
    <div className="font-mono text-sm leading-relaxed whitespace-pre-wrap break-all">
      {segments.map((seg, i) => (
        <span
          key={i}
          style={{
            color: seg.color ?? baseColor,
            fontWeight: seg.bold ? 700 : undefined,
          }}
        >
          {seg.text}
        </span>
      ))}
    </div>
  );
}

function WakingIndicator({ message, detail }: { message: string; detail: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(59,130,246,0.4)", borderTopColor: "var(--accent)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontSize: 10, color: "var(--accent)" }}>PY</span>
        </div>
      </div>
      <div>
        <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>{message}</p>
        <p className="text-xs mt-1.5 max-w-xs" style={{ color: "var(--text-muted)" }}>{detail}</p>
      </div>
    </div>
  );
}

export function Terminal() {
  const t = useContent();
  const {
    status,
    lines,
    running,
    selectedProject,
    wakeBackend,
    runProject,
    sendInput,
    stopProcess,
    clearLines,
  } = useTerminal();

  const [inputValue, setInputValue] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasPinged = useRef(false);

  // Probuď backend při vstupu do viewportu
  const onSectionVisible = useCallback(() => {
    if (!hasPinged.current && siteConfig.renderApiUrl) {
      hasPinged.current = true;
      wakeBackend();
    }
  }, [wakeBackend]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onSectionVisible(); },
      { threshold: 0.15 }
    );
    const section = document.getElementById("projekty");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [onSectionVisible]);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  function handleInputSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendInput(inputValue);
    setInputValue("");
  }

  const hasProjects = terminalProjects.length > 0;
  const backendConfigured = !!siteConfig.renderApiUrl;

  return (
    <SectionWrapper id="projekty">
      <SectionHeader label={t.terminal.sectionLabel} heading={t.terminal.heading} />

      <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {t.terminal.description}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl overflow-hidden border"
        style={{
          borderColor: "var(--border)",
          background: "#1a1a1a",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* macOS titlebar */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{
            background: "#252525",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Close"
              className="w-3 h-3 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "#ff5f57" }}
              onClick={stopProcess}
            />
            <button
              type="button"
              aria-label="Minimize"
              className="w-3 h-3 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "#ffbd2e" }}
            />
            <button
              type="button"
              aria-label="Maximize"
              className="w-3 h-3 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "#28c840" }}
            />
          </div>

          {/* Titulek */}
          <div
            className="flex-1 text-center text-xs font-semibold"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {selectedProject ? `python — ${selectedProject.name}` : t.terminal.titleBar}
          </div>

          {/* Status badge */}
          <div
            className="flex items-center gap-1.5 text-xs font-semibold"
            style={{
              color:
                status === "ready" ? "#4ade80" :
                status === "waking" ? "#fbbf24" :
                status === "error" ? "#f87171" :
                "rgba(255,255,255,0.35)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "currentColor",
                animation: status === "waking" ? "pulse 1s ease-in-out infinite" : "none",
              }}
            />
            <span className="hidden sm:inline">
              {status === "ready" ? t.terminal.ready :
               status === "waking" ? t.terminal.waking :
               status === "error" ? t.terminal.error :
               "—"}
            </span>
          </div>
        </div>

        {/* Toolbar */}
        {(backendConfigured && hasProjects) && (
          <div
            className="flex items-center gap-2 px-4 py-2.5 border-b flex-wrap"
            style={{
              background: "#1e1e1e",
              borderColor: "rgba(255,255,255,0.05)",
            }}
          >
            <span className="text-xs mr-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t.terminal.selectProject}:
            </span>
            {terminalProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                disabled={running || status !== "ready"}
                onClick={() => runProject(project)}
                className="px-3 py-1 rounded text-xs font-semibold border transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  borderColor: selectedProject?.id === project.id ? "var(--accent-border)" : "rgba(255,255,255,0.1)",
                  background: selectedProject?.id === project.id ? "var(--accent-glow)" : "rgba(255,255,255,0.04)",
                  color: selectedProject?.id === project.id ? "var(--accent)" : "rgba(255,255,255,0.6)",
                }}
              >
                {project.name}
              </button>
            ))}

            {running && (
              <button
                type="button"
                onClick={stopProcess}
                className="ml-auto px-3 py-1 rounded text-xs font-semibold border transition-all duration-150"
                style={{
                  borderColor: "rgba(248,113,113,0.3)",
                  background: "rgba(248,113,113,0.08)",
                  color: "#f87171",
                }}
              >
                {t.terminal.stop}
              </button>
            )}

            {lines.length > 0 && !running && (
              <button
                type="button"
                onClick={clearLines}
                className="ml-auto px-3 py-1 rounded text-xs font-semibold border transition-all duration-150"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {t.terminal.clear}
              </button>
            )}
          </div>
        )}

        {/* Output area */}
        <div
          ref={outputRef}
          className="overflow-y-auto p-4 space-y-1"
          style={{
            minHeight: 300,
            maxHeight: 420,
            background: "#1a1a1a",
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Stav: backend není nakonfigurován */}
          {!backendConfigured && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <span className="text-3xl">🚧</span>
              <p className="font-semibold text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                Backend není ještě nakonfigurován.
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Nastav <code className="font-mono px-1 rounded" style={{ background: "rgba(255,255,255,0.08)" }}>NEXT_PUBLIC_RENDER_API_URL</code> a přidej projekty v <code className="font-mono px-1 rounded" style={{ background: "rgba(255,255,255,0.08)" }}>src/config/site.ts</code>
              </p>
            </div>
          )}

          {/* Stav: probouzení */}
          {backendConfigured && status === "waking" && lines.length === 0 && (
            <WakingIndicator message={t.terminal.waking} detail={t.terminal.wakingDetail} />
          )}

          {/* Stav: error */}
          {backendConfigured && status === "error" && lines.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <span style={{ color: "#f87171", fontSize: "1.5rem" }}>⚠</span>
              <p className="font-semibold text-sm" style={{ color: "#f87171" }}>{t.terminal.error}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.terminal.errorDetail}</p>
              <button
                type="button"
                onClick={() => wakeBackend()}
                className="mt-2 px-4 py-2 rounded text-xs font-semibold border transition-all duration-150"
                style={{
                  borderColor: "rgba(248,113,113,0.3)",
                  background: "rgba(248,113,113,0.06)",
                  color: "#f87171",
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Stav: ready, žádné projekty */}
          {backendConfigured && status === "ready" && !hasProjects && lines.length === 0 && (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>{t.terminal.noProjects}</p>
            </div>
          )}

          {/* Output lines */}
          {lines.map((line) => (
            <TerminalLine key={line.id} type={line.type} text={line.text} />
          ))}

          {/* Blikající kurzor */}
          {running && (
            <div className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span className="cursor-blink">▌</span>
            </div>
          )}
        </div>

        {/* Input */}
        {backendConfigured && status === "ready" && running && (
          <form
            onSubmit={handleInputSubmit}
            className="flex items-center gap-2 px-4 py-3 border-t"
            style={{
              background: "#1e1e1e",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <span className="font-mono text-sm" style={{ color: "#60a5fa", flexShrink: 0 }}>›</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.terminal.inputPlaceholder}
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent outline-none font-mono text-sm"
              style={{ color: "rgba(255,255,255,0.85)", caretColor: "#60a5fa" }}
            />
            <button
              type="submit"
              className="text-xs px-3 py-1.5 rounded border font-semibold transition-all duration-150"
              style={{
                borderColor: "var(--accent-border)",
                background: "var(--accent-glow)",
                color: "var(--accent)",
              }}
            >
              ↵
            </button>
          </form>
        )}
      </motion.div>
    </SectionWrapper>
  );
}
