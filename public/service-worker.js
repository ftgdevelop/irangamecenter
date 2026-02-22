const CACHE_NAME = "igc-cache-v2";
const STATIC_ASSETS = ["/"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const { request } = event;

  // ❌ API ها رو کش نکن
  if (request.url.includes("/api/")) {
    return;
  }

  // فقط GET
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then(response => {
      return (
        response ||
        fetch(request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(request, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});