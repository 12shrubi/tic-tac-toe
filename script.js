const cells = document.querySelectorAll('[data-cell]');
const messageElement = document.querySelector('.message');
const resultScreen = document.querySelector('.result-screen');
const resultMessage = document.querySelector('.result-message');
const newGameButton = document.getElementById('newGameButton');

let isXTurn = true;
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(event) {
  const cell = event.target;

  // Add X or O
  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = isXTurn ? 'X' : 'O';

  // Disable cell
  cell.removeEventListener('click', handleClick);

  // Check win or draw
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    // Switch turns
    isXTurn = !isXTurn;
    setMessage();
  }
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    resultMessage.textContent = "It's a draw!";
  } else {
    resultMessage.textContent = `${isXTurn ? 'X' : 'O'} wins!`;
  }
  showResultScreen();
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'));
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function setMessage() {
  messageElement.textContent = `${isXTurn ? 'X' : 'O'}'s turn`;
}

function restartGame() {
  isXTurn = true;
  gameActive = true;
  resultScreen.classList.add('hidden');
  messageElement.textContent = "X's turn";

  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function showResultScreen() {
  resultScreen.classList.remove('hidden');
}

// Initialize game
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});
setMessage();

// New Game button
newGameButton.addEventListener('click', restartGame);
