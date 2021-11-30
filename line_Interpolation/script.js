let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = 0, y = 0, arr = [], step = 0.01;

function getBezierBasis(i, n, t) {
	function f(n) {
		return (n <= 1) ? 1 : n * f(n - 1);
	}

	return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

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

function getBezierCurve(arr, step) {
	let res = [];
	for (let t = 0; t < 1 + step; t += step) {
		if (t > 1) {
			t = 1;
		}
		let ind = res.length;
		res[ind] = [0, 0];

		for (let i = 0; i < arr.length; i++) {
			let b = getBezierBasis(i, arr.length - 1, t);
			res[ind][0] += arr[i][0] * b;
			res[ind][1] += arr[i][1] * b;
		}
	}
	return res;
}

canvas.addEventListener("click", function (e) {
	x = e.offsetX;
	y = e.offsetY;
	arr.push([x, y]);
	ctx.fillStyle = "#ff0000";
	ctx.fillRect(x, y, 3, 3);
});

canvas.addEventListener('contextmenu', function (event) {
	let points = getBezierCurve(arr, step);
	for (let i = 0; i < points.length; i += 1) {
		Line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1],"#2300ff");
	}
});