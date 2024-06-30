const textDisplay = document.getElementById('text-display');
const timeLeft = document.getElementById('time-left');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const restartBtnStats = document.getElementById('restart-btn-stats');
const statsSection = document.getElementById('stats');

const sentences = [
    'The quick brown fox jumps over the lazy dog.',
    'A journey of a thousand miles begins with a single step.',
    'To be or not to be, that is the question.',
    'All that glitters is not gold.',
    'The pen is mightier than the sword.',
    'Actions speak louder than words.',
    'A picture is worth a thousand words.',
    'When in Rome, do as the Romans do.',
    'The early bird catches the worm.',
    'Better late than never.',
    'Practice makes perfect.',
    'An apple a day keeps the doctor away.',
    'Early to bed and early to rise makes a man healthy, wealthy, and wise.',
    'You can\'t judge a book by its cover.',
    'The grass is always greener on the other side.',
    'A watched pot never boils.',
    'A stitch in time saves nine.',
    'Barking up the wrong tree.',
    'Beauty is in the eye of the beholder.',
    'Birds of a feather flock together.'
];

let currentSentence = '';
let currentIndex = 0;
let time = 60;
let interval;
let correctKeystrokes = 0;
let totalKeystrokes = 0;
let incorrectKeystrokes = 0;

function getRandomSentence() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    displaySentence();
    currentIndex = 0;
}

function displaySentence() {
    textDisplay.innerHTML = '';
    currentSentence.split('').forEach((char, index) => {
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
    incorrectKeystrokes = 0;
    getRandomSentence();
    timeLeft.textContent = time;
    wpmDisplay.textContent = 0;
    accuracyDisplay.textContent = 0;
    statsSection.style.display = 'none'; 
    textDisplay.style.display = 'block'; 
    interval = setInterval(updateTime, 1000);
}

function updateTime() {
    if (time > 0) {
        time--;
        timeLeft.textContent = time;
    } else {
        clearInterval(interval);
        calculateStats();
        showStats();
    }
}

function calculateStats() {
    const wordsTyped = correctKeystrokes / 5;
    const wpm = (wordsTyped / 60) * 60;
    const accuracy = (correctKeystrokes / totalKeystrokes) * 100;
    
    wpmDisplay.textContent = Math.round();
    accuracyDisplay.textContent = Math.round(accuracy);
}

function showStats() 
    statsSection.style.display = 'block'; 
    textDisplay.style.display = 'none'; 


document.addEventListener('keydown', (e) => {
    const typedChar = e.key;
    const targetChar = currentSentence[currentIndex];

    if (!typedChar.match(/^[a-zA-Z\s]$/) && typedChar !== 'Backspace') {
        return;
    }

    if (typedChar === 'Backspace') {
        if (currentIndex > 0) {
            currentIndex--;
            const previousCharElement = document.querySelector(`#char-${currentIndex}`);
            previousCharElement.classList.remove('current', 'incorrect', 'correct');
            previousCharElement.classList.add('default');
            highlightCurrentCharacter(currentIndex);
        }
        return;
    }

    totalKeystrokes++;
    
    if (typedChar === targetChar) {
        highlightCharacter(currentIndex, 'correct');
        correctKeystrokes++;
    } else {
        highlightCharacter(currentIndex, 'incorrect');
        incorrectKeystrokes++;
    }

    currentIndex++;
    highlightCurrentCharacter(currentIndex);
    
    if (current === currentSentence.length) {
        clearInterval(interval);
        calculateStats();
        showStats();
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
    if (index < currentSentence.length) {
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
});

restartBtnStats.addEventListener('click', () => {
    clearInterval(interval);
    startGame();
});

document.addEventListener('DOMContentLoaded', startGame);
