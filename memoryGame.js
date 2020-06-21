const cards = document.querySelectorAll('.memory-card');
let flippedCard = false;
let firtsCard, secondCard;
let lockBoard = false;
let lowScore = localStorage.getItem("low-score");
if(lowScore) {
  document.getElementById('bestScore').innerText = lowScore;
}

function flipCard() {
  if(lockBoard) return;
  if(this === firtsCard) return;

  this.classList.add('flip')

  if (!flippedCard) {
    flippedCard = true;
    firtsCard = this;
    return;
  }
    flippedCard = false;
    secondCard = this;
   
    checkForMatch();
  
}




function checkForMatch() {
  let isMatch = firtsCard.dataset.framework === secondCard.dataset.framework;
  
  isMatch ?  disableCards() : unflippedCards()
    
}

function disableCards() {
  firtsCard.removeEventListener("click", flipCard)
  secondCard.removeEventListener("click", flipCard)
  resetBoard()
}

function unflippedCards() {
  lockBoard = true;
  setTimeout(() => {
    firtsCard.classList.remove('flip')
    secondCard.classList.remove('flip')

    lockBoard = false;
  }, 1000)
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firtsCard, secondCard] = [null, null]
}


(function shuffleCards(){
  cards.forEach(card => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  })
}) ();

functin reStart() {

};

cards.forEach(card => card.addEventListener('click', flipCard));