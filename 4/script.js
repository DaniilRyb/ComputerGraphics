/* АЛГОРИТМ ОТСЕЧЕНИЯ ОТРЕЗКОВ ВЫПУКЛЫМ МНОГОУГОЛЬНИКОМ */
var canvas = document.getElementById('sem4');
var ctx = canvas.getContext('2d');

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

const ArrX = [];
const ArrY = [];

function drawPolygon(x0, y0, R, N) {
	let alpha = 2 * Math.PI / N;
	let xi, yi;
	for (let i = 0; i < N; ++i) {
		xi = x0 + R * Math.cos(alpha * i);
		yi = y0 + R * Math.sin(alpha * i);
		ArrX.push(Math.trunc(xi));
		ArrY.push(Math.trunc(yi));

	}
	for (let j = 0, k = 1; j < N, k < N; ++j, ++k) {
		Line(ArrX[j], ArrY[j], ArrX[k], ArrY[k], "#000");
	}
	Line(ArrX[ArrX.length - 1], ArrY[ArrY.length - 1], ArrX[0], ArrY[0], "#000");
}

let x0 = 220, y0 = 220; // координаты центра выпуклого многоугольника
let R = 100; // радиус
let N = 7; // кол-во сторон
let ax, ay, bx, by;
let state = 0;
let ArrayParametr_t = [];
canvas.addEventListener("click", function (event) {
	if (state === 0) {
		ax = event.offsetX;
		ay = event.offsetY;
		state = 1;
	} else if (state === 1) {
		bx = event.offsetX;
		by = event.offsetY;
		for (let i = 0, k = 1; i < ArrX.length, k < ArrX.length; ++i, ++k) {
			let t = ((ArrY[i] - ArrY[k]) * (ax - ArrX[i]) + (ArrX[k] - ArrX[i]) * (ay - ArrY[i])) /
				((bx - ax) * (ArrY[k] - ArrY[i]) + (by - ay) * (ArrX[i] - ArrX[k]));
			console.log("all t = " + t);

			if (t <= 1 && t >= 0 && ((bx - ax) * (ArrY[k] - ArrY[i]) + (by - ay) * (ArrX[i] - ArrX[k])) !== 0) {
				ArrayParametr_t.push(t);
				console.log(" t = " + t);
			}
		}

		var tmax;
		var tmin;

		console.log("tmax = " + tmax);
		console.log("tmin = " + tmin);
		let ex = (bx - ax) * tmin + ax;
		let ey = (by - ay) * tmin + ay;
		let ex1 = (bx - ax) * tmax + ax;
		let ey1 = (by - ay) * tmax + ay;
		Line(ex, ey, bx, by, "#73ff00");
		console.log(ex);
		console.log(ey);
		console.log(ex1);
		console.log(ey1);
		Line(ex1, ey1, ax, ay, "#ff0000");
		for (let i = 0; i < 100; ++i) {
			Line(ex, ey, ex1, ey1, "#fff")
		}
		state = 0;
	}

});
// Введите координату центра, радиус и кол-во сторон выпуклого многоугольника
drawPolygon(x0, y0, R, N);