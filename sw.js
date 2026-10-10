const CACHE_NAME = 'miczthemike-cache-v1';
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './miczthemike.ico',
    './apple-touch-icon.png',
    './icon-192.png',
    './icon-512.png',
    './icon-maskable-512.png',
    './I2CS__1_.png',
    './PROXYPlus.png',
    './photo_2026-05-30_19-18-49.jpg'
];

// Install: Cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('[SW] Some precache assets failed:', err);
            });
        }).then(() => self.skipWaiting())
    );
});

// Activate: Clean up older caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Strategy depending on request type
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Only handle GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension or other non-http(s) schemes
    if (!request.url.startsWith('http')) return;

    // 1. Navigation requests (HTML pages): Network-first with cache fallback
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
                    }
                    return networkResponse;
                })
                .catch(async () => {
                    const cachedResponse = await caches.match(request);
                    if (cachedResponse) return cachedResponse;
                    return caches.match('./index.html');
                })
        );
        return;
    }

    // 2. Static assets: Cache-first with network fallback & background update
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Fetch in background to update cache for next time
                fetch(request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
                    }
                }).catch(() => {/* Ignore background fetch errors */});
                return cachedResponse;
            }

            return fetch(request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
                }
                return networkResponse;
            }).catch(() => {
                // Asset failed and not in cache
                return null;
            });
        })
    );
});

