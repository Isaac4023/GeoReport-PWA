const CACHE_NAME = "georeport-v1";

const ASSETS = [
  "/",
  "/index.html",
  "/fallback.html",
  "/css/styles.css",
  "/css/components.css",
  "/js/app.js",
  "/js/config.js",
  "/js/modules/ui.js",
  "/assets/icons/icon-192.png",
];

self.addEventListener("install", (event) => {
  console.log("[SW] Instalando...");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activado");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.url.includes("/api/")) {
    event.respondWith(fetch(req).catch(() => caches.match("/fallback.html")));
    return;
  }

  event.respondWith(
    caches
      .match(req)
      .then(
        (res) => res || fetch(req).catch(() => caches.match("/fallback.html")),
      ),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow("/"));
});
