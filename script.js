/* jshint browser: true */
/* global console*/

'use strict';
// Selecting elements
let score1 = document.querySelector('#score--0');
let score2 = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let currentEl1 = document.querySelector('#current--0');
let currentEl2 = document.querySelector('#current--1');
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

//additional variables
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let currentScore;
let activePlayer;
let scores;
let playGame;


// Starting conditions
const init = function(){
    score1.textContent = 0;
    score2.textContent = 0;
    diceEl.classList.add('hidden');
    currentEl1.textContent = 0;
    currentEl1.textContent = 0;
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    currentScore = 0;
    activePlayer = 0;
    scores = [0,0];
    playGame = true;
};


const switchPlayer = function(){
//switch to the next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    currentScore = 0;

    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
};

init();
// Rolling dice functionality
//btnRoll
btnRoll.addEventListener('click', function(){
    //1. generating a random dice roll
    if (playGame){ 
        let dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove("hidden");
    let diceString = 'dice-' + String(dice) + '.png';
    console.log(diceString);
    diceEl.src=diceString;

    //3. Check for rolled 1: if true switch to the next player
    if (dice !== 1){
        currentScore += dice;
        console.log(currentScore);
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
        switchPlayer();       
    }
    }
});


//btnHold
btnHold.addEventListener('click', () => {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).
    textContent = scores[activePlayer];
    //check if player's score > 20
    if (scores[activePlayer] > 20) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        playGame = false;
        diceEl.classList.add('hidden');
    } else {
       
    }
    //switch to the next player
    switchPlayer();
});



//btnNew
btnNew.addEventListener('click', () => {
    init();
});