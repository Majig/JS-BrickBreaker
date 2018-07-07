const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_COLOR = "white";
const BOTTOM_OFFSET = CANVAS_HEIGHT * 0.1;

var paddle = {
    x: (CANVAS_WIDTH / 2) - (PADDLE_WIDTH / 2),
    y: CANVAS_HEIGHT - BOTTOM_OFFSET,
    score: 0,
}