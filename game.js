
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpCount = document.querySelector('#jump-count');
const gameOverScreen = document.querySelector('.game-over-screen');
const gameOverMessage = document.querySelector('#game-over-message');
const restartButton = document.querySelector('.restart-button');
const dismissButton = document.querySelector('.dismiss-button');
let jumps = 0;
let gameOver = false;
let jumpTimeout;

const startPipeAnimation = () => {
    const duration = Math.random() * 1.5 + 1.5;
    pipe.style.animation = 'none';
    pipe.style.left = '';
    pipe.style.right = '-80px';
    pipe.offsetWidth;
    pipe.style.animation = `pipe-animation ${duration}s linear`;
};

pipe.addEventListener('animationend', startPipeAnimation);
startPipeAnimation();

const jump = () => {
    if (gameOver || mario.classList.contains('jump')) {
        return;
    }

    mario.classList.add('jump');
    jumps += 1;
    jumpCount.textContent = jumps;

    jumpTimeout = setTimeout(() => {
        mario.classList.remove('jump');
    }, 800);
}
document.addEventListener('keydown', jump); 

const loop = setInterval(() => {
    if (gameOver) {
        return;
    }

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver = true;
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'imagem/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = '50px'
        gameOverMessage.textContent = `Você deu ${jumps} saltos. Quer reiniciar?`;
        gameOverScreen.hidden = false;
        restartButton.focus();
    }
}, 10);

const restartGame = () => {
    clearTimeout(jumpTimeout);
    jumps = 0;
    jumpCount.textContent = jumps;
    gameOver = false;
    gameOverScreen.hidden = true;

    mario.classList.remove('jump');
    mario.src = 'imagem/mario.gif';
    mario.style.animation = '';
    mario.style.bottom = '';
    mario.style.width = '';
    mario.style.marginLeft = '';

    startPipeAnimation();
};

restartButton.addEventListener('click', restartGame);
dismissButton.addEventListener('click', () => {
    gameOverScreen.hidden = true;
});