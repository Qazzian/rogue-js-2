import { Colour, COLOURS } from "./Colour";


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

		this.context.font = `${this.pixelHeight}px monospace`;
		this.context.textAlign = 'center';
		this.context.textBaseline = "middle";
	}

	/**
	 * Start listening to the animation frames
	 * @param onUpdate{function}
	 */
	start(onUpdate) {
		this.lastTimestamp = 0;
		this.onUpdate = onUpdate;
		window.requestAnimationFrame(timestamp => this.step(timestamp));
	}

	step(timestamp) {
		const timePassed = timestamp - this.lastTimestamp;
		this.lastTimestamp = timestamp;
		const fps = Math.round(1000 / timePassed);
		const timeStats = {
			timePassed,
			timestamp,
			fps,
		};
		const doAnotherStep = this.onUpdate(timePassed, timeStats);

		if (doAnotherStep) {
			window.requestAnimationFrame(timestamp => this.step(timestamp));
		}
	}


	clear(backgroundColor = COLOURS.BLACK) {
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

		// Single block
		if (dx === 0 && dy === 0) {
			return this.draw(x1, y1, color);
		}
		// vertical
		if (dx === 0) {
			const top = Math.min(y1, y2);
			return this.context.fillRect(
				x1 * this.pixelWidth,
				top * this.pixelHeight,
				this.pixelWidth,
				(Math.abs(dy) * this.pixelHeight) + this.pixelHeight
			);
		}
		// horizontal
		if (dy === 0) {
			const left = Math.min(x1, x2);
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

	drawDebugLine(x1, y1, x2, y2, color) {
		const dx = x1 - x2;
		const dy = y1 - y2;

		this.context.fillStyle = color.stringify();
		this.context.strokeStyle = color.stringify();

		this.context.beginPath();
		this.context.moveTo(x1 * this.pixelWidth, y1 * this.pixelHeight);
		this.context.lineTo(x2 * this.pixelWidth, y2 * this.pixelHeight);
		this.context.closePath();
		this.context.stroke();
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
	 * @param coords[] Array of {x, y} coordinate pairs
	 */
	drawPolygon(coords, colour) {
		const ctx = this.context;
		const startPos = coords[0];
		ctx.strokeStyle = colour.stringify();
		ctx.beginPath();
		ctx.moveTo(startPos.x* this.pixelWidth, startPos.y*this.pixelHeight);

		coords.forEach((pos) => {
			ctx.lineTo(pos.x * this.pixelWidth, pos.y * this.pixelHeight);
		});

		ctx.lineTo(startPos.x * this.pixelWidth, startPos.y * this.pixelHeight);
		ctx.stroke();

	}

	/**
	 * Draw a single utf-8 character onto the canvas
	 * @param x {Number}
	 * @param y {Number}
	 * @param character {String}
	 * @param colour {Colour}
	 */
	drawCharacter(x, y, character, colour) {
		this.context.fillStyle = colour.stringify();

		const charX = x * this.pixelWidth + (this.pixelWidth / 2);
		const charY = y * this.pixelHeight + (this.pixelHeight / 2);
		this.context.fillText(character, charX, charY);
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
