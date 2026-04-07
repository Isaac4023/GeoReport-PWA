const hardware = {
  /**
   * Solicita permisos de cámara y ubicación.
   * Miembro 2: Implementar getUserMedia y geolocation
   */
  initCamera: async (videoElement) => {
    console.log('Implementar cámara aquí (Miembro 2)');
    return false;
  },

  stopCamera: () => {
    // Miembro 2: Implementar detención de tracks
  },

  capturePhoto: (videoElement) => {
    // Miembro 2: Implementar captura canvas -> base64
    return '';
  },

  getCurrentCoordinates: () => {
    // Miembro 2: Implementar navigator.geolocation
    return Promise.resolve({ lat: 0, lng: 0 });
  }
};

export { hardware };
