export default class MapTile {
	/**
	 * Create a map tile.
	 *
	 * @param {String} type - THe type of tile represented (e.g. wall, floor, water, door)
	 * @param {boolean} [allowsMovement=true] - Does the tile stop allow entities to move over it?
	 * @param {boolean} [allowsSight]  - Does the tile allow LOS over it.
	 * 		By default this is the same as allowsMovement
	 */
	constructor(type, allowsMovement = true, allowsSight) {
		this.type = type;
		this.allowsMovement = allowsMovement;
		this.allowsSight = allowsSight === undefined ? allowsMovement : allowsSight;
	}
}
