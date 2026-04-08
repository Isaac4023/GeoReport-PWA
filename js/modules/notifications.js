export const notifications = {
  async requestPermission() {
    try {
      if (!("Notification" in window)) {
        console.warn("No soporta notificaciones");
        return false;
      }

      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("✅ Permiso notificaciones concedido");
        return true;
      } else {
        console.warn("❌ Permiso denegado");
        return false;
      }
    } catch (error) {
      console.error("Error permiso:", error);
      return false;
    }
  },

  async sendNotification(title, options = {}) {
    try {
      if (!("Notification" in window)) return;

      if (Notification.permission !== "granted") return;

      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;

        await registration.showNotification(title, {
          body: options.body || "Nuevo evento",
          icon: "/assets/icons/icon-192.png",
          badge: "/assets/icons/icon-192.png",
          vibrate: [200, 100, 200],
          tag: "georeport",
          renotify: true,
          data: {
            url: options.url || "/",
          },
          ...options,
        });
      } else {
        new Notification(title, {
          body: options.body || "Nuevo evento",
        });
      }

      console.log("🔔 Notificación enviada");
    } catch (error) {
      console.error("❌ Error notificación:", error);
    }
  },
};
