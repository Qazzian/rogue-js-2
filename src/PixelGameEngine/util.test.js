import {objMatch} from './util';


describe('objMatch Tests', () => {
	test('objects match',  () => {
		const obj1 = {a:1, b:2, c:3};
		const obj2 = {a:1, b:2, c:3};
		expect(objMatch(obj1, obj2)).toBe(true);
	});

	test('objects dont match',  () => {
		const obj1 = {a:1, b:2, c:3};
		const obj2 = {a:1, b:2, c:4};
		expect(objMatch(obj1, obj2)).toBe(false);
	});
});
