// DOM elements
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');
const restartButton = document.querySelector('.btn__restart');
let missed = 0;

// Phrases Array
const phrases = [
  'sharks dont nibble',
  'catch and release',
  'fish on',
  'dont rock the boat',
  'fish out of water'
];

// Return a random phrase from an array
const getRandomPhraseArray = arr => {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum].split('');
}

// Add the letters of a string to the display
const addPhraseToDisplay = arr => {
  const ul = phrase.querySelector('ul');
  ul.innerHTML = ''; // Clear previous phrases
  arr.forEach(char => {
    const li = document.createElement('li');
    li.textContent = char;
    li.className = char === ' ' ? 'space' : 'letter';
    ul.appendChild(li);
  });
}

// Check if a letter is in the phrase
const checkLetter = button => {
  const letters = document.querySelectorAll('.letter');
  let match = null;
  letters.forEach(letter => {
    if (button.textContent.toLowerCase() === letter.textContent.toLowerCase()) {
      letter.classList.add('show');
      match = letter.textContent;
    }
  });
  return match;
}

// Check if the game has been won or lost
const checkWin = () => {
  const letters = document.querySelectorAll('.letter');
  const shownLetters = document.querySelectorAll('.show');
  const title = overlay.querySelector('h2');

  if (letters.length === shownLetters.length) {
    endGame('win', 'You Win!');
    startButton.style.display = 'none';
  } else if (missed > 4) {
    endGame('lose', 'You Lose!');
    startButton.style.display = 'none';
  }
}

// End game w/ Win or Lose
const endGame = (result, message) => {
  overlay.className = result;
  overlay.querySelector('h2').textContent = message;
  restartButton.textContent = 'Restart';
  restartButton.style.display = 'inline';
  overlay.style.display = 'flex';
}


// Listen for the start game button to be pressed
startButton.addEventListener('click', function () {
    overlay.style.display = 'none';
    const phraseArray = getRandomPhraseArray(phrases);
    addPhraseToDisplay(phraseArray);
  });

// Reset the game
const resetGame = () => {
  missed = 0;
  document.querySelectorAll('.tries img').forEach(img => img.src = 'images/liveHeart.png');
  qwerty.querySelectorAll('button').forEach(button => button.classList.remove('chosen'));
  overlay.style.display = 'none';
  addPhraseToDisplay(getRandomPhraseArray(phrases));
  // Generate and display a new random phrase
  const newPhraseArray = getRandomPhraseArray(phrases);
  addPhraseToDisplay(newPhraseArray);
}

// Listen for restart button to be pressed
restartButton.addEventListener('click', resetGame);

// Listen for the on-screen buttons to be pressed
qwerty.addEventListener("click", e => {
  if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
    e.target.classList.add('chosen');
    const letterFound = checkLetter(e.target);
    if (!letterFound) {
      missed++;
      document.querySelectorAll('.tries img')[missed - 1].src = 'images/lostHeart.png';
    }
    checkWin();
  }
});

