export default class Entity {
	/**
	 *
	 * @param x
	 * @param y
	 * @param options {Object}
	 * @param options.sprite{object} - A sprite from a supported spritesheet to represent the entity
	 * @param options.character{char} - A unicode glyph. used to represent the entity if a sprite is not supplied.
	 * @param options.colour{Colour} The colour to draw the character (or sprite when supported).
	 */
	constructor(x, y, {sprite, character, colour}) {
		this.x = x;
		this.y = y;
		this.sprite = sprite;
		this.character = character;
		this.colour = colour;
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

	/**
	 * Render the entity in the given context
	 * @param canvasContext{CanvasRenderingContext2D}
	 */
	render(canvasContext) {
		if (this.sprite) {
			// TODO
		}
		else if (this.character) {
			canvasContext.fillStyle = this.colour.stringify();
			canvasContext.fillText(this.character, this.x, this.y);
		}


	}
}
