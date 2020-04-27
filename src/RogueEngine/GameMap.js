import MapTile from "./MapTile";

export default class GameMap {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.tiles = this.initTiles();
	}

	initTiles() {
		const tiles = [];
		for (let x = 0; x < this.width; x++) {
			tiles[x] = [];
			for (let y = 0; y < this.height; y++) {
				const isEdge = (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1);
				if (isEdge) {
					tiles[x][y] = new MapTile('wall', !isEdge);
				}
				else {
					tiles[x][y] = new MapTile('ground');
				}
			}
		}

		tiles[30][22] = new MapTile('wall', false);
		tiles[31][22] = new MapTile('wall', false);
		tiles[32][22] = new MapTile('wall', false);

		return tiles;
	}

	canMoveTo(x, y) {
		if (x instanceof MapTile) {
			return x.allowsMovement;
		}
		return this.tiles[x][y].allowsMovement;
	}

	canSeeThrough(x, y) {
		if (x instanceof MapTile) {
			return x.allowsSight;
		}
		return this.tiles[x][y].allowsSight;
	}
}
