import {Colour} from "./Colour";

export default class EntityTheme {
	public char: string;
	public dark: Colour;
	public light: Colour;

	constructor(char: string, dark: Colour, light: Colour) {
		this.char = char;
		this.dark = dark;
		this.light = light;
	}
}
