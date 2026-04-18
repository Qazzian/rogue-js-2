import Room from "../../Room";

export interface MapSectionParams {
	id: number;
	type: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export class MapSection extends Room {
	private id: number;
	private type: string;

	constructor(props: MapSectionParams) {
		super(props.x, props.y, props.width, props.height);
		this.id = props.id;
		this.type = props.type;
	}
}
