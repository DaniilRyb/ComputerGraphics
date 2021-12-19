let canvas = document.getElementById("LightingPyramid");
let ctx = canvas.getContext("2d", {antialias: false, depth: false});

let n = 0;
let w = canvas.width, h = canvas.height;
let maxy = 0, miny = canvas.height;
let color = 0x33ffaa;
let alpha = 50;
let radius = 150;
points = [];

canvas.addEventListener("click", function (e) {
	let L = {x: 100, y: 60, z: 100};
	let Pv = {x: 58, y: 50, z: 75};
	L.x = radius * Math.cos(alpha);
	L.y = radius * Math.sin(alpha);
	color3dPlane(L, [{x: 10, y: 10, z: 0}, Pv, {x: 15, y: 100, z: 20}], color);
	color3dPlane(L, [{x: 110, y: 110, z: 0}, Pv, {x: 15, y: 100, z: 20}], color);
	color3dPlane(L, [{x: 110, y: 110, z: 0}, Pv, {x: 100, y: 15, z: 10}], color);
	color3dPlane(L, [{x: 100, y: 15, z: 10}, Pv, {x: 10, y: 10, z: 0}], color);
});
