const symbols = ['🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇'];
let firstCard, secondCard;
let score = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = symbol;
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (this === firstCard) return; // Prevent double-clicking the same card

  this.classList.add('flipped');
  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.textContent === secondCard.textContent;
  if (isMatch) {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    resetCards();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

function initializeGame() {
  const gameBoard = document.getElementById('game-board');
  shuffle(symbols).forEach((symbol) => {
    const card = createCard(symbol);
    gameBoard.appendChild(card);
  });
}

initializeGame();
