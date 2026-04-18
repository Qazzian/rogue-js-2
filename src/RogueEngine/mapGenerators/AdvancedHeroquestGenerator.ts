import GameMap from "./GameMap";
import Room from "../Room";
import MapTile from "../MapTile";
import { Area, Grid, Point, Random } from "@Qazzian/pixel-game-engine";

enum DIRS {
	"n",
	"e",
	"s",
	"w",
}
const DirCode = [-1, 1, 1, -1];
interface Dimensions {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
}
//
// function isNS(enterFrom: MapNode) {
// 	return dir % 2 === 0;
// }
// function isEW(dir: DIRS) {
// 	return dir % 2 === 1;
// }

export default class AdvancedHeroquestGenerator extends GameMap {
	nextId: number;
	random: Random | null;
	dungeonGraph: MapNode | null;
	dimensions: Dimensions;

	constructor() {
		super({});

		this.nextId = 0;
		this.random = null;
		this.dungeonGraph = null;

		this.dimensions = {
			minX: 0,
			maxX: 0,
			minY: 0,
			maxY: 0,
		};
	}

	newId() {
		const id = this.nextId;
		this.nextId++;
		return id;
	}

	getTilesInRange(range: Area): Grid<MapTile> {
		throw new Error("Method not implemented.");
	}

	generateMap(randomGenerator: Random) {
		this.random = randomGenerator;

		const startDir = this.random.intBetween(0, 4);

		this.dungeonGraph = PASSAGE_TYPES.STAIRS_IN(this.newId(), startDir, 0, 0);
		// const passage1 = PASSAGE_TYPES.PASSAGE(this.newId(), startDir, 2);
		// this.dungeonGraph.exits.push(passage1);
		// console.info("Dungeon Graph: ", this.dungeonGraph);
		// this.generateNextPiece(passage1);
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

interface MapNodeOptions {
	id: number;
	type: string;
	x: number;
	y: number;
	width: number;
	height: number;
	entrance?: MapNode;
}

class MapNode extends Room {
	public id: number;
	public type: string;
	public exits: MapNode[];

	constructor({ id, type, x, y, width, height, entrance }: MapNodeOptions) {
		super(x, y, width, height);
		this.id = id;
		this.type = type;
		this.exits = [];
		if (entrance) {
			this.exits.push(entrance);
		}
	}

	exists() {}
}

/**
 *
 * @param {rand}random
 */
function genPassageLength(random: Random) {
	const roll = random.intBetween(1, 12);
	if (roll <= 2) return 1;
	if (roll <= 8) return 2;
	return 3;
}

/**
 *
 * @param {rand} random
 * @param {char} entranceFrom - Direction the map is being drawn from one of N, S, E or W
 */
function rollForPassageEnd(random: Random, entranceFrom: MapNode) {
	const roll = random.intBetween(2, 24);
	if (roll <= 3) {
	}

	function rollTDirection(random: Random) {
		const roll = random.intBetween(1, 3);
		if (roll === 1) {
			return "LEFT";
		}
		if (roll === 2) {
			return "BACK";
		}
		if (roll === 3) {
			return "RIGHT";
		}
	}
}

const PASSAGE_TYPES = {
	// Start of the level
	STAIRS_IN: function (id: number, direction: number, x: number, y: number) {
		return new MapNode({
			id,
			type: "STAIRS_IN",
			x,
			y,
			width: 2,
			height: 2,
		});
	},
	// End of the level
	STAIRS_DOWN: {},
	STAIRS_OUT: {},
	END_PASSAGE: {},
	// length here means the number of passage segments not total number of tiles. Each segment is 5 tiles.
	PASSAGE: function (id: number, entrance: MapNode, length: number, x: number, y: number, isNS: boolean) {
		return new MapNode({
			id,
			type: "PASSAGE",
			x,
			y,
			width: isNS ? 2 : 5 * length,
			height: isNS ? 5 * length : 2,
			entrance,
		});
	},
	S_W_CORNER: {},
	S_E_CORNER: {},
	N_W_CORNER: {},
	N_E_CORNER: {},
	N_W_S_JUNC: {},
	W_S_E_JUNC: {},
	S_E_N_JUNC: {},
	E_N_W_JUNC: {},
	CROSS_JUNC: {},
};

const ROOM_TYPES = {
	NORMAL: {},
	HAZARD: {},
	LAIR: {},
	QUEST: {},
};
