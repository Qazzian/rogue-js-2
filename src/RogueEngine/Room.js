export default class Room {
	constructor(x, y, w, h) {
		this.x1 = x;
		this.x2 = x + w;
		this.y1 = y;
		this.y2 = y + h;
		this.width = w;
		this.height = h;
	}

	center() {
		const xc = Math.round((this.x1 + this.x2) / 2);
		const yc = Math.round((this.y1 + this.y2) / 2);
		return [xc, yc];
	}

	hasIntersect(other) {
		return (this.x1 <= other.x2 && this.x2 >= other.x1 &&
			this.y1 <= other.y2 && this.y2 >= other.y1);
	}
}
