import Room from "../../Room";

export interface MapSectionParams {
	type: string;
	x: number;
	y: number;
	width: number;
	height: number;
	meta?: object;
}

export class MapSection extends Room {
	private type: string;
	private meta: object;

	constructor(props: MapSectionParams) {
		super(props.x, props.y, props.width, props.height);
		this.type = props.type;
		this.meta = props?.meta ?? {};
	}
}
