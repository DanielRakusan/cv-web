import { siteConfig } from "@/config/site";

export type BackendStatus = "idle" | "waking" | "ready" | "error";

// Wrapper kolem fetch s AbortController timeoutem (výchozí 15 s).
// Render free tier může budit backend 30–60 s — 8 s bylo příliš krátké.
function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 15_000,
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  // Pokud volající předal vlastní signal, zkombinujeme oba (AbortSignal.any je v moderních prohlížečích k dispozici)
  const signal =
    options.signal && typeof AbortSignal.any === "function"
      ? AbortSignal.any([options.signal as AbortSignal, ctrl.signal])
      : ctrl.signal;
  return fetch(url, { ...options, signal }).finally(() => clearTimeout(timer));
}

export type TerminalMessage =
  | { type: "stdout"; data: string }
  | { type: "stderr"; data: string }
  | { type: "exit"; code: number }
  | { type: "error"; message: string }
  // GUI messages from tkinter mock
  | { type: "gui_open" }
  | { type: "gui_close" }
  | { type: "gui_title"; title: string }
  | { type: "gui_widget"; id: string; kind: string; parent: string; text?: string; width?: number; height?: number; state?: string; values?: string[] }
  | { type: "gui_layout"; id: string; method: string; opts: Record<string, unknown> }
  | { type: "gui_update"; id: string; text?: string; state?: string }
  | { type: "gui_destroy"; id: string }
  | { type: "gui_file_dialog"; id: string; mode: "open" | "save" | "directory" | "open_multiple"; title?: string; filetypes?: [string, string][]; initialdir?: string; initialfile?: string; defaultextension?: string }
  | { type: "gui_messagebox"; id?: string; kind: "info" | "warning" | "error" | "okcancel" | "yesno" | "yesnocancel"; title?: string; message?: string }
  | { type: "gui_event_result"; event: string; widget_id: string }
  | { type: "gui_geometry"; geometry: string }
  | { type: "gui_simpledialog"; id: string; kind: string; title?: string; prompt?: string }
  | { type: "gui_colorchooser"; id: string; title?: string; initial?: string }
  | { type: "gui_file_saved"; id: string; path: string }
  | { type: "gui_image"; id: string; b64: string | null; size: [number, number] }
  | { type: "gui_image_zoom"; id: string; source_id: string; zoom_x: number; zoom_y: number }
  | { type: "gui_canvas_image"; canvas_id: string; item_id: string; x: number; y: number; image_id: string | null; anchor: string }
  | { type: "gui_canvas_update"; canvas_id: string; item_id: string; image_id: string | null }
  | { type: "gui_canvas_delete"; canvas_id: string; item_id: string }
  | { type: "gui_canvas_cmd"; canvas_id: string; item_id: string; cmd: string; coords: number[]; fill?: string; outline?: string; width?: number; text?: string; font?: string; anchor?: string; imageId?: string; dash?: number[] | null; arrow?: string; smooth?: boolean; start?: number; extent?: number; style?: string }
  | { type: "gui_canvas_coords"; canvas_id: string; item_id: string; coords: number[] }
  | { type: "gui_canvas_itemconfig"; canvas_id: string; item_id: string; fill?: string; outline?: string; width?: number; text?: string; font?: string }
  | { type: "gui_canvas_move"; canvas_id: string; item_id: string; dx: number; dy: number }
  | { type: "gui_canvas_scale"; canvas_id: string; tag: string; x: number; y: number; xscale: number; yscale: number }
  | { type: "gui_canvas_config"; canvas_id: string; bg?: string; width?: number; height?: number; scrollregion?: unknown }
  | { type: "gui_scrollbar_set"; id: string; lo: number; hi: number }
  | { type: "gui_listbox_insert"; id: string; index: string; items: string[] }
  | { type: "gui_listbox_delete"; id: string; first: string; last: string | null }
  | { type: "gui_listbox_selection_set"; id: string; first: string; last: string | null }
  | { type: "gui_listbox_see"; id: string; index: string }
  | { type: "gui_text_insert"; id: string; index: string; chars: string }
  | { type: "gui_text_delete"; id: string; index1: string; index2: string }
  | { type: "gui_text_see"; id: string; index: string }
  | { type: "gui_text_mark_set"; id: string; name: string; index: string }
  | { type: "gui_text_tag_configure"; id: string; tagname: string; [key: string]: unknown }
  | { type: "gui_text_tag_add"; id: string; tagname: string; index1: string; index2: string | null }
  | { type: "gui_toplevel_open"; id: string; title: string }
  | { type: "gui_menubar"; menu_id: string; items: Array<Record<string, unknown>> }
  | { type: "gui_menu_item"; menu_id: string; item_id: string; kind: string; label?: string; accelerator?: string; state?: string; submenu_id?: string }
  | { type: "gui_menu_popup"; menu_id: string; x: number; y: number }
  | { type: "gui_file_download"; filename: string; data: string }
  | { type: "gui_treeview_insert"; id: string; row_id: string; text: string; values: unknown[]; parent: string }
  | { type: "gui_treeview_delete"; id: string; items: string[] }
  | { type: "gui_treeview_heading"; id: string; col: string; text: string };

export type PingResult = "ok" | "paused" | "error";

// Ping backend — vrátí "ok", "paused" (backend v sleep módu), nebo "error".
export async function pingBackend(signal?: AbortSignal): Promise<PingResult> {
  if (!siteConfig.renderApiUrl) return "error";
  try {
    const vid =
      typeof sessionStorage !== "undefined"
        ? (sessionStorage.getItem("dr_vid") ?? "")
        : "";
    const lang =
      typeof window !== "undefined" && window.location.hash === "#/en"
        ? "en"
        : "cz";
    const url = `${siteConfig.renderApiUrl}/health?lang=${lang}${vid ? `&vid=${encodeURIComponent(vid)}` : ""}`;
    const res = await fetchWithTimeout(url, { signal, cache: "no-store" });
    if (!res.ok) return "error";
    const data = await res.json().catch(() => ({}));
    return data.paused ? "paused" : "ok";
  } catch {
    return "error";
  }
}

// Načte seznam projektů z backendu
export async function fetchProjects(lang: "cz" | "en" = "cz"): Promise<{ id: string; name: string; description: string }[]> {
  if (!siteConfig.renderApiUrl) return [];
  try {
    const res = await fetchWithTimeout(`${siteConfig.renderApiUrl}/projects?lang=${lang}`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchProjectReadme(id: string, lang: string = "cz"): Promise<string | null> {
  if (!siteConfig.renderApiUrl) return null;
  try {
    const res = await fetchWithTimeout(
      `${siteConfig.renderApiUrl}/projects/${id}/readme?lang=${lang}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.content ?? null;
  } catch {
    return null;
  }
}

export async function fetchProjectTree(id: string): Promise<{ path: string; type: string }[]> {
  if (!siteConfig.renderApiUrl) return [];
  try {
    const res = await fetchWithTimeout(
      `${siteConfig.renderApiUrl}/projects/${id}/tree`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.tree ?? [];
  } catch {
    return [];
  }
}

export async function fetchFileContent(projectId: string, path: string): Promise<{ content: string | null; tooLarge?: boolean; size?: number }> {
  if (!siteConfig.renderApiUrl) return { content: null };
  try {
    const res = await fetchWithTimeout(
      `${siteConfig.renderApiUrl}/projects/${projectId}/file?path=${encodeURIComponent(path)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return { content: null };
    const data = await res.json();
    return { content: data.content ?? null, tooLarge: data.too_large, size: data.size };
  } catch {
    return { content: null };
  }
}

// Spustí projekt přes WebSocket, vrátí instanci WebSocket
// Backend přijímá:
//   { type: "run", projectId: string }
//   { type: "input", data: string }
//   { type: "stop" }
// Backend posílá:
//   { type: "stdout", data: string }
//   { type: "stderr", data: string }
//   { type: "exit", code: number }
//   { type: "error", message: string }
export function createTerminalSocket(
  projectId: string,
  onMessage: (msg: TerminalMessage) => void,
  onClose: () => void
): WebSocket | null {
  if (!siteConfig.renderApiUrl) return null;

  const wsUrl = siteConfig.renderApiUrl
    .replace(/^https?:\/\//, (m) => (m === "https://" ? "wss://" : "ws://"))
    .replace(/\/$/, "");

  const ws = new WebSocket(`${wsUrl}/ws/run`);

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "run", projectId }));
  };

  ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data) as TerminalMessage;
      onMessage(msg);
    } catch {
      onMessage({ type: "stdout", data: event.data });
    }
  };

  ws.onclose = onClose;
  ws.onerror = () => {
    onMessage({ type: "error", message: "WebSocket connection failed" });
    onClose();
  };

  return ws;
}
