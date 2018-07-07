const BRICK_TOPLEFT_Y = 20;
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 2;
const BRICK_COLUMNS = 12;
const BRICK_ROWS = 10;

var brick_topleft_x;
var brickGrid = new Array(BRICK_COLUMNS * BRICK_ROWS); // boolean Array for brick status
var brickCounter = brickGrid.length;

function calculateBrickTopLeftX(width) {
    var wallWidth = BRICK_COLUMNS * BRICK_WIDTH;
    var emtpySpace = width - wallWidth;
    return emtpySpace / 2;
}

function resetBricks() {
    for (var i = 0; i < BRICK_COLUMNS * BRICK_ROWS; i++) {
        if (randomizeBricks) {
            if (Math.random() < 0.5) {
                brickGrid[i] = 1;
            } else {
                brickGrid[i] = 0;
            }
        }

        brickGrid[i] = 1;
    }
}

function drawBricks() {
    for (var column = 0; column < BRICK_COLUMNS; column++) {
        for (var row = 0; row < BRICK_ROWS; row++) {
            if (isBrickAtTileCoord(column, row)) {
                var brickX = brick_topleft_x + column * BRICK_WIDTH;
                var brickY = BRICK_TOPLEFT_Y + row * BRICK_HEIGHT;

                colorRect(brickX, brickY,
                    BRICK_WIDTH - BRICK_GAP, BRICK_HEIGHT - BRICK_GAP, "blue");
            }
        }
    }
}

function checkForAndRemoveBrickAtPixelCoord(x, y) {
    var hitX = Math.floor((x - brick_topleft_x) / BRICK_WIDTH);
    var hitY = Math.floor((y - BRICK_TOPLEFT_Y) / BRICK_HEIGHT);

    if (hitX < 0 || hitX >= BRICK_COLUMNS ||
        hitY < 0 || hitY >= BRICK_ROWS) {
        return;
    }

    var brickIndex = brickTileToIndex(hitX, hitY);

    if (brickGrid[brickIndex] == 1) {
        brickGrid[brickIndex] = 0;
        brickCounter -= 1;
        ball.speedY *= -1;
    }

    // todo check for empty brickGrid
    // todo reflect horizontal collision
}

function brickTileToIndex(x, y) {
    return (x + BRICK_COLUMNS * y);
}

function isBrickAtTileCoord(x, y) {
    var brickIndex = brickTileToIndex(x, y);
    return (brickGrid[brickIndex] == 1);
}