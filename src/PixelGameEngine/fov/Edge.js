export default class Edge {
	constructor(x1, y1, dx, dy) {
		this.x1 = x1;
		this.x2 = x1;
		this.y1 = y1;
		this.y2 = y1;

		if (dx || dy) {
			this.extend(dx, dy);
		}
	}

	extend(dx, dy) {
		this.x2 += dx;
		this.y2 += dy;
	}

	getPoints() {
		return [
			[this.x1, this.x2],
			[this.y1, this.y2],
		];
	}
}
