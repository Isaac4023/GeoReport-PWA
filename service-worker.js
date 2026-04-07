// service-worker.js - Member 2 (Backend Lead)
const CACHE_NAME = 'georeport-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './fallback.html',
  './manifest.json',
  './css/styles.css',
  './css/components.css',
  './js/config.js',
  './js/app.js',
  './js/models/report.js',
  './js/modules/ui.js'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker is installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching system assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker is activating...');
  // Logic to clean old caches
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Logic to solve with cache first for assets and network first for API
});
