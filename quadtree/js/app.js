import QuadTree from './QuadTree.js';
import Point from './Point.js';
import Boundary from './Boundary.js';

const size = 500;
const pointsCount = 1000;

const rand = x => Math.random() * x;

const qtree = new QuadTree(new Boundary(0, 0, size, size));

for (let i = 0; i < pointsCount; i++) {
	const point = new Point(rand(size), rand(size));
	qtree.insert(point);
}

const canvas = document.querySelector('canvas');
canvas.width = canvas.height = size;
const ctx = canvas.getContext('2d');

let queryRect = new Boundary(0, 0, 100, 100);
canvas.addEventListener('mousemove', e => {
	queryRect = new Boundary(e.offsetX - 50, e.offsetY - 50, 100, 100);
});

function draw() {
	ctx.fillRect(0, 0, size, size);

	qtree.show(ctx);

	ctx.beginPath();
	ctx.lineWidth = '2';
	ctx.strokeStyle = 'green';
	ctx.rect(queryRect.x, queryRect.y, queryRect.w, queryRect.h);

	ctx.stroke();

	for (const p of qtree.queryRange(queryRect)) {
		ctx.beginPath();
		ctx.strokeStyle = 'green';
		ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI, true);
		ctx.stroke();
	}

	requestAnimationFrame(draw);
}

draw();
