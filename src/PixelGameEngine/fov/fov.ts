import Edge from './Edge';

interface Point {
	x: number,
	y: number,
}

interface Ray {
	angle: number,
	x: number,
	y: number,
}

export default function fov(
	source: Point,
	geometry: Edge[],
	radius: number,
) {
	const lightRays = createRaysFromGeometry(source, geometry, radius);
	return calculateLightPolygon(lightRays);
}

export function createRaysFromGeometry(
	source: Point,
	geometry: Edge[],
	radius: number,) {
	return geometry.reduce((rays: Ray[], edge: Edge) => {
		const pointList = edge.getPoints();
		const rayList = pointList.reduce((allRays, point) => {
			return allRays.concat(createRaysFromPoint(source, radius, point));
		}, [] as Ray[]);

		return rays.concat(rayList);
	}, [] as Ray[]);
}

export function createRaysFromPoint(source: Point, radius: number, destination: Point) : Ray[]  {
	const x = destination.x - source.x;
	const y = destination.y - source.y;
	const angle = Math.atan2(y, x);

	return [angle - 0.0001, angle, angle + 0.0001]
		.map((a) => makeRay(a, radius));
}

export function makeRay(angle: number, radius: number) {
	return {
		angle,
		x: radius * Math.cos(angle),
		y: radius * Math.sin(angle),
	};
}


