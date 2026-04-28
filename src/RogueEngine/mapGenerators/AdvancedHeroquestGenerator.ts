import GameMap from "./GameMap";
import MapTile from "../MapTile";
import { Area, Grid, Point, Random } from "@Qazzian/pixel-game-engine";
import { genPassageLength, Passage, rollPassageEnd } from "./AHQ/Passage";
import { MapNode } from "./AHQ/MapNode";
import { MapSection } from "./AHQ/MapSection";

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
		throw new Error("Method not implemented.");
	}

	generateMap(randomGenerator: Random) {
		this.random = randomGenerator;

		const startDir = this.random.intBetween(0, 4);
		const entrance: MapSection = Passage.STAIRS_IN(this.newId(), startDir, 0, 0);
		const start = (this.dungeonGraph = new MapNode({ section: entrance }));
		const passageStart = { x: 0, y: 0 };
		if (startDir === DIRS.n) {
			passageStart.x = entrance.x1;
			passageStart.y = entrance.y1;
		}

		const passageLength = genPassageLength(this.random);
		const passage1 = Passage.PASSAGE(this.newId(), start, passageLength, passageStart.x, passageStart.y, startDir);
		start.exits.push(new MapNode({ section: passage1, entrance: start }));

		const endType = rollPassageEnd(this.random);
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
