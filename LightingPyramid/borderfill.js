function borderfill(ctx, poly, color) {
	let i;
	let bpoints = [];
	maxy = 0;
	miny = h;
	let n = poly.length / 2;
	for (i = 0; i < poly.length; i++) {
		if (Math.round(poly[2 * i + 1]) > maxy) maxy = Math.round(poly[2 * i + 1]);
		if (Math.round(poly[2 * i + 1]) < miny) miny = Math.round(poly[2 * i + 1]);
	}
	let idata = ctx.getImageData(0, 0, w, h);

	let x0 = poly[2 * n - 2], y0 = poly[2 * n - 1];
	let x1 = poly[0], y1 = poly[1];
	let k = (y1 - y0) / (x1 - x0);
	let b = y0 - k * x0;
	let up = y0, down = y1;
	if (y1 < y0) {
		up = y1;
		down = y0;
	}
	let sign = (y1 - y0) / Math.abs(y1 - y0);
	for (let j = Math.round(up); j <= Math.round(down); j += 1) {
		//for (var j=Math.round(y0); sign*j<=sign*y1; j+=sign) {
		if (!Array.isArray(bpoints[j])) {
			bpoints[j] = [];
		}
		bpoints[j].push(Math.round((j - b) / k));
	}
	let min = Math.min(y0, y1);
	if (!Array.isArray(bpoints[min])) {
		bpoints[min] = [];
	}
	bpoints[min].push(Math.round((min - b) / k));

	for (i = 1; i < n; i++) {
		x0 = poly[2 * i];
		y0 = poly[2 * i + 1];
		x1 = poly[2 * i - 2];
		y1 = poly[2 * i - 1];
		k = (y1 - y0) / (x1 - x0);
		b = y0 - k * x0;
		sign = (y1 - y0) / Math.abs(y1 - y0);
		//for (var j=Math.round(y0); sign*j<=sign*(y1); j+=sign) {
		up = y0;
		down = y1;
		if (y1 < y0) {
			up = y1;
			down = y0;
		}
		for (let j = Math.round(up); j <= Math.round(down); j += 1) {
			if (!Array.isArray(bpoints[j])) {
				bpoints[j] = [];
			}
			bpoints[j].push(Math.round((j - b) / k));
		}
		min = Math.min(y0, y1);
		if (!Array.isArray(bpoints[min])) {
			bpoints[min] = [];
		}
		bpoints[min].push(Math.round((min - b) / k));
	}

	for (let ti = miny; ti <= maxy; ti++) {
		if (!Array.isArray(bpoints[ti])) {
			continue;
		}
		let xarray = bpoints[ti].sort(function (a, b) {
			return a - b;
		});
		let size = xarray.length;
		for (let k = 0; k < size / 2; k++) {
			for (let tj = xarray[k * 2] + 1; tj <= xarray[k * 2 + 1]; tj++) {
				idata.data[(ti * w + tj) * 4] = (color & 0xff0000) >> 16;
				idata.data[(ti * w + tj) * 4 + 1] = (color & 0x00ff00) >> 8;
				idata.data[(ti * w + tj) * 4 + 2] = color & 0x0000ff;
				idata.data[(ti * w + tj) * 4 + 3] = 255;
			}
		}
	}
	ctx.putImageData(idata, 0, 0);
}
