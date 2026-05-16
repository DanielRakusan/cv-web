"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/hooks/useLanguage";
import { useTerminal } from "@/hooks/useTerminal";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { siteConfig } from "@/config/site";
import { fetchProjectReadme, fetchProjectTree } from "@/lib/terminal-api";
import type { BackendProject } from "@/hooks/useTerminal";

// ── ANSI parser ───────────────────────────────────────────────────────────────

function parseAnsi(raw: string) {
  // Normalize line endings from PTY (\r\n → \n, lone \r → nothing)
  const text = raw.replace(/\r\n/g, "\n").replace(/\r/g, "");

  const segments: { text: string; color?: string; bold?: boolean }[] = [];
  // Match ANY CSI escape sequence: \x1b[ ... <letter>
  const ansiRegex = /\x1b\[([^A-Za-z]*)([A-Za-z])/g;
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
    if (match.index > lastIndex)
      segments.push({ text: text.slice(lastIndex, match.index), color: currentColor, bold: currentBold });
    if (match[2] === "m") {
      // SGR — apply colors/bold
      const codes = match[1].split(";");
      for (const code of codes) {
        if (code === "0" || code === "") { currentColor = undefined; currentBold = false; }
        else if (code === "1") { currentBold = true; }
        else if (ansiColors[code]) { currentColor = ansiColors[code]; }
      }
    }
    // Non-SGR sequences (cursor move, clear screen, etc.) — skip silently
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length)
    segments.push({ text: text.slice(lastIndex), color: currentColor, bold: currentBold });
  return segments;
}

function TerminalLine({ type, text }: { type: string; text: string }) {
  const segments = parseAnsi(text);
  const baseColor =
    type === "stderr" ? "#f87171" :
    type === "system" ? "rgba(255,255,255,0.35)" :
    type === "input" ? "#60a5fa" :
    "rgba(255,255,255,0.85)";
  return (
    <div className="font-mono" style={{ fontSize: "0.72rem", lineHeight: 1.55, whiteSpace: "pre", minWidth: 0 }}>
      {segments.map((seg, i) => (
        <span key={i} style={{ color: seg.color ?? baseColor, fontWeight: seg.bold ? 700 : undefined }}>
          {seg.text}
        </span>
      ))}
    </div>
  );
}

// ── File tree ─────────────────────────────────────────────────────────────────

type TreeNode = { name: string; type: "blob" | "tree"; children?: TreeNode[] };

function buildTree(items: { path: string; type: string }[]): TreeNode[] {
  const root: TreeNode[] = [];
  for (const item of items) {
    const parts = item.path.split("/");
    let nodes = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      let node = nodes.find((n) => n.name === part);
      if (!node) {
        node = { name: part, type: i === parts.length - 1 ? (item.type as "blob" | "tree") : "tree", children: [] };
        nodes.push(node);
      }
      nodes = node.children!;
    }
  }
  return root;
}

function FileNode({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(depth < 1);
  const isDir = node.type === "tree";
  return (
    <div>
      <button
        type="button"
        onClick={() => isDir && setOpen(!open)}
        className="flex items-center gap-1.5 w-full text-left hover:bg-white/5 rounded px-1 py-0.5 transition-colors"
        style={{ paddingLeft: `${depth * 14 + 4}px` }}
      >
        <span style={{ fontSize: ".7rem", color: isDir ? "#fbbf24" : "rgba(255,255,255,0.4)", flexShrink: 0 }}>
          {isDir ? (open ? "▾" : "▸") : "·"}
        </span>
        <span className="font-mono truncate" style={{
          fontSize: ".72rem",
          color: isDir ? "#e2e8f0" : "rgba(255,255,255,0.65)",
        }}>
          {node.name}
        </span>
      </button>
      {isDir && open && node.children?.map((child) => (
        <FileNode key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

function FileTree({ items }: { items: { path: string; type: string }[] }) {
  const tree = buildTree(items);
  if (!tree.length) return <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Žádné soubory</p>;
  return (
    <div className="overflow-y-auto" style={{ maxHeight: 240 }}>
      {tree.map((node) => <FileNode key={node.name} node={node} depth={0} />)}
    </div>
  );
}

// ── README renderer ───────────────────────────────────────────────────────────

const README_LANG_MAP: Record<string, "cz" | "en"> = {
  "readme.md": "cz",
  "readme.en.md": "en",
};

function ReadmeView({ content, onLangSwitch }: { content: string; onLangSwitch: (lang: "cz" | "en") => void }) {
  return (
    <div
      className="overflow-y-auto prose prose-invert prose-sm max-w-none"
      style={{
        maxHeight: 280,
        padding: "1rem",
        fontSize: ".82rem",
        lineHeight: 1.7,
        color: "rgba(255,255,255,0.75)",
      }}
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1 style={{ color: "#22d3ee", fontSize: "1rem", fontWeight: 700, marginBottom: ".5rem" }}>{children}</h1>,
          h2: ({ children }) => <h2 style={{ color: "#4ade80", fontSize: ".9rem", fontWeight: 700, marginBottom: ".4rem", marginTop: "1rem" }}>{children}</h2>,
          h3: ({ children }) => <h3 style={{ color: "rgba(255,255,255,0.85)", fontSize: ".82rem", fontWeight: 600, marginTop: ".8rem" }}>{children}</h3>,
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            return isBlock
              ? <code className={className} style={{ display: "block", background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: ".4rem .6rem", fontSize: ".75rem", color: "#a78bfa", overflowX: "auto" }}>{children}</code>
              : <code style={{ background: "rgba(255,255,255,0.08)", borderRadius: 3, padding: "1px 5px", fontSize: ".78rem", color: "#22d3ee" }}>{children}</code>;
          },
          a: ({ href, children }) => {
            const targetLang = href ? README_LANG_MAP[href.toLowerCase()] : undefined;
            if (targetLang) {
              return (
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onLangSwitch(targetLang); }}
                  style={{ color: "#60a5fa", textDecoration: "underline", cursor: "pointer" }}
                >
                  {children}
                </a>
              );
            }
            return <a href={href} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", textDecoration: "underline" }}>{children}</a>;
          },
          ul: ({ children }) => <ul style={{ paddingLeft: "1.2rem", margin: ".3rem 0" }}>{children}</ul>,
          li: ({ children }) => <li style={{ marginBottom: ".2rem" }}>{children}</li>,
          p: ({ children }) => <p style={{ margin: ".4rem 0" }}>{children}</p>,
          hr: () => <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: ".8rem 0" }} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project, selected, disabled, onClick,
}: {
  project: BackendProject; selected: boolean; disabled: boolean; onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-left rounded-xl border p-4 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
      style={{
        borderColor: selected ? "rgba(34,211,238,.5)" : "rgba(255,255,255,0.08)",
        background: selected ? "rgba(34,211,238,.07)" : "rgba(255,255,255,0.03)",
        minWidth: 180, maxWidth: 220,
      }}
      onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; }}
      onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      <p className="font-mono font-bold text-sm truncate" style={{ color: selected ? "#22d3ee" : "rgba(255,255,255,0.85)" }}>
        {project.name}
      </p>
      <p className="font-mono mt-1 line-clamp-2" style={{ fontSize: ".65rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
        {project.description}
      </p>
    </button>
  );
}

// ── Waking indicator ──────────────────────────────────────────────────────────

function WakingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "rgba(34,211,238,.3)", borderTopColor: "#22d3ee" }} />
      <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Probouzím backend…</p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function Terminal() {
  const t = useContent();
  const { lang, setLang } = useLanguage();
  const { status, outputText, running, selectedProject, wakeBackend, runProject, sendInput, stopProcess, clearLines, backendProjects } = useTerminal();

  const [liveInput, setLiveInput] = useState("");
  const [activeTab, setActiveTab] = useState<"readme" | "files">("readme");
  const [readme, setReadme] = useState<string | null>(null);
  const [tree, setTree] = useState<{ path: string; type: string }[]>([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const hasPinged = useRef(false);
  const startTimeRef = useRef<number | null>(null);

  // Detect mobile viewport
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Wake backend when section enters viewport
  const onSectionVisible = useCallback(() => {
    if (!hasPinged.current && siteConfig.renderApiUrl) {
      hasPinged.current = true;
      wakeBackend();
    }
  }, [wakeBackend]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onSectionVisible(); },
      { threshold: 0.1 }
    );
    const section = document.getElementById("projekty");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [onSectionVisible]);

  // Auto-scroll terminal output
  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [outputText]);

  // Focus hidden input when program starts — triggers mobile keyboard
  useEffect(() => {
    if (running) {
      setLiveInput("");
      startTimeRef.current = Date.now();
      setElapsed(0);
      setTimeout(() => mobileInputRef.current?.focus(), 100);
    } else {
      startTimeRef.current = null;
    }
  }, [running]);

  // Live session timer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (startTimeRef.current) setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const [pendingProject, setPendingProject] = useState<BackendProject | null>(null);

  // Karta: jen vybere projekt a načte info, nespustí ho
  const handleSelectProject = useCallback(async (project: BackendProject) => {
    if (running) return;
    setPendingProject(project);
    setLoadingInfo(true);
    setReadme(null);
    setTree([]);
    const [rm, tr] = await Promise.all([
      fetchProjectReadme(project.id, lang),
      fetchProjectTree(project.id),
    ]);
    setReadme(rm);
    setTree(tr);
    setLoadingInfo(false);
  }, [running, lang]);

  // Při přepnutí jazyka znovu načti README pro aktuálně vybraný projekt
  useEffect(() => {
    if (!pendingProject || running) return;
    fetchProjectReadme(pendingProject.id, lang).then(setReadme);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tlačítko Start: skutečně spustí
  const handleStart = useCallback(() => {
    const project = pendingProject;
    if (!project) return;
    clearLines();
    runProject(project);
  }, [pendingProject, clearLines, runProject]);

  function handleMobileInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendInput(liveInput + "\n");
      setLiveInput("");
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      sendInput("\x03");
    }
  }

  function focusInput() {
    if (running) mobileInputRef.current?.focus();
  }

  const backendConfigured = !!siteConfig.renderApiUrl;
  const hasProjects = backendProjects.length > 0;
const activeProject = pendingProject;
  const hasOutput = outputText.length > 0;

  return (
    <SectionWrapper id="projekty">
      <SectionHeader keyword={`// ${t.terminal.sectionLabel.toLowerCase()}`} heading={t.terminal.heading} />
      <p className="mb-8 text-sm leading-relaxed" style={{ color: "var(--sub)" }}>
        {t.terminal.description}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-3"
      >
        {/* ── Project selector (cards + inline info panel) ── */}
        {backendConfigured && (
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--b1)", background: "var(--s1)" }}>
            <div className="p-4">
              <p className="font-mono mb-3" style={{ fontSize: ".65rem", color: "var(--dim)", letterSpacing: ".08em" }}>
                // ZVOL PROJEKT A SPUSŤ UKÁZKU
              </p>

              {status === "idle" || (status === "waking" && !hasProjects) ? (
                <WakingIndicator />
              ) : status === "error" ? (
                <div className="flex items-center gap-3">
                  <span style={{ color: "#f87171", fontSize: ".82rem" }}>⚠ Backend nedostupný.</span>
                  <button type="button" onClick={() => wakeBackend()} className="font-mono text-xs px-3 py-1 rounded border" style={{ borderColor: "rgba(248,113,113,.3)", color: "#f87171" }}>
                    Zkusit znovu
                  </button>
                </div>
              ) : !hasProjects ? (
                <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {t.terminal.noProjects}
                </p>
              ) : (
                <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {backendProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      selected={activeProject?.id === project.id}
                      disabled={running}
                      onClick={() => handleSelectProject(project)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Inline info panel — fixed height, no AnimatePresence, no page jump */}
            {activeProject && (
              <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {/* Tab bar */}
                <div
                  className="flex items-center gap-1 px-4 border-b"
                  style={{ height: 38, background: "rgba(0,0,0,.25)", borderColor: "rgba(255,255,255,0.05)" }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab("readme")}
                    className="font-mono px-3 py-1 rounded text-xs transition-colors"
                    style={{
                      color: activeTab === "readme" ? "#22d3ee" : "rgba(255,255,255,0.4)",
                      background: activeTab === "readme" ? "rgba(34,211,238,.08)" : "transparent",
                    }}
                  >
                    README.md
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("files")}
                    className="font-mono px-3 py-1 rounded text-xs transition-colors"
                    style={{
                      color: activeTab === "files" ? "#22d3ee" : "rgba(255,255,255,0.4)",
                      background: activeTab === "files" ? "rgba(34,211,238,.08)" : "transparent",
                    }}
                  >
                    Soubory
                  </button>
                </div>

                {/* Fixed-height content area */}
                <div style={{ height: 260, overflow: "hidden", background: "#0e0e16" }}>
                  {loadingInfo ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "rgba(34,211,238,.3)", borderTopColor: "#22d3ee" }} />
                    </div>
                  ) : activeTab === "readme" ? (
                    readme ? (
                      <ReadmeView content={readme} onLangSwitch={setLang} />
                    ) : (
                      <p className="font-mono text-xs p-4" style={{ color: "rgba(255,255,255,0.3)" }}>README nenalezeno.</p>
                    )
                  ) : (
                    <div className="p-3 h-full overflow-y-auto">
                      <FileTree items={tree} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Terminal window ── */}
        <div
          ref={terminalRef}
          className="rounded-2xl overflow-hidden border outline-none flex flex-col"
          style={{
            borderColor: "var(--b1)",
            background: "#1a1a1a",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            ...(isMobile && running ? {
              position: "fixed" as const,
              inset: 0,
              zIndex: 100,
              borderRadius: 0,
              border: "none",
            } : {}),
          }}
          onClick={focusInput}
        >
          {/* macOS titlebar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b flex-shrink-0" style={{ background: "#252525", borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                aria-label="Stop"
                className="w-3 h-3 rounded-full hover:opacity-80"
                style={{ background: "#ff5f57" }}
                onClick={(e) => { e.stopPropagation(); stopProcess(); }}
              />
              <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
            </div>

            <div className="flex-1 text-center font-mono font-semibold truncate" style={{ fontSize: ".68rem", color: "rgba(255,255,255,0.45)" }}>
              {selectedProject ? `python — ${selectedProject.name}` : t.terminal.titleBar}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Start / Stop buttons live here */}
              {activeProject && !running && (
                <div style={{ position: "relative", borderRadius: 6, padding: 2, overflow: "hidden", flexShrink: 0 }}>
                  <div style={{
                    position: "absolute",
                    width: "200%",
                    height: "200%",
                    top: "-50%",
                    left: "-50%",
                    background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.85) 8%, rgba(34,211,238,0.5) 16%, transparent 24%)",
                    animation: "border-run 2.5s linear infinite",
                  }} />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleStart(); }}
                    className="font-mono font-bold transition-all duration-150"
                    style={{ position: "relative", background: "var(--cyan)", color: "#02020a", fontSize: ".63rem", letterSpacing: ".04em", padding: "2px 10px", borderRadius: 4 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#67e8f9")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--cyan)")}
                  >
                    ▶ {t.terminal.run}
                  </button>
                </div>
              )}
              {running && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); stopProcess(); }}
                  className="font-mono font-bold transition-all duration-150"
                  style={{ background: "rgba(248,113,113,.12)", color: "#f87171", border: "1px solid rgba(248,113,113,.3)", fontSize: ".63rem", padding: "2px 8px", borderRadius: 4 }}
                >
                  ■ {t.terminal.stop}
                </button>
              )}
              {running && elapsed > 0 && (
                <span className="font-mono" style={{ color: "#fbbf24", fontSize: ".65rem", letterSpacing: ".03em" }}>
                  {Math.floor(elapsed / 60).toString().padStart(2, "0")}:{(elapsed % 60).toString().padStart(2, "0")}
                </span>
              )}
              <span className="flex items-center gap-1.5" style={{
                color: status === "ready" ? "#4ade80" : status === "waking" ? "#fbbf24" : status === "error" ? "#f87171" : "rgba(255,255,255,0.35)",
              }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "currentColor", animation: status === "waking" ? "pulse 1s ease-in-out infinite" : "none" }} />
                <span className="hidden sm:inline font-mono" style={{ fontSize: ".63rem" }}>
                  {status === "ready" ? t.terminal.ready : status === "waking" ? t.terminal.waking : status === "error" ? t.terminal.error : "—"}
                </span>
              </span>
            </div>
          </div>

          {/* Toolbar — clear after done */}
          {!running && hasOutput && (
            <div className="flex items-center gap-2 px-4 py-2 border-b flex-shrink-0" style={{ background: "#1e1e1e", borderColor: "rgba(255,255,255,0.05)" }}>
              <button type="button" onClick={clearLines} className="font-mono text-xs px-3 py-1 rounded border transition-all" style={{ borderColor: "rgba(255,255,255,.08)", background: "transparent", color: "rgba(255,255,255,.35)" }}>
                {t.terminal.clear}
              </button>
            </div>
          )}

          {/* Output + live input */}
          <div
            ref={outputRef}
            className="overflow-y-auto overflow-x-auto p-4"
            style={{
              background: "#1a1a1a",
              cursor: running ? "text" : "default",
              ...(isMobile && running ? { flex: 1 } : { height: "22rem" }),
            }}
          >
            {!backendConfigured && (
              <p className="font-mono text-xs py-12 text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                {t.terminal.notConfigured}
              </p>
            )}
            {backendConfigured && !hasOutput && !running && (
              <p className="font-mono text-xs py-12 text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
                {hasProjects ? t.terminal.selectHint : t.terminal.noProjects}
              </p>
            )}
            {hasOutput && (
              <pre style={{ margin: 0, fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: "0.72rem", lineHeight: 1.55, whiteSpace: "pre", color: "rgba(255,255,255,0.85)" }}>
                {parseAnsi(outputText).map((seg, i) => (
                  <span key={i} style={{ color: seg.color, fontWeight: seg.bold ? 700 : undefined }}>
                    {seg.text}
                  </span>
                ))}
              </pre>
            )}
            {running && (
              <div style={{ display: "flex", fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: "0.72rem", lineHeight: 1.55, whiteSpace: "pre" }}>
                <span style={{ color: "#60a5fa", flexShrink: 0 }}>{"› "}</span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{liveInput}</span>
                <span style={{ display: "inline-block", width: "0.55em", height: "1.1em", background: "rgba(255,255,255,0.75)", verticalAlign: "text-bottom", animation: "cursor-blink 1s step-end infinite" }} />
              </div>
            )}
          </div>

          {/* Hidden input — triggers mobile keyboard */}
          {running && (
            <input
              ref={mobileInputRef}
              type="text"
              inputMode="text"
              value={liveInput}
              onChange={(e) => setLiveInput(e.target.value)}
              onKeyDown={handleMobileInputKey}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-hidden="true"
              style={{ position: "fixed", top: -200, left: -200, width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
            />
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
