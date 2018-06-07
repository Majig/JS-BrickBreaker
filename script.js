var canvas;
var draw;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const BACKGROUND_COLOR = "black";
const BALL_RADIUS = 10;
const BALL_COLOR = "white";
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_COLOR = "white";

var gameOver = false;

var paddle = {
    x: (CANVAS_WIDTH / 2) - (PADDLE_WIDTH / 2),
    y: CANVAS_HEIGHT - PADDLE_HEIGHT,
    speedX: 5,
    speedY: 5,
    score: 0,
}

var ball = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    speedX: 5,
    speedY: 5,
}

window.onload = function() {
    canvas = document.getElementById("game");
    draw = canvas.getContext("2d");

    canvas.addEventListener("mousedown", mouseClicked, false);

    canvas.addEventListener("mousemove", function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle.y = mousePos.y - (PADDLE_WIDTH/2);
    } );

    var framesPerSecond = 30;
    setInterval (function() {
        moveEverything();
        drawEverything();
    }, framesPerSecond);

    draw.textAlign = "center";
}

function moveEverything () {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    checkBall();
}

function checkBall () {
    if (ball.x > canvas.width || ball.x <= 0) {
        ball.speedX *= -1;
    } else if (ball.y > canvas.height || ball.y <= 0) {
        ball.speedY *= -1;
    }
}

function drawEverything () {
    colorRect (0, 0, canvas.width, canvas.height, BACKGROUND_COLOR);
    colorCircle(ball.x, ball.y, BALL_RADIUS, BALL_COLOR);
}

function colorRect (x, y, width, height, color) {
    draw.fillStyle = color;
    draw.fillRect (x, y, width, height);
}

function colorCircle (centerX, centerY, radius, color) {
    draw.fillStyle = color;
    draw.beginPath();
    draw.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    draw.fill();
}

function mouseClicked() {
    console.log("click noticed");
}

function calculateMousePos (evt) {
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    // account for the marings, canvas position on page, scroll amount, etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}