import { Colour, COLOURS } from "./Colour";
import EventEmitter from "events";


export default class PixelGameEngine extends EventEmitter{
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D | null;
	private width: number;
	private height: number;
	private pixelWidth: number;
	private pixelHeight: number;
	private lastTimestamp: number;
	private isRunning: boolean;


	constructor(canvas: HTMLCanvasElement, width: number, height: number, pixelWidth: number, pixelHeight: number) {
		super();
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.width = width;
		this.height = height;

		this.pixelWidth = pixelWidth;
		this.pixelHeight = pixelHeight;

		canvas.width = width * pixelWidth;
		canvas.height = height * pixelHeight;

		this.lastTimestamp = 0;
		this.isRunning = false;

		if (this.context) {
			this.context.font = `${this.pixelHeight}px monospace`;
			this.context.textAlign = 'center';
			this.context.textBaseline = "middle";
		}
	}

	/**
	 * Start listening to the animation frames
	 * @param onUpdate{function}
	 */
	start() {
		this.emit('start');
		this.lastTimestamp = 0;
		this.isRunning = true;
		window.requestAnimationFrame(timestamp => this.step(timestamp));
	}

	step(timestamp: number) {
		if (!this.isRunning) {
			return;
		}
		this.emit('before-update', timestamp);
		const timePassed = timestamp - this.lastTimestamp;
		this.lastTimestamp = timestamp;
		const fps = Math.round(1000 / timePassed);
		const timeStats = {
			timePassed,
			timestamp,
			fps,
		};

		this.emit('update', timestamp);
		this.emit('after-update', timestamp, timeStats);

		window.requestAnimationFrame(timestamp => this.step(timestamp));
	}

	stop() {
		this.emit('stop');
		this.isRunning = false;
	}

	getContext() : CanvasRenderingContext2D {
		if (!this.context) {
			throw new Error("Context element not initialised");
		}
		return this.context;
	}

	clear(backgroundColor = COLOURS.BLACK) {
		const context = this.getContext();
		context.fillStyle = backgroundColor.stringify();
		context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}


	/**
	 * Draw a game pixel on the screen.
	 * @param x{Number}
	 * @param y{Number}
	 * @param color{Colour}
	 */
	draw(x: number, y: number, color: Colour) {
		const context = this.getContext();
		context.fillStyle = color.stringify();
		context.fillRect(x * this.pixelWidth, y * this.pixelHeight, this.pixelWidth, this.pixelHeight);
	}

	/**
	 * Draw a line on the screen
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @param color
	 */
	drawLine(x1: number, y1: number, x2: number, y2: number, color: Colour) {
		const context = this.getContext();
		const dx = x1 - x2;
		const dy = y1 - y2;
		context.fillStyle = color.stringify();
		context.strokeStyle = color.stringify();

		// Single block
		if (dx === 0 && dy === 0) {
			return this.draw(x1, y1, color);
		}
		// vertical
		if (dx === 0) {
			const top = Math.min(y1, y2);
			return context.fillRect(
				x1 * this.pixelWidth,
				top * this.pixelHeight,
				this.pixelWidth,
				(Math.abs(dy) * this.pixelHeight) + this.pixelHeight
			);
		}
		// horizontal
		if (dy === 0) {
			const left = Math.min(x1, x2);
			return context.fillRect(
				left * this.pixelWidth,
				y1 * this.pixelHeight,
				(Math.abs(dx) * this.pixelWidth) + this.pixelWidth,
				this.pixelHeight
			);
		}

		const yPre = y1 > y2 ? this.pixelHeight : 0;
		const yPost = y1 < y2 ? this.pixelHeight : 0;
		context.beginPath();
		context.moveTo(x1 * this.pixelWidth, (y1 * this.pixelHeight) + yPre);
		context.lineTo((x1 * this.pixelWidth) + this.pixelWidth, (y1 * this.pixelHeight) + yPre);
		context.lineTo((x2 * this.pixelWidth) + this.pixelWidth, (y2 * this.pixelHeight) + yPost);
		context.lineTo(x2 * this.pixelWidth, (y2 * this.pixelHeight) + yPost);
		context.closePath();
		context.fill();
	}

	drawDebugLine(x1: number, y1: number, x2: number, y2: number, color: Colour) {
		const context = this.getContext();
		const dx = x1 - x2;
		const dy = y1 - y2;

		context.fillStyle = color.stringify();
		context.strokeStyle = color.stringify();

		context.beginPath();
		context.moveTo(x1 * this.pixelWidth, y1 * this.pixelHeight);
		context.lineTo(x2 * this.pixelWidth, y2 * this.pixelHeight);
		context.closePath();
		context.stroke();
	}

	/**
	 * Draw a filled rectangle on the screen
	 * @param x{number}
	 * @param y{number}
	 * @param width{number}
	 * @param height{number}
	 * @param color{Colour}
	 */
	fillRect(x: number, y: number, width: number, height: number, color: Colour) {
		const context = this.getContext();
		context.fillStyle = color.stringify();
		context.fillRect(
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
	 * @param colour{Colour}
	 */
	drawRect(x: number, y: number, width: number, height: number, colour: Colour) {
		const context = this.getContext();
		context.strokeStyle = colour.stringify();

		for (let dx = 0; dx < this.pixelWidth; dx++) {
			for (let dy = 0; dy < this.pixelHeight; dy++) {
				context.strokeRect(
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
	 * @param colour{Colour}
	 */
	drawPolygon(coords: {x:number, y: number}[], colour: Colour) {
		const context = this.getContext();
		const startPos = coords[0];
		context.strokeStyle = colour.stringify();
		context.beginPath();
		context.moveTo(startPos.x* this.pixelWidth, startPos.y*this.pixelHeight);

		coords.forEach((pos) => {
			context.lineTo(pos.x * this.pixelWidth, pos.y * this.pixelHeight);
		});

		context.lineTo(startPos.x * this.pixelWidth, startPos.y * this.pixelHeight);
		context.stroke();

	}

	/**
	 * Draw a single utf-8 character onto the canvas
	 * @param x {Number}
	 * @param y {Number}
	 * @param character {String}
	 * @param colour {Colour}
	 */
	drawCharacter(x: number, y: number, character: string, colour: Colour) {
		const context = this.getContext();
		context.fillStyle = colour.stringify();

		const charX = x * this.pixelWidth + (this.pixelWidth / 2);
		const charY = y * this.pixelHeight + (this.pixelHeight / 2);
		context.fillText(character, charX, charY);
	}

	/**
	 *
	 * @param image{Image}
	 * @param sourcePosition{[x, y, width, height]} The position of the sprite in the source image
	 * @param destinationPosition{[x, y]} Position to place the sprite in the final image
	 */
	drawSprite(image: CanvasImageSource, sourcePosition: [number, number, number, number], destinationPosition: number[]) {
		const context = this.getContext();
		const [sx, sy, sw, sh] = sourcePosition;
		const dx = destinationPosition[0] * this.pixelWidth;
		const dy = destinationPosition[1] * this.pixelHeight;
		const [dw, dh] = [this.pixelWidth, this.pixelHeight];

		context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
	}

}
