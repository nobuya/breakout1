//
// (message.js)
//

class Message {
    constructor(msgs) {
	this.msgs = msgs
	this.w = []
	this.w_max = 0;
	this.h = 0;
	ctx.font = "16px Arial";
	for(let i = 0; i < msgs.length; i++) {
	    let w = ctx.measureText(msgs[i]).width;
	    let h = ctx.measureText(msgs[i]).actualBoundingBoxAscent +
		    ctx.measureText(msgs[i]).actualBoundingBoxDescent
	    this.w[i] = w;
	    if (w > this.w_max) {
		this.w_max = w;
	    }
	    this.h += h;
	}
	this.width  = this.w_max + 40;
	this.height = this.h     + 40;
	this.x0 = CANVAS_WIDTH / 2 - (this.width / 2);
	this.y0 = CANVAS_HEIGHT / 2 - (this.height / 2) - 5;
	//console.log(`x0 = ${this.x0}`)
	//console.log(`y0 = ${this.y0}`)
	//console.log(`h = ${this.h}`)
    }
    update() {
    }
    draw() {
	ctx.beginPath();
	ctx.rect(this.x0, this.y0, this.width, this.height);
	ctx.fillStyle = "rgba(10, 10, 10, 0.5)";
	ctx.fill();
	ctx.closePath();
	
	ctx.font = "16px Arial";
	ctx.fillStyle = "white";
	for (let i = 0; i < this.msgs.length; i++) {
	    let str = this.msgs[i];
	    let w = this.w[i];
	    let x = CANVAS_WIDTH / 2 - w / 2;
	    let y = this.y0 + 30 + i * 20;
	    ctx.fillText(str, x, y);
	}
    }
} // class Message

// End of file (message.js) 
