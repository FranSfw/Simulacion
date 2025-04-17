var contador = 0;
var fotoReina = "./img/corona.png";

function showQueen(cell) {
  const row = cell.parentNode.rowIndex;
  const col = cell.cellIndex;
  const tablero = document.getElementById("tablero");

  // Verificar si hay una reina en la misma fila, columna o diagonales
  for (let i = 0; i < 8; i++) {
    if (i !== col && window.getComputedStyle(tablero.rows[row].cells[i]).backgroundImage !== "none") {
      console.log("Reina encontrada en la misma fila");
      return;
    }
    if (i !== row && window.getComputedStyle(tablero.rows[i].cells[col]).backgroundImage !== "none") {
      console.log("Reina encontrada en la misma columna");
      return;
    }
  }

  for (let i = 1; i < 8; i++) {
    if (row + i < 8 && col + i < 8 && window.getComputedStyle(tablero.rows[row + i].cells[col + i]).backgroundImage !== "none") {
      console.log("Reina encontrada en la diagonal principal hacia abajo");
      return;
    }
    if (row - i >= 0 && col - i >= 0 && window.getComputedStyle(tablero.rows[row - i].cells[col - i]).backgroundImage !== "none") {
      console.log("Reina encontrada en la diagonal principal hacia arriba");
      return;
    }
    if (row + i < 8 && col - i >= 0 && window.getComputedStyle(tablero.rows[row + i].cells[col - i]).backgroundImage !== "none") {
      console.log("Reina encontrada en la diagonal secundaria hacia abajo");
      return;
    }
    if (row - i >= 0 && col + i < 8 && window.getComputedStyle(tablero.rows[row - i].cells[col + i]).backgroundImage !== "none") {
      console.log("Reina encontrada en la diagonal secundaria hacia arriba");
      return;
    }
  }

  if (window.getComputedStyle(cell).backgroundImage == "none") {
    if (contador < 8) {
      cell.style = `
                   background-image: url(${fotoReina});
                   background-size: 50px;
                   background-repeat: no-repeat;
                   background-position: center;`;
      cell.classList.add("reina");
      contador++;

      // Eliminar onclick en la misma fila y columna
      for (let i = 0; i < 8; i++) {
        if (i !== col) tablero.rows[row].cells[i].onclick = null;
        if (i !== row) tablero.rows[i].cells[col].onclick = null;
      }

      // Eliminar onclick en las diagonales
      for (let i = 1; i < 8; i++) {
        if (row + i < 8 && col + i < 8) tablero.rows[row + i].cells[col + i].onclick = null;
        if (row - i >= 0 && col - i >= 0) tablero.rows[row - i].cells[col - i].onclick = null;
        if (row + i < 8 && col - i >= 0) tablero.rows[row + i].cells[col - i].onclick = null;
        if (row - i >= 0 && col + i < 8) tablero.rows[row - i].cells[col + i].onclick = null;
      }
    }
  } else {
    cell.style = `background-image: none;`;
    contador--;

    // Restaurar onclick en la misma fila y columna si no hay una reina
    for (let i = 0; i < 8; i++) {
      if (i !== col && window.getComputedStyle(tablero.rows[row].cells[i]).backgroundImage == "none") {
        tablero.rows[row].cells[i].onclick = function () { showQueen(this); };
      }
      if (i !== row && window.getComputedStyle(tablero.rows[i].cells[col]).backgroundImage == "none") {
        tablero.rows[i].cells[col].onclick = function () { showQueen(this); };
      }
    }

    // Restaurar onclick en las diagonales si no hay una reina
    for (let i = 1; i < 8; i++) {
      if (row + i < 8 && col + i < 8 && window.getComputedStyle(tablero.rows[row + i].cells[col + i]).backgroundImage == "none") {
        tablero.rows[row + i].cells[col + i].onclick = function () { showQueen(this); };
      }
      if (row - i >= 0 && col - i >= 0 && window.getComputedStyle(tablero.rows[row - i].cells[col - i]).backgroundImage == "none") {
        tablero.rows[row - i].cells[col - i].onclick = function () { showQueen(this); };
      }
      if (row + i < 8 && col - i >= 0 && window.getComputedStyle(tablero.rows[row + i].cells[col - i]).backgroundImage == "none") {
        tablero.rows[row + i].cells[col - i].onclick = function () { showQueen(this); };
      }
      if (row - i >= 0 && col + i < 8 && window.getComputedStyle(tablero.rows[row - i].cells[col + i]).backgroundImage == "none") {
        tablero.rows[row - i].cells[col + i].onclick = function () { showQueen(this); };
      }
    }
    cell.classList.remove("reina");
  }
  limpiar()
}

function change_color(r, c) {
  const celda = document.getElementById("tablero");
  var r1 = r,
    c1 = c,
    r2 = r,
    c2 = c;
  var r3 = r,
    c3 = c,
    r4 = r,
    c4 = c;
  var lineaAtaque = document.getElementById("lineaAtaque").value;
  for (let i = 0; i < 8; i++) {
    celda.rows[r].cells[i].style.backgroundColor = lineaAtaque;
    celda.rows[i].cells[c].style.backgroundColor = lineaAtaque;
    if (r1 < 8 && c1 < 8) {
      celda.rows[r1++].cells[c1++].style.backgroundColor = lineaAtaque;
    }
    if (r2 > -1 && c2 < 8) {
      celda.rows[r2--].cells[c2++].style.backgroundColor = lineaAtaque;
    }
    if (r3 < 8 && c3 > -1) {
      celda.rows[r3++].cells[c3--].style.backgroundColor = lineaAtaque;
    }
    if (r4 > -1 && c4 > -1) {
      celda.rows[r4--].cells[c4--].style.backgroundColor = lineaAtaque;
    }
  }
}

function limpiarImagen() {
  document
    .querySelectorAll("td")
    .forEach((td) => (td.style.backgroundImage = ""));
}

function limpiar() {
  const checkbox = document.getElementById("checkBoxLineasDeAyuda");
  const celdas = document.querySelectorAll("td");
  if (checkbox.checked) {

  } else {
    celdas.forEach((celda) => {
      const fila = celda.parentElement.rowIndex;
      const columna = celda.cellIndex;
      const colorGuardado = coloresPersonalizados[`${fila}-${columna}`];
      celda.style.backgroundColor = colorGuardado || "";
    });
  }
}

const coloresPersonalizados = {};

function cambiarColorCeldasInpar() {
  var colorInpar = document.getElementById("celdasInpar").value;
  var celdasInpar = document.querySelectorAll(
    "tr:nth-child(even) td:nth-child(even), tr:nth-child(odd) td:nth-child(odd)"
  );
  celdasInpar.forEach((celda, index) => {
    const fila = celda.parentElement.rowIndex;
    const columna = celda.cellIndex;
    coloresPersonalizados[`${fila}-${columna}`] = colorInpar;
    celda.style.backgroundColor = colorInpar;
  });
}

function cambiarColorCeldasPar() {
  var colorPar = document.getElementById("celdasPar").value;
  var celdasPar = document.querySelectorAll(
    "tr:nth-child(odd) td:nth-child(even), tr:nth-child(even) td:nth-child(odd)"
  );
  celdasPar.forEach((celda, index) => {
    const fila = celda.parentElement.rowIndex;
    const columna = celda.cellIndex;
    coloresPersonalizados[`${fila}-${columna}`] = colorPar;
    celda.style.backgroundColor = colorPar;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  cambiarColorCeldasInpar();
  cambiarColorCeldasPar();
});

function mostrarLineas() {
  const checkbox = document.getElementById("checkBoxLineasDeAyuda");
  const tablero = document.getElementById("tablero");
  var reinas = document.querySelectorAll(".reina");

  if (checkbox.checked) {
    reinas.forEach((reina) => {
      const fila = reina.parentElement.rowIndex;
      const columna = reina.cellIndex;
      resaltarLineasAtaque(fila, columna);
    });
  } else {
    limpiarLineasAtaque();
  }
}

function resaltarLineasAtaque(r, c) {
  const tablero = document.getElementById("tablero");
  var lineaAtaque = document.getElementById("lineaAtaque").value;

  let r1 = r,
    c1 = c,
    r2 = r,
    c2 = c;
  let r3 = r,
    c3 = c,
    r4 = r,
    c4 = c;

  for (let i = 0; i < 8; i++) {
    tablero.rows[r].cells[i].style.backgroundColor = lineaAtaque;
    tablero.rows[i].cells[c].style.backgroundColor = lineaAtaque;

    if (r1 < 8 && c1 < 8) {
      tablero.rows[r1++].cells[c1++].style.backgroundColor = lineaAtaque;
    }
    if (r2 > -1 && c2 < 8) {
      tablero.rows[r2--].cells[c2++].style.backgroundColor = lineaAtaque;
    }
    if (r3 < 8 && c3 > -1) {
      tablero.rows[r3++].cells[c3--].style.backgroundColor = lineaAtaque;
    }
    if (r4 > -1 && c4 > -1) {
      tablero.rows[r4--].cells[c4--].style.backgroundColor = lineaAtaque;
    }
  }
}

function limpiarLineasAtaque() {
  cambiarColorCeldasInpar();
  cambiarColorCeldasPar();
}

function quitarCheck() {
  document.getElementById("checkBoxLineasDeAyuda").checked = false;
  limpiarLineasAtaque();
}

function cambiarImagenReina(event) {
  const botonReina = event.target.closest('button');
  const nuevaFotoReina = botonReina.querySelector('img');

  const rutaDeImagen = nuevaFotoReina.src;
  const rutaRelativa = rutaDeImagen.replace(/^.*\/img\//, './img/');
  const rutaRelativaString = rutaRelativa.toString();
  const reinas = document.querySelectorAll(".reina");
  reinas.forEach((reina) => {
    reina.style.backgroundImage = `url(${rutaRelativa})`;
  });
  fotoReina = rutaRelativaString;
}

// hola

let soluciones = [
  [
    { fila: 0, col: 0 }, { fila: 1, col: 4 }, { fila: 2, col: 7 },
    { fila: 3, col: 5 }, { fila: 4, col: 2 }, { fila: 5, col: 6 },
    { fila: 6, col: 1 }, { fila: 7, col: 3 }
  ],
  [
    { fila: 0, col: 0 }, { fila: 1, col: 5 }, { fila: 2, col: 7 },
    { fila: 3, col: 2 }, { fila: 4, col: 6 }, { fila: 5, col: 3 },
    { fila: 6, col: 1 }, { fila: 7, col: 4 }
  ],
  [
    { fila: 0, col: 0 }, { fila: 1, col: 6 }, { fila: 2, col: 3 },
    { fila: 3, col: 5 }, { fila: 4, col: 7 }, { fila: 5, col: 1 },
    { fila: 6, col: 4 }, { fila: 7, col: 2 }
  ],
  [
    { fila: 0, col: 0 }, { fila: 1, col: 6 }, { fila: 2, col: 4 },
    { fila: 3, col: 7 }, { fila: 4, col: 1 }, { fila: 5, col: 3 },
    { fila: 6, col: 5 }, { fila: 7, col: 2 }
  ],
  [
    { fila: 0, col: 1 }, { fila: 1, col: 3 }, { fila: 2, col: 5 },
    { fila: 3, col: 7 }, { fila: 4, col: 2 }, { fila: 5, col: 0 },
    { fila: 6, col: 6 }, { fila: 7, col: 4 }
  ],
  [
    { fila: 0, col: 1 }, { fila: 1, col: 4 }, { fila: 2, col: 6 },
    { fila: 3, col: 0 }, { fila: 4, col: 2 }, { fila: 5, col: 7 },
    { fila: 6, col: 5 }, { fila: 7, col: 3 }
  ],
  [
    { fila: 0, col: 1 }, { fila: 1, col: 4 }, { fila: 2, col: 6 },
    { fila: 3, col: 3 }, { fila: 4, col: 0 }, { fila: 5, col: 7 },
    { fila: 6, col: 5 }, { fila: 7, col: 2 }
  ],
  [
    { fila: 0, col: 1 }, { fila: 1, col: 5 }, { fila: 2, col: 0 },
    { fila: 3, col: 6 }, { fila: 4, col: 3 }, { fila: 5, col: 7 },
    { fila: 6, col: 2 }, { fila: 7, col: 4 }
  ],
  [
    { fila: 0, col: 1 }, { fila: 1, col: 5 }, { fila: 2, col: 7 },
    { fila: 3, col: 2 }, { fila: 4, col: 0 }, { fila: 5, col: 3 },
    { fila: 6, col: 6 }, { fila: 7, col: 4 }
  ],
  [
    { fila: 0, col: 1 }, { fila: 1, col: 6 }, { fila: 2, col: 2 },
    { fila: 3, col: 5 }, { fila: 4, col: 7 }, { fila: 5, col: 4 },
    { fila: 6, col: 0 }, { fila: 7, col: 3 }
  ],
  [
    { fila: 0, col: 1 }, { fila: 1, col: 6 }, { fila: 2, col: 4 },
    { fila: 3, col: 7 }, { fila: 4, col: 0 }, { fila: 5, col: 3 },
    { fila: 6, col: 5 }, { fila: 7, col: 2 }
  ],
  [
    { fila: 0, col: 2 }, { fila: 1, col: 0 }, { fila: 2, col: 6 },
    { fila: 3, col: 4 }, { fila: 4, col: 7 }, { fila: 5, col: 1 },
    { fila: 6, col: 3 }, { fila: 7, col: 5 }
  ]
];

let indiceSolucionActual = -1; // Índice de la solución actual

// Función para verificar si es seguro colocar una reina en una celda
function esSeguro(tablero, fila, col) {
  // Verificar la misma columna
  for (let i = 0; i < fila; i++) {
    if (tablero[i][col] === 1) return false;
  }

  // Verificar diagonal superior izquierda
  for (let i = fila, j = col; i >= 0 && j >= 0; i--, j--) {
    if (tablero[i][j] === 1) return false;
  }

  // Verificar diagonal superior derecha
  for (let i = fila, j = col; i >= 0 && j < 8; i--, j++) {
    if (tablero[i][j] === 1) return false;
  }

  return true;
}

function mostrarSolucion(indice) {
  // Verifica que el índice esté dentro del rango de soluciones
  if (indice < 0 || indice >= soluciones.length) {
    console.error("Índice fuera de rango");
    return;
  }

  // Limpia el tablero completamente
  limpiarImagen();
  limpiarLineasAtaque();

  // Restablece el contador
  contador = 0;

  // Obtiene la solución correspondiente
  const solucion = soluciones[indice];

  // Ubica las reinas en las posiciones especificadas
  solucion.forEach(posicion => {
    ubicarReina(posicion.fila, posicion.col);
    contador++;
  });

  // Actualiza el índice de la solución actual
  indiceSolucionActual = indice;
}
function ubicarReina(fila, col) {
  const tablero = document.getElementById("tablero");
  const celda = tablero.rows[fila].cells[col];

  if (celda) {
    celda.style = `
      background-image: url(${fotoReina});
      background-size: 50px;
      background-repeat: no-repeat;
      background-position: center;`;
    celda.classList.add("reina");
  } else {
    console.error(`No se encontró la celda en fila ${fila}, columna ${col}`);
  }
}


function siguienteSolucion() {
  limpiarTablero(); // Limpia el tablero antes de mostrar la nueva solución

  if (soluciones.length === 0) return; // Si no hay soluciones, salir

  if (indiceSolucionActual < soluciones.length - 1) {
    indiceSolucionActual++; // Avanzar al siguiente índice
  } else {
    indiceSolucionActual = 0; // Reiniciar al inicio
  }

  mostrarSolucion(indiceSolucionActual); // Mostrar la solución actual
  limpiar()
}

function limpiarTablero() {
  const celdasConReina = document.querySelectorAll('.reina'); // Selecciona todas las celdas con la clase 'reina'
  celdasConReina.forEach((celda) => {
    celda.classList.remove('reina'); // Elimina la clase 'reina'
  });
}

function reasignarEventos() {
  document.querySelectorAll("td").forEach((td) => {
    td.onclick = function () {
      showQueen(this);
    };
  });
}

function reiniciarJuego() {
  limpiarTablero();
  limpiarImagen();
  // Reinicia variables globales aquí, si las tienes
  // Por ejemplo: estadoTablero = [];
  reasignarEventos(); // Reasigna eventos si es necesario
}

function recargarPagina() {
  location.reload(); // Recarga la página actual
}