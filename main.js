//
// JavaScript codes (main.js)
//

// screen size
const SCREEN_WIDTH  = 240;
const SCREEN_HEIGHT = 160;

// canvas size
const CANVAS_WIDTH  = SCREEN_WIDTH * 2;
const CANVAS_HEIGHT = SCREEN_HEIGHT * 2;

// get canvas
const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");  // context

// set canvas size
canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// ball position
let x = CANVAS_WIDTH / 2;
let y = CANVAS_HEIGHT - 30;
// ball acceleration
let dx = 2;
let dy = -2;
// ball size
const ballRadius = 10;

// paddle definition
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (CANVAS_WIDTH - paddleWidth) / 2;

// button (key) state
let rightPressed = false;
let leftPressed = false;

// bricks
const brickRowCount    = 3;
const brickColumnCount = 5;
const brickWidth       = 75;
const brickHeight      = 20;
const brickPadding     = 10;
const brickOffsetTop   = 30;
const brickOffsetLeft  = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
	bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

let score = 0;
let lives = 3;

function drawBall() {
    ctx.beginPath();
    //ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
} // function drawBall()

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, CANVAS_HEIGHT - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
} // function drawPaddle()

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
	    if (bricks[c][r].status === 1) { // do drawing?
		const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
		const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
		bricks[c][r].x = brickX;
		bricks[c][r].y = brickY;
		ctx.beginPath();
		ctx.rect(brickX, brickY, brickWidth, brickHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	    } // if (bricks[c][r].status === 1) 
        }
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

function draw() {
    // clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // draw a ball
    drawBall();
    // draw a paddle
    drawPaddle();
    // draw score
    drawScore();
    // draw lives
    drawLives();
    // collision detection between the ball and blicks
    collisionDetection();
    // draw bricks
    drawBricks();
      
    // collision judgement (1)
    /*
    if (x + dx > canvas.width || x + dx < 0) {
        dx = -dx;
    }
    if (y + dy > canvas.height || y + dy < 0) {
        dy = -dy;
    }
    */
    // collision judgement (2)
    // left and right
    if (x + dx > CANVAS_WIDTH - ballRadius || x + dx < ballRadius) {
	dx = -dx;
    }
    // upside and downside
    if (y + dy < ballRadius) { // upside
	dy = -dy;
    } else if (y + dy > CANVAS_HEIGHT - ballRadius) { // downside
	if (x > paddleX && x < paddleX + paddleWidth) { // hit the paddle
	    dy = - dy;
	} else {
	    lives--;
	    if (!lives) {
		alert("GAME OVER")
		document.location.reload();
		//clearInterval(interval); // Needed for Chrome to end game
	    } else {
		x = canvas.width / 2;
		y = canvas.height - 30;
		dx = 2;
		dy = -2;
		paddleX = (canvas.width - paddleWidth) / 2;
	    }
	}
    }
    x += dx;
    y += dy;

    // paddle operation
    if (rightPressed) {
	paddleX = Math.min(paddleX + 7, CANVAS_WIDTH - paddleWidth);
    } else if (leftPressed) {
	paddleX = Math.max(paddleX - 7, 0);
    }

    requestAnimationFrame(draw);
} // function draw()


// event listener (keybord)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// event listener (mouse)
document.addEventListener("mousemove", mouseMoveHandler, false);

// keyboard operation handler (down)
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
	rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
	leftPressed = true;
    }
} // function keyDownHandler(e)

// keyboard operation handler (up)
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
	rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
	leftPressed = false;
    }
} // function keyUpHandler(e)

// mouse move operation handler
function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
} // function mouseMoveHandler(e)


function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) { // does the brick exist?
                if (x > b.x && x < b.x+brickWidth &&
                    y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0; // disappear
		    score++;
		    if (score === brickRowCount * brickColumnCount) {
			alert("YOU WIN, CONGRATULATIONS!");
			document.location.reload();
			//clearInterval(interval); // Needed for Chrome to end game
		    }
                }
            }
        }
    }
} // function collisionDetection()


// draw interval
//const interval = setInterval(draw, 20);
draw();

// End of file (main.js) 
