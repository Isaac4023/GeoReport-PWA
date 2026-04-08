// js/models/report.js

class Report {
  constructor(data = {}) {
    this.id =
      data.id ||
      (crypto.randomUUID ? crypto.randomUUID() : `rep_${Date.now()}`);

    this.title = data.title || "";
    this.description = data.description || "";

    this.latitude = data.latitude || 0;
    this.longitude = data.longitude || 0;

    // 🔥 CAMBIO IMPORTANTE: Blob en lugar de Base64
    this.photo = data.photo || null;

    this.timestamp = data.timestamp || Date.now();

    this.status = data.status || "pending";
    this.syncAttempts = data.syncAttempts || 0;
    this.lastSyncTime = data.lastSyncTime || null;
    this.locationName = data.locationName || "";
  }

  // ✅ VALIDACIÓN
  isValid() {
    return (
      this.title.trim() !== "" &&
      this.photo instanceof Blob &&
      this.latitude !== 0 &&
      this.longitude !== 0
    );
  }

  // ✅ SERIALIZACIÓN (IndexedDB soporta Blob)
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
      photo: this.photo, // 👈 Blob
      timestamp: this.timestamp,
      status: this.status,
      syncAttempts: this.syncAttempts,
      lastSyncTime: this.lastSyncTime,
      locationName: this.locationName,
    };
  }

  // ✅ DESERIALIZAR
  static fromJSON(data) {
    return new Report(data);
  }

  // 📅 Fecha bonita
  getFormattedDate() {
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(this.timestamp));
  }

  // 📊 Estado
  getStatusText() {
    switch (this.status) {
      case "synced":
        return "✓ Sincronizado";
      case "pending":
        return "⏳ Pendiente";
      case "error":
        return "❌ Error";
      default:
        return "Desconocido";
    }
  }

  // 📍 Coordenadas
  getCoordinatesString() {
    return `Lat: ${this.latitude.toFixed(4)}, Lng: ${this.longitude.toFixed(4)}`;
  }

  // 🖼️ URL de imagen para UI
  getImageURL() {
    if (this.photo instanceof Blob) {
      return URL.createObjectURL(this.photo);
    }
    return null;
  }
}

export { Report };
