import { siteConfig } from "@/config/site";

export type TrackEventType =
  | "human_signal"
  | "scroll"
  | "scroll_speed"
  | "page_time"
  | "section_view"
  | "click"
  | "cta_click"
  | "terminal_run";

const DEBUG = process.env.NODE_ENV === "development";

function getVid(): string {
  try {
    const key = "dr_vid";
    let vid = localStorage.getItem(key);
    if (!vid) {
      vid = crypto.randomUUID();
      localStorage.setItem(key, vid);
    }
    return vid;
  } catch {
    return "";
  }
}

/**
 * Pošle tracking event na backend.
 *
 * Používá fetch() s keepalive:true místo sendBeacon — sendBeacon s Blob(application/json)
 * nefunguje cross-origin (CORS preflight selže tiše). fetch+keepalive je ekvivalentní,
 * funguje i při pagehide a správně posílá Content-Type: application/json.
 *
 * Chyby loguje do konzole, nikdy nevyhazuje výjimku.
 */
export function trackEvent(
  type: TrackEventType,
  data?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  if (!siteConfig.renderApiUrl) {
    if (DEBUG) console.warn("[track] renderApiUrl není nastaveno");
    return;
  }

  const payload = { vid: getVid(), type, data: data ?? {} };
  if (DEBUG) console.log("[track] →", type, payload.data);

  const url = `${siteConfig.renderApiUrl}/track`;

  // keepalive: true = funguje i při pagehide (ekvivalent sendBeacon, ale s JSON)
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).then((res) => {
    if (!res.ok && DEBUG) {
      console.warn(`[track] server odmítl ${type}: HTTP ${res.status}`);
    } else if (DEBUG) {
      console.log(`[track] ✓ ${type}`);
    }
  }).catch((err) => {
    // Nezobrazovat uživateli, jen logovat pro debug
    if (DEBUG) console.error(`[track] fetch chyba ${type}:`, err);
    else        console.debug(`[track] ${type} failed:`, err?.message ?? err);
  });
}
