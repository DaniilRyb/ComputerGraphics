function Line(ctx, x0, y0, x1, y1) {
	let x;
	let y;
	const dy = Math.abs(y1 - y0);
	const dx = Math.abs(x1 - x0);
	const d_max = Math.max(dx, dy);
	const d_min = Math.min(dx, dy);
	let x_dir = 1;
	if (x1 < x0) x_dir = -1;
	let y_dir = 1;
	if (y1 < y0) y_dir = -1;
	let eps = 0;
	const s = 1;
	const k = 2 * d_min;
	if (dy <= dx) {
		y = y0;
		for (x = x0; x * x_dir <= x1 * x_dir; x += x_dir) {
			ctx.fillRect(x * s, y * s, s, s);
			eps = eps + k;
			if (eps > d_max) {
				y += y_dir;
				eps = eps - 2 * d_max;
			}
		}
	} else {
		x = x0;
		for (y = y0; y * y_dir <= y1 * y_dir; y += y_dir) {
			ctx.fillRect(x * s, y * s, s, s);
			eps = eps + k;
			if (eps > d_max) {
				x += x_dir;
				eps = eps - 2 * d_max;
			}
		}
	}
}
