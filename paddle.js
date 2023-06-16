//
// (paddle.js)
//

class Paddle {
    constructor(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.dx = 7;
    } //

    update() {
	// paddle operation
	if (keyboard.Right) {
	    this.x = Math.min(this.x + this.dx, CANVAS_WIDTH - this.width);
	} else if (keyboard.Left) {
	    this.x = Math.max(this.x - this.dx, 0);
	}
    } // update()

    draw() {
	ctx.beginPath();
	//ctx.rect(this.x, CANVAS_HEIGHT - this.height, this.width, this.height);
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
    } // draw()
} // class Paddle

// End of file (paddle.js)
