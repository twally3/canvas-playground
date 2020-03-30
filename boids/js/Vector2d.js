export default class Vector2d {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || x || 0;
	}

	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	subtract(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	multiply(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	divide(scalar) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	distance(vector) {
		return Math.sqrt(
			(this.x - vector.x) ** 2 + (this.y - vector.y) ** 2
		);
	}

	limit(scalar) {
		return (this.magnitude > scalar)
			? this.setMagnitude(scalar)
			: this;
	}

	setMagnitude(scalar) {
		if (this.magnitude !== 0) {
			this.x *= scalar / this.magnitude;
			this.y *= scalar / this.magnitude
		}

		return this;
	}

	get magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	static normalised(x, y) {
		const vector = new Vector2d(x, y);
		return vector.divide(vector.magnitude);
	}

	static random() {
		const angle = Math.random() * Math.PI * 2;
		return new Vector2d(Math.cos(angle), Math.sin(angle));
	}

	// TODO: Add a method to clone an existing Vector2d
}