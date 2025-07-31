//your JS code here. If required.
const board = document.getElementById("board");
const message = document.querySelector(".message");
const submitBtn = document.getElementById("submit");

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let currentName = "";
let gameActive = false;
let moves = 0;
const gameState = Array(9).fill("");

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim() || "Player 1";
  player2 = document.getElementById("player2").value.trim() || "Player 2";
  currentPlayer = "X";
  currentName = player1;
  gameActive = true;
  moves = 0;
  gameState.fill("");

  board.innerHTML = "";
  board.style.display = "grid";
  message.textContent = `${currentName}, you're up`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = (i + 1).toString(); // id from 1 to 9
    cell.addEventListener("click", handleMove);
    board.appendChild(cell);
  }
});

function handleMove(e) {
  if (!gameActive) return;

  const index = parseInt(e.target.id) - 1;
  if (gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  moves++;

  if (checkWin()) {
    message.textContent = `${currentName}, congratulations you won!`;
    gameActive = false;
    return;
  }

  if (moves === 9) {
    message.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch turns
  if (currentPlayer === "X") {
    currentPlayer = "O";
    currentName = player2;
  } else {
    currentPlayer = "X";
    currentName = player1;
  }

  message.textContent = `${currentName}, you're up`;
}

function checkWin() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}
