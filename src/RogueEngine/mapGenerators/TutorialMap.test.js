import TutorialMap from './TutorialMap';

import rand from 'random-seed';
import Area from '../../PixelGameEngine/locationObjects/Area';


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

			const tileRange1 = map.getTilesInRange(new Area(0, 0, 5, 8));
			expect(tileRange1.length).toBe(5);
			expect(tileRange1[0].length).toBe(8);
			expect(tileRange1).toMatchSnapshot();
		});

		test('with negative x offset', () => {
			const tileRange2 = map.getTilesInRange(new Area(-2, 0, 5, 8));
			expect(tileRange2.length).toBe(5);
			expect(tileRange2[0].length).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});

		test('with negative y offset',  () => {
			const tileRange2 = map.getTilesInRange(new Area(0, -2, 5, 8));
			expect(tileRange2.length).toBe(5);
			expect(tileRange2[0].length).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});

		// TODO This test doesn't look right to me
		test('with y overflow',  () => {
			const tileRange2 = map.getTilesInRange(new Area(0, 4, 5, 8));
			expect(tileRange2.length).toBe(5);
			expect(tileRange2[0].length).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});

	});
});
