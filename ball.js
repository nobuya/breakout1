//
// (ball.js)
//

class Ball {
    constructor(x, y, r, dx, dy) {
	this.x = x;
	this.y = y;
	this.radius = r;
	this.initial_dx = dx;
	this.initial_dy = dy;
	this.dx = this.initial_dx;
	this.dy = this.initial_dy;
	this.active = 1;
    }

    update() {
	// collision judgement
	// left and right
	if (this.x + this.dx > CANVAS_WIDTH - this.radius ||
	    this.x + this.dx < this.radius) {
	    this.dx = -this.dx;
	}
	// upside and downside
	if (this.y + this.dy < this.radius) { // upside
	    this.dy = -this.dy;
	} else if (this.y + this.dy > CANVAS_HEIGHT - this.radius) { // downside
	    if (gameOver || gameClear) {
		this.dy = -this.dy;
	    } else if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
		// hit the paddle
		this.dy = -this.dy;
	    } else {
		this.active = 0;
	    }
	}
	this.x += this.dx;
	this.y += this.dy;
    } // update()

    draw() {
	ctx.beginPath();
	//ctx.arc(x, y, 10, 0, Math.PI * 2);
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	ctx.fillStyle = (!gameOver && !gameClear) ? "#0095DD" :
			                            "rgba(0, 149, 221, 0.5)";
	ctx.fill();
	ctx.closePath();
    } // draw()
} // class Ball

// End of file (ball.js)
