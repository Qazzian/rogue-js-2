import Position from "../PixelGameEngine/locationObjects/Position";
import EntityTheme from "../PixelGameEngine/EntityTheme";

export default class Entity {
	public pos: Position;
	public type: string;
	public theme: EntityTheme;

	constructor(position:Position, type:string, theme:EntityTheme) {
		this.pos = position;
		this.type = type;
		this.theme = theme;
	}

	/**
	 * Move the entity by this much
	 * @param dx
	 * @param dy
	 */
	move(dx:number, dy:number) {
		this.pos.x += dx;
		this.pos.y += dy;
	}
}
