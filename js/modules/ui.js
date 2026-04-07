// js/modules/ui.js
import { CONFIG } from '../config.js';

const ui = {
  /**
   * Inicializa los listeners de eventos de la interfaz
   */
  attachEventListeners: () => {
    const fab = document.querySelector(CONFIG.UI_SELECTORS.FAB_BUTTON);
    const closeBtn = document.querySelector(CONFIG.UI_SELECTORS.CLOSE_MODAL);
    const modal = document.querySelector(CONFIG.UI_SELECTORS.REPORT_MODAL);
    
    if (fab) {
      fab.addEventListener('click', () => ui.showReportForm());
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => ui.hideReportForm());
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            ui.hideReportForm();
        }
    });
  },

  showReportForm: () => {
    const modal = document.querySelector(CONFIG.UI_SELECTORS.REPORT_MODAL);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    }
  },

  hideReportForm: () => {
    const modal = document.querySelector(CONFIG.UI_SELECTORS.REPORT_MODAL);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        document.querySelector(CONFIG.UI_SELECTORS.REPORT_FORM)?.reset();
    }
  },

  updateReportsList: (reports) => {
    const container = document.querySelector(CONFIG.UI_SELECTORS.REPORTS_LIST);
    if (!container) return;
    
    if (reports.length === 0) {
        container.innerHTML = '<p class="empty-msg">No hay reportes guardados.</p>';
        return;
    }

    // Render logic here
  },

  displayToast: (message, type = 'info') => {
      console.log(`Toast [${type}]: ${message}`);
      // TODO: Implement visual toast implementation
  }
};

export { ui };
