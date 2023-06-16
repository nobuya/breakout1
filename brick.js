//
// (brick.js)
//
const BRICK_WIDTH  = 75;
const BRICK_HEIGHT = 20;

class Brick {
    constructor(x, y, hp) {
	this.x = x;
	this.y = y;
	this.width  = BRICK_WIDTH;
	this.height = BRICK_HEIGHT;
	this.status = 1;
	this.count = 0;
	this.hp = (hp == undefined) ? 1 : hp;
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
	let color = [ "#0095DD", "#0085DD", "#0075DD" ];
	if (this.status == 1) {
	    ctx.beginPath();
	    ctx.rect(this.x, this.y, this.width, this.height);
	    //ctx.fillStyle = "#0095DD";
	    ctx.fillStyle = (this.hp >= 3) ? "#0075DD" : color[this.hp - 1];
	    ctx.fill();
	    ctx.closePath();
	    if (this.hp >= 2) {
		ctx.beginPath();
		ctx.fillStyle = "#0055DD";
		for (let i = 1; i < this.hp; i++) {
		    ctx.rect(this.x + this.width - 3 - 5 * i, this.y + 2,
			     4, 14);
		}
		ctx.fill();
		ctx.closePath();
	    }
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
	this.hp--
	if (this.hp == 0) {
	    this.status = 2;
	    this.alpha = 100;
	}
    }
} // class Brick

// End of file (brick.js)
