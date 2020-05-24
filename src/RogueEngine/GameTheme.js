import {COLOURS} from '../PixelGameEngine/Colour';

export default {
	entities: {
		player: { char: '@', dark: COLOURS.DARK_RED, light: COLOURS.CYAN},
		npc: {char: '@', dark: COLOURS.DARK_CYAN, light: COLOURS.RED},
	},

	tiles: {
		empty: { char: undefined, dark: COLOURS.BLACK, light: COLOURS.BLACK}, // for showing out of bounds areas
		ground: { char: undefined, dark: COLOURS.BLACK, light: COLOURS.BLACK},
		wall: { char: undefined, dark: COLOURS.VERY_DARK_BLUE, light: COLOURS.DARK_BLUE},
	},
};
