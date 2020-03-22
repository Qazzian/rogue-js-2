class Colour {
	constructor(r, g, b, a = 1) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	stringify() {
		// if (this.a !== 1) {
		// 	return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
		// }
		return `rgb(${this.r}, ${this.g}, ${this.b})`;
	}
}

export const COLOURS = {
	BLACK: new Colour(0, 0, 0),
	WHITE: new Colour(255, 255, 255),
	GREY: new Colour(192, 192, 192),
	DARK_GREY: new Colour(128, 128, 128),
	VERY_DARK_GREY: new Colour(64, 64, 64),
	RED: new Colour(255, 0, 0),
	DARK_RED: new Colour(128, 0, 0),
	VERY_DARK_RED: new Colour(64, 0, 0),
	YELLOW: new Colour(255, 255, 0),
	DARK_YELLOW: new Colour(128, 128, 0),
	VERY_DARK_YELLOW: new Colour(64, 64, 0),
	GREEN: new Colour(0, 255, 0),
	DARK_GREEN: new Colour(0, 128, 0),
	VERY_DARK_GREEN: new Colour(0, 64, 0),
	CYAN: new Colour(0, 255, 255),
	DARK_CYAN: new Colour(0, 128, 128),
	VERY_DARK_CYAN: new Colour(0, 64, 64),
	BLUE: new Colour(0, 0, 255),
	DARK_BLUE: new Colour(0, 0, 128),
	VERY_DARK_BLUE: new Colour(0, 0, 64),
	MAGENTA: new Colour(255, 0, 255),
	DARK_MAGENTA: new Colour(128, 0, 128),
	VERY_DARK_MAGENTA: new Colour(64, 0, 64),
	BLANK: new Colour(0, 0, 0, 0),
};
export const COLORS = COLOURS;


export default class PixelGameEngine {
	constructor(canvas, width, height, pixelWidth, pixelHeight) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.width = width;
		this.height = height;

		this.pixelWidth = pixelWidth;
		this.pixelHeight = pixelHeight;

		canvas.width = width * pixelWidth;
		canvas.height = height * pixelHeight;
	}


	clear(backgroundColor = COLOURS.BLACK) {
		console.info('Clear screen', backgroundColor);
		this.context.fillStyle = backgroundColor.stringify();
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}


	/**
	 * Draw a game pixel on the screen.
	 * @param x{Number}
	 * @param y{Number}
	 * @param color{Colour}
	 */
	draw(x, y, color) {
		this.context.fillStyle = color.stringify();
		this.context.fillRect(x * this.pixelWidth, y * this.pixelHeight, this.pixelWidth, this.pixelHeight);
	}

	/**
	 * Draw a line on the screen
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @param color
	 */
	drawLine(x1, y1, x2, y2, color) {
		const dx = x1 - x2;
		const dy = y1 - y2;
		this.context.fillStyle = color.stringify();
		this.context.strokeStyle = color.stringify();

		// vertical
		if (dx === 0 && dy === 0) {
			return this.draw(x1, y1, color);
		}
		if (dx === 0) {
			const top = Math.min(y1, y2);
			const bottom = Math.max(y1, y2);
			return this.context.fillRect(
				x1 * this.pixelWidth,
				top * this.pixelHeight,
				this.pixelWidth,
				(Math.abs(dy) * this.pixelHeight) + this.pixelHeight
			);
		}
		if (dy === 0) {
			const left = Math.min(x1, x2);
			const right = Math.max(x1, x2);
			return this.context.fillRect(
				left * this.pixelWidth,
				y1 * this.pixelHeight,
				(Math.abs(dx) * this.pixelWidth) + this.pixelWidth,
				this.pixelHeight
			);
		}

		const yPre = y1 > y2 ? this.pixelHeight : 0;
		const yPost = y1 < y2 ? this.pixelHeight : 0;
		this.context.beginPath();
		this.context.moveTo(x1 * this.pixelWidth, (y1 * this.pixelHeight) + yPre);
		this.context.lineTo((x1 * this.pixelWidth) + this.pixelWidth, (y1 * this.pixelHeight) + yPre);
		this.context.lineTo((x2 * this.pixelWidth) + this.pixelWidth, (y2 * this.pixelHeight) + yPost);
		this.context.lineTo(x2 * this.pixelWidth, (y2 * this.pixelHeight) + yPost);
		this.context.closePath();
		this.context.fill();

	}

	/**
	 * Draw a filled rectangle on the screen
	 * @param x{number}
	 * @param y{number}
	 * @param width{number}
	 * @param height{number}
	 * @param color{Colour}
	 */
	fillRect(x, y, width, height, color) {
		this.context.fillStyle = color.stringify();
		this.context.fillRect(
			x * this.pixelWidth,
			y * this.pixelHeight,
			width * this.pixelWidth,
			height * this.pixelHeight
		);
	}

	/**
	 * Draw an outline of a rectangle on the screen
	 * @param x{number}
	 * @param y{number}
	 * @param width{number}
	 * @param height{number}
	 * @param color{Colour}
	 */
	drawRect(x, y, width, height, colour) {
		this.context.strokeStyle = colour.stringify();

		for (let dx = 0; dx < this.pixelWidth; dx++) {
			for (let dy = 0; dy < this.pixelHeight; dy++) {
				this.context.strokeRect(
					(x * this.pixelWidth) + dx,
					(y * this.pixelHeight) + dy,
					width * this.pixelWidth,
					height * this.pixelHeight);
			}
		}
	}

	/**
	 *
	 * @param image{Image}
	 * @param sourcePosition{[x, y, width, height]} The position of the sprite in the source image
	 * @param destinationPosition{[x, y]} Position to place the sprite in the final image
	 */
	drawSprite(image, sourcePosition, destinationPosition) {
		const [sx, sy, sw, sh] = sourcePosition;
		const dx = destinationPosition[0] * this.pixelWidth;
		const dy = destinationPosition[1] * this.pixelHeight;
		const [dw, dh] = [this.pixelWidth, this.pixelHeight];

		this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
	}

}
