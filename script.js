const cardsArray = ['🍎', '🍌', '🍇', '🍒', '🍋', '🍉', '🍎', '🍌', '🍇', '🍒', '🍋', '🍉'];

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let matchedPairs = 0;
const totalPairs = cardsArray.length / 2;

// Shuffle cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create game board
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle(cardsArray);

    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;

        cardElement.innerHTML = `
            <div class="front"></div>
            <div class="back">${card}</div>
        `;

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    resetState();
    updateScore();
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Flip card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check for match
function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    if (isMatch) {
        score += 10; // Increment score for a match
        matchedPairs++; // Increment matched pairs
        disableCards();
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                alert('Congratulations! You completed the game!');
            }, 500);
        }
    } else {
        unflipCards();
    }

    updateScore(); // Update score display
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board state
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Reset game state
function resetState() {
    score = 0;
    matchedPairs = 0;
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

// Restart game
function restartGame() {
    resetState();
    createBoard();
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    updateScore();

    // Add event listener to the reset button
    document.getElementById('reset-button').addEventListener('click', restartGame);
});
