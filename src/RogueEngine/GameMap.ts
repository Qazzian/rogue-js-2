import rand from 'random-seed';
import MapTile from './MapTile';
import Area from '../PixelGameEngine/locationObjects/Area';

const defaultOptions = {
	roomSizeMax: 12,
	roomSizeMin: 7,
	roomCountMax: 50,
};

export default abstract class GameMap {
	protected width: number;
	protected height: number;
	protected options: { roomSizeMin: number; roomSizeMax: number; roomCountMax: number };
	protected tiles: MapTile[][];

	constructor(width: number, height: number, options=defaultOptions) {
		this.width = width;
		this.height = height;
		this.options = {
			...defaultOptions,
			...options,
		};

		this.tiles = [];
	}

	abstract generateMap() : void

	getPlayerStart() {
		throw Error('Abstract method GameMap.getPlayerStart. Overload this method in a sub class');
	}

	getTilesInRange(range: Area) : MapTile[][]{
		throw Error('Abstract method GameMap.getTiles. Overload this method in a sub class');
	}

	getTile(x: number, y:number) : MapTile{
		if (this.tiles.length <= x ) {
			throw Error(`x co-ord ${x} is out of map bounds (${x}, ${y})`);
		}
		if (this.tiles[x].length <= y) {
			throw Error(`y co-ord ${y} is out of map bounds (${x}, ${y})`);
		}
		return this.tiles[x][y];
	}

	canMoveTo<Type>(x: number, y:number) : boolean {
		return this.getTile(x,y).canMoveTo();
	}

	canSeeThrough(x:number, y:number) : boolean{
		return this.getTile(x,y).canSeeThrough();
	}
}
