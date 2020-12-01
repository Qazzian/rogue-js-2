import fov, {
	createRaysFromGeometry,
	createRaysFromPoint,
	getIntersection,
	makeRay,
} from './fov';

import Edge from './Edge';

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


	test('makeRay', () => {
		expect(makeRay(0, 10))
			.toMatchObject({angle: 0, x: 10, y: 0});
		expect(makeRay(degToRad(360), 10))
			.toMatchObject({
				angle: 6.283185307179586,
				x: 10,
				y: -2.4492935982947065e-15,
			});
		expect(makeRay(degToRad(90), 10))
			.toMatchObject({
				angle: 1.5707963267948966,
				x: 6.123233995736766e-16,
				y: 10,
			});
	});


	test('lineIntersection',  () => {
		const e1 = new Edge(1.0, 1.0, 2.0, 2.0);
		const e2 = new Edge(2.0, 1.0, 1.0, 2.0);
		expect(getIntersection(e1, e2)).toMatchObject({
			x: 1.5,
			y: 1.5,
		});
	});
});


function degToRad(deg: number) {
	return deg * Math.PI / 180;
}
