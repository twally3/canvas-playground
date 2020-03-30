import Vector2d from './Vector2d.js';

export default class Boid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		
		// TODO: Implement view cone, keep view clear? 
		this.size = 20;
		this.perceptionRadius = 50;
		this.maxForce = 0.2;
		this.maxSpeed = 4;

		this.pos = new Vector2d(Math.random() * width, Math.random() * height);
		this.vel = Vector2d.random().setMagnitude(this.maxSpeed);
		this.acc = new Vector2d;
	}

	edges() {
		if (this.pos.x < 0) this.pos.x = this.width;
		else if (this.pos.x > this.width) this.pos.x = 0;

		if (this.pos.y < 0) this.pos.y = this.height;
		else if (this.pos.y > this.height) this.pos.y = 0;
	}

	align(boids) {
		const steeringForce = new Vector2d;
		let totalConsideredBoids = 0;

		for (const boid of boids) {
			if (boid === this) continue;
			if (this.pos.distance(boid.pos) >= this.perceptionRadius) continue;

			steeringForce.add(boid.vel);
			totalConsideredBoids++;
		}

		return (totalConsideredBoids > 0)
			? steeringForce
				.divide(totalConsideredBoids)
				.setMagnitude(this.maxSpeed)
				.subtract(this.vel)
				.limit(this.maxForce)
			: steeringForce
	}

	cohesion(boids) {
		const steeringForce = new Vector2d;
		let totalConsideredBoids = 0;

		for (const boid of boids) {
			if (boid === this) continue;
			if (this.pos.distance(boid.pos) >= this.perceptionRadius) continue;

			steeringForce.add(boid.pos);
			totalConsideredBoids++;
		}

		return (totalConsideredBoids > 0)
			? steeringForce
				.divide(totalConsideredBoids)
				.subtract(this.pos)
				.setMagnitude(this.maxSpeed)
				.subtract(this.vel)
				.limit(this.maxForce)
			: steeringForce
	}

	separation(boids) {
		const steeringForce = new Vector2d;
		let totalConsideredBoids = 0;

		for (const boid of boids) {
			if (boid === this) continue;
			const distance = this.pos.distance(boid.pos);
			if (distance >= this.perceptionRadius) continue;

			const difference = new Vector2d(this.pos.x, this.pos.y).subtract(boid.pos);
			// TODO: Don't divide by zero
			difference.divide(distance);
			steeringForce.add(difference);
			totalConsideredBoids++;
		}

		return (totalConsideredBoids > 0)
			? steeringForce
				.divide(totalConsideredBoids)
				.setMagnitude(this.maxSpeed)
				.subtract(this.vel)
				.limit(this.maxForce)
			: steeringForce
	}

	// TODO: Clean this up to make it DRY
	flock(boids) {
		this.acc
			.multiply(0)
			.add(this.align(boids))
			.add(this.cohesion(boids))
			.add(this.separation(boids));
	}

	update() {
		this.pos.add(this.vel);
		this.vel
			.add(this.acc)
			.limit(this.maxSpeed);
	}

	draw(ctx) {
		const unitVel = Vector2d.normalised(this.vel.x, this.vel.y).multiply(this.size);

		ctx.beginPath();
		ctx.strokeStyle = '#ffffff';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

		ctx.moveTo(this.pos.x + unitVel.x, this.pos.y + unitVel.y);
		ctx.lineTo(this.pos.x + unitVel.y/3, this.pos.y + -unitVel.x/3);
		ctx.lineTo(this.pos.x + -unitVel.y/3, this.pos.y + unitVel.x/3);

		ctx.closePath()
		ctx.stroke();
		ctx.fill();
		
	}
}