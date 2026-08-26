import MapTile, { generateEmptyArea } from "./MapTile";

describe("MapTile", () => {
	test("MapTile is defined", () => {
		expect(MapTile).toBeDefined();
		expect(typeof MapTile).toBe("function");
	});
	test("MapTile can be instantiated", () => {
		const mapTile = new MapTile("wall", false, false);
		expect(mapTile).toBeInstanceOf(MapTile);
		expect(mapTile).toMatchObject({});
	});
});

describe("MapTile generateEmptyArea", () => {
	const area = generateEmptyArea(5, 6);
	expect(area).toMatchSnapshot();
	expect(area.length).toBe(5);
	expect(area[0].length).toBe(6);
});
