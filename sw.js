const CACHE_NAME = 'miczthemike-v2';
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/miczthemike.ico',
    '/apple-touch-icon.png',
    '/icon-192.png',
    '/icon-maskable-192.png',
    '/icon-512.png',
    '/icon-maskable-512.png',
    '/I2CS__1_.png',
    '/PROXYPlus.png',
    '/photo_2026-05-30_19-18-49.jpg'
];

// Install: Cache core assets and activate immediately
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS).catch((err) => {
                console.warn('[SW] Precache non-critical issue:', err);
            });
        })
    );
});

// Activate: Delete old caches and take control
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Robust strategy ensuring valid Response is always returned
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Only handle GET requests over HTTP/HTTPS
    if (request.method !== 'GET' || !request.url.startsWith('http')) {
        return;
    }

    // 1. Navigation requests (HTML pages): Network-first with cache fallback
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.ok) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                    }
                    return networkResponse;
                })
                .catch(async () => {
                    const cached = await caches.match(request);
                    if (cached) return cached;
                    const indexFallback = await caches.match('/index.html');
                    if (indexFallback) return indexFallback;
                    const rootFallback = await caches.match('/');
                    if (rootFallback) return rootFallback;
                    return new Response('Offline - Micz The Mike Portfolio', {
                        headers: { 'Content-Type': 'text/html' }
                    });
                })
        );
        return;
    }

    // 2. Static Assets: Cache-first, then network, with background cache update
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                // Fetch in background for next time if on same origin
                if (request.url.startsWith(self.location.origin)) {
                    fetch(request).then((networkResponse) => {
                        if (networkResponse && networkResponse.ok) {
                            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
                        }
                    }).catch(() => {});
                }
                return cachedResponse;
            }

            // Not in cache, fetch from network
            return fetch(request).then((networkResponse) => {
                if (networkResponse && networkResponse.ok && request.url.startsWith(self.location.origin)) {
                    const copy = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                }
                return networkResponse;
            });
        })
    );
});
