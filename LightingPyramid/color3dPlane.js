function color3dPlane(L, points_arr, color) {
	n = points_arr.length;
	let P12 = {
		x: points_arr[1].x - points_arr[0].x,
		y: points_arr[1].y - points_arr[0].y,
		z: points_arr[1].z - points_arr[0].z
	};
	let P13 = {
		x: points_arr[n - 1].x - points_arr[0].x,
		y: points_arr[n - 1].y - points_arr[0].y,
		z: points_arr[n - 1].z - points_arr[0].z
	};
	let ny = (P12.z * P13.x - P13.z * P12.x) / (P13.y * P12.x - P12.y * P13.x);
	let N = {x: -1 * (ny * P12.y + P12.z) / P12.x, y: ny, z: 1};
	let S = {x: points_arr[0].x - L.x, y: points_arr[0].y - L.y, z: points_arr[0].z - L.z};
	let cosa = (N.x * S.x + N.y * S.y + N.z * S.z) / Math.sqrt(N.x * N.x + N.y * N.y + N.z * N.z)
		/ Math.sqrt(S.x * S.x + S.y * S.y + S.z * S.z);
	let R = Math.round(((color & 0xff0000) >> 16) * Math.abs(cosa)) << 16;
	let G = Math.round(((color & 0x00ff00) >> 8) * Math.abs(cosa)) << 8;
	let B = Math.round(((color & 0x0000ff)) * Math.abs(cosa));
	let tarray = [points_arr[0].x, points_arr[0].y, points_arr[1].x, points_arr[1].y,
		points_arr[2].x, points_arr[2].y];
	borderfill(ctx, tarray, Math.round(R | G | B));

}
