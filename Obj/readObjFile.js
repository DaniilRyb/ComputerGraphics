let canvas = document.getElementById('obj');
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

function readFile(input) {
	let reader = new FileReader();
	let file = input.files[0];
	reader.onload = (function () {
		let lines = reader.result.split('\n');
		let vertices = [];
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			if (line[0] === 'v') {
				let c1 = line.match(/[0-9]+\.+[0-9]/g);
				let x = c1[0].match(/[0-9]+\.+[0-9]/);
				let y = c1[1].match(/[0-9]+\.+[0-9]/);
				let x_ = Number(x);
				let y_ = Number(y);
				console.log(x_, y_);
				vertices.push({x: x_, y: y_});
			}

		}
		ctx.fillStyle = "#33ffaa";
		ctx.beginPath();
		ctx.moveTo(vertices[0].x, vertices[0].y);
		ctx.lineTo(vertices[1].x, vertices[1].y);
		ctx.lineTo(vertices[3].x, vertices[3].y);
		ctx.lineTo(vertices[2].x, vertices[2].y);
		ctx.lineTo(vertices[0].x, vertices[0].y);
		ctx.fill();
		Line(vertices[0].x, vertices[0].y,
			vertices[1].x, vertices[1].y, "#000");
		Line(vertices[1].x, vertices[1].y,
			vertices[3].x, vertices[3].y, "#000");
		Line(vertices[2].x, vertices[2].y,
			vertices[0].x, vertices[0].y, "#000");
		Line(vertices[0].x, vertices[0].y,
			vertices[3].x, vertices[3].y, "#000");
		Line(vertices[2].x, vertices[2].y,
			vertices[1].x, vertices[1].y, "#000");
		Line(vertices[2].x, vertices[2].y,
			vertices[3].x, vertices[3].y, "#000");
	});
	reader.readAsText(file);
}