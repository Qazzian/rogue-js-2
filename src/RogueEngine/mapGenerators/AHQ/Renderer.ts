import { MapNode } from "./MapNode";
import MapTile, { generateEmptyArea } from "../../MapTile";
import { Area } from "@Qazzian/pixel-game-engine";

interface RenderSection {
	area: Area;
	tiles: MapTile[][];
}

// TODO render new rooms as they are generated.
//  We need a cached version of the tileMap to track entity movement
// Needs to translate the Map graph into an array of Map tiles that can be printed to the screen based on the GameTheme
export function Render(map: MapNode | null, area: Area) {
	const tiles: MapTile[][] = generateEmptyArea(area.width, area.height);
	if (!map) {
		return tiles;
	}
	if (map.mapSection.hasIntersect(area)) {
		addRoom({ area, tiles }, map);
	}
	return tiles;
}

export function addRoom(view: RenderSection, node: MapNode) {
	const xOffset = view.area.x1;
	const yOffset = view.area.y1;
	for (let x = node.mapSection.x1 - 1; x < node.mapSection.x2 + 1; x++) {
		for (let y = node.mapSection.y1 - 1; y < node.mapSection.y2 + 1; y++) {
			const viewXPos = x - xOffset;
			const viewYPos = y - yOffset;
			if (isInsideView(viewXPos, viewYPos)) {
				if (!Array.isArray(view.tiles[viewXPos])) {
					view.tiles[viewXPos] = [];
				}
				if (isInsideRoom(x, y)) {
					view.tiles[viewXPos][viewYPos] = new MapTile("floor", true);
				} else {
					view.tiles[viewXPos][viewYPos] = new MapTile("wall", false);
				}
			}
		}
	}

	function isInsideView(x: number, y: number) {
		return x >= view.area.x1 && x < view.area.x2 && y >= view.area.y1 && y < view.area.y2;
	}

	function isInsideRoom(x: number, y: number) {
		return x >= node.mapSection.x1 && x < node.mapSection.x2 && y >= node.mapSection.y1 && y < node.mapSection.y2;
	}
}
