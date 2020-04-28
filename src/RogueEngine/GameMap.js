import MapTile from './MapTile';

export default class GameMap {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.tiles = this.initTiles();
		this.createRoom(20, 15, 10, 15);
		this.createRoom(35, 15, 10, 15);
	}

	initTiles() {
		const tiles = [];
		for (let x = 0; x < this.width; x++) {
			tiles[x] = [];
			for (let y = 0; y < this.height; y++) {
				tiles[x][y] = new MapTile('wall', false);
			}
		}

		return tiles;
	}

	createRoom(x0, y0, width, height) {
		for (let x = x0 + 1; x < x0 + width - 1; x++) {
			for (let y = y0 + 1; y < y0 + height - 1; y++) {
				const tile = this.tiles[x][y];
				tile.type = 'ground';
				tile.allowsMovement = true;
				tile.allowsSight = true;
			}
		}
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
