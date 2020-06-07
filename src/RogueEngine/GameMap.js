import rand from 'random-seed';
import MapTile from './MapTile';

const defaultOptions = {
	roomSizeMax: 12,
	roomSizeMin: 7,
	roomCountMax: 50,
};

export default class GameMap {
	constructor(width, height, options=defaultOptions) {
		this.width = width;
		this.height = height;
		this.options = {
			...defaultOptions,
			...options,
		};

		this.tiles = [];
	}

	generateMap() {
		throw Error('Abstract method GameMap.generateMap. Overload this method in a sub class');
	}

	getPlayerStart() {
		throw Error('Abstract method GameMap.getPlayerStart. Overload this method in a sub class');
	}

	getTilesInRange({x1, x2, y1, y2}) {
		throw Error('Abstract method GameMap.getTiles. Overload this method in a sub class');
	}

	getTile(x, y) {
		if (this.tiles.length <= x ) {
			throw Error(`x co-ord ${x} is out of map bounds (${x}, ${y})`);
		}
		if (this.tiles[x].length <= y) {
			throw Error(`y co-ord ${y} is out of map bounds (${x}, ${y})`);
		}
		return this.tiles[x][y];
	}

	canMoveTo(x, y) {
		return this.getTile(x,y).canMoveTo();
	}

	canSeeThrough(x, y) {
		return this.getTile(x,y).canSeeThrough();
	}
}
