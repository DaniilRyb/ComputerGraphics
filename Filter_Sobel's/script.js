/* ФИЛЬТР СОБЕЛЯ */
    var canvas = document.getElementById("img1");
	var ctx = canvas.getContext("2d");

	var canvas2 = document.getElementById("img2");
	var ctx2 = canvas2.getContext("2d");

	function matrixOperation(ourMatrix, defaultMatrix, size) {
		let res = 0;
		for (let i = 0; i < size; ++i) {
			for (let j = 0; j < size; ++j) {
				res += ourMatrix[i][j] * defaultMatrix[i][j];
			}
		}
		return res;
	}

	function doubleMatrixOperation(ourMatrix, defaultMatrix1, defaultMatrix2, size) {
		let a = matrixOperation(ourMatrix, defaultMatrix1, size);
		let b = matrixOperation(ourMatrix, defaultMatrix2, size);
		return Math.sqrt(a * a + b * b);
	}

	function massiveToMatrix(img_data_massive, startIndex) {
		let matrix = [];
		for (let i = 0; i < canvas.width; ++i) {
			matrix[i] = [];
		}
		for (let i = 0; i < canvas.height; ++i) {
			for (let j = 0; j < canvas.width; ++j) {
				matrix[i][j] = img_data_massive[startIndex + 4 * i * canvas.width + 4 * j];
			}
		}
		return matrix;
	}

	function matrixCreation(img_data_massive, startIndex, size, x, y) {
		let matrix = [];
		for (let i = 0; i < size; ++i) {
			matrix[i] = [];
			for (let j = 0; j < size; ++j) {
				if (x + j > 0 && x + j - 1 < canvas.width && y + i > 0 && y + i - 1 < canvas.height) {
					matrix[i][j] = img_data_massive[y + i - 1][x + j - 1];
				} else {
					matrix[i][j] = 0;
				}
			}
		}
		return matrix;
	}

	function Sobel1(img_data, defaultMatrix1, defaultMatrix2, startIndex, newImgData) {
		let imgMatrix = massiveToMatrix(img_data.data, startIndex);
		let x = 0;
		let y = 0;
		for (let i = startIndex; i < img_data.data.length; i += 4) {
			let matrix = matrixCreation(imgMatrix, i, 3, x, y);
			if (x !== canvas.width - 1) {
				++x;
			} else {
				++y;
				x = 0;
			}
			newImgData[i] = doubleMatrixOperation(matrix, defaultMatrix1, defaultMatrix2, 3);
		}
	}

	function Sobel(img_data) {
		let defaultMatrix1 = [[-1, 0, 1],
			                  [-2, 0, 2],
			                  [-1, 0, 1]];
		let defaultMatrix2 = [[-1, -2, -1],
			                    [0, 0, 0],
			                    [1, 2, 1]];
		let newImgData = ctx.createImageData(canvas.width, canvas.height);
		for (let i = 3; i < img_data.data.length; i += 4) {
			newImgData.data[i] = img_data.data[i];
		}
		for (let i = 0; i < 3; ++i) {
			Sobel1(img_data, defaultMatrix1, defaultMatrix2, i, newImgData.data);
		}
		ctx2.putImageData(newImgData, 0, 0);
	}


	let img = new Image;
	img.crossOrigin = 'Anonymous';
	img.src = 'http://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2020-10/20201002_gaf_ic10_004.jpg?itok=0la0XY_V';
	img.onload = function () {
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		let img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
		Sobel(img_data);
	};