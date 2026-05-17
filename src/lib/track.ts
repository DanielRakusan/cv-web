import { siteConfig } from "@/config/site";

/** Vrátí visit_id z localStorage (stejný jako VisitPing). */
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
 * Používá sendBeacon (na pagehide) nebo fetch (jinak).
 * Tiché selhání — nikdy nevyhazuje výjimku.
 */
export type TrackEventType =
  | "human_signal"
  | "scroll"
  | "scroll_speed"
  | "page_time"
  | "section_view"
  | "click"
  | "cta_click"
  | "terminal_run";

export function trackEvent(
  type: TrackEventType,
  data?: Record<string, string | number | boolean>
) {
  if (!siteConfig.renderApiUrl) return;
  try {
    const payload = JSON.stringify({ vid: getVid(), type, data: data ?? {} });
    const url = `${siteConfig.renderApiUrl}/track`;
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
    } else {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      }).catch(() => {});
    }
  } catch {
    /* ignore */
  }
}
