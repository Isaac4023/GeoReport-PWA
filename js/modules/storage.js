import { Report } from "../models/report.js";

let db;

export function initDB() {
  return new Promise((resolve) => {
    const request = indexedDB.open("GeoReportDB", 1);

    request.onupgradeneeded = (e) => {
      db = e.target.result;

      db.createObjectStore("reportes", {
        keyPath: "id",
      });
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      resolve();
    };
  });
}

export function guardarReporte(report) {
  db.transaction("reportes", "readwrite")
    .objectStore("reportes")
    .put(report.toJSON());
}

export function obtenerReportes(cb) {
  const store = db.transaction("reportes", "readonly").objectStore("reportes");

  const lista = [];

  store.openCursor().onsuccess = (e) => {
    const cursor = e.target.result;

    if (cursor) {
      lista.push(Report.fromJSON(cursor.value));
      cursor.continue();
    } else {
      cb(lista);
    }
  };
}

export function eliminarReporte(id) {
  db.transaction("reportes", "readwrite").objectStore("reportes").delete(id);
}
