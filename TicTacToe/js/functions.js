let board = Array(9).fill(null); // Inicializa el tablero vacío
let nextPlayer = false;

let playerXImage = "./img/x.png"; // Imagen predeterminada para "X"
let playerOImage = "./img/o.png"; // Imagen predeterminada para "O"

let timerInterval; // Variable para almacenar el intervalo del cronómetro
let secondsElapsed = 0; // Tiempo transcurrido en segundos

function startTimer() {
  const timerElement = document.getElementById("time");
  clearInterval(timerInterval);
  secondsElapsed = 0;

  timerInterval = setInterval(() => {
    secondsElapsed++;

    // Verifica si se alcanzó el tiempo máximo
    if (secondsElapsed >= MAX_TIME) {
      handleTimeOut();
      return; // Detiene la ejecución aquí
    }

    const minutes = Math.floor(secondsElapsed / 60);
    const seconds = secondsElapsed % 60;
    timerElement.innerHTML = `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval); // Detiene el cronómetro
}

function resetTimer() {
  stopTimer(); // Detiene el cronómetro
  secondsElapsed = 0; // Reinicia el tiempo transcurrido
  document.getElementById("time").innerHTML = "00 : 00"; // Reinicia el texto del cronómetro
}

const MAX_TIME = 181; // 3 minutos en segundos

// Función para manejar el tiempo agotado
function handleTimeOut() {
  const buttons = document.querySelectorAll("button[type='button']"); // Selector actualizado
  buttons.forEach(button => button.disabled = true);
  document.getElementById("message").innerHTML = "Empate!";
  stopTimer();
}

function turn(buttonPar) {
  const index = buttonPar.dataset.index; // Obtén el índice de la celda
  if (board[index]) return; // Si ya está ocupada, no hacer nada

  buttonPar.disabled = true;
  board[index] = nextPlayer ? "O" : "X"; // Actualiza el tablero

  // Usa las imágenes seleccionadas en lugar de texto
  buttonPar.innerHTML = `<img src="${nextPlayer ? playerOImage : playerXImage}" class="w-full h-full object-contain" />`;

  nextPlayer = !nextPlayer;

  document.getElementById("turn").innerHTML = nextPlayer
    ? "Turno: O"
    : "Turno: X";

  const result = checkWinner(board); // Verifica si hay un ganador

  if (result) {
    const { winner, combination } = result;
    highlightWinningLine(combination); // Asegúrate de obtener la combinación
    document.getElementById("message").innerHTML = `Ganador: ${winner}`;
    stopTimer();

    // Deshabilitar todos los botones del juego
    const buttons = document.querySelectorAll("button[type='button']");
    buttons.forEach(button => button.disabled = true);
  }

  console.log("Coordenadas:", x1, y1, x2, y2);
  console.log("Largo y ángulo:", length, angle);
  console.log("Color de la línea:", line.style.backgroundColor);
}

function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2], // Fila superior
    [3, 4, 5], // Fila del medio
    [6, 7, 8], // Fila inferior
    [0, 3, 6], // Columna izquierda
    [1, 4, 7], // Columna central
    [2, 5, 8], // Columna derecha
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal secundaria
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return { winner: board[a], combination }; // Devuelve el ganador y la combinación ganadora
    }
  }

  return null; // No hay ganador
}

function resetGame() {
  resetTimer();
  startTimer();
  board.fill(null);
  const buttons = document.querySelectorAll("button[type='button']"); // Selector actualizado
  buttons.forEach((button) => {
    button.innerHTML = ""; // Usar innerHTML en lugar de value
    button.disabled = false;
  });
  nextPlayer = false;
  document.getElementById("turn").innerHTML = "Turno: X";
  document.getElementById("message").innerHTML = "";
  const existingLine = document.querySelector(".absolute");
  if (existingLine) existingLine.remove();
}

function highlightWinningLine(combination) {
  const boardContainer = document.querySelector(".relative.inline-block"); // Contenedor del tablero
  const boardElement = document.querySelector("table");
  let line = document.querySelector(".winning-line");

  // Crea la línea si no existe
  if (!line) {
    line = document.createElement("div");
    line.classList.add("absolute", "winning-line", "h-1", "z-50", "transform", "origin-left", "bg-red-500");
    boardContainer.appendChild(line); // Agrega la línea al contenedor (no al padre de la tabla)
  }

  // Obtén las posiciones relativas al contenedor
  const boardRect = boardContainer.getBoundingClientRect();
  const [start, , end] = combination;

  // Selecciona los botones correctamente
  const startButton = document.querySelector(`button[data-index="${start}"]`);
  const endButton = document.querySelector(`button[data-index="${end}"]`);

  // Coordenadas de los centros de los botones (relativas al contenedor)
  const startRect = startButton.getBoundingClientRect();
  const endRect = endButton.getBoundingClientRect();

  const x1 = startRect.left - boardRect.left + startRect.width / 2;
  const y1 = startRect.top - boardRect.top + startRect.height / 2;
  const x2 = endRect.left - boardRect.left + endRect.width / 2;
  const y2 = endRect.top - boardRect.top + endRect.height / 2;

  // Cálculo de longitud y ángulo
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // Aplica estilos
  line.style.width = `${length}px`;
  line.style.height = "4px";
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.transform = `rotate(${angle}deg)`;
  line.style.backgroundColor = document.getElementById("lineColor").value;
  line.style.zIndex = "50";
}

function updateLineColor() {
  const line = document.querySelector(".winning-line"); // Busca la línea existente
  if (line) {
    const colorPicker = document.getElementById("lineColor");
    line.style.backgroundColor = colorPicker.value; // Actualiza el color de la línea
  }
}

function selectImages(imageX, imageO) {
  playerXImage = imageX; // Actualiza la imagen para "X"
  playerOImage = imageO; // Actualiza la imagen para "O"

  // Actualiza las imágenes ya colocadas en el tablero
  const buttons = document.querySelectorAll("button[data-index]"); // Selecciona los botones del tablero
  buttons.forEach((button, index) => {
    if (board[index] === "X") {
      button.innerHTML = `<img src="${playerXImage}" class="w-full h-full object-contain" />`;
    } else if (board[index] === "O") {
      button.innerHTML = `<img src="${playerOImage}" class="w-full h-full object-contain" />`;
    }
  });

  document.getElementById("message").innerHTML = "Imágenes seleccionadas!";
}

function updateCellColors() {
  const color1 = document.getElementById("cellColor1").value; // Obtén el color del primer input
  const color2 = document.getElementById("cellColor2").value; // Obtén el color del segundo input

  const buttons = document.querySelectorAll("button[data-index]"); // Selecciona todas las celdas del tablero
  buttons.forEach((button, index) => {
    // Alterna los colores según el índice (par o impar)
    button.style.backgroundColor = index % 2 === 0 ? color1 : color2;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCellColors(); // Llama a la función al cargar la página
});