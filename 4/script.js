/* Алгоритм отсечения отрезков выпуклым многоугольником */
var canvas = document.getElementById('sem4');
var ctx = canvas.getContext('2d');

function Line(x0, y0, x1, y1, color) {
	ctx.fillStyle = color;
	var dy = Math.abs(y1 - y0);
	var dx = Math.abs(x1 - x0);
	var dmax = Math.max(dx, dy);
	var dmin = Math.min(dx, dy);
	var xdir = 1;
	if (x1 < x0) xdir = -1;
	var ydir = 1;
	if (y1 < y0) ydir = -1;
	var eps = 0;
	var s = 1;
	var k = 2 * dmin;
	if (dy <= dx) {
		var y = y0;
		for (var x = x0; x * xdir <= x1 * xdir; x += xdir) {
			ctx.fillRect(x * s, y * s, 1 * s, 1 * s);
			eps = eps + k;
			if (eps > dmax) {
				y += ydir;
				eps = eps - 2 * dmax;
			}
		}
	} else {
		var x = x0;
		for (var y = y0; y * ydir <= y1 * ydir; y += ydir) {
			ctx.fillRect(x * s, y * s, 1 * s, 1 * s);
			eps = eps + k;
			if (eps > dmax) {
				x += xdir;
				eps = eps - 2 * dmax;
			}
		}
	}
}

var ArrX = [];
var ArrY = [];

function drawPolygon(x0, y0, R, N) {
	let alpha = 2 * Math.PI / N;
	let xi, yi;
	for (let i = 0; i < N; i++) {
		xi = x0 + R * Math.cos(alpha * i);
		yi = y0 + R * Math.sin(alpha * i);
		ArrX.push(Math.trunc(xi));
		ArrY.push(Math.trunc(yi));

	}
	for (let j = 0, k = 1; j < N, k < N; j++, k++) {
		Line(ArrX[j], ArrY[j], ArrX[k], ArrY[k], "#000");
	}
	Line(ArrX[ArrX.length - 1], ArrY[ArrY.length - 1], ArrX[0], ArrY[0], "#000");
}

var x0 = 200, y0 = 220; // координаты центра выпуклого многоугольника
var R = 200; // радиус
var N = 5; // кол-во сторон
var ax, ay;
var bx, by;
var state = 0;
var arrt1 = [];
canvas.addEventListener("click", function (event) {
	if (state === 0) {
		ax = event.offsetX;
		ay = event.offsetY;
		state = 1;
	} else if (state === 1) {
		bx = event.offsetX;
		by = event.offsetY;
		Line(ax, ay, bx, by, "#2300ff");
		for (let i = 0, k = 1; i < ArrX.length, k < ArrX.length; ++i, ++k) {
			let t = ((ArrY[i] - ArrY[k]) * (ax - ArrX[i]) + (ArrX[k] - ArrX[i]) * (ay - ArrY[i])) /
				((bx - ax) * (ArrY[k] - ArrY[i]) + (by - ay) * (ArrX[i] - ArrX[k]));
			if (t <= 1 && t >= 0) {
				if (((bx - ax) * (ArrY[k] - ArrY[i]) + (by - ay) * (ArrX[i] - ArrX[k])) !== 0) {
					arrt1.push(t);
				}
			}
		}
		let tmax = 0;
		let tmin = 0;
		for (let i = 0; i < arrt1.length; ++i) {
			if (arrt1[i] > arrt1[i + 1]) tmax = arrt1[i];
			else tmin = arrt1[i];
		}
		let ex = (bx - ax) * tmin + ax;
		let ey = (by - ay) * tmin + ay;
		let ex1 = (bx - ax) * tmax + ax;
		let ey1 = (by - ay) * tmax + ay;
		for (let i = 1; i <= 20; ++i) {
			Line(ex, ey, ex1, ey1, "#fff");
		}
		state = 0;
	}
});

// Введите координату центра, радиус и кол-во сторон выпуклого многоугольника
drawPolygon(x0, y0, R, N);