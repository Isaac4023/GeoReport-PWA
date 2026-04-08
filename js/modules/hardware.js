export const hardware = {
  async requestCameraPermission() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      return true;
    } catch {
      return false;
    }
  },

  async capturePhoto() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      stream.getTracks().forEach((t) => t.stop());

      return canvas.toDataURL("image/jpeg");
    } catch {
      alert("Error cámara");
      return null;
    }
  },

  async requestLocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => resolve(true),
        () => resolve(false),
      );
    });
  },

  async getCurrentCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => reject(err),
        { enableHighAccuracy: true },
      );
    });
  },

  // 🔥 DIRECCIÓN REAL
  async getAddressFromCoords(lat, lng) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      );
      const data = await res.json();
      return data.display_name || "Dirección no disponible";
    } catch {
      return "Error dirección";
    }
  },
};
