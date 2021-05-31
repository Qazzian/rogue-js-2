import Edge from './Edge';
import Ray from './Ray';
import {Point} from './point';

interface Intersect {
	angle: number,
	x: number,
	y: number,
	distance: number,
}

export default function fov(
	source: Point,
	geometry: Edge[],
	radius: number,
) {
	const lightRays = createRaysFromGeometry(source, geometry, radius);
	const intersectionPoints = findLineIntersections(source, lightRays, geometry)
		.filter(line => line.angle !== 0)
		.sort((a, b) => {
			return a.angle - b.angle;
		});
	return intersectionPoints;
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
	rayOrigin: Point,
	lightRays: Ray[],
	worldGeometry: Edge[],
): Intersect[] {
	const INITIAL_INTERSECT = {x: 0, y: 0, distance: Number.MAX_VALUE, angle: 0};

	return lightRays.map((ray) => {
		return worldGeometry.reduce((nearestIntersect, edge) => {
			if (doVectorsOverlap(ray, edge.getVector())) {
				console.warn('OVERLAP:', ray, edge);
				return nearestIntersect;
			}
			const intersectionPoint = getIntersection(rayOrigin, ray, edge);
			return intersectionPoint && intersectionPoint.distance < nearestIntersect.distance ? intersectionPoint : nearestIntersect;
		}, INITIAL_INTERSECT as Intersect);
	});
}

function doVectorsOverlap(ray: Ray, vector: {dx: number, dy: number}) {
	return Math.abs(ray.dx - vector.dx) === 0.0 || Math.abs(ray.dy - vector.dy) === 0.0;
}

export function getIntersection(rayOrigin: Point, ray: Ray, segment: Edge): Intersect | null {
// TODO translate into my interfaces
	// RAY in parametric: Point + Delta*T1
	const segmentVector = segment.getVector();

	// SOLVE FOR T1 & T2
	// r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
	// ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
	// ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
	// ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
	const T2 = (ray.dx * (segmentVector.y - rayOrigin.y)
		+ ray.dy * (rayOrigin.x - segmentVector.x))
		/ (segmentVector.dx * ray.dy - segmentVector.dy * ray.dx);
	const T1 = (segmentVector.x + segmentVector.dx * T2 - rayOrigin.x) / ray.dx;

	// Must be within parametric whatevers for RAY/SEGMENT
	if (T1 < 0) return null;
	if (T2 < 0 || T2 > 1) return null;

	// Return the POINT OF INTERSECTION
	return {
		angle: ray.angle,
		x: rayOrigin.x + ray.dx * T1,
		y: rayOrigin.y + ray.dy * T1,
		distance: T1,
	};

}

export function createRaysFromPoint(source: Point, radius: number, destination: Point): Ray[] {
	const x = destination.x - source.x;
	const y = destination.y - source.y;
	const angle = Math.atan2(y, x);

	return [angle - 0.0001, angle, angle + 0.0001]
		.map((a) => new Ray(a, radius));
}

function sortRays(a: Ray, b: Ray) {
	return a.angle - b.angle;
}


