const BALL_RADIUS = 10;
const BALL_COLOR = "white";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

var ball = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    speedX: 8,
    speedY: 8,
}

function checkBall() {
    if (ball.x > canvas.width || ball.x < 0) {
        ball.speedX *= -1;
    } else if (ball.y < 0) {
        ball.y = 0;
        ball.speedY *= -1;
    } else if (ball.y >= paddle.y && ball.y <= (paddle.y + PADDLE_HEIGHT) &&
            ball.x > paddle.x && ball.x < paddle.x + PADDLE_WIDTH) {
        ball.speedY *= -1;
        var deltaX = ball.x - (paddle.x + PADDLE_WIDTH / 2);
        ball.speedX = deltaX * 0.35;

        if (brickCounter <= 0) {
            brickCounter = BRICK_COLUMNS * BRICK_ROWS;
            resetBricks();
        }

    } else if (ball.y > canvas.height) {
        ballReset();
    }
}

function ballReset() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    ball.speedX = Math.floor(Math.random() * 20) - 10;
}