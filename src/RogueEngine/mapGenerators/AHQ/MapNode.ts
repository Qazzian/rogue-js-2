import { MapSection } from "./MapSection";
import error from "eslint-plugin-react/lib/util/error";

export interface MapNodeOptions {
	section: MapSection;
	entrance?: MapNode;
	exits?: MapNode[];
}

export class MapNode {
	public mapSection: MapSection;
	public entrance: MapNode | undefined;
	public exits: MapNode[];

	constructor({ section, entrance }: MapNodeOptions) {
		this.mapSection = section;
		this.exits = [];
		if (entrance) {
			this.entrance = entrance;
		}
	}
}

export function traverseMapGraph(startNode: MapNode, callback: (node: MapNode) => void) {
	callback(startNode);
	return startNode.exits.forEach((exit) => traverseMapGraph(exit, callback));
}
