import { RandomSeed } from "random-seed";
import MapTile from "../MapTile";
import { Area, Grid, Position } from "@qazzian/pixel-game-engine";

export interface MapOptions {
	[key: string]: unknown;
}

export default abstract class GameMap {
	protected _tiles: MapTile[][];
	width: number;
	height: number;
	protected options: MapOptions;

	constructor(options?: MapOptions) {
		this.width = 0;
		this.height = 0;
		this.options = {
			...options,
		};

		this._tiles = [];
	}

	get tiles(): MapTile[][] {
		return this._tiles;
	}

	abstract generateMap(seed: RandomSeed): void;

	abstract getPlayerStart(): Position;

	abstract getTilesInRange(range: Area): Grid<MapTile>;

	getTile(x: number, y: number) {
		if (this._tiles.length <= x) {
			throw Error(`x co-ord ${x} is out of map bounds (${x}, ${y})`);
		}
		if (this._tiles[x].length <= y) {
			throw Error(`y co-ord ${y} is out of map bounds (${x}, ${y})`);
		}
		return this._tiles[x][y];
	}

	canMoveTo(x: number, y: number) {
		return this.getTile(x, y).canMoveTo();
	}

	canSeeThrough(x: number, y: number) {
		return this.getTile(x, y).canSeeThrough();
	}
}
