import { MapSection } from "./MapSection";

export interface MapNodeOptions {
	section: MapSection;
	entrance?: MapNode;
	exits?: MapNode[];
}

export class MapNode {
	private mapSection: MapSection;
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
