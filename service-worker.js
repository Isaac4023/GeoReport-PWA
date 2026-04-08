const CACHE = "geo-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) =>
        c.addAll([
          "/",
          "/index.html",
          "/report.html",
          "/fallback.html",
          "/css/styles.css",
        ]),
      ),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request).then((r) => r || caches.match("/fallback.html")),
    ),
  );
});
