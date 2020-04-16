function setup() {
	createCanvas(1200, 800);
	background("white");
	// noStroke();
	frameRate(1);
}
function draw() {
	if (!window.codes) return;
	drawTree(codes);
	circle(600, 50, 30);
}

function drawBranch(side, x, y, a, h) {
	if (side === "left") {
		line(x, y, x - a, y + h);
		circle(x - a, y + h, 30);
	} else if (side === "right") {
		line(x, y, x + a, y + h);
		circle(x + a, y + h, 30);
	}
}

function drawTree(codes) {
	textStyle(BOLD);
	textSize(18);
	for (let char in codes) {
		let x = 600;
		let y = 50;
		let a = 150;
		let h = 50;
		let code = codes[char];
		for (let i = 0; i < code.length; i++) {
			if (code.substr(i, 1) === "0") {
				drawBranch("left", x, y, a, h);
				x -= a;
			} else if (code.substr(i, 1) === "1") {
				drawBranch("right", x, y, a, h);
				x += a;
			}
			text(code.substr(i, 1), x - 5, y + 8);
			y += h;
			a = 80 - i * 15;
			h += i * 10;
		}
		text(char, x - 5, y + 4);
	}
}

// drawTable(frequency, 40, 40);

// let x = 200;
// let y = 200;
// let a = 50;
// drawTree(x, y, a, 60);
// drawTree(x - a, y + 60, a + 10, 60);
// drawTree(x - a - 50, y + 60 + 60, a + 20, 60);
// drawTree(x - a + 50, y + 60 + 60, a + 30, 60);

// function drawTable(frequency, x, y) {
// 	textSize(26);
// 	let len = frequency.length;
// 	for (let i = 0; i < len; i++) {
// 		square(x + i * 40, y, 40);
// 		text(frequency[i][1], x + 5 + i * 40, y + 30);
// 		square(x + i * 40, y + 40, 40);
// 		text(`'${frequency[i][0]}'`, x + 5 + i * 40, y + 70);
// 	}
// }

// function drawTree(x, y, a, h) {
// 	line(x, y, x - a, y + h);
// 	line(x, y, x + a, y + h);
// 	circle(x, y, 30);
// 	circle(x - a, y + h, 30);
// 	circle(x + a, y + h, 30);
// }
