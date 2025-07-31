let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

document.getElementById('submit').addEventListener('click', () => {
  player1 = document.getElementById('player-1').value.trim();
  player2 = document.getElementById('player-2').value.trim();
  if (player1 === '' || player2 === '') {
    alert("Please enter both player names");
    return;
  }

  document.getElementById('player-form').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  updateMessage();
});

function updateMessage() {
  const messageDiv = document.querySelector('.message');
  if (!gameOver) {
    const name = currentPlayer === 'X' ? player1 : player2;
    messageDiv.textContent = `${name}, you're up`;
  }
}

function checkWinner() {
  const winCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const combo of winCombinations) {
    const [a,b,c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const winner = board[a] === 'X' ? player1 : player2;
      document.querySelector('.message').textContent = `${winner}, congratulations you won!`;
      document.getElementById(`${a+1}`).classList.add('winner');
      document.getElementById(`${b+1}`).classList.add('winner');
      document.getElementById(`${c+1}`).classList.add('winner');
      gameOver = true;
      return;
    }
  }

  if (!board.includes('')) {
    document.querySelector('.message').textContent = "It's a draw!";
    gameOver = true;
  }
}

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id) - 1;
    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
    if (!gameOver) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateMessage();
    }
  });
});
