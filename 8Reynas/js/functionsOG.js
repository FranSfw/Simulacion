var contador = 0;

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
                   background-image: url(./img/corona.png);
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