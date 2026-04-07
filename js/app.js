// js/app.js
import { CONFIG } from './config.js';
// TODO: Importar otros módulos cuando estén listos por los demás miembros

async function initApp() {
  console.log('GeoReport Initializing...');
  
  // 1. Initializar Service Worker
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('./service-worker.js');
      console.log('SW registered:', registration.scope);
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  }

  // 2. Initializar módulos
  // ui.init();
  // storage.init();
  // sync.init();
  
  console.log('App ready.');
}

window.addEventListener('DOMContentLoaded', initApp);
