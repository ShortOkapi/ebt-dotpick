const APP_VERSION = '2.2.1-rc5';
const CACHE_PREFIX = 'ebt-dot-safari-v';
const CACHE_NAME = `${CACHE_PREFIX}${APP_VERSION}`;
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './euro-use-eligibility.json',
  './osm-base-mask.json',
  './manual-overrides.json',
  './dot-name-overrides.json',
  './data/destinations/manifest.json',
  './site.webmanifest',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './favicon.ico',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

self.addEventListener('message', event => {
  if (event.data === 'GET_APP_VERSION') {
    event.ports[0]?.postMessage(APP_VERSION);
  }
});

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.searchParams.has('ebt-map-check') || requestUrl.searchParams.has('ebt-destination-check')) return;
  const isAppRequest = requestUrl.origin === self.location.origin;
  const isLeafletRequest = requestUrl.origin === 'https://unpkg.com';

  if (!isAppRequest && !isLeafletRequest) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch(async () => {
        if (event.request.mode !== 'navigate') return Response.error();

        const appShellUrl = new URL('./index.html', self.location).href;
        return (await caches.match(appShellUrl)) || Response.error();
      });
    })
  );
});
