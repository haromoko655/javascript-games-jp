(function() {
const STATES = {
    WAITING: 'waiting',
    READY: 'ready',
    GO: 'go',
    RESULT: 'result',
    TOO_EARLY: 'too_early'
};

let state = STATES.WAITING;
let startTime = 0;
let timeoutId = null;
let attempts = [];
let bestTime = Infinity;

const box = document.getElementById('reactionBox');
const message = document.getElementById('message');
const resultText = document.getElementById('resultText');
const attemptsDisplay = document.getElementById('attempts');
const averageDisplay = document.getElementById('average');
const bestDisplay = document.getElementById('best');

function setState(newState) {
    state = newState;
    box.className = 'reaction-box ' + state;

    switch (state) {
        case STATES.WAITING:
            message.textContent = 'クリックして開始';
            resultText.textContent = '';
            break;
        case STATES.READY:
            message.textContent = '画面が緑になるまで待ってください…';
            resultText.textContent = '';
            break;
        case STATES.GO:
            message.textContent = '今すぐクリック！';
            resultText.textContent = '';
            break;
        case STATES.RESULT:
            message.textContent = 'クリックして再挑戦';
            break;
        case STATES.TOO_EARLY:
            message.textContent = '早すぎます！クリックして再挑戦';
            resultText.textContent = '';
            break;
    }
}

function startRound() {
    setState(STATES.READY);

    // Random delay between 1.5 and 5 seconds
    const delay = 1500 + Math.random() * 3500;

    timeoutId = setTimeout(() => {
        setState(STATES.GO);
        startTime = performance.now();
    }, delay);
}

function handleClick() {
    switch (state) {
        case STATES.WAITING:
        case STATES.RESULT:
        case STATES.TOO_EARLY:
            startRound();
            break;

        case STATES.READY:
            // Clicked too early
            clearTimeout(timeoutId);
            setState(STATES.TOO_EARLY);
            break;

        case STATES.GO:
            const reactionTime = Math.round(performance.now() - startTime);
            recordAttempt(reactionTime);
            break;
    }
}

function recordAttempt(time) {
    attempts.push(time);

    if (time < bestTime) {
        bestTime = time;
    }

    setState(STATES.RESULT);
    showResult(time);
    updateStats();
}

function showResult(time) {
    let rating = '';
    if (time < 200) {
        rating = 'すばらしい！';
    } else if (time < 250) {
        rating = 'すごい！';
    } else if (time < 300) {
        rating = 'とても良い！';
    } else if (time < 350) {
        rating = '良い';
    } else if (time < 400) {
        rating = '平均的';
    } else {
        rating = '練習を続けましょう';
    }

    resultText.innerHTML = `<span class="time">${time} ミリ秒</span><span class="rating">${rating}</span>`;
}

function updateStats() {
    attemptsDisplay.textContent = attempts.length;

    if (attempts.length > 0) {
        const avg = Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
        averageDisplay.textContent = avg + ' ミリ秒';
        bestDisplay.textContent = bestTime + ' ミリ秒';
    }
}

function resetGame() {
    clearTimeout(timeoutId);
    attempts = [];
    bestTime = Infinity;
    setState(STATES.WAITING);
    attemptsDisplay.textContent = '0';
    averageDisplay.textContent = '-';
    bestDisplay.textContent = '-';
}

function init() {
    const box = document.getElementById('reactionBox');
    if (box) {
        box.addEventListener('click', handleClick);
        setState(STATES.WAITING);
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.resetGame = resetGame;
})();
