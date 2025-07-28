import rand from "random-seed";
import MapTile from "./MapTile";
import { Area, Position } from "@qazzian/pixel-game-engine";

const defaultOptions = {
	roomSizeMax: 12,
	roomSizeMin: 7,
	roomCountMax: 50,
};

export default abstract class GameMap {
	protected tiles: MapTile[][];
	protected width: number;
	protected height: number;
	protected options: { roomSizeMax: number; roomSizeMin: number; roomCountMax: number };

	constructor(width: number, height: number, options = defaultOptions) {
		this.width = width;
		this.height = height;
		this.options = {
			...defaultOptions,
			...options,
		};

		this.tiles = [];
	}

	abstract generateMap(): void;

	abstract getPlayerStart(): Position;

	abstract getTilesInRange(range: Area): MapTile[][];

	getTile(x: number, y: number) {
		if (this.tiles.length <= x) {
			throw Error(`x co-ord ${x} is out of map bounds (${x}, ${y})`);
		}
		if (this.tiles[x].length <= y) {
			throw Error(`y co-ord ${y} is out of map bounds (${x}, ${y})`);
		}
		return this.tiles[x][y];
	}

	canMoveTo(x: number, y: number) {
		return this.getTile(x, y).canMoveTo();
	}

	canSeeThrough(x: number, y: number) {
		return this.getTile(x, y).canSeeThrough();
	}
}
