// Service Worker — Web Push notifikace pro dr.rakusan_
// Nainstaluj web jako PWA (Přidat na plochu) → automaticky se zaregistruje

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(clients.claim()));

// ── Push handler ──────────────────────────────────────────────────────────────
self.addEventListener("push", (event) => {
  let data = { title: "dr.rakusan_", body: "", url: "/" };
  try {
    data = { ...data, ...event.data.json() };
  } catch (_) {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      data: { url: data.url },
      vibrate: [100, 50, 100],
    })
  );
});

// ── Klik na notifikaci → otevři web ──────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
