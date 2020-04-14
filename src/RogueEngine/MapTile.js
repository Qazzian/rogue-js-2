export default class MapTile {
	/**
	 * Create a map tile.
	 *
	 * @param {boolean} [allowsMovement=true] - Does the tile stop allow entities to move over it?
	 * @param {boolean} [allowsSight]  - Does the tile allow LOS over it.
	 * 		By default this is the same as allowsMovement
	 */
	constructor(allowsMovement = true, allowsSight) {
		this.allowsMovement = allowsMovement;
		this.allowsSight = allowsSight === undefined ? allowsMovement : allowsSight;
	}
}
