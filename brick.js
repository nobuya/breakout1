//
// (brick.js)
//
const BRICK_WIDTH  = 75;
const BRICK_HEIGHT = 20;

class Brick {
    constructor(x, y) {
	this.x = x;
	this.y = y;
	this.width  = BRICK_WIDTH;
	this.height = BRICK_HEIGHT;
	this.status = 1;
	this.count = 0;
    }

    update() {
	this.count++;
	if (this.status == 2) {
	    this.alpha -= 4;
	    if (this.alpha <= 0) {
		this.status = 0;
	    }
	}
    } // update()

    draw() {
	if (this.status == 1) {
	    ctx.beginPath();
	    ctx.rect(this.x, this.y, this.width, this.height);
	    ctx.fillStyle = "#0095DD";
	    ctx.fill();
	    ctx.closePath();
	} else if (this.status == 2) {
	    let style = `rgba(0, 149, 211, ${this.alpha / 100})`;
	    ctx.beginPath();
	    ctx.rect(this.x, this.y, this.width, this.height);
	    //ctx.fillStyle = "#0095DD";
	    ctx.fillStyle = style;
	    ctx.fill();
	    ctx.closePath();
	}
    } // draw()

    hit() {
	this.status = 2;
	this.alpha = 100;
    }
} // class Brick

// End of file (brick.js)
