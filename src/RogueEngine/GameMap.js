import MapTile from "./MapTile";

export default class GameMap {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.tiles = this.initTiles();
	}

	initTiles() {
		const tiles = [];
		for (let y = 0; y < this.height; y++) {
			tiles[y] = [];
			for (let x=0; x<this.width; x++) {
				const isEdge = (x===0 || y===0 || x === this.width-1 || y===this.height-1);
				tiles[y][x] = new MapTile(!isEdge);
			}
		}

		return tiles;
	}
}
