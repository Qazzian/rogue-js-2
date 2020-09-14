export default class Grid {
	constructor(tiles) {
		this.tiles = tiles;
		this.width = tiles.length;
		this.height = tiles[0].length;
	}

	inRange(x, y) {
		if (x < 0) {return false;}
		if (y < 0) {return false;}
		if (x >= this.width) {return false;}
		return y < this.height;
	}

	get(x, y) {
		if (this.inRange(x, y)) {
			return this.tiles[x][y];
		}
	}

	forEach(callback) {
		this.tiles.forEach((mapRow, x) => mapRow.forEach((mapTIle, y) => {
			callback(mapTIle, x, y)
		}))
	}
}
