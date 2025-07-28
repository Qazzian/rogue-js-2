import Entity from "./Entity";

export default class MapTile {
	tileType: string;
	allowsMovement: boolean;
	allowsSight: boolean;
	private entities: Entity[] = [];
	/**
	 * Create a map tile.
	 *
	 * @param {String} tileType - THe type of tile represented (e.g. wall, floor, water, door)
	 * @param {boolean} [allowsMovement=true] - Does the tile stop allow entities to move over it?
	 * @param {boolean} [allowsSight]  - Does the tile allow LOS over it.
	 * 		By default this is the same as allowsMovement
	 */
	constructor(tileType: string, allowsMovement: boolean = true, allowsSight?: boolean) {
		this.tileType = tileType;
		this.allowsMovement = allowsMovement;
		this.allowsSight = allowsSight ?? allowsMovement;
	}

	addEntity(enttiy: Entity) {
		this.entities.push(enttiy);
	}

	canMoveTo() {
		return this.allowsMovement;
	}

	canSeeThrough() {
		return this.allowsSight;
	}
}
