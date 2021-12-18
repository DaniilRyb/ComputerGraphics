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

function My(alpha) {
	let My = [Math.sin(alpha), 0, Math.cos(alpha), 0,
			   0, 1, 0, 0,
		0, Math.sin(alpha), Math.cos(alpha), 0,
	    0, 0, 0, 1];
	return My;
}

function MV_mul(M, v) {
	let res = [];
	for (let i = 0; i < 4; i++) {
		let aij = 0;
		for (let j = 0; j < 3; j++) {
			aij += M[i * 4 + j] * v[j];
		}
		res.push(aij);
	}
	return res;
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
				let x_c = Number(x);
				let y_c = Number(y);
				//ctx.fillRect(x_c, y_c, 1, 1);
				//console.log(x,y);
				vertices.push({x: x_c, y: y_c});

			}

		}
		let rotate_vertice_arr = [];
		for (let i = 0; i < vertices.length; i += 1) {
			let new_vertices = MV_mul(My(70), [vertices[i].x, vertices[i].y, 0, 1]);
			console.log(Math.round(new_vertices[0]), new_vertices[1]);
			ctx.fillRect(new_vertices[0], new_vertices[1], 2, 2);
			rotate_vertice_arr.push({x: new_vertices[0], y: new_vertices[1]});
		}
		//for (let i = 0; i < rotate_vertice_arr.length; i += 1) {
		//	Line(rotate_vertice_arr[i].x, rotate_vertice_arr[i].y,
		//		rotate_vertice_arr[i + 1].x, rotate_vertice_arr[i + 1].y, "#2400ff");
		//}
	});


	reader.readAsText(file);
}


