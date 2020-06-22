const cards = document.querySelectorAll('.memory-card');
const currentScore = document.querySelector("#currentScore");
const bestScore = document.querySelector("#bestScore");
let flippedCard = false;
let firtsCard, secondCard;
let lockBoard = false;
let resetButton = document.querySelector('#reset')
let cardCounter = 0;
let gameOver = 0;
let lowScore = localStorage.getItem("low-score"); // Track best score in local storage

if (lowScore) {
    document.getElementById("bestScore").innerText = lowScore;
}
resetButton.addEventListener('click', function() {
  location.reload();
});

function flipCard() {
  if(lockBoard) return;
  if(this === firtsCard) return;

  this.classList.add('flip')

  if (!flippedCard) {
    flippedCard = true;
    firtsCard = this;
    cardCounter++;
    currentScore.textContent = cardCounter
    return;
  }
    flippedCard = false;
    secondCard = this;
    cardCounter++;
    currentScore.textContent = cardCounter;
   
    checkForMatch();
  
}




function checkForMatch() {
  let isMatch = firtsCard.dataset.framework === secondCard.dataset.framework;
  
  isMatch ?  disableCards() : unflippedCards()
    
}

function disableCards() {
  firtsCard.removeEventListener("click", flipCard)
  secondCard.removeEventListener("click", flipCard)
  gameOver++;
  if(gameOver === 6) {
    setTimeout(function() {
      endGame();
    }, 500)
  }
  resetBoard()
}

function unflippedCards() {
  lockBoard = true;
  setTimeout(() => {
    firtsCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    resetBoard();
  }, 1000)
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firtsCard, secondCard] = [null, null]
}

function endGame() {
  if (lowScore > currentScore.innerText || !lowScore) {
      localStorage.setItem("low-score", currentScore.innerText);
      bestScore.innerText = currentScore.innerText;
  }
}

(function shuffleCards(){
  cards.forEach(card => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  })
}) ();

cards.forEach(card => card.addEventListener('click', flipCard));