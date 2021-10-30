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

let lineSegmentsIntersect = (x1, y1, x2, y2, x3, y3, x4, y4) => {
	let a_dx = x2 - x1;
	let a_dy = y2 - y1;
	let b_dx = x4 - x3;
	let b_dy = y4 - y3;
	let s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
	let t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
	return (s >= 0 && s <= 1 && t >= 0 && t <= 1) ? [x1 + t * a_dx, y1 + t * a_dy] : false;
}


let w = canvas.width;
let h = canvas.height;
let state = 0;
let x_start, y_start;
let x_end, y_end;
let points_vertex = new Map();
let dot_map = new Map();
let x_start_t, y_start_t;

document.addEventListener("click", function (e) {
	if (state === 0) {
		x_start = e.offsetX;
		x_start_t = x_start;
		y_start = e.offsetY;
		console.log("x_start= " + x_start);
		y_start_t = y_start;
		console.log("y_start= " + y_start);
		state = 1;
	} else if (state === 1) {
		x_end = e.offsetX;
		console.log("x_end= " + x_end);
		y_end = e.offsetY;
		console.log("y_end= " + y_end);
		Line(x_start, y_start, x_end, y_end, "#2300ff");
		points_vertex.set([x_start, y_start], [x_end, y_end]);
		x_start = e.offsetX;
		console.log("x_start_new= " + x_start);
		y_start = e.offsetY;
		console.log("y_start1_new= " + y_start);
		state = 1;
	} else if (state === 2) {
		for (let y = 0; y < w; y++) {
			let x1 = 0;
			let y1 = y;
			let x2 = w;
			let y2 = y;
			for (let key of points_vertex.keys()) {
				let x3 = key[0];
				let y3 = key[1];
				let x4 = points_vertex.get(key)[0];
				let y4 = points_vertex.get(key)[1];
				if (lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4)) {
					[a, b] = lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
					if (dot_map.has(y)) {
						dot_map.get(y).push(a);
						dot_map.get(y).push(b);
					} else {
						dot_map.set(y, [a, b]);
					}
				}
			}
		}
		for (let y of dot_map.keys()) {
			for (let i = 0; i < dot_map.get(y).length - 1; i += 4) {
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");
				Line(dot_map.get(y)[i], y, dot_map.get(y)[i + 2], dot_map.get(y)[i + 3], "#2300ff");

			}
		}
		state = 10;

	}

});


document.addEventListener("contextmenu", function (e) {
	if (state === 1) {
		Line(x_start, y_start, x_start_t, y_start_t, "#2300ff");
		points_vertex.set([x_start, y_start], [x_start_t, y_start_t])
		state = 2;
	}
});