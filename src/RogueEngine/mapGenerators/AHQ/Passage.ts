import { MapNode } from "./MapNode";
import { DIRS } from "../AdvancedHeroquestGenerator";
import { Random } from "@Qazzian/pixel-game-engine";
import { MapSection } from "./MapSection";

export const Passage = {
	// Start of the level
	STAIRS_IN: function (id: number, direction: DIRS, x: number, y: number) {
		return new MapSection({
			id,
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
	// End of the level
	STAIRS_DOWN: {},
	STAIRS_OUT: {},
	END_PASSAGE: {},
	// length here means the number of passage segments not total number of tiles. Each segment is 5 tiles.
	PASSAGE: function (id: number, entrance: MapNode, length: number, x: number, y: number, direction: DIRS) {
		return new MapSection({
			id,
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

export enum END_TYPES {
	STAIRS_IN,
	T_JUNCTION,
	DEAD_END,
	RIGHT_TURN,
	LEFT_TURN,
	CROSS_JUNCTION,
	T_LEFT,
	T_RIGHT,
	STAIRS_OUT,
	STAIRS_DOWN,
}

export function rollPassageEnd(random: Random) {
	const roll = random.intBetween(2, 24);
	if (roll <= 4) return rollTJunction(random);
	if (roll <= 8) return END_TYPES.DEAD_END;
	if (roll <= 11) return END_TYPES.RIGHT_TURN;
	if (roll <= 14) return rollTJunction(random);
	if (roll <= 17) return END_TYPES.LEFT_TURN;
	if (roll <= 22) return rollStairs(random);
	if (roll <= 24) return END_TYPES.CROSS_JUNCTION;
}

export function rollTJunction(random: Random) {
	const roll = random.intBetween(1, 12);
	if (roll <= 6) return END_TYPES.T_JUNCTION;
	if (roll <= 9) return END_TYPES.T_LEFT;
	if (roll <= 12) return END_TYPES.T_RIGHT;
}

export function rollStairs(rand: Random, modifier = 0) {
	const roll = rand.intBetween(2, 24) + modifier;
	if (roll <= 15) return END_TYPES.STAIRS_OUT;
	return END_TYPES.STAIRS_DOWN;
}
