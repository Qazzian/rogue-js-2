import Ray from './Ray';
import {degToRad} from '../util';

test('makeRay', () => {
	expect(new Ray(0, 10))
		.toMatchObject({angle: 0, dx: 10, dy: 0});
	expect(new Ray(degToRad(360), 10))
		.toMatchObject({
			angle: 6.283185307179586,
			dx: 10,
			dy: -2.4492935982947065e-15,
		});
	expect(new Ray(degToRad(90), 10))
		.toMatchObject({
			angle: 1.5707963267948966,
			dx: 6.123233995736766e-16,
			dy: 10,
		});
});

