import { Report } from "./models/report.js";
import { ui } from "./modules/ui.js";
import { hardware } from "./modules/hardware.js";
import { storage } from "./modules/storage.js";
import { notifications } from "./modules/notifications.js";

async function initApp() {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("/service-worker.js");
  }

  await hardware.requestCameraPermission();
  await hardware.requestLocation();
  await notifications.requestPermission();

  ui.attachEventListeners();

  const reports = await storage.getAllReports();
  ui.updateReportsList(reports);

  ui.attachFormHandler(async (formData) => {
    const report = new Report({
      title: formData.title,
      description: formData.description,
      photoData: formData.photoData,
      latitude: formData.latitude,
      longitude: formData.longitude,
      locationName: formData.locationName,
      timestamp: Date.now(),
      status: "pending",
    });

    await storage.saveReport(report);

    const updated = await storage.getAllReports();
    ui.updateReportsList(updated);
  });
}

window.addEventListener("DOMContentLoaded", initApp);
