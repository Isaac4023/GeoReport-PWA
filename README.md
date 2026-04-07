# GeoReport - PWA Mobile App

GeoReport es una **Progressive Web App (PWA)** diseñada para gestionar incidencias universitarias en entornos con baja o nula conectividad. Permite a los empleados reportar fallos (luminarias, daños en equipo, infraestructura) capturando fotos y geolocalización de forma autónoma.

## 🚀 Arquitectura Técnica

### Estructura de Proyecto
- `index.html`: Estructura principal de la aplicación (App Shell).
- `manifest.json`: Configuración PWA e iconos.
- `service-worker.js`: Estrategias de caché y gestión offline.
- `fallback.html`: Interfaz de usuario cuando no hay red ni caché.
- `css/`: Estilos globales (`styles.css`) y componentes (`components.css`).
- `js/app.js`: Punto de entrada y orquestación.
- `js/config.js`: Constantes y selectores globales.
- `js/models/report.js`: Clase Report para estandarizar el flujo de datos.
- `js/modules/`: Módulos funcionales desacoplados por responsabilidades.

### Definición del Modelo de Reporte
Cada reporte sigue este esquema de datos básico:
```javascript
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "latitude": number,
  "longitude": number,
  "photoData": "base64_string",
  "timestamp": number,
  "status": "pending|synced|error"
}
```

## 👥 Roles y Delegación

| Responsable | Tareas | Archivos |
|-------------|--------|----------|
| **Miembro 1** | Frontend Lead / UI | `index.html`, `manifest.json`, `css/`, `js/app.js`, `js/modules/ui.js` |
| **Miembro 2** | Backend / SW / Hardware | `service-worker.js`, `fallback.html`, `js/modules/hardware.js`, `js/modules/notifications.js` |
| **Miembro 3** | Data / Persistencia | `js/modules/storage.js`, `js/modules/sync.js`, `js/models/report.js` |

## 🛠️ Requisitos de Instalación
1. Clona el repositorio: `git clone <url_del_repo>`
2. Abre el proyecto en un servidor local (ej. Live Server de VS Code).
3. Asegúrate de servir mediante HTTPS o `localhost` para que el Service Worker se active correctamente.

---
*Proyecto final PWA - Universidad Tecnológica El Retoño*
