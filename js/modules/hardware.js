// js/modules/hardware.js

export function iniciarCamara(video) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Tu navegador no soporta cámara");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error("Error cámara:", err);
      alert("No se pudo acceder a la cámara");
    });
}

export function tomarFoto(video, canvas, preview) {
  if (!video.videoWidth) {
    alert("La cámara no está lista aún");
    return null;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          alert("Error al capturar imagen");
          return;
        }

        preview.src = URL.createObjectURL(blob);
        resolve(blob);
      },
      "image/jpeg",
      0.9,
    );
  });
}

export function obtenerUbicacion(cb) {
  if (!navigator.geolocation) {
    alert("Geolocalización no soportada");
    cb(null);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      cb({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    },
    (err) => {
      console.error("Error ubicación:", err);
      alert("No se pudo obtener la ubicación");
      cb(null);
    },
  );
}
