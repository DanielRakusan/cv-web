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
  | { type: "error"; message: string };

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
