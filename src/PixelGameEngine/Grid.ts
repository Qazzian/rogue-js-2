export default class Grid {
	private tiles: any[][];
	private width: any;
	private height: any;

	constructor(tiles: any[][]) {
		this.tiles = tiles;
		this.width = tiles.length;
		this.height = tiles[0].length;
	}

	inRange(x: number, y: number) : boolean {
		if (x < 0) {return false;}
		if (y < 0) {return false;}
		if (x >= this.width) {return false;}
		return y < this.height;
	}

	get(x: number, y: number) : any {
		if (this.inRange(x, y)) {
			return this.tiles[x][y];
		}
	}

	forEach(callback: { (mapTile: any, x: number, y: number): void; (arg0: any, arg1: number, arg2: number): void; }) {
		this.tiles.forEach((mapRow, x) => mapRow.forEach((mapTIle, y) => {
			callback(mapTIle, x, y)
		}))
	}
}
