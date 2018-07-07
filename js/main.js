var canvas;
var canvasContext;

const BACKGROUND_COLOR = "black";

var gameOver = false;
var autoPlay = true;
var randomizeBricks = true;

window.onload = function () {
    canvas = document.getElementById("game");
    canvasContext = canvas.getContext("2d");

    canvas.addEventListener("mousedown", mouseClicked, false);

    canvas.addEventListener("mousemove", function (evt) {
        var mousePos = calculateMousePos(evt);
        paddle.x = mousePos.x - (PADDLE_WIDTH / 2);
    });

    var fps = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, 1000/fps);

    brick_topleft_x = calculateBrickTopLeftX(canvas.width);
    resetBricks();

    canvasContext.textAlign = "center";
}

function moveEverything() {
    if (gameOver) {
        return;
    }

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    checkBall();

    if (autoPlay) {
        paddle.x = ball.x - PADDLE_WIDTH / 2;
    }

    checkForAndRemoveBrickAtPixelCoord(ball.x, ball.y);
}

function drawEverything() {
    colorRect(0, 0, canvas.width, canvas.height, BACKGROUND_COLOR);

    if (gameOver) {
        // todo: halt game and add function
    } else {
        colorCircle(ball.x, ball.y, BALL_RADIUS, BALL_COLOR);
        colorRect(paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOR);
        drawBricks();
    }
}