window.addEventListener('load', init);

//global var
let time = 6;
let score = 0;
let isPlaying;
let highScore;
const hSSave = 'highscore';

//DOM var
const wordInput = document.querySelector('#uinput');
const currentWord = document.querySelector('#wurd');
const timeDisplay = document.querySelector('#timeleft');
const scoreDisplay = document.querySelector('#score');
const seconds = document.querySelector('#seconds');
const message = document.querySelector('#msg');
const startTime = document.querySelector('#seconds');
const lvl = document.querySelector('#lvl');
const displayHS = document.querySelector('#highScore');

//Words array
const words = [
  'blooded',
  'lwoff',
  'halm',
  'aplasia',
  'isadore',
  'roofing',
  'kalmuk',
  'tugboat',
  'fouqu',
  'arpeggios',
  'shelliest',
  'misdated',
  'wigglier',
  'reposedly',
  'stun',
  'highland',
  'humbugged',
  'reposer',
  'baronage',
  'pruning'
];

//start the game
function init() {
  // get the highscore
  let scoreStr = localStorage.getItem(hSSave);
  if ( scoreStr == undefined) {
    highScore = 0;
  } else {
    highScore = parseInt(scoreStr);
  }

  displayHS.innerHTML = 'Highscore: ' + highScore;
  //call the word selector
  showWords(words);
  //check player input
  wordInput.addEventListener('input', startMatch);
  //call the timer
  setInterval(countDown, 1000);
  //check to see if the games being played
  setInterval(checkStatus, 50);
}

//start match
function startMatch() {
  if(matchWords()) {
    isPlayer = true;
    time = parseInt(lvl.value);
    //set to 6, 1's for loading the pg
    time = time + 1;
    showWords(words);
    startTime.innerHTML = time - 1;
    wordInput.value = '';
    message.innerHTML = '';
    message.style.color = '#fff';
    wordInput.style.border = 'none';
    score++;

        //check highscore
    if (score > highScore) {
      highScore = score
      localStorage.setItem(hSSave, highScore);
    } else {
      highScore = highScore;
    }

    console.log(time);
  }
  scoreDisplay.innerHTML = 'Score: ' + score;
  displayHS.innerHTML = 'Highscore: ' + highScore;
}

//match the word
function matchWords() {
  if(wordInput.value === currentWord.innerHTML){
    return true;
     }else {
       message = '';
       return false;
     }
}

//select a word and display for the player
function showWords(words) {
  //create random numb to access words array
  const random = Math.floor(Math.random() * words.length) + 1;
  //output the random word to page
  currentWord.innerHTML = words[random];
}

//count down timer
function countDown() {
  if(time > 0){
     //decrease the time
    time--
     } else if(time === 0) {
       //game over
       isPlaying = false;
       }
  timeDisplay.innerHTML = 'Time left: ' + time;
}

//check if the games being played
function checkStatus() {
  if(!isPlaying && time === 0){
     message.innerHTML = 'Game Over!!!';
    //set to -1 so restarting the game doesnt give you a point
    score = -1;
    message.style.color = 'red';
    wordInput.style.border = 'solid red';
     }
}