import { CONFIG } from './config.js';
import { Report } from './models/report.js';
import { ui } from './modules/ui.js';
import { hardware } from './modules/hardware.js';
import { storage } from './modules/storage.js';
import { sync } from './modules/sync.js';
import { notifications } from './modules/notifications.js';

/**
 * GeoReport Main Orchestrator
 * Member 1 Skeleton
 */
async function initApp() {
  console.log('GeoReport Initializing...');
  
  // 1. Initializar Service Worker (Miembro 2)
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
    } catch (e) { console.warn('[SW]:', e); }
  }

  // 2. Initializar UI
  ui.attachEventListeners();
  
  // 3. Monitorizar conexión
  window.addEventListener('online', () => {
      ui.updateConnectionStatus(true);
      // TODO: Activar sync cuando esté listo (Miembro 3)
      // sync.syncPendingReports(storage, notifications);
  });
  window.addEventListener('offline', () => ui.updateConnectionStatus(false));
  
  // 4. Cargar datos iniciales
  // storage.getAllReports().then(reports => ui.updateReportsList(reports));
  ui.updateReportsList([]); // Placeholder

  console.log('✓ GeoReport Miembro 1 Shell Ready');
}

window.addEventListener('DOMContentLoaded', initApp);
