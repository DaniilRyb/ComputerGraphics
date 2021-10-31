/* АЛГОРИТМ ОТСЕЧЕНИЯ ОТРЕЗКОВ ВЫПУКЛЫМ МНОГОУГОЛЬНИКОМ */
let canvas = document.getElementById('sem4');
let ctx = canvas.getContext('2d');

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

let state = 0;
let xp1_t, yp1_t;
let xp1, yp1;
let xp2, yp2;
let xa, ya, xb, yb;
let points_vertex_polygon = new Map();


canvas.addEventListener("click", function (e) {
	if (state === 0) {
		xp1_t = e.offsetX;
		yp1_t = e.offsetY;
		xp1 = e.offsetX;
		yp1 = e.offsetY;
		state = 1;
	} else if (state === 1) {
		xp2 = e.offsetX;
		yp2 = e.offsetY;
		Line(xp1_t, yp1_t, xp2, yp2, "#000");
		points_vertex_polygon.set([xp1_t, yp1_t], [xp2, yp2]); // запоминаем координаты ребер
		xp1_t = e.offsetX;
		yp1_t = e.offsetY;
		state = 1;
	} else if (state === 2) {
		xa = e.offsetX;
		ya = e.offsetY;
		state = 3;
	} else if (state === 3) {
		xb = e.offsetX;
		yb = e.offsetY;
		let tmin = -1;
		let tmax = -1;
		let key_tmin;
		let key_tmax;
		Line(xa, ya, xb, yb, "#fff");
		for (let key of points_vertex_polygon.keys()) {
			if (tmin === -1) {
				tmin = ((ya - yb) * (key[0] - xa) + (xb - xa)
					* (key[1] - ya)) / ((points_vertex_polygon.get(key)[0] - key[0])
					* (yb - ya) + (points_vertex_polygon.get(key)[1] - key[1]) * (xa - xb));
				key_tmin = key;
				if (tmin > 1 || tmin < 0) {
					tmin = -1;
				} else {
					continue;
				}

			}

			if (tmax === -1) {
				tmax = ((ya - yb) * (key[0] - xa) + (xb - xa)
					* (key[1] - ya)) / ((points_vertex_polygon.get(key)[0] - key[0])
					* (yb - ya) + (points_vertex_polygon.get(key)[1] - key[1]) * (xa - xb));
				key_tmax = key;
				if (tmax > 1 || tmax < 0) {
					tmax = -1;
					continue;
				}
			}
			if (tmin <= 1 && tmin >= 0 && tmax <= 1 && tmax >= 0) {
				let x0a = (points_vertex_polygon.get(key_tmin)[0] - key_tmin[0]) * tmin + key_tmin[0];
				let y0a = (points_vertex_polygon.get(key_tmin)[1] - key_tmin[1]) * tmin + key_tmin[1];
				let x0b = (points_vertex_polygon.get(key_tmax)[0] - key_tmax[0]) * tmax + key_tmax[0];
				let y0b = (points_vertex_polygon.get(key_tmax)[1] - key_tmax[1]) * tmax + key_tmax[1];

				Line(x0a, y0a, x0b, y0b, "#1bff00");
				Line(points_vertex_polygon.get(key_tmin)[0],
					points_vertex_polygon.get(key_tmin)[1], key_tmin[0], key_tmin[1], "#000");
				break;
			}
		}
		state = 2;

	}


});

canvas.addEventListener('contextmenu', function (event) {
	if (state === 1) {
		Line(xp1_t, yp1_t, xp1, yp1, " #000");
		points_vertex_polygon.set([xp1_t, yp1_t], [xp1, yp1]);
		state = 2;
	}
});


/*
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
let R = 200; // радиус
let N = 5; // кол-во сторон
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
		let tmax, tmin;
		for (let i = 0; i < ArrayParametr_t.length; ++i) {
			if (ArrayParametr_t[i] > ArrayParametr_t[i + 1]) {
				tmax = ArrayParametr_t[i];
			}

	else
		tmin = ArrayParametr_t[i];
	}
		console.log("tmax = " + tmax);
		console.log("tmin = " + tmin);
		let ex = (bx - ax) * tmin + ax;
		let ey = (by - ay) * tmin + ay;
		let ex1 = (bx - ax) * tmax + ax;
		let ey1 = (by - ay) * tmax + ay;
		Line(ex, ey, bx, by, "#ff0000");
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
drawPolygon(x0, y0, R, N); */