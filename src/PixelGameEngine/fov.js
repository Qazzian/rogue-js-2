import Grid from './Grid';


export class Edge {
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

export function buildGeometry(mapTiles, isBlockingTest) {
	const parsedTiles = {};
	const edges = [];
	const grid = new Grid(mapTiles);

	grid.forEach((mapTile, x, y) => {
		const neighbours = {
			n: north(x, y),
			s: south(x, y),
			e: east(x, y),
			w: west(x, y),
		};

		if (isBlockingTest(mapTile)) {
			if (neighbours.n !== undefined && !isBlockingTest(neighbours.n)) {
				edges.push(new Edge(x, y, 1, 0));
			}
			if (neighbours.e !== undefined && !isBlockingTest(neighbours.e)) {
				edges.push(new Edge(x+1, y, 0, 1));
			}
			if (neighbours.s !== undefined && !isBlockingTest(neighbours.s)) {
				edges.push(new Edge(x, y+1, 1, 0));
			}
			if (neighbours.w !== undefined && !isBlockingTest(neighbours.w)) {
				edges.push(new Edge(x, y, 0, 1));
			}
		}
	});
	return edges;

	function north(x, y) {
		return grid.get(x, y - 1);
	}

	function south(x, y) {
		return grid.get(x, y + 1);
	}

	function east(x, y) {
		return grid.get(x + 1, y);
	}

	function west(x, y) {
		return grid.get(x - 1, y);
	}
}
