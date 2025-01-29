var nextPlayer = false;

function turn(buttonPar) {
  buttonPar.disabled = true;
  nextPlayer ? (buttonPar.value = "O") : (buttonPar.value = "X");
  nextPlayer = !nextPlayer;
  document.getElementById("turn").innerHTML = nextPlayer
    ? "Turno: O"
    : "Turno: X";
}