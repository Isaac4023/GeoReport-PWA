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

  updateReportsList: (reports = []) => {
    const container = document.querySelector(CONFIG.UI_SELECTORS.REPORTS_LIST);
    if (!container) return;
    
    if (!reports || reports.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No hay reportes guardados aún.</p>
                <span>¡Presiona el botón + para empezar!</span>
            </div>
        `;
        return;
    }

    container.innerHTML = reports.map(report => `
        <article class="report-card" data-id="${report.id}">
            <img src="${report.photoData || 'assets/placeholder.png'}" alt="${report.title}">
            <div class="report-info">
                <h3>${ui.escapeHtml(report.title)}</h3>
                <p class="report-meta">${report.getFormattedDate()} • ${report.locationName || 'Sin ubicación'}</p>
                <span class="report-status-badge status-${report.status}">
                    ${report.getStatusText()}
                </span>
            </div>
        </article>
    `).join('');
  },

  displayToast: (message, duration = 3000) => {
      const container = document.querySelector(CONFIG.UI_SELECTORS.TOAST_CONTAINER);
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;

      container.appendChild(toast);

      setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => toast.remove(), 300);
      }, duration);
  },

  updateConnectionStatus: (isOnline) => {
      const el = document.querySelector(CONFIG.UI_SELECTORS.CONNECTION_INDICATOR);
      if (!el) return;

      const text = el.querySelector('.status-text');
      
      if (isOnline) {
          el.classList.remove('offline');
          el.classList.add('online');
          if (text) text.textContent = 'Online';
          ui.displayToast('Conexión restaurada');
      } else {
          el.classList.remove('online');
          el.classList.add('offline');
          if (text) text.textContent = 'Offline';
          ui.displayToast('Trabajando sin conexión', 5000);
      }
  },

  escapeHtml: (text) => {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
  }
};

export { ui };
