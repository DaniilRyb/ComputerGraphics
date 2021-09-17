function bresenhamLine(ctx, x0, y0, x1, y1, color) {
	ctx.fillStyle = color;
	var x = x0;
	var y = y0;
	var eps = 0;
	var signx = (x1 - x0) / Math.abs(x1 - x0);
	var signy = (y1 - y0) / Math.abs(y1 - y0);
	
	if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) {

		while (x !== x1) {
			eps += +2 * (y1 - y0);
			if (Math.abs(eps) >= Math.abs(x1 - x0)) {
				y += signy;
				eps -= signy * signx * (x1 - x0) * 2;
			}

			ctx.fillRect(x, y, 2, 2);
			x += signx;


		}

	}

	while (y !== y1) {
		eps = eps + 2 * (x1 - x0);
		if (Math.abs(eps) >= Math.abs(y1 - y0)) {
			x += signx;
			eps = eps - signy * signx * (y1 - y0) * 2;

		}
		ctx.fillRect(x, y, 2, 2);

		y += signy;

	}

}

function AnimationClockFunc(x0, y0, radius) {
	var angle = ((new Date()).getSeconds() * 6) % 360;
	var x1 = (Math.abs(Math.trunc(x0 + radius * Math.cos(angle * Math.PI / 180))));
	var y1 = (Math.abs(Math.trunc(y0 + radius * Math.sin(angle * Math.PI / 180))));
	bresenhamLine(ctx, x0, y0, x1, y1, "#000")
	setTimeout(function () {
		bresenhamLine(ctx, x0, y0, x1, y1, "#fff")
	}, 1000)


}

var canvas = document.getElementById('lab02');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = '#000';
var x_start = 220, y_start = 220;
var radius = 200;
var radiusCircle = 205;
ctx.beginPath();
ctx.arc(x_start, y_start, radiusCircle, 0, 2 * Math.PI);
ctx.lineWidth = 5;
ctx.strokeStyle = "#ff0000";
ctx.stroke();
setInterval(function () {
	AnimationClockFunc(x_start, y_start, radius);
}, 1000)

