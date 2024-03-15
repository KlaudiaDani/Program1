const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 5;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const SnakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

const snakeImage = new Image();
snakeImage.src = 'olaf.webp';

const appleImage = new Image();
appleImage.src = 'snow.png'; //  ścieżkę obrazka apple

// game loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawSnow();
    drawOlaf();

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    // Sprawdź, czy wąż zderzył się z krawędziami planszy
    if (headX < -1 || headX >= tileCount +2 || headY < -1 || headY >= tileCount +2) {
        gameOver = true;
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1.0, "red");

        ctx.fillStyle = gradient;
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    return gameOver;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawOlaf() {
    for (let i = 0; i < SnakeParts.length; i++) {
        let part = SnakeParts[i];
        ctx.drawImage(snakeImage, part.x * tileSize, part.y * tileSize, tileSize *2, tileSize * 2);
    }

    SnakeParts.push(new SnakePart(headX, headY));
    if (SnakeParts.length > tailLength) {
        SnakeParts.shift();
    }
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawSnow() {
    ctx.drawImage(appleImage, appleX * tileSize, appleY * tileSize, tileSize *2, tileSize *2);
}

function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
    }
}


document.getElementById('changeBgBtn').addEventListener('click', function() {
    const body = document.querySelector('body');
    const currentColor = window.getComputedStyle(body).getPropertyValue('background-color');

    if (currentColor === 'rgb(255, 255, 255)') {
        body.style.backgroundColor = '#333'; // noc
    } else {
        body.style.backgroundColor = '#fff'; // dzień
    }
});


document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    if (event.keyCode == 38) {
        if (yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0;
    }
    if (event.keyCode == 40) {
        if (yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }
    if (event.keyCode == 37) {
        if (xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
    }
    if (event.keyCode == 39) {
        if (xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();
