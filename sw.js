const CACHE_NAME = 'maths-builder-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/styles.css',
  '/manifest.json',
  // Add your icons here
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});