export default class Entity {
	constructor(x, y, sprite) {
		this.x = x;
		this.y = y;
		this.sprite = sprite;
	}

	move(dx, dy) {
		this.x += dx;
		this.y += dy;
	}
}
