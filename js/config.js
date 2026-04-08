const CONFIG = {
  DB_NAME: "georeport_db",
  DB_VERSION: 1,
  API_ENDPOINT: "https://api.georeport.example/v1",

  UI_SELECTORS: {
    REPORTS_LIST: "#reports-list",
    FAB_BUTTON: "#fab-button",
    REPORT_MODAL: "#report-modal",
    CLOSE_MODAL: "#close-modal",
    REPORT_FORM: "#report-form",
    TOAST_CONTAINER: "#toast-container",
    CONNECTION_INDICATOR: "#connection-indicator", // 🔥 CORREGIDO
  },

  CAMERA_CONSTRAINTS: {
    video: {
      facingMode: "environment",
    },
  },
};

export { CONFIG };
