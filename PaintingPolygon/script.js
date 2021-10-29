let canvas = document.getElementById('sem6')
let ctx = canvas.getContext("2d");

function Line(x0, y0, x1, y1, color) {
	ctx.fillStyle = color;
	let dy = Math.abs(y1 - y0);
	let dx = Math.abs(x1 - x0);
	let dmax = Math.max(dx, dy);
	let dmin = Math.min(dx, dy);
	let xdir = 1;
	if (x1 < x0) xdir = -1;
	let ydir = 1;
	if (y1 < y0) ydir = -1;
	let eps = 0;
	let s = 1;
	let k = 2 * dmin;
	if (dy <= dx) {
		let y = y0;
		for (let x = x0; x * xdir <= x1 * xdir; x += xdir) {
			ctx.fillRect(x * s, y * s, s, s);
			eps = eps + k;
			if (eps > dmax) {
				y += ydir;
				eps = eps - 2 * dmax;
			}
		}
	} else {
		let x = x0;
		for (let y = y0; y * ydir <= y1 * ydir; y += ydir) {
			ctx.fillRect(x * s, y * s, s, s);
			eps = eps + k;
			if (eps > dmax) {
				x += xdir;
				eps = eps - 2 * dmax;
			}
		}
	}
}

let w = canvas.width;
let h = canvas.height;
let state = 0;
let x_start, y_start;
let x_end, y_end;
// let pointsVertex = new Map();
// let pointsOfY = new Set();
let x_start_t, y_start_t;
let coordinateX = [];
let coordinateY = [];
document.addEventListener("click", function (e) {
	if (state === 0) {
		x_start = e.offsetX;
		x_start_t = x_start;
		console.log("x_start= " + x_start);
		y_start = e.offsetY;
		y_start_t = y_start;
		console.log("y_start= " + y_start);
		state = 1;
	} else if (state === 1) {
		x_end = e.offsetX;
		console.log("x_end= " + x_end);
		y_end = e.offsetY;
		console.log("y_end= " + y_end);
		Line(x_start, y_start, x_end, y_end, "#0051ff");
		x_start = e.offsetX;
		console.log("x_start_new= " + x_start);
		y_start = e.offsetY;
		console.log("y_start1_new= " + y_start);
	} else if (state === 2) {
		let x, y;
		let imgData = ctx.getImageData(0, 0, w, h);
		for (let i = imgData.data.length; i >= 0; i -= 4) {
			if (imgData.data[i + 3] > 0) {
				x = (i / 4) % w;
				y = Math.floor((i / 4) / w);
				coordinateX.push(x);
				coordinateY.push(y);
			}
		}
		for (let i = 0; i < coordinateX.length; i += 1) {
			Line(coordinateX[i], coordinateY[i], coordinateX[i + 1], coordinateY[i + 1], "#0051ff");

		}
		state = 3;
	}
});
document.addEventListener("contextmenu", function (e) {
	if (state === 1) {
		Line(x_start, y_start, x_start_t, y_start_t, "#0051ff");
	}
	state = 2;
});