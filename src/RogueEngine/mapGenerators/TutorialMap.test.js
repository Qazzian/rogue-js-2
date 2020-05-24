import TutorialMap from './TutorialMap';

import rand from 'random-seed';


describe('TutorialMap tests', () => {
	test('init', () => {
		expect(TutorialMap).toBeDefined();
		const map = new TutorialMap(20, 30);
		map.initTiles();
		expect(map.tiles.length).toBe(20);
		expect(map.tiles[0].length).toBe(30);
	});

	describe('Get Tiles in range', () => {
		const map = new TutorialMap(10, 10);
		map.initTiles();

		test('with no offset', () => {

			const tileRange1 = map.getTilesInRange({x: 0, y: 0, width: 5, height: 8});
			expect(tileRange1.length).toBe(5);
			expect(tileRange1[0].length).toBe(8);
			expect(tileRange1).toMatchSnapshot();
		});

		test('with negative x offset', () => {
			const tileRange2 = map.getTilesInRange({x: -2, y: 0, width: 5, height: 8});
			expect(tileRange2.length).toBe(5);
			expect(tileRange2[0].length).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});

		test('with negative y offset',  () => {
			const tileRange2 = map.getTilesInRange({x: 0, y: -2, width: 5, height: 8});
			expect(tileRange2.length).toBe(5);
			expect(tileRange2[0].length).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});

		test('with y overflow',  () => {
			const tileRange2 = map.getTilesInRange({x: 0, y: +4, width: 5, height: 8});
			expect(tileRange2.length).toBe(5);
			expect(tileRange2[0].length).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});

	});
});
