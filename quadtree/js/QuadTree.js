import Boundary from './Boundary.js';

export default class QuadTree {
	/**
	 * @param {Boundary} boundary
	 */
	constructor(boundary) {
		this.capacity = 4;
		this.boundary = boundary;
		this.points = [];

		this.northwest = null;
		this.northeast = null;
		this.southwest = null;
		this.southeast = null;
	}

	/**
	 * @param {import('./Point').default} point
	 * @returns {boolean}
	 */
	insert(point) {
		if (!this.boundary.containsPoint(point)) return false;

		if (this.points.length < this.capacity && this.northwest === null) {
			this.points.push(point);
			return true;
		}

		if (this.northwest === null) this.subdivide();

		if (this.northwest.insert(point)) return true;
		if (this.northeast.insert(point)) return true;
		if (this.southwest.insert(point)) return true;
		if (this.southeast.insert(point)) return true;

		return false;
	}

	subdivide() {
		this.northwest = new QuadTree(
			new Boundary(
				this.boundary.x,
				this.boundary.y,
				this.boundary.w / 2,
				this.boundary.h / 2
			)
		);
		this.northeast = new QuadTree(
			new Boundary(
				this.boundary.x + this.boundary.w / 2,
				this.boundary.y,
				this.boundary.w / 2,
				this.boundary.h / 2
			)
		);
		this.southwest = new QuadTree(
			new Boundary(
				this.boundary.x,
				this.boundary.y + this.boundary.h / 2,
				this.boundary.w / 2,
				this.boundary.h / 2
			)
		);
		this.southeast = new QuadTree(
			new Boundary(
				this.boundary.x + this.boundary.w / 2,
				this.boundary.y + this.boundary.h / 2,
				this.boundary.w / 2,
				this.boundary.h / 2
			)
		);
	}

	/**
	 * @param {Boundary} boundary
	 */
	queryRange(boundary) {
		let pointsInRange = [];

		if (!boundary.intersectsBoundary(boundary)) return pointsInRange;

		for (let p = 0; p < this.points.length; p++) {
			if (boundary.containsPoint(this.points[p]))
				pointsInRange = pointsInRange.concat(this.points[p]);
		}

		if (this.northwest === null) return pointsInRange;

		pointsInRange = pointsInRange.concat(this.northwest.queryRange(boundary));
		pointsInRange = pointsInRange.concat(this.northeast.queryRange(boundary));
		pointsInRange = pointsInRange.concat(this.southwest.queryRange(boundary));
		pointsInRange = pointsInRange.concat(this.southeast.queryRange(boundary));

		return pointsInRange;
	}

	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	show(ctx) {
		ctx.beginPath();
		ctx.lineWidth = '1';
		ctx.strokeStyle = 'white';
		ctx.rect(
			this.boundary.x,
			this.boundary.y,
			this.boundary.w,
			this.boundary.h
		);

		ctx.stroke();

		for (const p of this.points) {
			ctx.beginPath();
			ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI, true);
			ctx.stroke();
		}

		if (this.northwest !== null) {
			this.northwest.show(ctx);
			this.northeast.show(ctx);
			this.southwest.show(ctx);
			this.southeast.show(ctx);
		}
	}
}
