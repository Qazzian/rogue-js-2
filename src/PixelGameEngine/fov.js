

export class Edge {
	constructor(x1, y1) {
		this.x1 = x1;
		this.x2 = x1;
		this.y1 = y1;
		this.y2 = y1;
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

export function buildGeometry(mapTiles, isBlockingFunction) {
	return [new Edge(0, 0)];
}
