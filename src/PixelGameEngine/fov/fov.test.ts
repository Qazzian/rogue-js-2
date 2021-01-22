import fov, {
	createRaysFromGeometry,
	createRaysFromPoint,
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

	// TODO test findLineIntersections

	test('lineIntersection',  () => {
		// TODO:
		//  T1 < 0
		//  T2 <0,
		//  T2 > 1

		const rayOrigin = {x: 1.0, y: 1.0};
		const e1 = new Ray(degToRad(45), 2);
		const e2 = new Edge(2.0, 1.0, -1.0, 1.0);
		// set Ray origin and convert e1 to a Ray
		expect(getIntersection(rayOrigin, e1, e2)).toMatchObject({
			x: 1.5,
			y: 1.5,
		});
	});
});
