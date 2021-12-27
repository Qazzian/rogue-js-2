export default class Area {
	public x1: number;
	public x2: number;
	public y1: number;
	public y2: number;
	public width: number;
	public height: number;

	constructor(x:number, y:number, width:number, height:number) {
		this.x1 = x;
		this.x2 = x + width;
		this.y1 = y;
		this.y2 = y + height;
		this.width = width;
		this.height = height;
	}

	get x () {
		return this.x1;
	}

	set x(x: number) {
		this.x1 = x;
		this.width = this.x2 - this.x1;
	}

	get y () {
		return this.y1;
	}

	set y(y: number) {
		this.y1 = y;
		this.height = this.y2 - this.y1;
	}
}
