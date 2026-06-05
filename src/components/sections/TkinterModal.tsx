"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type GuiMenuItem = {
  id: string;
  kind: string;      // "command" | "separator" | "cascade" | "checkbutton"
  label: string;
  accelerator?: string;
  state?: string;
  submenuId?: string;
};

export type GuiMenu = {
  id: string;
  label: string;
  items: GuiMenuItem[];
};

export type GuiWidget = {
  id: string;
  kind: string;
  parent: string;
  text?: string;
  width?: number;
  height?: number;
  state?: string;
  values?: string[];
  bg?: string;
  fg?: string;
  font?: string;
  relief?: string;
  orient?: string;
  from_?: number;
  to?: number;
  // layout info
  layout?: { method: string; opts: Record<string, unknown> };
  // treeview
  rows?: Array<{ id: string; text: string; values: unknown[] }>;
  headings?: Record<string, string>;
  columns?: string[];
  // scrollbar
  scrollLo?: number;
  scrollHi?: number;
};

export type CanvasItem = {
  itemId: string;
  imageId: string | null;
  x: number;
  y: number;
  anchor: string;
};

export type CanvasCmd = {
  canvasId: string;
  itemId: string;
  cmd: string;
  coords: number[];
  fill?: string;
  outline?: string;
  width?: number;
  text?: string;
  font?: string;
  anchor?: string;
  imageId?: string;
  anchorOffsetX?: number;
  anchorOffsetY?: number;
  dash?: number[] | null;
  arrow?: string;
  smooth?: boolean;
  start?: number;
  extent?: number;
  style?: string;
};

export type FileDialogRequest = {
  id: string;
  mode: "open" | "save" | "directory" | "open_multiple";
  title?: string;
  filetypes?: [string, string][];
  initialdir?: string;
  initialfile?: string;
  defaultextension?: string;
};

export type MessageboxRequest = {
  id: string;
  kind: "info" | "warning" | "error" | "okcancel" | "yesno" | "yesnocancel";
  title?: string;
  message?: string;
};

type Props = {
  widgets: GuiWidget[];
  title?: string;
  menubar?: GuiMenu[];
  onEvent: (widgetId: string, event: string, value?: string) => void;
  onClose: () => void;
  fileDialogRequest: FileDialogRequest | null;
  onFileResponse: (dialogId: string, value: string) => void;
  onFileUpload: (dialogId: string, filename: string, b64: string) => void;
  messageboxRequest: MessageboxRequest | null;
  onMessageboxResponse: (id: string, value: string) => void;
  canvasImages?: Record<string, string>;
  canvasItems?: CanvasItem[];
  canvasCmds?: CanvasCmd[];
};

// ── Tkinter colour helpers ────────────────────────────────────────────────────

// Map common Tkinter colour names to CSS
const TK_COLORS: Record<string, string> = {
  white: "#ffffff", black: "#000000", red: "#ff0000", green: "#008000",
  blue: "#0000ff", yellow: "#ffff00", cyan: "#00ffff", magenta: "#ff00ff",
  orange: "#ffa500", purple: "#800080", gray: "#808080", grey: "#808080",
  "light gray": "#d3d3d3", "light grey": "#d3d3d3",
  "dark gray": "#a9a9a9", "dark grey": "#a9a9a9",
  "system buttonface": "#f0f0f0",
};

function tkColor(color: string | undefined, fallback: string): string {
  if (!color) return fallback;
  return TK_COLORS[color.toLowerCase()] ?? color;
}

// ── Layout helpers ────────────────────────────────────────────────────────────

function getPackStyle(opts: Record<string, unknown>): React.CSSProperties {
  const side = (opts.side as string) || "top";
  const fill = (opts.fill as string) || "none";
  const expand = opts.expand === true || opts.expand === 1 || opts.expand === "1";
  const padx = Number(opts.padx ?? 0);
  const pady = Number(opts.pady ?? 0);
  const ipadx = Number(opts.ipadx ?? 0);
  const ipady = Number(opts.ipady ?? 0);

  const style: React.CSSProperties = {
    margin: `${pady}px ${padx}px`,
    padding: `${ipady}px ${ipadx}px`,
  };

  if (fill === "x" || fill === "both") style.width = "100%";
  if (fill === "y" || fill === "both") style.height = "100%";
  if (expand) style.flex = "1";
  if (side === "left" || side === "right") {
    style.alignSelf = "flex-start";
  }

  return style;
}

// Given a parent widget, compute the flex direction for its children based on
// the first child's pack side (Tkinter pack geometry manager groups all children
// with the same side into the same axis).
function getContainerFlexDir(children: GuiWidget[]): string {
  if (children.length === 0) return "column";
  const first = children.find(c => c.layout?.method === "pack");
  if (!first) return "column";
  const side = (first.layout!.opts.side as string) || "top";
  if (side === "left") return "row";
  if (side === "right") return "row-reverse";
  if (side === "bottom") return "column-reverse";
  return "column";
}

function getGridStyle(opts: Record<string, unknown>): React.CSSProperties {
  const row = Number(opts.row ?? 0) + 1;
  const col = Number(opts.column ?? opts.col ?? 0) + 1;
  const rowspan = Number(opts.rowspan ?? 1);
  const colspan = Number(opts.columnspan ?? 1);
  const sticky = (opts.sticky as string) || "";
  const padx = Number(opts.padx ?? 0);
  const pady = Number(opts.pady ?? 0);

  const style: React.CSSProperties = {
    gridRow: rowspan > 1 ? `${row} / span ${rowspan}` : String(row),
    gridColumn: colspan > 1 ? `${col} / span ${colspan}` : String(col),
    margin: `${pady}px ${padx}px`,
  };

  // sticky → justify/align self
  const stickyStr = sticky.toLowerCase();
  if (stickyStr.includes("e") && stickyStr.includes("w")) {
    style.width = "100%";
  } else if (stickyStr.includes("e")) {
    style.justifySelf = "end";
  } else if (stickyStr.includes("w")) {
    style.justifySelf = "start";
  }
  if (stickyStr.includes("n") && stickyStr.includes("s")) {
    style.height = "100%";
  }

  return style;
}

// ── File Dialog ────────────────────────────────────────────────────────────────

function FileDialogPanel({ req, onResponse, onUpload }: {
  req: FileDialogRequest;
  onResponse: (value: string) => void;
  onUpload: (dialogId: string, filename: string, b64: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = req.filetypes
    ?.flatMap(([, pattern]) =>
      pattern.split(/[\s;]+/)
        .map(p => p.trim())
        .filter(Boolean)
        .map(p => p.replace(/^\*/, ""))
    )
    .filter(ext => ext !== ".*" && ext !== "")
    .join(",") || "";

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onResponse("");
      return;
    }

    const readFile = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const b64 = (reader.result as string).split(",")[1] ?? "";
          resolve(b64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    if (req.mode === "open_multiple") {
      Promise.all(Array.from(files).map(async f => {
        const b64 = await readFile(f);
        onUpload(req.id, f.name, b64);
        return f.name;
      })).then(names => onResponse(names.join("|")));
    } else {
      readFile(files[0]).then(b64 => {
        onUpload(req.id, files[0].name, b64);
      });
    }
  }

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16, background: "#f0f0f0" }}>
      <p style={{ fontFamily: "system-ui", fontSize: 13, color: "#000", margin: 0 }}>
        {req.title || (req.mode === "save" ? "Uložit soubor" : "Otevřít soubor")}
      </p>
      <label
        style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 10, border: "2px dashed #adadad", background: "#fff", minHeight: 100,
          padding: "1.5rem", cursor: "pointer", borderRadius: 2,
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#7a7a7a"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#adadad"; }}
      >
        <span style={{ fontSize: "2rem" }}>📁</span>
        <span style={{ fontFamily: "system-ui", fontSize: 12, color: "#555" }}>
          {req.mode === "save" ? "Vyberte cílový soubor" : "Klikněte pro výběr souboru"}
        </span>
        {accept && (
          <span style={{ fontFamily: "system-ui", fontSize: 11, color: "#888" }}>
            {accept}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple={req.mode === "open_multiple"}
          accept={accept || undefined}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </label>
      <button
        type="button"
        onClick={() => onResponse("")}
        style={{
          fontFamily: "system-ui", fontSize: 13, alignSelf: "flex-end",
          padding: "2px 12px", background: "#e1e1e1", border: "1px solid #adadad",
          borderRadius: 3, cursor: "pointer",
        }}
      >
        Zrušit
      </button>
    </div>
  );
}

// ── Messagebox ────────────────────────────────────────────────────────────────

function MessageboxPanel({ req, onResponse }: {
  req: MessageboxRequest;
  onResponse: (value: string) => void;
}) {
  const iconMap: Record<string, string> = {
    info: "ℹ️", warning: "⚠️", error: "❌", okcancel: "❓", yesno: "❓", yesnocancel: "❓",
  };
  const icon = iconMap[req.kind] || "ℹ️";

  const btnStyle: React.CSSProperties = {
    fontFamily: "system-ui", fontSize: 13,
    padding: "3px 14px", background: "#e1e1e1",
    border: "1px solid #adadad", borderRadius: 3, cursor: "pointer",
    minWidth: 70,
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16, background: "#f0f0f0", fontFamily: "system-ui" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{icon}</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {req.title && (
            <p style={{ fontWeight: 700, fontSize: 13, margin: 0, color: "#000" }}>{req.title}</p>
          )}
          {req.message && (
            <p style={{ fontSize: 13, margin: 0, color: "#222", lineHeight: 1.5 }}>{req.message}</p>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
        {(req.kind === "info" || req.kind === "warning" || req.kind === "error") && (
          <button type="button" onClick={() => onResponse("ok")} style={btnStyle}>OK</button>
        )}
        {req.kind === "okcancel" && (
          <>
            <button type="button" onClick={() => onResponse("cancel")} style={btnStyle}>Zrušit</button>
            <button type="button" onClick={() => onResponse("ok")} style={{ ...btnStyle, fontWeight: 600 }}>OK</button>
          </>
        )}
        {(req.kind === "yesno" || req.kind === "yesnocancel") && (
          <>
            {req.kind === "yesnocancel" && (
              <button type="button" onClick={() => onResponse("cancel")} style={btnStyle}>Zrušit</button>
            )}
            <button type="button" onClick={() => onResponse("no")} style={btnStyle}>Ne</button>
            <button type="button" onClick={() => onResponse("yes")} style={{ ...btnStyle, fontWeight: 600 }}>Ano</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Menubar ───────────────────────────────────────────────────────────────────

function Menubar({ menus, onMenuClick }: {
  menus: GuiMenu[];
  onMenuClick: (itemId: string) => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!openMenu) return;
    const handler = () => setOpenMenu(null);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  return (
    <div
      style={{
        background: "#f0f0f0", borderBottom: "1px solid #d0d0d0",
        display: "flex", padding: "0 4px", fontSize: 13, fontFamily: "system-ui",
        flexShrink: 0,
      }}
      onMouseDown={e => e.stopPropagation()}
    >
      {menus.map(menu => (
        <div key={menu.id} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === menu.id ? null : menu.id)}
            style={{
              background: openMenu === menu.id ? "#0a58ca" : "transparent",
              color: openMenu === menu.id ? "white" : "#000",
              border: "none", padding: "2px 8px", cursor: "pointer",
              fontFamily: "system-ui", fontSize: 13,
            }}
          >
            {menu.label || "Menu"}
          </button>
          {openMenu === menu.id && (
            <div
              style={{
                position: "absolute", top: "100%", left: 0,
                background: "white", border: "1px solid #adadad",
                boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                zIndex: 1000, minWidth: 160,
              }}
            >
              {menu.items.map(item =>
                item.kind === "separator"
                  ? <hr key={item.id} style={{ margin: "2px 0", borderColor: "#d0d0d0", borderWidth: "1px 0 0 0" }} />
                  : (
                    <div
                      key={item.id}
                      onClick={() => { onMenuClick(item.id); setOpenMenu(null); }}
                      style={{
                        padding: "4px 20px", cursor: item.state === "disabled" ? "default" : "pointer",
                        fontSize: 13, fontFamily: "system-ui",
                        display: "flex", justifyContent: "space-between", gap: 20,
                        color: item.state === "disabled" ? "#aaa" : "#000",
                      }}
                      onMouseEnter={e => {
                        if (item.state !== "disabled")
                          (e.currentTarget as HTMLElement).style.background = "#0a58ca";
                        (e.currentTarget as HTMLElement).style.color = item.state !== "disabled" ? "white" : "#aaa";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "";
                        (e.currentTarget as HTMLElement).style.color = item.state === "disabled" ? "#aaa" : "#000";
                      }}
                    >
                      <span>{item.label}</span>
                      {item.accelerator && (
                        <span style={{ color: "inherit", fontSize: 11, opacity: 0.6 }}>{item.accelerator}</span>
                      )}
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Canvas widget ─────────────────────────────────────────────────────────────

function CanvasWidget({ widget, canvasImages, canvasItems, canvasCmds, onEvent }: {
  widget: GuiWidget;
  canvasImages: Record<string, string>;
  canvasItems: CanvasItem[];
  canvasCmds: CanvasCmd[];
  onEvent: (id: string, event: string, value?: string) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const w = widget.width || 300;
  const h = widget.height || 200;
  const hasCmds = canvasCmds.some(c => c.canvasId === widget.id);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = tkColor(widget.bg, "white");
    ctx.fillRect(0, 0, w, h);

    for (const cmd of canvasCmds.filter(c => c.canvasId === widget.id)) {
      ctx.save();
      ctx.strokeStyle = cmd.outline || cmd.fill || "black";
      ctx.fillStyle = cmd.fill || "transparent";
      ctx.lineWidth = cmd.width || 1;
      if (cmd.dash) ctx.setLineDash(cmd.dash);

      if (cmd.cmd === "line") {
        ctx.beginPath();
        for (let i = 0; i < cmd.coords.length; i += 2) {
          if (i === 0) ctx.moveTo(cmd.coords[i], cmd.coords[i + 1]);
          else ctx.lineTo(cmd.coords[i], cmd.coords[i + 1]);
        }
        ctx.stroke();
      } else if (cmd.cmd === "rectangle") {
        const [x1, y1, x2, y2] = cmd.coords;
        if (cmd.fill) ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      } else if (cmd.cmd === "oval") {
        const [x1, y1, x2, y2] = cmd.coords;
        ctx.beginPath();
        ctx.ellipse((x1 + x2) / 2, (y1 + y2) / 2, (x2 - x1) / 2, (y2 - y1) / 2, 0, 0, Math.PI * 2);
        if (cmd.fill) ctx.fill();
        ctx.stroke();
      } else if (cmd.cmd === "arc") {
        const [x1, y1, x2, y2] = cmd.coords;
        const cx = (x1 + x2) / 2; const cy = (y1 + y2) / 2;
        const rx = (x2 - x1) / 2; const ry = (y2 - y1) / 2;
        const startRad = -((cmd.start ?? 0) * Math.PI) / 180;
        const endRad = startRad - ((cmd.extent ?? 90) * Math.PI) / 180;
        ctx.beginPath();
        if (cmd.style === "pieslice" || cmd.style == null) ctx.moveTo(cx, cy);
        ctx.ellipse(cx, cy, rx, ry, 0, startRad, endRad, true);
        if (cmd.style === "pieslice" || cmd.style == null) ctx.closePath();
        else if (cmd.style === "chord") ctx.closePath();
        if (cmd.fill) ctx.fill();
        ctx.stroke();
      } else if (cmd.cmd === "text") {
        ctx.fillStyle = cmd.fill || "black";
        ctx.font = cmd.font || "13px system-ui";
        const align = cmd.anchor === "w" ? "left" : cmd.anchor === "e" ? "right" : "center";
        ctx.textAlign = align as CanvasTextAlign;
        ctx.fillText(cmd.text || "", cmd.coords[0], cmd.coords[1]);
      } else if (cmd.cmd === "polygon") {
        if (cmd.coords.length >= 4) {
          ctx.beginPath();
          ctx.moveTo(cmd.coords[0], cmd.coords[1]);
          for (let i = 2; i < cmd.coords.length; i += 2) ctx.lineTo(cmd.coords[i], cmd.coords[i + 1]);
          ctx.closePath();
          if (cmd.fill) ctx.fill();
          ctx.stroke();
        }
      } else if (cmd.cmd === "image") {
        const b64 = canvasImages[cmd.imageId || ""];
        if (b64) {
          const img = new window.Image();
          img.src = `data:image/png;base64,${b64}`;
          const draw = () => {
            const anchorX = cmd.anchorOffsetX ?? img.width / 2;
            const anchorY = cmd.anchorOffsetY ?? img.height / 2;
            ctx.drawImage(img, cmd.coords[0] - anchorX, cmd.coords[1] - anchorY);
          };
          if (img.complete) draw();
          else img.onload = draw;
        }
      }
      ctx.restore();
    }

    if (!hasCmds) {
      const activeItem = canvasItems.find(ci => ci.imageId && canvasImages[ci.imageId]);
      if (activeItem) {
        const b64 = canvasImages[activeItem.imageId!];
        const img = new window.Image();
        img.src = `data:image/png;base64,${b64}`;
        img.onload = () => { ctx.drawImage(img, 0, 0, w, h); };
      }
    }
  }, [canvasCmds, canvasImages, canvasItems, w, h, widget.id, widget.bg, hasCmds]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    onEvent(widget.id, "canvas_click", `${Math.round(e.clientX - rect.left)},${Math.round(e.clientY - rect.top)}`);
  };

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    onEvent(widget.id, "canvas_move", `${Math.round(e.clientX - rect.left)},${Math.round(e.clientY - rect.top)}`);
  };

  return (
    <canvas
      ref={ref}
      width={w}
      height={h}
      onClick={handleClick}
      onMouseMove={handleMove}
      style={{
        border: "1px solid #7a7a7a",
        background: tkColor(widget.bg, "white"),
        cursor: "crosshair",
        display: "block",
      }}
    />
  );
}

// ── Widget renderer ───────────────────────────────────────────────────────────

function WidgetNode({ widget, allWidgets, onEvent, canvasImages, canvasItems, canvasCmds }: {
  widget: GuiWidget;
  allWidgets: GuiWidget[];
  onEvent: (id: string, event: string, value?: string) => void;
  canvasImages: Record<string, string>;
  canvasItems: CanvasItem[];
  canvasCmds: CanvasCmd[];
}) {
  const { id, kind, text, state } = widget;
  const disabled = state === "disabled";

  // Common layout style
  const layoutStyle: React.CSSProperties = (() => {
    const lay = widget.layout;
    if (!lay) return {};
    if (lay.method === "pack") return getPackStyle(lay.opts);
    if (lay.method === "grid") return getGridStyle(lay.opts);
    return {};
  })();

  const entryStyle: React.CSSProperties = {
    background: disabled ? "#f0f0f0" : "white",
    border: "1px solid #7a7a7a",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
    padding: "2px 4px",
    fontFamily: "system-ui",
    fontSize: 13,
    outline: "none",
    color: "#000",
  };

  switch (kind) {
    case "Button": {
      const bg = tkColor(widget.bg, "#e1e1e1");
      const fg = tkColor(widget.fg, "#000");
      return (
        <button
          type="button"
          disabled={disabled}
          onClick={() => onEvent(id, "click")}
          style={{
            background: bg, color: fg,
            border: "1px solid #adadad", borderRadius: 3,
            padding: "2px 8px", fontFamily: "system-ui", fontSize: 13,
            cursor: disabled ? "not-allowed" : "pointer",
            minWidth: widget.width ? widget.width * 7 : undefined,
            opacity: disabled ? 0.5 : 1,
            ...layoutStyle,
          }}
          onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLElement).style.background = "#ececec"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = bg; }}
        >
          {text || id}
        </button>
      );
    }

    case "Label": {
      const bg = tkColor(widget.bg, "transparent");
      const fg = tkColor(widget.fg, "#000");
      return (
        <span
          style={{
            fontFamily: "system-ui", fontSize: 13, color: fg,
            background: bg === "transparent" ? undefined : bg,
            display: "inline-block",
            ...layoutStyle,
          }}
        >
          {text || ""}
        </span>
      );
    }

    case "Entry": {
      return (
        <input
          type="text"
          disabled={disabled}
          placeholder={text || ""}
          style={{
            ...entryStyle,
            width: widget.width ? widget.width * 7 : 200,
            ...layoutStyle,
          }}
          onChange={e => onEvent(id, "change", e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") onEvent(id, "enter", (e.target as HTMLInputElement).value); }}
        />
      );
    }

    case "Text": {
      const rows = widget.height || 5;
      const cols = widget.width || 40;
      return (
        <textarea
          disabled={disabled}
          style={{
            ...entryStyle,
            fontFamily: "monospace", fontSize: 13,
            resize: "none",
            width: cols * 7,
            height: rows * 20,
            overflowY: "auto",
            ...layoutStyle,
          }}
          onChange={e => onEvent(id, "change", e.target.value)}
        />
      );
    }

    case "Checkbutton": {
      const fg = tkColor(widget.fg, "#000");
      return (
        <label
          style={{
            display: "flex", alignItems: "center", gap: 4,
            fontFamily: "system-ui", fontSize: 13, color: fg, cursor: "pointer",
            ...layoutStyle,
          }}
        >
          <input
            type="checkbox"
            disabled={disabled}
            onChange={e => onEvent(id, "toggle", e.target.checked ? "1" : "0")}
          />
          {text || ""}
        </label>
      );
    }

    case "Radiobutton": {
      const fg = tkColor(widget.fg, "#000");
      return (
        <label
          style={{
            display: "flex", alignItems: "center", gap: 4,
            fontFamily: "system-ui", fontSize: 13, color: fg, cursor: "pointer",
            ...layoutStyle,
          }}
        >
          <input
            type="radio"
            name={widget.parent}
            disabled={disabled}
            onChange={() => onEvent(id, "select")}
          />
          {text || ""}
        </label>
      );
    }

    case "Frame":
    case "LabelFrame": {
      const children = allWidgets.filter(w => w.parent === id);
      const bg = tkColor(widget.bg, "#f0f0f0");
      const flexDir = getContainerFlexDir(children);
      const useGrid = children.some(c => c.layout?.method === "grid");

      const containerStyle: React.CSSProperties = {
        background: bg,
        display: useGrid ? "grid" : "flex",
        flexDirection: useGrid ? undefined : (flexDir as React.CSSProperties["flexDirection"]),
        flexWrap: "wrap",
        gap: 2,
        padding: 4,
        ...layoutStyle,
      };

      if (useGrid) {
        // Compute grid dimensions from children
        const maxCol = Math.max(0, ...children.map(c => Number(c.layout?.opts?.column ?? 0))) + 1;
        containerStyle.gridTemplateColumns = `repeat(${maxCol}, auto)`;
      }

      return (
        <div style={containerStyle}>
          {kind === "LabelFrame" && text && (
            <span style={{ fontFamily: "system-ui", fontSize: 11, color: "#555", gridColumn: "1/-1" }}>{text}</span>
          )}
          {children.map(child => (
            <WidgetNode
              key={child.id}
              widget={child}
              allWidgets={allWidgets}
              onEvent={onEvent}
              canvasImages={canvasImages}
              canvasItems={canvasItems}
              canvasCmds={canvasCmds}
            />
          ))}
        </div>
      );
    }

    case "Canvas": {
      return (
        <div style={{ ...layoutStyle }}>
          <CanvasWidget
            widget={widget}
            canvasImages={canvasImages}
            canvasItems={canvasItems.filter(ci => ci.imageId !== null)}
            canvasCmds={canvasCmds}
            onEvent={onEvent}
          />
        </div>
      );
    }

    case "Scale": {
      return (
        <input
          type="range"
          min={widget.from_ ?? 0}
          max={widget.to ?? 100}
          disabled={disabled}
          style={{
            width: widget.orient === "vertical" ? undefined : (widget.width ? widget.width * 7 : 200),
            ...layoutStyle,
          }}
          onChange={e => onEvent(id, "change", e.target.value)}
        />
      );
    }

    case "Listbox": {
      return (
        <select
          multiple
          size={widget.height || 5}
          disabled={disabled}
          style={{
            background: "white", border: "1px solid #7a7a7a",
            fontFamily: "system-ui", fontSize: 13,
            width: widget.width ? widget.width * 7 : 200,
            ...layoutStyle,
          }}
          onChange={e => {
            const sel = Array.from((e.target as HTMLSelectElement).selectedOptions).map(o => o.value);
            onEvent(id, "select", sel[0] || "");
          }}
        >
          {(widget.values || []).map((v, i) => (
            <option key={i} value={String(i)}>{v}</option>
          ))}
        </select>
      );
    }

    case "OptionMenu":
    case "Combobox": {
      return (
        <select
          disabled={disabled}
          style={{
            background: "white", border: "1px solid #adadad",
            fontFamily: "system-ui", fontSize: 13,
            padding: "2px 4px",
            ...layoutStyle,
          }}
          onChange={e => onEvent(id, "change", e.target.value)}
        >
          {(widget.values || []).map((v, i) => (
            <option key={i} value={v}>{v}</option>
          ))}
        </select>
      );
    }

    case "Progressbar": {
      const val = (widget as GuiWidget & { value?: number }).value ?? 0;
      return (
        <progress
          value={val}
          max={100}
          style={{ width: widget.width ? widget.width * 7 : 200, ...layoutStyle }}
        />
      );
    }

    case "Scrollbar": {
      const isVertical = widget.orient !== "horizontal";
      const lo = widget.scrollLo ?? 0;
      const hi = widget.scrollHi ?? 1;
      const thumbPct = Math.max(5, (hi - lo) * 100);
      const thumbTop = lo * 100;

      if (isVertical) {
        return (
          <div
            style={{
              width: 15, background: "#f0f0f0", border: "1px solid #adadad",
              display: "flex", flexDirection: "column", position: "relative",
              height: widget.height ? widget.height * 20 : 200,
              ...layoutStyle,
            }}
          >
            <div
              style={{
                position: "absolute", left: 0, right: 0,
                top: `${thumbTop}%`,
                height: `${thumbPct}%`,
                background: "#c0c0c0", cursor: "ns-resize",
              }}
            />
          </div>
        );
      }
      return (
        <div
          style={{
            height: 15, background: "#f0f0f0", border: "1px solid #adadad",
            display: "flex", flexDirection: "row", position: "relative",
            width: widget.width ? widget.width * 7 : 200,
            ...layoutStyle,
          }}
        >
          <div
            style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${thumbTop}%`,
              width: `${thumbPct}%`,
              background: "#c0c0c0", cursor: "ew-resize",
            }}
          />
        </div>
      );
    }

    case "Treeview": {
      const cols = widget.columns || ["#0"];
      const headings = widget.headings || {};
      const rows = widget.rows || [];
      return (
        <table
          style={{
            borderCollapse: "collapse", width: "100%",
            fontFamily: "system-ui", fontSize: 13,
            background: "white", border: "1px solid #7a7a7a",
            ...layoutStyle,
          }}
        >
          <thead>
            <tr style={{ background: "#f0f0f0", borderBottom: "1px solid #adadad" }}>
              {cols.map(col => (
                <th key={col} style={{ padding: "2px 8px", textAlign: "left", fontWeight: 600, fontSize: 13 }}>
                  {headings[col] || col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => onEvent(id, "treeview_select", String(i))}
                style={{ cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#e8f0fe"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}
              >
                {cols.map((col, j) => (
                  <td key={col} style={{ padding: "2px 8px", borderBottom: "1px solid #f0f0f0" }}>
                    {j === 0 ? row.text : String(row.values[j - 1] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    case "Separator": {
      const isH = widget.orient !== "vertical";
      return (
        <hr
          style={{
            border: "none",
            borderTop: isH ? "1px solid #c0c0c0" : undefined,
            borderLeft: !isH ? "1px solid #c0c0c0" : undefined,
            width: isH ? "100%" : 1,
            height: !isH ? "100%" : 1,
            margin: 2,
            ...layoutStyle,
          }}
        />
      );
    }

    case "Spinbox": {
      return (
        <input
          type="number"
          min={widget.from_}
          max={widget.to}
          disabled={disabled}
          style={{
            ...entryStyle,
            width: widget.width ? widget.width * 7 : 80,
            ...layoutStyle,
          }}
          onChange={e => onEvent(id, "change", e.target.value)}
        />
      );
    }

    case "Notebook": {
      // Basic notebook — show children as tabs
      const children = allWidgets.filter(w => w.parent === id);
      return (
        <div style={{ border: "1px solid #adadad", background: "#f0f0f0", ...layoutStyle }}>
          <div style={{ display: "flex", borderBottom: "1px solid #adadad" }}>
            {children.map((child, i) => (
              <div key={child.id} style={{
                padding: "3px 10px", fontFamily: "system-ui", fontSize: 13,
                background: i === 0 ? "#f0f0f0" : "#e1e1e1",
                border: "1px solid #adadad", borderBottom: i === 0 ? "1px solid #f0f0f0" : undefined,
                cursor: "pointer", marginBottom: -1,
              }}>
                {child.text || `Tab ${i + 1}`}
              </div>
            ))}
          </div>
          {children.length > 0 && (
            <div style={{ padding: 4 }}>
              <WidgetNode
                widget={children[0]}
                allWidgets={allWidgets}
                onEvent={onEvent}
                canvasImages={canvasImages}
                canvasItems={canvasItems}
                canvasCmds={canvasCmds}
              />
            </div>
          )}
        </div>
      );
    }

    default: {
      // Fallback — render children if any
      const children = allWidgets.filter(w => w.parent === id);
      if (children.length > 0) {
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 2, ...layoutStyle }}>
            {children.map(child => (
              <WidgetNode
                key={child.id}
                widget={child}
                allWidgets={allWidgets}
                onEvent={onEvent}
                canvasImages={canvasImages}
                canvasItems={canvasItems}
                canvasCmds={canvasCmds}
              />
            ))}
          </div>
        );
      }
      return (
        <div style={{ fontFamily: "system-ui", fontSize: 12, color: "#888", ...layoutStyle }}>
          [{kind}] {text || ""}
        </div>
      );
    }
  }
}

// ── Root layout renderer ──────────────────────────────────────────────────────

function RootLayout({ widgets, onEvent, canvasImages, canvasItems, canvasCmds }: {
  widgets: GuiWidget[];
  onEvent: (id: string, event: string, value?: string) => void;
  canvasImages: Record<string, string>;
  canvasItems: CanvasItem[];
  canvasCmds: CanvasCmd[];
}) {
  const rootChildren = widgets.filter(w => w.parent === "root");
  const flexDir = getContainerFlexDir(rootChildren);
  const useGrid = rootChildren.some(c => c.layout?.method === "grid");

  const containerStyle: React.CSSProperties = {
    display: useGrid ? "grid" : "flex",
    flexDirection: useGrid ? undefined : (flexDir as React.CSSProperties["flexDirection"]),
    flexWrap: "wrap",
    gap: 2,
    padding: 8,
    minHeight: 40,
    background: "#f0f0f0",
    flex: 1,
    overflow: "auto",
  };

  if (useGrid) {
    const maxCol = Math.max(0, ...rootChildren.map(c => Number(c.layout?.opts?.column ?? 0))) + 1;
    containerStyle.gridTemplateColumns = `repeat(${maxCol}, auto)`;
  }

  return (
    <div style={containerStyle}>
      {rootChildren.length === 0 ? (
        <p style={{ fontFamily: "system-ui", fontSize: 13, color: "#888", margin: 0 }}>
          Inicializace GUI...
        </p>
      ) : (
        rootChildren.map(w => (
          <WidgetNode
            key={w.id}
            widget={w}
            allWidgets={widgets}
            onEvent={onEvent}
            canvasImages={canvasImages}
            canvasItems={canvasItems}
            canvasCmds={canvasCmds}
          />
        ))
      )}
    </div>
  );
}

// ── Keyboard helpers ──────────────────────────────────────────────────────────

function browserKeyToTkinter(key: string): string {
  const map: Record<string, string> = {
    "Enter": "Return", "Escape": "Escape", "Tab": "Tab",
    "Backspace": "BackSpace", "Delete": "Delete",
    "ArrowLeft": "Left", "ArrowRight": "Right",
    "ArrowUp": "Up", "ArrowDown": "Down",
    "Home": "Home", "End": "End",
    "PageUp": "Prior", "PageDown": "Next",
    "F1": "F1", "F2": "F2", "F3": "F3", "F4": "F4", "F5": "F5",
    "F6": "F6", "F7": "F7", "F8": "F8", "F9": "F9", "F10": "F10",
    "F11": "F11", "F12": "F12",
  };
  return map[key] || key;
}

// ── Main TkinterModal ─────────────────────────────────────────────────────────

export function TkinterModal({
  widgets,
  title,
  menubar = [],
  onEvent,
  onClose,
  fileDialogRequest,
  onFileResponse,
  onFileUpload,
  messageboxRequest,
  onMessageboxResponse,
  canvasImages = {},
  canvasItems = [],
  canvasCmds = [],
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Focus wrapper on mount so keyboard events work immediately
  useEffect(() => {
    wrapperRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const keysym = browserKeyToTkinter(e.key);
    onEvent("focused_widget", "keypress", JSON.stringify({
      key: e.key,
      keysym,
      char: e.key.length === 1 ? e.key : "",
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
    }));
    if (["Tab", "Escape"].includes(e.key)) e.preventDefault();
  }, [onEvent]);

  const handleMenuClick = useCallback((itemId: string) => {
    onEvent(itemId, "menu_click");
  }, [onEvent]);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed", inset: 0,
          zIndex: 200, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)",
        }}
        onClick={onClose}
      />

      {/* Modal window — mimics Tkinter window on macOS */}
      <div
        ref={wrapperRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{
          position: "fixed",
          zIndex: 201,
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "min(640px, 96vw)",
          maxHeight: "85vh",
          display: "flex", flexDirection: "column",
          background: "#f0f0f0",
          borderRadius: 6,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.15)",
          overflow: "hidden",
          outline: "none",
        }}
      >
        {/* Titlebar — macOS style */}
        <div
          style={{
            background: "linear-gradient(to bottom, #e8e8e8, #d0d0d0)",
            borderBottom: "1px solid #adadad",
            padding: "4px 8px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: 13, fontWeight: 600, userSelect: "none",
            flexShrink: 0,
            fontFamily: "system-ui",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div
              style={{ width: 12, height: 12, borderRadius: 6, background: "#ff5f57", border: "1px solid #e0443e", cursor: "pointer" }}
              onClick={onClose}
            />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#febc2e", border: "1px solid #d4a012" }} />
            <div style={{ width: 12, height: 12, borderRadius: 6, background: "#28c840", border: "1px solid #1aab29" }} />
          </div>
          <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 13, fontWeight: 600 }}>
            {title || "Python"}
          </span>
          <div style={{ width: 54 }} />
        </div>

        {/* Menubar */}
        {menubar.length > 0 && (
          <Menubar menus={menubar} onMenuClick={handleMenuClick} />
        )}

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
          {fileDialogRequest ? (
            <FileDialogPanel
              req={fileDialogRequest}
              onResponse={v => onFileResponse(fileDialogRequest.id, v)}
              onUpload={onFileUpload}
            />
          ) : messageboxRequest ? (
            <MessageboxPanel
              req={messageboxRequest}
              onResponse={v => onMessageboxResponse(messageboxRequest.id, v)}
            />
          ) : (
            <RootLayout
              widgets={widgets}
              onEvent={onEvent}
              canvasImages={canvasImages}
              canvasItems={canvasItems}
              canvasCmds={canvasCmds}
            />
          )}
        </div>
      </div>
    </>
  );
}
