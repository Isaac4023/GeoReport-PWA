import {
  initDB,
  guardarReporte,
  obtenerReportes,
  eliminarReporte,
} from "./modules/storage.js";

import {
  iniciarCamara,
  tomarFoto,
  obtenerUbicacion,
} from "./modules/hardware.js";

import { renderReportes } from "./modules/ui.js";
import { notify } from "./modules/notifications.js";
import { Report } from "./models/report.js";

let fotoBlob = null;
let coords = null;

document.addEventListener("DOMContentLoaded", async () => {
  await initDB();

  // STATUS ONLINE/OFFLINE
  function actualizarEstado() {
    const status = document.getElementById("status");

    if (!status) return;

    if (navigator.onLine) {
      status.className = "status-indicator online";
      status.innerHTML = `<div class="status-dot"></div> Online`;
    } else {
      status.className = "status-indicator offline";
      status.innerHTML = `<div class="status-dot"></div> Offline`;
    }
  }

  window.addEventListener("online", actualizarEstado);
  window.addEventListener("offline", actualizarEstado);
  actualizarEstado();

  // LISTA
  const lista = document.getElementById("report-list");

  function cargarLista() {
    if (!lista) return;
    obtenerReportes((data) => renderReportes(data, lista));
  }

  cargarLista();

  // CÁMARA
  const video = document.getElementById("camera");
  const canvas = document.getElementById("snapshot");
  const preview = document.getElementById("photo-preview");

  if (video) iniciarCamara(video);

  document
    .getElementById("btn-take-photo")
    ?.addEventListener("click", async () => {
      const foto = await tomarFoto(video, canvas, preview);
      if (foto) fotoBlob = foto;
    });

  // UBICACIÓN
  obtenerUbicacion((c) => {
    coords = c;
    const txt = document.getElementById("coords");
    if (txt && c) txt.textContent = `${c.lat}, ${c.lng}`;
  });

  // GUARDAR
  document.getElementById("btn-save-report")?.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const report = new Report({
      title,
      description,
      latitude: coords?.lat,
      longitude: coords?.lng,
      photo: fotoBlob,
    });

    if (!report.isValid()) {
      alert("Completa todos los campos y toma la foto");
      return;
    }

    guardarReporte(report);

    notify("Reporte guardado correctamente");

    setTimeout(() => {
      location.href = "index.html";
    }, 300);
  });

  // ELIMINAR
  window.eliminar = (id) => {
    if (confirm("¿Eliminar este reporte?")) {
      eliminarReporte(id);
      cargarLista();
    }
  };
});

// SW
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
