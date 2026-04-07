// js/models/report.js
/**
 * Clase Report - Modelo de Datos para GeoReport
 * Representa una incidencia reportada por el usuario.
 */
class Report {
  constructor(data = {}) {
    this.id = data.id || (window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `rep_${Date.now()}_${Math.floor(Math.random()*1000)}`);
    this.title = data.title || '';
    this.description = data.description || '';
    this.latitude = data.latitude || 0;
    this.longitude = data.longitude || 0;
    this.photoData = data.photoData || ''; // Base64 de la foto
    this.photoName = data.photoName || `report_${this.id}_${new Date().toISOString().split('T')[0]}.jpg`;
    this.timestamp = data.timestamp || Date.now();
    this.status = data.status || 'pending'; // 'pending' | 'synced' | 'error'
    this.syncAttempts = data.syncAttempts || 0;
    this.lastSyncTime = data.lastSyncTime || null;
    this.locationName = data.locationName || '';
  }

  /**
   * Valida si el reporte tiene los campos obligatorios completos y correctos.
   * @returns {boolean}
   */
  isValid() {
    return this.title.trim() !== '' &&
      this.photoData !== '' &&
      this.latitude !== 0 &&
      this.longitude !== 0;
  }

  /**
   * Devuelve una representación en objeto del reporte lista para JSON.
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
      photoData: this.photoData,
      photoName: this.photoName,
      timestamp: this.timestamp,
      status: this.status,
      syncAttempts: this.syncAttempts,
      lastSyncTime: this.lastSyncTime,
      locationName: this.locationName
    };
  }

  /**
   * Crea una instancia de Report a partir de un objeto plano o JSON.
   * @param {Object} data 
   */
  static fromJSON(data) {
    return new Report(data);
  }

  /**
   * Devuelve la fecha formateada del reporte para visualización en UI.
   */
  getFormattedDate() {
    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(this.timestamp));
  }

  getStatusText() {
    switch(this.status) {
      case 'synced': return '✓ Sincronizado';
      case 'pending': return '⏳ Pendiente';
      case 'error': return '❌ Error de red';
      default: return 'Desconocido';
    }
  }

  getCoordinatesString() {
    return `Lat: ${this.latitude.toFixed(4)}, Lng: ${this.longitude.toFixed(4)}`;
  }
}

export { Report };
