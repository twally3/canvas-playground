export default class Boundary {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} w
	 * @param {number} h
	 */
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	/**
	 * @param {import('./Point').default} point
	 */
	containsPoint(point) {
		return (
			point.x >= this.x &&
			point.x < this.x + this.w &&
			point.y >= this.y &&
			point.y < this.y + this.h
		);
	}

	/**
	 * @param {Boundary} boundary
	 * @returns {boolean}
	 */
	intersectsBoundary(boundary) {
		return !(
			boundary.x - boundary.w > this.x + this.w ||
			boundary.x + boundary.w < this.x - this.w ||
			boundary.y - boundary.h > this.y + this.h ||
			boundary.y + boundary.h < this.y - this.h
		);
	}
}
