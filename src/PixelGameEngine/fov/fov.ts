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

export function findLineIntersections(
	lightRays: Ray[],
	worldGeometry: Edge[]
) {
	lightRays.map((ray) => {
		const intersectedEdges = worldGeometry.filter((edge) => {
			const edgeVector = edge.getVector();
			if (doVectorsOverlap(edgeVector, ray)) {
				// TODO
			}
		})
	})
}

function doVectorsOverlap(v1: Point, v2: Point) {
	return Math.abs(v1.x - v2.x) === 0.0 || Math.abs(v1.y - v2.y) === 0.0
}

export function getIntersection(ray: Edge, segment:Edge){
// TODO translate into my interfaces
	// RAY in parametric: Point + Delta*T1
	const rayVector = ray.getVector();
	const segmentVector = segment.getVector();

	// Are they parallel? If so, no intersect
	const r_mag = Math.sqrt(
		rayVector.dx * rayVector.dx
		+ rayVector.dy * rayVector.dy
	);
	const s_mag = Math.sqrt(
		segmentVector.dx * segmentVector.dx
		+ segmentVector.dy * segmentVector.dy
	);
	if(rayVector.dx/r_mag == segmentVector.dx/s_mag
		&& rayVector.dy/r_mag == segmentVector.dy/s_mag){
		return null;
	}

	// SOLVE FOR T1 & T2
	// r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
	// ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
	// ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
	// ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
	const T2 = (rayVector.dx*(segmentVector.y - rayVector.y)
		+ rayVector.dy*(rayVector.x - segmentVector.x))
		/(segmentVector.dx * rayVector.dy - segmentVector.dy*rayVector.dx);
	const T1 = (segmentVector.x + segmentVector.dx * T2 - rayVector.x)/rayVector.dx;

	// Must be within parametic whatevers for RAY/SEGMENT
	if(T1<0) return null;
	if(T2<0 || T2>1) return null;

	// Return the POINT OF INTERSECTION
	return {
		x: rayVector.x + rayVector.dx * T1,
		y: rayVector.y + rayVector.dy * T1,
		param: T1
	};

}

/**
 * Copied algorithm from http://www.ambrsoft.com/MathCalc/Line/TwoLinesIntersection/TwoLinesIntersection.htm
 * @param {Edge} ray
 * @param {Edge} segment
 */
export function findLineIntersection(ray: Edge, segment: Edge) {
	/**
	 * Line 1
	 * 	a = (y2 - y1);
			b = (x1 - x2);
			c = x1 * (y1 - y2) + y1 * (x2 - x1);
			m = (y2 - y1) / (x2 - x1);

	 		Line 2
			a_ = (y2_ - y1_);
			b_ = (x1_ - x2_);
			c_ = x1_ * (y1_ - y2_) + y1_ * (x2_ - x1_);
			m_ = (y2_ - y1_) / (x2_ - x1_);

			Lines Match
	 		((x1 == x2) && (y1 == y2)) || ((x1_ == x2_) && (y1_ == y2_))

	 		Lines Parallel
	 		(a * b_ == a_ * b)

	 		Intersection
			xi = (b * c_ - c * b_) / (a * b_ - b * a_);
			yi = (c * a_ - a * c_) / (a * b_ - b * a_);
	 */


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


