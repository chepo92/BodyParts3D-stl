const dataTableBody = document.querySelector("#dataTable tbody");
const searchInput = document.getElementById("searchInput");

let filas = [];

async function cargarArchivo() {
  try {
    const respuesta = await fetch("https://raw.githubusercontent.com/Biblioteca-Anatomica-3D/BodyParts3D/refs/heads/main/docs/parts_list_e.txt"); // archivo fijo
    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el archivo parts_list_e.txt");
    }

    const texto = await respuesta.text();
    procesarTexto(texto);
  } catch (error) {
    console.error(error);
  }
}

function procesarTexto(text) {
  const lineas = text.split(/\r?\n/).filter(l => l.trim() !== "");
  const datos = lineas.slice(1); // ignoramos encabezado

  datos.forEach(linea => {
    const [id, termino] = linea.split(/\t/);
    if (id && termino) {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td>${id}</td><td>${termino}</td>`;
      dataTableBody.appendChild(fila);
      filas.push(fila);
    }
  });
}

// Filtrado en vivo
searchInput.addEventListener("input", () => {
  const filtro = searchInput.value.toLowerCase();
  filas.forEach(fila => {
    const textoFila = fila.innerText.toLowerCase();
    fila.style.display = textoFila.includes(filtro) ? "" : "none";
  });
});

cargarArchivo();
