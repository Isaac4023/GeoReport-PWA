import { CONFIG } from "../config.js";
import { hardware } from "./hardware.js";

let currentPhoto = null;
let currentCoords = null;

const ui = {
  _formCallback: null,

  attachEventListeners: () => {
    const fab = document.querySelector(CONFIG.UI_SELECTORS.FAB_BUTTON);
    const closeBtn = document.querySelector(CONFIG.UI_SELECTORS.CLOSE_MODAL);
    const modal = document.querySelector(CONFIG.UI_SELECTORS.REPORT_MODAL);
    const form = document.querySelector(CONFIG.UI_SELECTORS.REPORT_FORM);

    if (fab) fab.addEventListener("click", () => ui.showReportForm());
    if (closeBtn) closeBtn.addEventListener("click", () => ui.hideReportForm());

    window.addEventListener("click", (e) => {
      if (e.target === modal) ui.hideReportForm();
    });

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("report-title").value;
        const description = document.getElementById("report-description").value;
        const locationField = document.getElementById("location-field");

        if (!title) return alert("Título obligatorio");
        if (!currentPhoto) return alert("Toma una foto");
        if (!currentCoords) return alert("Ubicación no disponible");

        ui._formCallback({
          title,
          description,
          photoData: currentPhoto,
          latitude: currentCoords.lat,
          longitude: currentCoords.lng,
          locationName: locationField.value,
        });

        ui.hideReportForm();
      });
    }
  },

  attachFormHandler: (cb) => {
    ui._formCallback = cb;
  },

  // 🔥 UBICACIÓN AUTOMÁTICA QUE SÍ FUNCIONA
  showReportForm: () => {
    const modal = document.querySelector(CONFIG.UI_SELECTORS.REPORT_MODAL);
    modal.classList.remove("hidden");

    const cameraBtn = document.getElementById("btn-camera");
    const preview = document.getElementById("preview");
    const locationField = document.getElementById("location-field");

    // 📸 CÁMARA
    if (cameraBtn) {
      cameraBtn.onclick = async () => {
        const photo = await hardware.capturePhoto();
        if (photo) {
          currentPhoto = photo;
          preview.src = photo;
        }
      };
    }

    // 🔥 UBICACIÓN AUTOMÁTICA (SIN API)
    if (navigator.geolocation) {
      locationField.value = "Obteniendo ubicación...";

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          currentCoords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          // 👉 AQUÍ SE GUARDA EN EL INPUT
          locationField.value = `📍 ${currentCoords.lat.toFixed(5)}, ${currentCoords.lng.toFixed(5)}`;

          console.log("✅ Ubicación guardada", currentCoords);
        },
        (err) => {
          console.error("❌ Error ubicación:", err);
          locationField.value = "No se pudo obtener ubicación";
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
      );
    } else {
      locationField.value = "Geolocalización no soportada";
    }
  },

  hideReportForm: () => {
    const modal = document.querySelector(CONFIG.UI_SELECTORS.REPORT_MODAL);
    modal.classList.add("hidden");

    currentPhoto = null;
    currentCoords = null;

    const preview = document.getElementById("preview");
    const locationField = document.getElementById("location-field");

    if (preview) preview.src = "";
    if (locationField) locationField.value = "";
  },

  updateReportsList: (reports = []) => {
    const container = document.querySelector(CONFIG.UI_SELECTORS.REPORTS_LIST);
    if (!container) return;

    if (!reports.length) {
      container.innerHTML = `
        <div class="loading-placeholder">
          No hay reportes aún
        </div>
      `;
      return;
    }

    container.innerHTML = reports
      .map(
        (r) => `
      <article class="report-card">
        <img src="${r.photoData}">
        <div class="report-info">
          <h3>${r.title}</h3>
          <p class="report-meta">
            ${r.locationName || "Sin ubicación"}
          </p>
        </div>
      </article>
    `,
      )
      .join("");
  },
};

export { ui };
