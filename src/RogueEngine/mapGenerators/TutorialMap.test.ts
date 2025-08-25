import TutorialMap from "./TutorialMap";

// import rand from "random-seed";
import { Area } from "@qazzian/pixel-game-engine";

describe("TutorialMap tests", () => {
	test("init", () => {
		expect(TutorialMap).toBeDefined();
		const map = new TutorialMap({ maxWidth: 20, maxHeight: 30 });
		map.initTiles();
		expect(map.tiles.length).toBe(20);
		expect(map.tiles[0].length).toBe(30);
	});

	describe("Get Tiles in range", () => {
		const map = new TutorialMap({ maxWidth: 10, maxHeight: 10 });
		map.initTiles();

		test("with no offset", () => {
			const tileRange1 = map.getTilesInRange(new Area(0, 0, 5, 8));
			expect(tileRange1.width).toBe(5);
			expect(tileRange1.height).toBe(8);
			expect(tileRange1).toMatchSnapshot();
		});

		test("with negative x offset", () => {
			const tileRange2 = map.getTilesInRange(new Area(-2, 0, 5, 8));
			expect(tileRange2.width).toBe(5);
			expect(tileRange2.height).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});

		test("with negative y offset", () => {
			const tileRange2 = map.getTilesInRange(new Area(0, -2, 5, 8));
			expect(tileRange2.width).toBe(5);
			expect(tileRange2.height).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});

		test("with y overflow", () => {
			const tileRange2 = map.getTilesInRange(new Area(0, +4, 5, 8));
			expect(tileRange2.width).toBe(5);
			expect(tileRange2.height).toBe(8);
			expect(tileRange2).toMatchSnapshot();
		});
	});
});
