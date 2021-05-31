import Grid from '../Grid';
import Edge from './Edge';

const DIRECTION = {
	n: [0, -1],
	e: [+1, 0],
	s: [0, +1],
	w: [-1, 0],
};

export default buildGeometry;

interface ProcessedBlock {
	n?: Edge | undefined,
	s?: Edge | undefined,
	e?: Edge | undefined,
	w?: Edge | undefined,
}


function buildGeometry(
	mapTiles: any[][],
	isBlockingTest: { (tile: any): any; (arg0: any): any; },
	addBorder: boolean=false
	): Edge[] {
	const parsedTiles:{[index: string]:any} = {};
	const edges: Edge[] = [];
	const grid = new Grid(mapTiles);

	if (addBorder) {
		edges.push(...addBoarders(grid));
	}

	try {
		grid.forEach((mapTile: any, x: number, y: number) => {
			if (isBlock(mapTile)) {
				const neighbours = {
					n: getNeighbour(x, y, DIRECTION.n),
					s: getNeighbour(x, y, DIRECTION.s),
					e: getNeighbour(x, y, DIRECTION.e),
					w: getNeighbour(x, y, DIRECTION.w),
				};

				const parsedBlock: ProcessedBlock = {};
				if (isNotBlock(neighbours.n)) {
					if (isBlock(neighbours.w) && parsedTiles[`${x - 1}_${y}`].n) {
						parsedBlock.n = parsedTiles[`${x - 1}_${y}`].n;
						parsedBlock.n!.extend(1, 0);
					} else {
						edges.push(new Edge(x, y, 1, 0));
						parsedBlock.n = edges[edges.length - 1];
					}
				}
				if (isNotBlock(neighbours.e)) {
					if (isBlock(neighbours.n) && parsedTiles[`${x}_${y - 1}`].e) {
						parsedBlock.e = parsedTiles[`${x}_${y - 1}`].e;
						parsedBlock.e!.extend(0, 1);
					} else {
						edges.push(new Edge(x + 1, y, 0, 1));
						parsedBlock.e = edges[edges.length - 1];
					}
				}
				if (isNotBlock(neighbours.s)) {
					if (isBlock(neighbours.w) && parsedTiles[`${x - 1}_${y}`].s) {
						parsedBlock.s = parsedTiles[`${x - 1}_${y}`].s;
						parsedBlock.s!.extend(1, 0);
					} else {
						edges.push(new Edge(x, y + 1, 1, 0));
						parsedBlock.s = edges[edges.length - 1];
					}
				}
				if (isNotBlock(neighbours.w)) {
					if (isBlock(neighbours.n) && parsedTiles[`${x}_${y - 1}`].w) {
						parsedBlock.w = parsedTiles[`${x}_${y - 1}`].w;
						parsedBlock.w!.extend(0, 1);
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
		console.info(JSON.stringify({parsedTiles, edges}));
	}

	return edges;


	function isBlock(obj:any) {
		return obj !== undefined && isBlockingTest(obj);
	}
	function isNotBlock(obj: any) {
		return obj !== undefined && !isBlockingTest(obj);
	}

	function getNeighbour(x:number, y:number, direction:number[]) {
		return grid.get(x+direction[0], y+direction[1]);
	}
}

function addBoarders(grid: Grid) : Edge[] {
	const edges = [];
	edges.push(new Edge(0, 0, grid.width, 0));
	edges.push(new Edge(0, 0, 0, grid.height));
	edges.push(new Edge(grid.width, 0, 0, grid.height));
	edges.push(new Edge(0, grid.height, grid.width, 0));
	return edges;
}
