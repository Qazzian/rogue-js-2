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

/**
 *
 * @param {rand}random
 */
export function genPassageLength(random: Random) {
	const roll = random.intBetween(1, 12);
	if (roll <= 2) return 1;
	if (roll <= 8) return 2;
	return 3;
}
