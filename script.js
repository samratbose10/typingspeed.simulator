let startTime;
let timerInterval;
let isTyping = false;

const textToTypeElement = document.getElementById('text-to-type');
const userInput = document.getElementById('user-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const restartButton = document.getElementById('restart-button');

const textToType = textToTypeElement.innerText.trim();

userInput.addEventListener('input', () => {
    if (!isTyping) {
        startTyping();
    }

    const typedText = userInput.value;

    if (typedText === textToType.substring(0, typedText.length)) {
        userInput.style.borderColor = 'green';
        if (typedText === textToType) {
            endTyping();
        }
    } else {
        userInput.style.borderColor = 'red';
    }
});

restartButton.addEventListener('click', restart);

function startTyping() {
    isTyping = true;
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}

function endTyping() {
    clearInterval(timerInterval);
    isTyping = false;
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
    const wordsTyped = textToType.split(' ').length;
    const wpm = Math.round((wordsTyped / timeTaken) * 60);

    timerElement.innerText = timeTaken.toFixed(2);
    wpmElement.innerText = wpm;
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const timeElapsed = (currentTime - startTime) / 1000;
    timerElement.innerText = timeElapsed.toFixed(2);
}

function restart() {
    userInput.value = '';
    timerElement.innerText = '0';
    wpmElement.innerText = '0';
    userInput.style.borderColor = '#ccc';
    clearInterval(timerInterval);
    isTyping = false;
}
