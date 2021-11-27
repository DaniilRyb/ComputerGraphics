let canvas = document.getElementById('transform');
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

function M(a) {
	let Matrix = [Math.cos(a), 0, Math.sin(a), 0,
		0, 1, 0, 0,
		-Math.sin(a), 0, Math.cos(a), 0,
		0, 0, 0, 1]; // поворот вокруг оси Oy
	return Matrix;
}

let dx = 500;
let ShiftX = [1, 0, 0, dx,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1];

function MV_mult_3d(M, v) { // умножение матрицы на вектор
	let resultVector = [0, 0, 0, 0];
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			resultVector[i] += +M[i * 4 + j] * v[j];
		}
	}
	return resultVector;
}

let state = 0;
let Px0, Py0; // координата точки P0
let Px1, Py1; // координата точки P1
let Px2, Py2; // координата точки P2
let pointsArrX = [];
let pointsArrY = [];
let pointsArrX_ = [];
let pointsArrY_ = [];
canvas.addEventListener("click", function (e) {
	if (state === 0) {
		Px0 = e.offsetX;
		Py0 = e.offsetY;
		state = 1;
	} else if (state === 1) {
		Px1 = e.offsetX;
		Py1 = e.offsetY;
		Line(Px0, Py0, Px1, Py1, "#fff");
		state = 2;
	} else if (state === 2) {
		Px2 = e.offsetX;
		Py2 = e.offsetY;
		Line(Px1, Py1, Px2, Py2, "#fff");
		let P0x = Px0;
		let P0y = Py0;
		let P1x = Px1;
		let P1y = Py1;
		let P2x = Px2;
		let P2y = Py2;
		let P0x_ = Px0;
		let P0y_ = Py0;
		let P1x_ = Px1;
		let P1y_ = Py1;
		let P2x_ = Px2;
		let P2y_ = Py2;

		function CheckPointsIsValid(Px0, Py0, Px1, Py1, Px2, Py2) {  // лежат ли три точки на одной прямой
			let d = ((Py2 - Py0) * Px1 + (Px0 - Px2) * Py1 - Px0 * Py2 + Px2 * Py0)
				/ (Math.sqrt((Px0 - Px2) * (Px0 - Px2) + (Py0 - Py2) * (Py0 - Py2)));
			if (d <= 1) {
				//Line(Px0, Py0, Px2, Py2, "#ff0000");
				return d;
			} else return d;
		}

		let t;
		while (CheckPointsIsValid(P0x, P0y, P1x, P1y, P2x, P2y) >= 1) {
			for (t = 0.5; t > 0.01; t /= 2) {
				let P00x = (1 - t) * (1 - t) * P0x + 2 * (1 - t) * t * P1x + t * t * P2x;
				let P00y = (1 - t) * (1 - t) * P0y + 2 * (1 - t) * t * P1y + t * t * P2y;
				pointsArrX.push(P00x);
				pointsArrY.push(P00y);
				P2x = P00x;
				P2y = P00y;
				P1x = (1 - t) * P0x + t * P1x;
				P1y = (1 - t) * P0y + t * P1y;
			}
		}
		while (CheckPointsIsValid(P0x_, P0y_, P1x_, P1y_, P2x_, P2y_) >= 1) {
			let P00x_ = (1 - t) * (1 - t) * P0x_ + 2 * (1 - t) * t * P1x_ + t * t * P2x_;
			let P00y_ = (1 - t) * (1 - t) * P0y_ + 2 * (1 - t) * t * P1y_ + t * t * P2y_;
			pointsArrX_.push(P00x_);
			pointsArrY_.push(P00y_);
			P1x_ = (1 - t) * P1x_ + t * P2x_;
			P1y_ = (1 - t) * P1y_ + t * P2y_;
			P0x_ = P00x_;
			P0y_ = P00y_;
		}
		for (let i = 0; i < pointsArrX_.length; ++i) {
			for (let alpha = 0; alpha <= 360; alpha += 1) {
				let v1 = [pointsArrX_[i], pointsArrY_[i], 0, 1];
				let v2 = [pointsArrX_[i + 1], pointsArrY_[i + 1], 0, 1];
				let r1 = MV_mult_3d(M(alpha), v1);
				let shift_res1 = MV_mult_3d(ShiftX, r1);
				let r2 = MV_mult_3d(M(alpha), v2);
				let shift_res2 = MV_mult_3d(ShiftX, r2);
				let x1 = shift_res1[0];
				let y1 = shift_res1[1];
				let x2 = shift_res2[0];
				let y2 = shift_res2[1];
				Line(x1, y1, x2, y2, "#ef0000");

			}
		}
		state = 3;
	}
});