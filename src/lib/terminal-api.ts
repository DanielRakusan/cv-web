import { siteConfig } from "@/config/site";

export type BackendStatus = "idle" | "waking" | "ready" | "error";

export type TerminalMessage =
  | { type: "stdout"; data: string }
  | { type: "stderr"; data: string }
  | { type: "exit"; code: number }
  | { type: "error"; message: string };

// Ping backend, vrátí true pokud odpovídá
export async function pingBackend(signal?: AbortSignal): Promise<boolean> {
  if (!siteConfig.renderApiUrl) return false;
  try {
    const res = await fetch(`${siteConfig.renderApiUrl}/health`, {
      signal,
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Načte seznam projektů z backendu
export async function fetchProjects(): Promise<{ id: string; name: string; description: string }[]> {
  if (!siteConfig.renderApiUrl) return [];
  try {
    const res = await fetch(`${siteConfig.renderApiUrl}/projects`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchProjectReadme(id: string, lang: string = "cz"): Promise<string | null> {
  if (!siteConfig.renderApiUrl) return null;
  try {
    const res = await fetch(`${siteConfig.renderApiUrl}/projects/${id}/readme?lang=${lang}`, { cache: "no-store" });
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
    const res = await fetch(`${siteConfig.renderApiUrl}/projects/${id}/tree`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.tree ?? [];
  } catch {
    return [];
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
