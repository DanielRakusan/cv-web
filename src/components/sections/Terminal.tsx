"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useContent } from "@/hooks/useContent";
import { useLanguage } from "@/hooks/useLanguage";
import { useTerminal } from "@/hooks/useTerminal";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { siteConfig } from "@/config/site";
import { fetchProjectReadme, fetchProjectTree, fetchFileContent } from "@/lib/terminal-api";
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

function FileNode({ node, depth, path, onFileClick, activeFile }: {
  node: TreeNode; depth: number; path: string;
  onFileClick: (path: string) => void;
  activeFile: string | null;
}) {
  const [open, setOpen] = useState(depth < 1);
  const isDir = node.type === "tree";
  const fullPath = path ? `${path}/${node.name}` : node.name;
  const isActive = !isDir && fullPath === activeFile;
  return (
    <div>
      <button
        type="button"
        onClick={() => isDir ? setOpen(!open) : onFileClick(fullPath)}
        className="flex items-center gap-1.5 w-full text-left rounded px-1 py-0.5 transition-colors"
        style={{
          paddingLeft: `${depth * 14 + 4}px`,
          background: isActive ? "rgba(34,211,238,.12)" : undefined,
        }}
        onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
        onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = ""; }}
      >
        <span style={{ fontSize: ".7rem", color: isDir ? "#fbbf24" : isActive ? "#22d3ee" : "rgba(255,255,255,0.4)", flexShrink: 0 }}>
          {isDir ? (open ? "▾" : "▸") : "·"}
        </span>
        <span className="font-mono truncate" style={{
          fontSize: ".72rem",
          color: isDir ? "#e2e8f0" : isActive ? "#22d3ee" : "rgba(255,255,255,0.65)",
        }}>
          {node.name}
        </span>
      </button>
      {isDir && open && node.children?.map((child) => (
        <FileNode key={child.name} node={child} depth={depth + 1} path={fullPath} onFileClick={onFileClick} activeFile={activeFile} />
      ))}
    </div>
  );
}

function FileTree({ items, noFilesLabel, onFileClick, activeFile }: {
  items: { path: string; type: string }[];
  noFilesLabel: string;
  onFileClick: (path: string) => void;
  activeFile: string | null;
}) {
  const tree = buildTree(items);
  if (!tree.length) return <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{noFilesLabel}</p>;
  return (
    <div className="overflow-y-auto h-full">
      {tree.map((node) => <FileNode key={node.name} node={node} depth={0} path="" onFileClick={onFileClick} activeFile={activeFile} />)}
    </div>
  );
}

// ── README renderer ───────────────────────────────────────────────────────────

const README_LANG_MAP: Record<string, "cz" | "en"> = {
  "readme.md": "cz",
  "readme.en.md": "en",
};

// ── Lightweight markdown parser — nahrazuje react-markdown (~50 KB) ──────────

function parseInline(text: string, onLangSwitch: (lang: "cz" | "en") => void): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[2])      parts.push(<strong key={m.index}>{m[2]}</strong>);
    else if (m[3]) parts.push(<em key={m.index}>{m[3]}</em>);
    else if (m[4]) parts.push(<code key={m.index} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 3, padding: "1px 5px", fontSize: ".78rem", color: "#22d3ee" }}>{m[4]}</code>);
    else if (m[5] && m[6]) {
      const targetLang = README_LANG_MAP[m[6].toLowerCase()];
      // Sanitize href — only allow https://, http://, mailto:, # (prevent javascript: URLs)
      const rawHref = m[6];
      const safeHref = /^(https?:\/\/|mailto:|#)/i.test(rawHref) ? rawHref : "#";
      parts.push(targetLang
        ? <a key={m.index} href="#" onClick={(e) => { e.preventDefault(); onLangSwitch(targetLang); }} style={{ color: "#60a5fa", textDecoration: "underline", cursor: "pointer" }}>{m[5]}</a>
        : <a key={m.index} href={safeHref} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", textDecoration: "underline" }}>{m[5]}</a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

function SimpleMarkdown({ content, onLangSwitch }: { content: string; onLangSwitch: (lang: "cz" | "en") => void }) {
  const nodes: React.ReactNode[] = [];
  const lines = content.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      let code = ""; i++;
      while (i < lines.length && !lines[i].startsWith("```")) { code += lines[i] + "\n"; i++; }
      nodes.push(<code key={i} style={{ display: "block", background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: ".4rem .6rem", fontSize: ".75rem", color: "#a78bfa", overflowX: "auto", whiteSpace: "pre", marginBottom: ".4rem" }}>{code}</code>);
      i++; continue;
    }
    if (line.startsWith("### ")) { nodes.push(<h3 key={i} style={{ color: "rgba(255,255,255,0.85)", fontSize: ".82rem", fontWeight: 600, marginTop: ".8rem" }}>{parseInline(line.slice(4), onLangSwitch)}</h3>); i++; continue; }
    if (line.startsWith("## "))  { nodes.push(<h2 key={i} style={{ color: "#4ade80", fontSize: ".9rem", fontWeight: 700, marginBottom: ".4rem", marginTop: "1rem" }}>{parseInline(line.slice(3), onLangSwitch)}</h2>); i++; continue; }
    if (line.startsWith("# "))   { nodes.push(<h1 key={i} style={{ color: "#22d3ee", fontSize: "1rem", fontWeight: 700, marginBottom: ".5rem" }}>{parseInline(line.slice(2), onLangSwitch)}</h1>); i++; continue; }
    if (/^-{3,}$/.test(line))    { nodes.push(<hr key={i} style={{ borderColor: "rgba(255,255,255,0.1)", margin: ".8rem 0" }} />); i++; continue; }
    if (/^[-*] /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) { items.push(<li key={i} style={{ marginBottom: ".2rem" }}>{parseInline(lines[i].slice(2), onLangSwitch)}</li>); i++; }
      nodes.push(<ul key={`ul${i}`} style={{ paddingLeft: "1.2rem", margin: ".3rem 0" }}>{items}</ul>); continue;
    }
    if (line.trim() === "") { i++; continue; }
    nodes.push(<p key={i} style={{ margin: ".4rem 0" }}>{parseInline(line, onLangSwitch)}</p>);
    i++;
  }
  return <>{nodes}</>;
}

function ReadmeView({ content, onLangSwitch }: { content: string; onLangSwitch: (lang: "cz" | "en") => void }) {
  return (
    <div className="overflow-y-auto h-full" style={{ padding: "1.25rem 1.5rem", fontSize: ".82rem", lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
      <SimpleMarkdown content={content} onLangSwitch={onLangSwitch} />
    </div>
  );
}

// ── Code viewer ───────────────────────────────────────────────────────────────

const PY_KW = new Set([
  "def","class","import","from","return","if","else","elif","for","while","in",
  "not","and","or","True","False","None","try","except","finally","with","as",
  "pass","break","continue","lambda","yield","raise","del","global","nonlocal",
  "assert","async","await","is","self",
]);

type Tok = { t: string; c: string };

function tokenizePyLine(line: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  let buf = "";
  const flush = (c = "rgba(255,255,255,0.82)") => { if (buf) { out.push({ t: buf, c }); buf = ""; } };

  while (i < line.length) {
    const ch = line[i];

    // Comment
    if (ch === "#") { flush(); out.push({ t: line.slice(i), c: "#4ade80" }); break; }

    // Triple-quoted string (inline only — skip multiline edge-case)
    if ((ch === '"' || ch === "'") && line[i + 1] === ch && line[i + 2] === ch) {
      flush();
      const q = ch.repeat(3); let s = q; i += 3;
      const end = line.indexOf(q, i);
      if (end !== -1) { s += line.slice(i, end + 3); i = end + 3; }
      else { s += line.slice(i); i = line.length; }
      out.push({ t: s, c: "#fbbf24" }); continue;
    }

    // Single-quoted string
    if (ch === '"' || ch === "'") {
      flush();
      const q = ch; let s = q; i++;
      while (i < line.length && line[i] !== q && line[i] !== "\n") {
        if (line[i] === "\\") { s += line[i++] || ""; }
        s += line[i++] ?? "";
      }
      s += line[i] ?? ""; i++;
      out.push({ t: s, c: "#fbbf24" }); continue;
    }

    // Identifier / keyword
    if (/[a-zA-Z_]/.test(ch)) {
      flush();
      let w = "";
      while (i < line.length && /\w/.test(line[i])) w += line[i++];
      out.push({ t: w, c: PY_KW.has(w) ? "#a78bfa" : "rgba(255,255,255,0.82)" }); continue;
    }

    // Number
    if (/\d/.test(ch)) {
      flush();
      let n = "";
      while (i < line.length && /[\d.]/.test(line[i])) n += line[i++];
      out.push({ t: n, c: "#22d3ee" }); continue;
    }

    // Decorator (@name)
    if (ch === "@") {
      flush();
      let d = "@"; i++;
      while (i < line.length && /\w/.test(line[i])) d += line[i++];
      out.push({ t: d, c: "#fb923c" }); continue;
    }

    buf += ch; i++;
  }
  flush();
  return out;
}

function CodeView({ content, filename }: { content: string; filename: string }) {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const isPy = ext === "py";
  const lines = content.split("\n");
  const padLen = String(lines.length).length;

  return (
    <div style={{ padding: "0.5rem 0" }}>
      {lines.map((line, idx) => {
        const toks = isPy ? tokenizePyLine(line) : [{ t: line, c: "rgba(255,255,255,0.82)" }];
        return (
          <div key={idx} className="flex" style={{ lineHeight: 1.65, minHeight: "1.65em" }}>
            <span
              style={{
                minWidth: `${padLen + 2}ch`,
                paddingRight: "0.75rem",
                paddingLeft: "0.75rem",
                textAlign: "right",
                color: "rgba(255,255,255,0.18)",
                fontSize: ".63rem",
                fontFamily: "'Fira Code', monospace",
                userSelect: "none",
                flexShrink: 0,
              }}
            >
              {idx + 1}
            </span>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: ".68rem", whiteSpace: "pre", paddingRight: "1rem" }}>
              {toks.length ? toks.map((tok, i) => (
                <span key={i} style={{ color: tok.c }}>{tok.t}</span>
              )) : " "}
            </span>
          </div>
        );
      })}
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

function WakingIndicator({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "rgba(34,211,238,.3)", borderTopColor: "#22d3ee" }} />
      <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
    </div>
  );
}

// ── Terminal-style loading (inside the dark terminal window) ──────────────────

const BRAILLE = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];

function TerminalLoading() {
  const [frame, setFrame] = useState(0);
  const [dots, setDots]   = useState(0);

  useEffect(() => {
    const spin = setInterval(() => setFrame(f => (f + 1) % BRAILLE.length), 80);
    const dot  = setInterval(() => setDots(d => (d + 1) % 4), 420);
    return () => { clearInterval(spin); clearInterval(dot); };
  }, []);

  return (
    <div className="flex flex-col justify-center items-start h-full px-4 py-10 gap-1.5 select-none">
      <div className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
        <span style={{ color: "#4ade80" }}>$ </span>
        <span>python backend</span>
        <span style={{ color: "#fbbf24" }}>.{"·".repeat(dots)}</span>
      </div>
      <div className="font-mono text-xs flex items-center gap-2" style={{ color: "rgba(34,211,238,0.6)" }}>
        <span>{BRAILLE[frame]}</span>
        <span>connecting to render.com</span>
        <span style={{
          display: "inline-block", width: "0.5em", height: "1em",
          background: "rgba(34,211,238,0.5)", verticalAlign: "text-bottom",
          animation: "cursor-blink 1s step-end infinite",
        }} />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function Terminal() {
  const t = useContent();
  const { lang, setLang } = useLanguage();
  const { status, outputText, running, selectedProject, wakeBackend, runProject, sendInput, stopProcess, clearLines, backendProjects } = useTerminal(lang);

  const [liveInput, setLiveInput] = useState("");
  const [activeTab, setActiveTab] = useState<"readme" | "files">("readme");
  const [readme, setReadme] = useState<string | null>(null);
  const [tree, setTree] = useState<{ path: string; type: string }[]>([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openFile, setOpenFile] = useState<{ path: string; content: string } | null>(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [treeCollapsed, setTreeCollapsed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const fileReqRef = useRef(0);
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

  // Modal: scroll lock + Escape
  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

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
    // Re-click na stejný projekt jen otevře modal bez nového načítání
    if (pendingProject?.id === project.id) { setModalOpen(true); return; }
    setPendingProject(project);
    setOpenFile(null);
    setTreeCollapsed(false);
    setActiveTab("readme");
    setModalOpen(true);
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
  }, [running, lang, pendingProject]);

  // Při přepnutí jazyka znovu načti README pro aktuálně vybraný projekt
  useEffect(() => {
    if (!pendingProject || running) return;
    fetchProjectReadme(pendingProject.id, lang).then(setReadme);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Klik na soubor v tree → načte obsah a zobrazí ho
  const handleFileClick = useCallback(async (filePath: string) => {
    if (!pendingProject) return;
    const reqId = ++fileReqRef.current;
    setLoadingFile(true);
    setOpenFile(null);
    setActiveTab("files");
    const { content } = await fetchFileContent(pendingProject.id, filePath);
    if (reqId !== fileReqRef.current) return; // stale request
    setOpenFile(content !== null ? { path: filePath, content } : null);
    setLoadingFile(false);
    setTreeCollapsed(true);
  }, [pendingProject]);

  // Tlačítko Start: skutečně spustí
  const handleStart = useCallback(() => {
    const project = pendingProject;
    if (!project) return;
    clearLines();
    runProject(project);
  }, [pendingProject, clearLines, runProject]);

  // Start z modálu: zavře modal a spustí
  const handleModalStart = useCallback(() => {
    setModalOpen(false);
    const project = pendingProject;
    if (!project) return;
    clearLines();
    runProject(project);
    // Scroll to terminal
    setTimeout(() => terminalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
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

      <div className="flex flex-col gap-3">
        {/* ── Project selector (cards + inline info panel) ── */}
        {backendConfigured && (
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--b1)", background: "var(--s1)" }}>
            <div className="p-4">
              <p className="font-mono mb-3" style={{ fontSize: ".65rem", color: "var(--dim)", letterSpacing: ".08em" }}>
                {t.terminal.projectPrompt}
              </p>

              {status === "idle" || (status === "waking" && !hasProjects) ? (
                <WakingIndicator label={t.terminal.wakingBackend} />
              ) : status === "error" ? (
                <div className="flex items-center gap-3">
                  <span style={{ color: "#f87171", fontSize: ".82rem" }}>{t.terminal.backendUnavailable}</span>
                  <button type="button" onClick={() => wakeBackend()} className="font-mono text-xs px-3 py-1 rounded border" style={{ borderColor: "rgba(248,113,113,.3)", color: "#f87171" }}>
                    {t.terminal.tryAgain}
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
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleStart(); }}
                  className="run-btn font-mono font-bold"
                  style={{ fontSize: ".69rem", letterSpacing: ".04em", padding: "3px 13px", borderRadius: 4 }}
                >
                  ▶ {t.terminal.run}
                </button>
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
              (status === "idle" || (status === "waking" && !hasProjects))
                ? <TerminalLoading />
                : <p className="font-mono text-xs py-12 text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
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
      </div>
      {/* ── Info modal ── */}
      {modalOpen && pendingProject && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0"
            style={{ zIndex: 50, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(5px)" }}
            onClick={() => setModalOpen(false)}
          />

          {/* Modal window */}
          <div
            className="fixed flex flex-col rounded-2xl border overflow-hidden"
            style={{
              zIndex: 51,
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              width: "min(920px, 95vw)",
              height: "min(700px, 88vh)",
              background: "#0d0d15",
              borderColor: "rgba(255,255,255,0.1)",
              boxShadow: "0 32px 96px rgba(0,0,0,0.7), 0 0 0 1px rgba(34,211,238,.06)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 flex-shrink-0 border-b"
              style={{ height: 52, background: "rgba(0,0,0,.35)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button type="button" onClick={() => setModalOpen(false)} aria-label="Zavřít"
                  className="w-3 h-3 rounded-full hover:opacity-75 transition-opacity"
                  style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>

              <span className="font-mono font-bold" style={{ color: "#22d3ee", fontSize: ".85rem" }}>
                {pendingProject.name}
              </span>
              <span className="font-mono flex-1 truncate" style={{ fontSize: ".68rem", color: "rgba(255,255,255,0.3)" }}>
                {pendingProject.description}
              </span>

              {/* Start button */}
              {!running && (
                <button
                  type="button"
                  onClick={handleModalStart}
                  className="run-btn font-mono font-bold flex-shrink-0"
                  style={{ fontSize: ".68rem", letterSpacing: ".04em", padding: "4px 14px", borderRadius: 5 }}
                >
                  ▶ {t.terminal.run}
                </button>
              )}
            </div>

            {/* Tab bar */}
            <div
              className="flex items-center gap-1 px-4 border-b flex-shrink-0"
              style={{ height: 38, background: "rgba(0,0,0,.2)", borderColor: "rgba(255,255,255,0.05)" }}
            >
              {["readme", "files"].map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab as "readme" | "files")}
                  className="font-mono px-3 py-1 rounded text-xs transition-colors"
                  style={{
                    color: activeTab === tab ? "#22d3ee" : "rgba(255,255,255,0.38)",
                    background: activeTab === tab ? "rgba(34,211,238,.08)" : "transparent",
                  }}
                >
                  {tab === "readme" ? "README.md" : t.terminal.filesTab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden" style={{ background: "#0e0e16" }}>
              {loadingInfo ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: "rgba(34,211,238,.3)", borderTopColor: "#22d3ee" }} />
                </div>
              ) : activeTab === "readme" ? (
                readme
                  ? <ReadmeView content={readme} onLangSwitch={setLang} />
                  : <p className="font-mono text-xs p-6" style={{ color: "rgba(255,255,255,0.28)" }}>{t.terminal.readmeNotFound}</p>
              ) : (
                /* Files tab — split: tree vlevo (sbalitelný) | kód vpravo */
                <div className="flex h-full overflow-hidden">

                  {/* Tree panel — sbalitelný */}
                  <div
                    className="flex-shrink-0 border-r flex flex-col"
                    style={{
                      width: treeCollapsed ? 32 : (openFile || loadingFile ? 220 : "100%"),
                      borderColor: "rgba(255,255,255,0.06)",
                      transition: "width .18s ease",
                      overflow: "hidden",
                    }}
                  >
                    {treeCollapsed ? (
                      /* Sbalený stav — klikací pruh */
                      <button
                        type="button"
                        onClick={() => setTreeCollapsed(false)}
                        title="Zobrazit soubory"
                        className="flex-1 flex items-center justify-center hover:bg-white/5 transition-colors"
                        style={{ width: 32 }}
                      >
                        <span
                          className="font-mono select-none"
                          style={{
                            fontSize: ".6rem",
                            color: "rgba(255,255,255,0.3)",
                            writingMode: "vertical-lr",
                            letterSpacing: ".08em",
                          }}
                        >
                          FILES ▸
                        </span>
                      </button>
                    ) : (
                      /* Rozbalený stav */
                      <>
                        {(openFile || loadingFile) && (
                          <div
                            className="flex items-center justify-between flex-shrink-0 border-b px-3 py-1.5"
                            style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(0,0,0,.2)" }}
                          >
                            <span className="font-mono" style={{ fontSize: ".6rem", color: "rgba(255,255,255,0.25)", letterSpacing: ".06em" }}>
                              FILES
                            </span>
                            <button
                              type="button"
                              onClick={() => setTreeCollapsed(true)}
                              title="Skrýt"
                              className="font-mono hover:opacity-60 transition-opacity"
                              style={{ fontSize: ".7rem", color: "rgba(255,255,255,0.28)" }}
                            >
                              ◂
                            </button>
                          </div>
                        )}
                        <div className="overflow-y-auto flex-1 p-3">
                          <FileTree
                            items={tree}
                            noFilesLabel={t.terminal.noFiles}
                            onFileClick={handleFileClick}
                            activeFile={openFile?.path ?? null}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Code panel */}
                  {(openFile || loadingFile) && (
                    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                      {/* Breadcrumb */}
                      <div
                        className="flex items-center justify-between flex-shrink-0 border-b px-4 py-2"
                        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,.2)" }}
                      >
                        <span className="font-mono truncate" style={{ fontSize: ".65rem", color: "rgba(255,255,255,0.38)" }}>
                          {openFile?.path ?? "…"}
                        </span>
                        <button
                          type="button"
                          onClick={() => { setOpenFile(null); setLoadingFile(false); setTreeCollapsed(false); }}
                          className="font-mono ml-3 flex-shrink-0 hover:opacity-60 transition-opacity"
                          style={{ fontSize: ".75rem", color: "rgba(255,255,255,0.28)" }}
                        >
                          ✕
                        </button>
                      </div>
                      <div className="overflow-y-auto overflow-x-auto flex-1">
                        {loadingFile ? (
                          <div className="flex items-center justify-center h-full">
                            <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                              style={{ borderColor: "rgba(34,211,238,.3)", borderTopColor: "#22d3ee" }} />
                          </div>
                        ) : openFile ? (
                          <CodeView content={openFile.content} filename={openFile.path} />
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </SectionWrapper>
  );
}
