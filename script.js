const textDisplay = document.getElementById('text-display');
const timeLeft = document.getElementById('time-left');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');

const words = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew',
    'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry',
    'strawberry', 'tangerine', 'ugli', 'watermelon'
];

let currentWords = [];
let currentIndex = 0;
let time = 60;
let interval;
let correctKeystrokes = 0;
let totalKeystrokes = 0;

function getRandomWords() {
    currentWords = [];
    for (let i = 0; i < 20; i++) {
        currentWords.push(words[Math.floor(Math.random() * words.length)]);
    }
    displayWords();
    currentIndex = 0;
}

function displayWords() {
    textDisplay.innerHTML = '';
    currentWords.join(' ').split('').forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        charSpan.id = `char-${index}`;
        charSpan.classList.add('default');
        textDisplay.appendChild(charSpan);
    });
}

function startGame() {
    time = 60;
    correctKeystrokes = 0;
    totalKeystrokes = 0;
    getRandomWords();
    timeLeft.textContent = time;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 0;
    interval = setInterval(updateTime, 1000);
}

function updateTime() {
    if (time > 0) {
        time--;
        timeLeft.textContent = time;
    } else {
        clearInterval(interval);
        calculateStats();
    }
}

function calculateStats() {
    const wordsTyped = correctKeystrokes / 5;
    const wpm = (wordsTyped / (60 - time)) * 60;
    const accuracy = (correctKeystrokes / totalKeystrokes) * 100;
    
    wpmDisplay.textContent = Math.round(wpm);
    accuracyDisplay.textContent = Math.round(accuracy);
}

document.addEventListener('keydown', (e) => {
    const typedChar = e.key;
    const targetChar = currentWords.join('')[currentIndex];
    
    totalKeystrokes++;
    
    if (typedChar === targetChar) {
        highlightCharacter(currentIndex, 'correct');
        correctKeystrokes++;
    } else {
        highlightCharacter(currentIndex, 'incorrect');
    }
    
    currentIndex++;
    highlightCurrentCharacter(currentIndex);
    
    if (currentIndex === currentWords.join('').length) {
        calculateStats();
    }
});

function highlightCharacter(index, status) {
    const charElement = document.querySelector(`#char-${index}`);
    if (charElement) {
        charElement.classList.remove('default', 'correct', 'incorrect');
        charElement.classList.add(status);
    } else {
        console.error(`Element with ID #char-${index} not found`);
    }
}

function highlightCurrentCharacter(index) {
    const charElements = document.querySelectorAll('.current');
    charElements.forEach(el => el.classList.remove('current'));
    if (index < currentWords.join('').length) {
        const currentElement = document.querySelector(`#char-${index}`);
        if (currentElement) {
            currentElement.classList.add('current');
        } else {
            console.error(`Current element with ID #char-${index} not found`);
        }
    }
}

restartBtn.addEventListener('click', () => {
    clearInterval(interval);
    startGame();
});

document.addEventListener('DOMContentLoaded', startGame);
