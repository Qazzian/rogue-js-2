import GameMap from "../GameMap";
import MapTile from "../../MapTile";
import { Area, Grid, Point, Random } from "@Qazzian/pixel-game-engine";
import { generateStairsIn, genPassageLength, Passage, rollPassageEnd } from "./Passage";
import { MapNode } from "./MapNode";
import { MapSection } from "./MapSection";

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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getTilesInRange(range: Area): Grid<MapTile> {
		return new Grid<MapTile>([]);
	}

	generateMap(randomGenerator: Random) {
		this.random = randomGenerator;
		this.dungeonGraph = generateStairsIn(this.random);
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
