export default class Edge {
	private readonly x1: number;
	private readonly y1: number;
	private x2: number;
	private y2: number;


	constructor(x1:number, y1:number, dx?:number, dy?:number) {
		this.x1 = x1;
		this.y1 = y1;

		this.x2 = x1;
		this.y2 = y1;

		if (typeof dx === 'number' && typeof dy === 'number') {
			this.extend(dx, dy);
		}
	}

	extend(dx:number, dy:number) {
		this.x2 += dx;
		this.y2 += dy;
	}

	getPoints() {
		return [
			{x: this.x1, y: this.y1},
			{x: this.x2, y: this.y2},
		];
	}
}
