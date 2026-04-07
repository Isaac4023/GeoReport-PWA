const storage = {
  /**
   * Miembro 3: Implementar IndexedDB (ObjectStore: reports)
   */
  initDB: async () => {
    return null;
  },

  saveReport: async (reportData) => {
    console.log('Implementar saveReport aquí (Miembro 3)');
    return reportData.id;
  },

  getAllReports: async () => {
    return [];
  }
};

export { storage };
