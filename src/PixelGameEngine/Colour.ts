export class Colour {
	private r: number;
	private g: number;
	private b: number;
	private a: number;

	constructor(r: number, g: number, b: number, a = 1) {
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
