import { MapView } from "./MapView";
import { Area, COLORS, DrawInterface, Grid, Position } from "@qazzian/pixel-game-engine";
import GameMap from "./GameMap";
import MapTile from "./MapTile";

class TestMap extends GameMap {
	generateMap = jest.fn();
	getPlayerStart = jest.fn();
	getTilesInRange = jest.fn();
}

const WallTile: MapTile = new MapTile("wall", false, false);

const mockDisplay: DrawInterface = {
	draw: jest.fn(),
	drawCharacter: jest.fn(),
	clear: jest.fn(),
	fillRect: jest.fn(),
};

describe("MapView", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test("MapView is defined", () => {
		expect(MapView).toBeDefined();
		expect(typeof MapView).toBe("function");
	});
	test("MapView can be instantiated", () => {
		const mapView = new MapView(new Area(1, 1, 2, 2), new TestMap(), mockDisplay);
		expect(mapView).toBeInstanceOf(MapView);
		expect(mapView).toMatchObject({});
	});

	test("An empty map should clear the screen", () => {
		const startArea = new Area(0, 0, 10, 10);
		const mapView = new MapView(startArea, new TestMap(), mockDisplay);
		mapView.print();
		expect(mockDisplay.clear).toHaveBeenCalledTimes(1);
	});

	test("map with a single block", () => {
		const startArea = new Area(0, 0, 10, 10);
		const testMap = new TestMap();
		const simpleGrid = new Grid([[], [null, WallTile]]);
		testMap.getTilesInRange.mockReturnValue(simpleGrid); // return a block at 1,1
		const mapView = new MapView(startArea, testMap, mockDisplay);

		mapView.print();
		expect(mockDisplay.clear).toHaveBeenCalledTimes(1);
		expect(mockDisplay.draw).toHaveBeenCalledWith(1, 1, COLORS.DARK_BLUE);
	});

	test("Map with an area", () => {
		const startArea = new Area(0, 0, 10, 10);
		const mapView = new MapView(startArea, new TestMap(), mockDisplay);
		expect(mapView.update).toBeDefined();
		mapView.update(new Position(6, 6));
	});
});
