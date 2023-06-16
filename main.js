//
// JavaScript codes (main.js)
//

// debug
const DEBUG = true;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now(); // (ms)

// smoothing
const SMOOTHING = false;

// game speed (ms)
const GAME_SPEED = 1000 / 60; // 60 FPS (16.67 ms)

// screen size
const SCREEN_WIDTH  = 240;
const SCREEN_HEIGHT = 160;

// canvas size
const CANVAS_WIDTH  = SCREEN_WIDTH * 2;
const CANVAS_HEIGHT = SCREEN_HEIGHT * 2;

// get canvas and context
const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");  // context

// set canvas size
canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.mozimageSmoothingEnabled    = SMOOTHING;
ctx.webkitimageSmoothingEnabled = SMOOTHING;
ctx.msimageSmoothingEnabled     = SMOOTHING;
ctx.imageSmoothingEnabled       = SMOOTHING;
ctx.font = "20px 'Impact'";


// ball position
const INITIAL_BALL_X = CANVAS_WIDTH / 2;
const INITIAL_BALL_Y = CANVAS_HEIGHT - 30;
// ball acceleration
const INITIAL_BALL_DX = 2;
const INITIAL_BALL_DY = -2;
// ball size
const INITIAL_BALL_RADIUS = 10;
let speed = 2;

/*
let ball = new Ball(INITIAL_BALL_X, INITIAL_BALL_Y, INITIAL_BALL_RADIUS,
		    INITIAL_BALL_DX * speed, INITIAL_BALL_DY * speed) 
*/
let balls = [];


// paddle definition
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (CANVAS_WIDTH - paddleWidth) / 2;

// button (key) state
let keyboard = {};

// bricks
const brickRowCount    = 3;
const brickColumnCount = 5;
//const brickWidth       = 75;
//const brickHeight      = 20;
const brickPadding     = 10;
const brickOffsetTop   = 30;
const brickOffsetLeft  = 30;

const bricks = [];

function initBricks() {
    bricks.splice(0); // clear
    for (let c = 0; c < brickColumnCount; c++) {
	//bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++) {
	    //bricks[c][r] = { x: 0, y: 0, status: 1 };
	    const brickX = c * (BRICK_WIDTH  + brickPadding) + brickOffsetLeft;
	    const brickY = r * (BRICK_HEIGHT + brickPadding) + brickOffsetTop;
	    const aBrick = new Brick(brickX, brickY, /* hp */3)
	    bricks.push(aBrick)
	}
    }
} // function initBricks()

let gameOver = false;
let gameClear = false;
let newGame = true;
let score = 0;
let lives = 3;
let gameCount = 0;

function updateBall() {
    for (let i = balls.length - 1; i >= 0; i--) {
	balls[i].update();
	if (!gameOver && balls[i].active == 0) {
	    balls.splice(i, 1); // clear
	}
    }
    if (keyboard.B) {
	keyboard.B = false;
	balls.push(new Ball(paddleX + paddleWidth / 2, INITIAL_BALL_Y,
			    INITIAL_BALL_RADIUS,
			    INITIAL_BALL_DX * speed, INITIAL_BALL_DY * speed));
    }
} // function updateBall()

function updateBricks() {
    for (let i = bricks.length - 1; i >= 0; i--) {
	bricks[i].update();
	if (bricks[i].status == 0) {
	    bricks.splice(i, 1); // clear
	}
    }
} //function updateBricks()

function updatePaddle() {
    // paddle operation
    if (keyboard.Right) {
	paddleX = Math.min(paddleX + 7, CANVAS_WIDTH - paddleWidth);
    } else if (keyboard.Left) {
	paddleX = Math.max(paddleX - 7, 0);
    }
} // function updatePaddle()

function collisionDetection() {
    for (let i = 0; i < balls.length; i++) {
	collisionDetection1(balls[i])
    }
    if (bricks.length == 0) {
	gameClear = true;
    }
} // function collisionDetection()
function collisionDetection1(ball) {
    let x = ball.x
    let y = ball.y
    for (let i = bricks.length - 1; i >= 0; i--) {
	const b = bricks[i];
        if (b.status === 1) { // does the brick exist?
            if (x > b.x && x < b.x + b.width &&
                y > b.y && y < b.y + b.height) {
		ball.dy = -ball.dy;
		b.hit();
                //b.status = 0; // disappear
		//bricks.splice(i, 1); // remove a element
		score++;
		//if (score === brickRowCount * brickColumnCount) {
		if (bricks.length == 0) {
		    gameClear = true;
		}
		return;
            }
        }
    }
} // function collisionDetection1()

function updateAll() {
    updateBall();
    updateBricks();
    if (!gameOver) {
	updatePaddle();
	collisionDetection();
    }
} // function updateAll()

function drawBall() {
    for (let i = 0; i < balls.length; i++) {
	balls[i].draw();
    }
} // function drawBall()

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, CANVAS_HEIGHT - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
} // function drawPaddle()

function drawBricks() {
    for (let i = 0; i < bricks.length; i++) {
	bricks[i].draw();
    }
} // function drawBricks()

// draw score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
} // function drawScore()

// draw lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
} // function drawLives()

function drawAll() {
    // clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // draw a ball
    drawBall();
    // draw a paddle
    drawPaddle();
    // draw bricks
    drawBricks();

    // draw score
    drawScore();
    // draw lives
    drawLives();

} // function drawAll()

function printInfo() {
    if (gameClear) {
	gameClearMessage.draw();
    } else if (gameOver) {
	gameOverMessage.draw();
    }

    if (DEBUG) printDebugInfo();
} // function printInfo()

function printDebugInfo() {
    drawCount++;
    if (lastTime + 1000 <= Date.now()) {
	fps = drawCount;
	drawCount = 0;
	lastTime = Date.now();
    }

    ctx.font = "20px Impact";
    ctx.fillStyle = "red";
    ctx.fillText("FPS: " + fps, 10, 60);
    ctx.fillText("BRICKs: " + bricks.length, 10, 80);
    ctx.fillText("balls: " + balls.length, 10, 100);

} // function printDebugInfo()

function gameLoop() {
    gameCount++;
    if (newGame) {
	startNewGame();
    }
    updateAll();
    drawAll();
    printInfo();
    if (!gameOver && balls.length == 0) {
	lives--;
	if (!lives) {
	    gameOver = true;
	} else { // miss
	    paddleX = (canvas.width - paddleWidth) / 2;
	    balls.push(new Ball(INITIAL_BALL_X, INITIAL_BALL_Y, INITIAL_BALL_RADIUS,
				INITIAL_BALL_DX * speed, INITIAL_BALL_DY * speed));
	}
    }
    if (gameOver || gameClear) {
	if (keyboard.R) newGame = true;
    }
    requestAnimationFrame(gameLoop);
} // function gameLoop()

function startNewGame() {
    newGame = false;
    gameOver = false;
    gameClear = false;
    score = 0;
    lives = 3;
    /*
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;*/
    paddleX = (canvas.width - paddleWidth) / 2;
    initBricks();
    balls.splice(0); // clear
    balls.push(new Ball(INITIAL_BALL_X, INITIAL_BALL_Y, INITIAL_BALL_RADIUS,
			INITIAL_BALL_DX * speed, INITIAL_BALL_DY * speed));
} // function startNewGame()


// event listener (keybord)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// event listener (mouse)
document.addEventListener("mousemove", mouseMoveHandler, false);

// keyboard operation handler (down)
function keyDownHandler(e) {
    if (e.keyCode == 37) keyboard.Left  = true; // <-
    if (e.keyCode == 39) keyboard.Right = true; // ->
    if (e.keyCode == 65) keyboard.A     = true; // A
    if (e.keyCode == 66) keyboard.B     = true; // B
    if (e.keyCode == 82) keyboard.R     = true; // R
    if (e.keyCode == 83) keyboard.S     = true; // S
} // function keyDownHandler(e)

// keyboard operation handler (up)
function keyUpHandler(e) {
    if (e.keyCode == 37) keyboard.Left  = false; // <-
    if (e.keyCode == 39) keyboard.Right = false; // ->
    if (e.keyCode == 65) keyboard.A     = false; // A
    if (e.keyCode == 66) keyboard.B     = false; // B
    if (e.keyCode == 82) keyboard.R     = false; // R
    if (e.keyCode == 83) keyboard.S     = false; // S
} // function keyUpHandler(e)

// mouse move operation handler
function mouseMoveHandler(e) {
    if (!gameOver && !gameClear) {
	const relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
	}
    }
} // function mouseMoveHandler(e)

//initBricks();

function initializeGame() {
    newGame = true;
    gameOverMessage = new Message([ "GAME OVER", "Push 'R' key to restart" ])
    gameClearMessage = new Message([ "YOU WIN!", "Congratulations!",
				     "Push 'R' key to restart" ])
    //initBricks();
} // function initializeGame()

// draw interval
//const interval = setInterval(draw, 20);
//gameLoop();

// game start when onload
window.onload = function() {
    initializeGame();
    gameLoop();
}

// End of file (main.js) 
