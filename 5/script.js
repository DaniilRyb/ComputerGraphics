/*function Fx(imgData, x, y, w, h) {
	var value = 0;
	var v11 = imgData.data[(x - 1) * 4 + (y - 1) * 4 * w];
	var v12 = imgData.data[(x - 1) * 4 + y * 4 * w];
	var v21 = imgData.data[(x - 1) * 4 + (y + 1) * 4 * w];
	var v22 = imgData.data[(x + 1) * 4 + (y - 1) * 4 * w];
	var v32 = imgData.data[(x + 1) * 4 + y * 4 * w];
	var v33 = imgData.data[(x + 1) * 4 + (y + 1) * 4 * w];
	return v11 + v12 + v21 + v22 + v32 + v33;

}

var canvas = document.getElementById("sem5");
var ctx = canvas.getContext("2d");
var w = 50;
var h = 50;
ctx.fillStyle = '#FFF000';
ctx.fillRect(10, 10, 10, 10);
var imgData = ctx.getImageData(0, 0, 50, 50);
console.log(imgData.data[2040], imgData.data[2043]);
var canvas_s = document.getElementById("sobel");
var ctx_s = canvas_s.getContext("2d");
ctx_s.putImageData(imgData, 0, 0);
var imgData_s = imgData;

for (let i = 0; i < h - 1; i++) {
	for (let j = 1; j < w - 1; j++) {
		fx = Fx(imgData, w, h, j, i);
		fy = 0;
		f = Math.sqrt(fx * fx + 0);
		imgData_s[j * 4 + i * w * 4 + 3] = f;
	}
}
for (let i = 0; i < 10; i++) {
	imgData_s.data[0 + i * 4 + i * 200] = 255;
	imgData_s.data[3 + i * 4 + i * 200] = 255;
}
imgData_s.data[0] = 255;
imgData_s.data[3] = 255;
ctx_s.putImageData(imgData_s, 0, 0);
*/
