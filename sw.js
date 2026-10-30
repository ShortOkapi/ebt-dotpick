const APP_VERSION = '2.3.1-rc.7';
const CACHE_PREFIX = 'ebt-dotpick-v';
const CACHE_NAME = `${CACHE_PREFIX}${APP_VERSION}-shell3`;
const APP_ROOT = new URL('./', self.location.href);
const SHELL_URL = new URL('index.html', APP_ROOT).href;
const READY_URL = new URL('.offline-shell-ready', APP_ROOT).href;
const FETCH_TIMEOUT_MS = 15000;
const LEAFLET_ASSETS = [
  { url: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=' },
  { url: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=' }
];
const REQUIRED_ASSETS = [
  { url: './index.html', page: true },
  { url: './euro-use-eligibility.json' },
  { url: './osm-base-mask.json' },
  { url: './manual-overrides.json' },
  ...LEAFLET_ASSETS
];
const OPTIONAL_ASSETS = [
  './dot-name-overrides.json', './data/destinations/manifest.json', './site.webmanifest',
  './android-chrome-192x192.png', './android-chrome-512x512.png', './apple-touch-icon.png',
  './favicon-32x32.png', './favicon-16x16.png', './favicon.ico'
];
const OPTIONAL_URLS = new Set(OPTIONAL_ASSETS.map(url => new URL(url, APP_ROOT).href));

async function savedLeaflet(request, integrity) {
  // Only this app's older shell caches may supply a dependency, and its bytes must match.
  for (const name of (await caches.keys()).reverse()) {
    if (!name.startsWith(CACHE_PREFIX) || name === CACHE_NAME) continue;
    try {
      const response = await (await caches.open(name)).match(request);
      if (!response?.ok) continue;
      const digest = await crypto.subtle.digest('SHA-256', await response.clone().arrayBuffer());
      const actual = 'sha256-' + btoa(String.fromCharCode(...new Uint8Array(digest)));
      if (actual === integrity) return response;
    } catch { /* Try another retained shell; never trust an unchecked copy. */ }
  }
  return null;
}
async function cacheAsset(cache, asset) {
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const request = new Request(new URL(asset.url, APP_ROOT), {
    cache: 'reload', credentials: asset.integrity ? 'omit' : 'same-origin', mode: 'cors',
    ...(asset.integrity ? { integrity: asset.integrity } : {}), signal: controller.signal
  });
  let response;
  try {
    try {
      response = await fetch(request);
      if (!response.ok) throw new Error('Offline asset unavailable: ' + request.url);
    } catch (error) {
      const fallback = asset.integrity ? await savedLeaflet(request, asset.integrity) : null;
      if (!fallback) throw error;
      response = fallback;
    }
    if (asset.page) {
      const html = await response.clone().text();
      const version = html.match(/<span\b[^>]*\bid=["']app-version["'][^>]*>\s*v([^<]+)<\/span>/i)?.[1].trim();
      if (version !== APP_VERSION) throw new Error('Page and offline worker versions differ.');
    }
    await cache.put(request, response);
  } finally { clearTimeout(timer); }
}

self.addEventListener('message', event => {
  if (event.data === 'GET_APP_VERSION') event.ports[0]?.postMessage(APP_VERSION);
});
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // An existing complete cache must never be overwritten by a reused release identity.
    if (await cache.match(READY_URL)) throw new Error('Offline release identity already exists; use a new version/cache name.');
    try {
      const required = await Promise.allSettled(REQUIRED_ASSETS.map(asset => cacheAsset(cache, asset)));
      const failure = required.find(result => result.status === 'rejected');
      if (failure) throw failure.reason;
      const page = await cache.match(SHELL_URL);
      await cache.put(APP_ROOT.href, page.clone());
      await Promise.allSettled(OPTIONAL_ASSETS.map(url => cacheAsset(cache, { url })));
      await cache.put(READY_URL, new Response(JSON.stringify({ version: APP_VERSION }), { headers: { 'Content-Type': 'application/json' } }));
      await self.skipWaiting();
    } catch (error) {
      await caches.delete(CACHE_NAME).catch(() => {});
      throw error;
    }
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    await Promise.all((await caches.keys())
      .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.searchParams.has('ebt-map-check') || url.searchParams.has('ebt-destination-check')) return;
  const inApp = url.origin === APP_ROOT.origin && url.pathname.startsWith(APP_ROOT.pathname);
  const leaflet = LEAFLET_ASSETS.some(asset => asset.url === url.href);
  if (!inApp && !leaflet) return;
  event.respondWith((async () => {
    let cache;
    try { cache = await caches.open(CACHE_NAME); } catch { /* Online use can still work. */ }
    const isShell = inApp && (url.pathname === APP_ROOT.pathname || url.pathname === new URL(SHELL_URL).pathname);
    const cached = await cache?.match(isShell ? SHELL_URL : event.request);
    if (cached) return cached;
    const response = await fetch(event.request);
    // Repair missed optional downloads only. Prepared blocks retain their own validated data cache.
    if (response.ok && OPTIONAL_URLS.has(url.href) && cache) {
      try { await cache.put(event.request, response.clone()); } catch {}
    }
    return response;
  })());
});
