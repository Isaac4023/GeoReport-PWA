export function renderReportes(lista, ul) {
  ul.innerHTML = "";

  lista.forEach((rep) => {
    const li = document.createElement("li");

    const img = rep.getImageURL() ? `<img src="${rep.getImageURL()}">` : "";

    li.innerHTML = `
      <div class="report-card">

        ${img}

        <div class="report-info">
          <h3>${rep.title}</h3>

          <div class="report-meta">
            ${rep.getFormattedDate()}<br>
            ${rep.getCoordinatesString()}
          </div>

          <div class="report-status-badge status-${rep.status}">
            ${rep.getStatusText()}
          </div>

          <button onclick="eliminar('${rep.id}')" class="btn-secondary">
            Eliminar
          </button>
        </div>

      </div>
    `;

    ul.appendChild(li);
  });
}
