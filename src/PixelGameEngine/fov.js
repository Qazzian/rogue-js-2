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

	try {
		grid.forEach((mapTile, x, y) => {
			const neighbours = {
				n: north(x, y),
				s: south(x, y),
				e: east(x, y),
				w: west(x, y),
			};

			if (isBlock(mapTile)) {
				const parsedBlock = {};
				if (isNotBlock(neighbours.n)) {
					if (isBlock(neighbours.w) && parsedTiles[`${x - 1}_${y}`].n) {
						parsedBlock.n = parsedTiles[`${x - 1}_${y}`].n;
						parsedBlock.n.extend(1, 0);
					} else {
						edges.push(new Edge(x, y, 1, 0));
						parsedBlock.n = edges[edges.length - 1];
					}
				}
				if (isNotBlock(neighbours.e)) {
					if (isBlock(neighbours.n && parsedTiles[`${x}_${y - 1}`].e)) {
						parsedBlock.e = parsedTiles[`${x}_${y - 1}`].e;
						parsedBlock.e.extend(0, 1);
					} else {
						edges.push(new Edge(x + 1, y, 0, 1));
						parsedBlock.e = edges[edges.length - 1];
					}
				}
				if (isNotBlock(neighbours.s)) {
					if (isBlock(neighbours.w && parsedTiles[`${x - 1}_${y}`].s)) {
						parsedBlock.s = parsedTiles[`${x - 1}_${y}`].s;
						parsedBlock.s.extend(1, 0);
					} else {
						edges.push(new Edge(x, y + 1, 1, 0));
						parsedBlock.s = edges[edges.length - 1];
					}
				}
				if (isNotBlock(neighbours.w)) {
					if (isBlock(neighbours.n && parsedTiles[`${x}_${y - 1}`].w)) {
						parsedBlock.w = parsedTiles[`${x}_${y - 1}`].w;
						parsedBlock.w.extend(0, 1);
					} else {
						edges.push(new Edge(x, y, 0, 1));
						parsedBlock.w = edges[edges.length - 1];
					}
				}
				parsedTiles[`${x}_${y}`] = parsedBlock;
			}
		});
	}
	catch (error) {
		console.error("error parsing geometry");
		console.info(JSON.stringify({grid, parsedTiles, edges}));
	}

	return edges;


	function isBlock(obj) {
		return obj !== undefined && isBlockingTest(obj);
	}
	function isNotBlock(obj) {
		return obj !== undefined && !isBlockingTest(obj);
	}

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
