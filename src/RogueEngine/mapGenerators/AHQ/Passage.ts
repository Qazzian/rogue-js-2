import { MapNode } from "./MapNode";
import { DIRS } from "./AdvancedHeroquestGenerator";
import { Random } from "@Qazzian/pixel-game-engine";
import { MapSection } from "./MapSection";

export enum PASSAGE_TYPES {
	STAIRS_IN,
	PASSAGE,
	DEAD_END,
	// T_JUNCTION,
	// RIGHT_TURN,
	// LEFT_TURN,
	// CROSS_JUNCTION,
	// T_LEFT,
	// T_RIGHT,
	// STAIRS_OUT,
	// STAIRS_DOWN,
}

export interface PassageOptions {
	entrance?: MapNode; // optional for the starting piece, otherwise expected
	length?: number;
	x: number;
	y: number;
	direction: DIRS;
}

export const Passage: {
	[Property in keyof typeof PASSAGE_TYPES]: (o: PassageOptions) => MapSection;
} = {
	// Start of the level
	STAIRS_IN: function ({ direction, x, y }) {
		return new MapSection({
			type: "STAIRS_IN",
			x,
			y,
			width: 2,
			height: 2,
			meta: {
				direction,
			},
		});
	},
	DEAD_END: ({ x, y, direction }) => {
		return new MapSection({
			type: "DEAD_END",
			x,
			y,
			width: 2,
			height: 2,
			meta: {
				direction,
			},
		});
	},
	// STAIRS_DOWN: (o) => {},
	// STAIRS_OUT: (o) => {},
	// END_PASSAGE: {},
	// length here means the number of passage segments not total number of tiles. Each segment is 5 tiles.
	PASSAGE: function ({ length, x, y, direction }) {
		length ||= 5;
		return new MapSection({
			type: "PASSAGE",
			x: direction === DIRS.n ? x + 5 * length : x,
			y: direction === DIRS.n ? y : y,
			width: direction % 2 === 0 ? 2 : 5 * length,
			height: direction % 2 !== 0 ? 5 * length : 2,
		});
	},
};

export function genPassageLength(random: Random) {
	const roll = random.intBetween(1, 12);
	if (roll <= 2) return 1;
	if (roll <= 8) return 2;
	return 3;
}

export function generateStairsIn(random: Random) {
	const startDir = random.intBetween(0, 4);
	const entrance: MapSection = Passage.STAIRS_IN({ direction: startDir, x: 0, y: 0, length: 2 });
	const start = new MapNode({ section: entrance });
	const passageStart = { x: 0, y: 0 };
	if (startDir === DIRS.n) {
		passageStart.x = entrance.x1;
		passageStart.y = entrance.y1;
	}

	const passageLength = genPassageLength(random);
	const passage1 = Passage.PASSAGE({
		entrance: start,
		length: passageLength,
		x: passageStart.x,
		y: passageStart.y,
		direction: startDir,
	});
	const passageNode = new MapNode({ section: passage1, entrance: start });
	start.exits.push(passageNode);
	const passageEndType = rollPassageEnd(random);
	const passageEnd = Passage[passageEndType]({ direction: startDir, x: passage1.x2, y: passage1.y2 });
	passageNode.exits.push(new MapNode({ section: passageEnd, entrance: passageNode }));
	return start;
}

export function rollPassageEnd(random: Random): keyof typeof Passage {
	const roll = random.intBetween(2, 24);
	// if (roll <= 4) return rollTJunction(random);
	if (roll <= 8) return "DEAD_END";
	// if (roll <= 11) return PASSAGE_TYPES.RIGHT_TURN;
	// if (roll <= 14) return rollTJunction(random);
	// if (roll <= 17) return PASSAGE_TYPES.LEFT_TURN;
	// if (roll <= 22) return rollStairs(random);
	// if (roll <= 24) return PASSAGE_TYPES.CROSS_JUNCTION;
	return "DEAD_END";
}

// export function rollTJunction(random: Random): PASSAGE_TYPES {
// 	const roll = random.intBetween(1, 12);
// 	// if (roll <= 6) return PASSAGE_TYPES.T_JUNCTION;
// 	// if (roll <= 9) return PASSAGE_TYPES.T_LEFT;
// 	// return PASSAGE_TYPES.T_RIGHT;
// }

// export function rollStairs(rand: Random, modifier = 0): PASSAGE_TYPES {
// 	const roll = rand.intBetween(2, 24) + modifier;
// 	// if (roll <= 15) return PASSAGE_TYPES.STAIRS_OUT;
// 	// return PASSAGE_TYPES.STAIRS_DOWN;
// }
