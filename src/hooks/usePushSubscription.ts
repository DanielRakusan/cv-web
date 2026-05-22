"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

const BACKEND = siteConfig.renderApiUrl;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

/**
 * Zaregistruje service worker a přihlásí se k Web Push notifikacím.
 * Aktivuje se automaticky pouze pokud je web otevřen jako PWA (standalone).
 * Na první spuštění v PWA požádá o povolení notifikací.
 */
export function usePushSubscription() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    // Spusť pouze v PWA (přidáno na plochu) nebo pokud už má povolení
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    const alreadyGranted = Notification.permission === "granted";

    if (!isStandalone && !alreadyGranted) return;

    async function subscribe() {
      try {
        // Zaregistruj service worker
        const reg = await navigator.serviceWorker.register("/sw.js");
        await navigator.serviceWorker.ready;

        // Požádej o povolení notifikací (pokud ještě není)
        if (Notification.permission === "default") {
          const perm = await Notification.requestPermission();
          if (perm !== "granted") return;
        }
        if (Notification.permission !== "granted") return;

        // Načti VAPID public key z backendu
        const keyRes = await fetch(`${BACKEND}/push/vapid-public-key`);
        if (!keyRes.ok) return;
        const { publicKey } = await keyRes.json();

        // Vytvoř nebo obnov subscription
        let sub = await reg.pushManager.getSubscription();
        if (!sub) {
          sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey),
          });
        }

        // Pošli subscription na backend
        await fetch(`${BACKEND}/push/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sub.toJSON()),
        });
      } catch (err) {
        // Tiché selhání — nechceme rušit uživatele chybami
        console.debug("[push]", err);
      }
    }

    subscribe();
  }, []);
}
