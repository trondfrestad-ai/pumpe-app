// Enkel service worker: lagrer appen lokalt, så den åpner selv uten nett.
const CACHE = 'pumpe-app-v3';
const FILER = ['./', './index.html', './manifest.webmanifest', './ikon-192.png', './ikon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILER))));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))));
self.addEventListener('fetch', e => e.respondWith(
  fetch(e.request).then(r => { const k = r.clone(); caches.open(CACHE).then(c => c.put(e.request, k)); return r; })
    .catch(() => caches.match(e.request))));
