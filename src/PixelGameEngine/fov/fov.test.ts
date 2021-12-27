import fov, {
	createRaysFromGeometry,
	createRaysFromPoint,
	findLineIntersections,
	getIntersection,
} from './fov';

import Edge from './Edge';
import Ray from './Ray';
import {degToRad} from '../util';

describe('FOV', () => {
	test('id defined', () => {
		expect(fov).toBeDefined();
		expect(typeof fov).toBe('function');
	});

	test('createRaysFromGeometry', () => {
		const geom = [new Edge(2, 2, 1, 0)];
		const rayList = createRaysFromGeometry({x: 1, y: 1}, geom, 5);
		expect(rayList).toBeDefined();
		expect(rayList.length).toBe(6);
		expect(rayList).toMatchSnapshot();
	});

	test('createRaysFromPoint', () => {
		const origin = {x: 0, y: 0};
		const testRays = createRaysFromPoint(origin, 10, {x: 1, y: 1});

		expect(testRays.length).toBe(3);
		expect(testRays).toMatchSnapshot();
	});

	test('findLineIntersections', () => {
		const rayOrigin = {x: 1.0, y: 1.0};
		const geometry = [
			new Edge(0, 0, 3, 0),
			new Edge(0, 0, 0, 3),
			new Edge(0, 3, 3, 0),
			new Edge(3, 0, 0, 3),
		];
		const lightRays = createRaysFromGeometry(rayOrigin, geometry, 5);
		expect(lightRays.length).toBe(geometry.length * 2 * 3);
		const intersections = findLineIntersections(rayOrigin, lightRays, geometry);
		expect(intersections.length).toBe(lightRays.length);
		expect(intersections).toMatchSnapshot();
	});

	test('getIntersection', () => {
		// TODO:
		//  T2 <0,
		//  T2 > 1

		const rayOrigin = {x: 1.0, y: 1.0};
		const ray = new Ray(degToRad(45), 2);
		const intersectingEdge = new Edge(2.0, 1.0, -1.0, 1.0);
		// set Ray origin and convert e1 to a Ray
		expect(getIntersection(rayOrigin, ray, intersectingEdge)).toMatchObject({
			x: 1.5,
			y: 1.5,
		});
		const lineBelow = new Edge(-1, -1, 3, 3);
		expect(getIntersection(rayOrigin, ray, lineBelow)).toBeNull();
	});

	test('Can find edges in the fov', () => {
		const rayOrigin = {x: 1.0, y: 1.0};
		const geometry = [
			new Edge(0, 0, 3, 0),
			new Edge(0, 0, 0, 3),
			new Edge(0, 3, 3, 0),
			new Edge(3, 0, 0, 3),
			new Edge(4, 0, 0, 3),
		];

		const testView = fov(rayOrigin, geometry, 10);
		// TODO how are we going to know what is in the FOV?
		// options
		//  1. use the fov to produce image layers.
		//    bottom: full map
		//    middle: starts black, as player moves fov is added to transparent mask
		//    top: layer makes underneath Black and white except for current fov mask
		// 2. use the fov polygon to work out what is visible
		// In each case, will need a polygon that is added to as the player moves around the map to keep track of
		//   visited places.
		// entities should only be visible within the current fov


	});


});
