import { MapNode } from "./MapNode";
import MapTile, { generateEmptyArea } from "../../MapTile";

// Needs to translate the Map graph into an array of Map tiles that can be printed to the screen based on the GameTheme
export function Render(map: MapNode, x: number, y: number, width: number, height: number) {
	const view: MapTile[][] = generateEmptyArea(width, height);
	return view;
}
