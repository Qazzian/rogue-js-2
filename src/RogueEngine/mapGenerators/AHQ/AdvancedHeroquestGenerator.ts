import GameMap from "../GameMap";
import MapTile, { generateEmptyArea } from "../../MapTile";
import { Area, Grid, Point, Random } from "@Qazzian/pixel-game-engine";
import { generateStairsIn } from "./Passage";
import { MapNode, traverseMapGraph } from "./MapNode";
import { Render } from "./Renderer";

export enum DIRS {
	"n",
	"e",
	"s",
	"w",
}

export default class AdvancedHeroquestGenerator extends GameMap {
	nextId: number;
	random: Random | null;
	dungeonGraph: MapNode | null;
	dimensions: Area;

	constructor() {
		super({});

		this.nextId = 0;
		this.random = null;
		this.dungeonGraph = null;

		this.dimensions = new Area(0, 0, 0, 0);
	}

	newId() {
		const id = this.nextId;
		this.nextId++;
		return id;
	}

	generateMap(randomGenerator: Random) {
		this.random = randomGenerator;
		this.dungeonGraph = generateStairsIn(this.random);
		// TODO the dimensions need to grow with the dungeonGraph
		traverseMapGraph(this.dungeonGraph, (node) => this.extendDimensions(node));
		this._tiles = Render(this.dungeonGraph, this.dimensions);
	}

	extendDimensions(mapNode: MapNode) {
		const mapSection = mapNode.mapSection;
		if (mapSection.x1 < this.dimensions.x1) {
			this.dimensions.x1 = mapSection.x1;
		}
		if (mapSection.x2 > this.dimensions.x2) {
			this.dimensions.x2 = mapSection.x2;
		}
		if (mapSection.y1 < this.dimensions.y1) {
			this.dimensions.y1 = mapSection.y1;
		}
		if (mapSection.y2 > this.dimensions.y2) {
			this.dimensions.y2 = mapSection.y2;
		}
	}

	getTilesInRange(range: Area): Grid<MapTile> {
		const tiles: MapTile[][] = generateEmptyArea(range.width, range.height);
		if (!this._tiles) {
			return new Grid(tiles);
		}
		for (let x = range.x1; x < range.x2; x++) {
			for (let y = range.y1; y < range.y2; y++) {
				tiles[x - range.x1][y - range.y1] = this.getTile(x, y);
			}
		}
		return new Grid(tiles);
	}

	getTile(x: number, y: number): MapTile {
		if (this._tiles[x] && this._tiles[x][y]) {
			return this._tiles[x][y];
		}
		return new MapTile("ground", true);
	}

	generateNextPiece(previousPiece: MapNode) {
		// TODO
		throw new Error("Method not implemented." + JSON.stringify(previousPiece));
	}

	trackMapSize(addedPiece: MapNode) {
		// TODO
		throw new Error("Method not implemented." + JSON.stringify(addedPiece));
	}

	getPlayerStart(): Point {
		return { x: 0, y: 0 };
	}
}

/**
 *
 * @param {rand} random
 * @param {char} entranceFrom - Direction the map is being drawn from one of N, S, E or W
 */
// function rollForPassageEnd(random: Random, entranceFrom: MapNode) {
// 	const roll = random.intBetween(2, 24);
// 	if (roll <= 3) {
// 	}
//
// 	function rollTDirection(random: Random) {
// 		const roll = random.intBetween(1, 3);
// 		if (roll === 1) {
// 			return "LEFT";
// 		}
// 		if (roll === 2) {
// 			return "BACK";
// 		}
// 		if (roll === 3) {
// 			return "RIGHT";
// 		}
// 	}
// }

// const ROOM_TYPES = {
// 	NORMAL: {},
// 	HAZARD: {},
// 	LAIR: {},
// 	QUEST: {},
// };
