const cardsArray = ['🍎', '🍌', '🍇', '🍒', '🍋', '🍉', '🍎', '🍌', '🍇', '🍒', '🍋', '🍉'];

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let matchedPairs = 0;
let playerName = '';
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
                alert(`Congratulations, ${playerName}! You completed the game!`);
                saveScore();
                showLeaderboard();
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

// Save player score to local storage
function saveScore() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, score });
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score descending
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Display leaderboard
function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(listItem);
    });
}

// Restart game
function restartGame() {
    resetState();
    createBoard();
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    playerName = prompt('Enter your name:') || 'Player'; // Prompt for player name
    createBoard();
    updateScore();
    showLeaderboard();

    // Add event listener to the reset button
    document.getElementById('reset-button').addEventListener('click', restartGame);
});
// Display leaderboard with fade-in effect
function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(listItem);
    });

    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.style.display = 'block'; // Ensure it's visible
    leaderboardElement.classList.add('animated'); // Add animation class
}
