export default class Entity {
	/**
	 *
	 * @param x
	 * @param y
	 * @param options {Object}
	 * @param options.sprite{object} - A sprite from a supported spritesheet to represent the entity
	 * @param options.char{char} - A unicode glyph. used to represent the entity if a sprite is not supplied.
	 * @param options.colour{Colour} The colour to draw the char (or sprite when supported).
	 */
	constructor(x, y, type, theme) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.theme = theme;
	}

	/**
	 * Move the entity by this much
	 * @param dx
	 * @param dy
	 */
	move(dx, dy) {
		this.x += dx;
		this.y += dy;
	}
}
