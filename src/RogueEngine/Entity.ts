import { EntityTheme } from "./GameTheme";
import { Position } from "@qazzian/pixel-game-engine";

export default class Entity {
	x: number;
	y: number;
	type: string;
	theme: EntityTheme;
	/**
	 *
	 * @param x
	 * @param y
	 * @param type {string} - The type of entity, e.g. player, monster, item
	 * @param theme {EntityTheme} - The theme to use for this entity.
	 */
	constructor(x: number, y: number, type: string, theme: EntityTheme) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.theme = theme;
	}

	get pos(): Position {
		return new Position(this.x, this.y);
	}

	/**
	 * Move the entity by this much
	 * @param dx
	 * @param dy
	 */
	move(dx: number, dy: number) {
		this.x += dx;
		this.y += dy;
	}
}
