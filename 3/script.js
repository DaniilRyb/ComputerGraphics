/* СЕКУНДНАЯ СТРЕЛКА НА ОСНОВЕ АЛГОРИТМА БРЕЗЕНХЭМА ДЛЯ ОКРУЖНОСТИ И ОТРЕЗКА */
function BresenhamLine(ctx, x0, y0, x1, y1, color) {
	ctx.fillStyle = color;
	let x = x0;
	let y = y0;
	let eps = 0;
	let signx = (x1 - x0) / Math.abs(x1 - x0);
	let signy = (y1 - y0) / Math.abs(y1 - y0);

	if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) {

		while (x !== x1) {
			eps += 2 * (y1 - y0);
			if (Math.abs(eps) >= Math.abs(x1 - x0)) {
				y += signy;
				eps -= signy * signx * (x1 - x0) * 2;
			}

			ctx.fillRect(x, y, 2, 2);
			x += signx;


		}

	}

	while (y !== y1) {
		eps += 2 * (x1 - x0);
		if (Math.abs(eps) >= Math.abs(y1 - y0)) {
			x += signx;
			eps = eps - signy * signx * (y1 - y0) * 2;

		}
		ctx.fillRect(x, y, 2, 2);

		y += signy;

	}

}

function AnimationClockFunc(x0, y0, radius) {
	let angle = ((new Date()).getSeconds() * 6) % 360;
	let x1 = (Math.abs(Math.trunc(x0 + radius * Math.cos(angle * Math.PI / 180))));
	let y1 = (Math.abs(Math.trunc(y0 + radius * Math.sin(angle * Math.PI / 180))));
	BresenhamLine(ctx, x0, y0, x1, y1, "#000")
	setTimeout(function () {
		BresenhamLine(ctx, x0, y0, x1, y1, "#fff")
	}, 1000)


}

function BresenhamCircle(xStart, yStart, raduisCircle) {
	ctx.fillStyle = "#ff0000";
	let x = xStart;
	let y = yStart;
	xStart = 0;
	yStart = raduisCircle;
	let delta = (2 - 2 * raduisCircle);
	let beta = 0;
	while (yStart >= 0) {
		// рисуем дуги для всех четвертей
		ctx.fillRect(x + xStart, y + yStart, 1, 1);
		ctx.fillRect(x + xStart, y - yStart, 1, 1);
		ctx.fillRect(x - xStart, y + yStart, 1, 1);
		ctx.fillRect(x - xStart, y - yStart, 1, 1);
		if (delta < 0) {
			beta = 2 * (delta + yStart) - 1;
			if (beta <= 0) {
				xStart++;
				delta += (2 * xStart + 1);
				continue;
			}
			if (beta > 0) {
				xStart++;
				yStart--;
				delta += 2 * xStart - 2 * yStart + 2;
			}
		}
		if (delta > 0 || delta === 0) {
			beta = 2 * (delta - xStart) - 1;
			if (beta <= 0) {
				xStart++;
				yStart--;
				delta += 2 * xStart - 2 * yStart + 2;
				continue;
			}
			if (beta > 0) {
				yStart--;
				delta += (1 - 2 * yStart);

			}
		}


	}

}

var canvas = document.getElementById('sem3');
var ctx = canvas.getContext('2d');
let x_start = 220, y_start = 220, R = 200;
BresenhamCircle(x_start, y_start, R);
setInterval(function () {
	AnimationClockFunc(x_start, y_start, R);
}, 1000)
