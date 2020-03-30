import Boid from './Boid.js';

const canvas = document.getElementById('canvas');
// TODO: Move to container class
const boids = [];

for (let i = 0; i < 100; i++) boids.push(new Boid(canvas.width, canvas.height));

// TODO: Use a proper timer class
function draw(canvas) {
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// TODO: Snapshot velocities before modifications
	// TODO: Spacial Subdivision / Quad tree to optimise
	for (const boid of boids) {
		boid.edges();
		boid.flock(boids);
		boid.update();
		boid.draw(ctx);
	}


	requestAnimationFrame(draw.bind(null, canvas));
}

draw(canvas);