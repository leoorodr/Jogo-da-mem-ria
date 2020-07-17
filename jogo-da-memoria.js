const cartas = document.querySelectorAll('.carta');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//Adicionando o evento de flip nas cartas
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');


    if(!hasFlippedCard){
        //click na primeira carta
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 

    //click na segunda carta
    secondCard = this;

    checkForMatch();
     
}

//função para verificar se as carta são as mesmas
function checkForMatch() {
   let isMatch = firstCard.dataset.framework === 
   secondCard.dataset.framework;

   isMatch ? disableCards() : unflipCards();
}

//função para remover o flip das cartas caso sejam iguais
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funçao para desvirar as cartas caso não sejam iguais
function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}
 
//o lockBoard impede o usuário de virar as cartas antes que as cartas 
//que já estejam viradas retornem para a posição inicial

//a função resetBoard coririge um erro caso o usuário clique duas vezes na mesma carta
//esse erro removia a função de flip da carta caso a segunda carta não fosse a mesma

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função para embaralhar as cartas
(function shuffle() {
    cartas.forEach(carta => {
        let randomPos = Math.floor(Math.random() * 12);
        carta.style.order = randomPos;
    });
})();

cartas.forEach(carta => carta.addEventListener('click', flipCard));