

export default class Edge {
	private readonly x1: number;
	private readonly y1: number;
	private x2: number;
	private y2: number;

	/**
	 * Create an Edge with a start position and a movement vector
	 * @param {number} x1 - x start position
	 * @param {number} y1 - y start position
	 * @param {number} dx - x change
	 * @param {number} dy - y change
	 */
	constructor(x1:number, y1:number, dx?:number, dy?:number) {
		this.x1 = x1;
		this.y1 = y1;

		this.x2 = x1;
		this.y2 = y1;

		if (typeof dx === 'number' && typeof dy === 'number') {
			this.extend(dx, dy);
		}
	}

	extend(dx:number, dy:number) {
		this.x2 += dx;
		this.y2 += dy;
	}

	getPoints() {
		return [
			{x: this.x1, y: this.y1},
			{x: this.x2, y: this.y2},
		];
	}

	getVector() {
		return {
			x: this.x1,
			y: this.y1,
			dx: this.x2 - this.x1,
			dy: this.y2 - this.y1,
		};
	}
}
