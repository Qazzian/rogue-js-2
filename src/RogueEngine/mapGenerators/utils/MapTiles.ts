import MapTile from "../../MapTile";
import { Area } from "@Qazzian/pixel-game-engine";

export function createTiles(space: Extent) {
	const tiles: MapTile[][] = [];
	for (let x = 0; x < space.width; x++) {
		tiles[x] = [];
		for (let y = 0; y < space.height; y++) {
			tiles[x][y] = new MapTile("wall", false);
		}
	}

	return tiles;
}
