import { MapNode } from "./MapNode";
import MapTile, { generateEmptyArea } from "../../MapTile";
import { Area } from "@Qazzian/pixel-game-engine";

interface RenderSection {
	area: Area;
	tiles: MapTile[][];
}

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
	const xOffset = node.mapSection.x1 - view.area.x1 - 1;
	const yOffset = node.mapSection.y1 - view.area.y1 - 1;
	for (let x = xOffset; x < xOffset + node.mapSection.width + 2; x++) {
		for (let y = yOffset; y < yOffset + node.mapSection.height + 2; y++) {
			if (isInsideView(x, y)) {
				if (isInsideRoom(x, y)) {
					view.tiles[x][y] = new MapTile("floor", true);
				} else {
					view.tiles[x][y] = new MapTile("wall", false);
				}
			}
		}
	}

	function isInsideView(x: number, y: number) {
		return x >= view.area.x1 && x <= view.area.x2 && y >= view.area.y1 && y <= view.area.y2;
	}

	function isInsideRoom(x: number, y: number) {
		return x >= node.mapSection.x1 && x <= node.mapSection.x2 && y >= node.mapSection.y1 && y <= node.mapSection.y2;
	}
}
