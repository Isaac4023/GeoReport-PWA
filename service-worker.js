/**
 * GeoReport Service Worker
 * Miembro 2: Implementar estrategias de caché (Cache First / Network First)
 */

const CACHE_NAME = 'georeport-v1';

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...');
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activado.');
});

self.addEventListener('fetch', (event) => {
  // Miembro 2: Implementar lógica de respuesta offline
});
