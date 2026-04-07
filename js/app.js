import { CONFIG } from './config.js';
import { ui } from './modules/ui.js';
// TODO: Importar storage, sync y hardware cuando los Miembros 2 y 3 terminen

async function initApp() {
  console.log('GeoReport Initializing...');
  
  // 1. Initializar Service Worker
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./service-worker.js');
      console.log('SW registered:', registration.scope);
    } catch (error) {
      console.warn('SW registration failed (this is normal in some local environments):', error);
    }
  }

  // 2. Initializar UI
  ui.attachEventListeners();
  
  // 3. Monitorizar conexión
  window.addEventListener('online', () => ui.updateConnectionStatus(true));
  window.addEventListener('offline', () => ui.updateConnectionStatus(false));
  
  // 4. Cargar datos iniciales (Placeholder hasta que storage.js esté listo)
  ui.updateReportsList([]);
  
  console.log('✓ GeoReport Miembro 1 Shell Ready');
}

window.addEventListener('DOMContentLoaded', initApp);
