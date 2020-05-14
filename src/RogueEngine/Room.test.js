import { Room } from './Room';

describe('Room Tests', () => {
	test('Create Rooms', () => {
		expect(new Room(1, 1, 10, 10)).toMatchObject({x1: 1, x2: 11, y1: 1, y2: 11, width: 10, height: 10});
	});

	test('Overlapping rooms', () => {
		const room1 = new Room(10, 10, 10, 10);
		expect(room1.hasIntersect(new Room(10, 10, 10, 10))).toBe(true);
		expect(room1.hasIntersect(new Room(5, 10, 6, 6))).toBe(true);
		expect(room1.hasIntersect(new Room(15, 10, 6, 6))).toBe(true);
		expect(room1.hasIntersect(new Room(10, 5, 6, 6))).toBe(true);
		expect(room1.hasIntersect(new Room(10, 15, 6, 6))).toBe(true);

		expect(room1.hasIntersect(new Room(5, 10, 4, 4))).toBe(false);
		expect(room1.hasIntersect(new Room(21, 10, 4, 4))).toBe(false);
		expect(room1.hasIntersect(new Room(10, 5, 4, 4))).toBe(false);
		expect(room1.hasIntersect(new Room(10, 21, 4, 4))).toBe(false);
	});
});
