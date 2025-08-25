import GameMap, { MapOptions } from "./GameMap";
import { Area, Grid, Position } from "@qazzian/pixel-game-engine";
import MapTile from "../MapTile";

export class EmptyMap extends GameMap {
	constructor(props: MapOptions) {
		super(props);
	}

	generateMap(): void {}

	getPlayerStart(): Position {
		return new Position(0, 0);
	}

	getTilesInRange(range: Area): Grid<MapTile> {
		const tiles: MapTile[][] = [];
		for (let x = 0; x < range.width; x++) {
			tiles[x] = [];
			for (let y = 0; y < range.height; y++) {
				tiles[x][y] = new MapTile("ground", true, true);
			}
		}
		return new Grid(tiles);
	}
}
