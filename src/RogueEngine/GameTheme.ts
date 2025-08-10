import { Colour, COLOURS } from "@qazzian/pixel-game-engine";

export interface EntityTheme {
	char: string;
	dark: Colour;
	light: Colour;
}

const theme = {
	entities: {
		player: { char: "@", dark: COLOURS.DARK_RED, light: COLOURS.CYAN },
		npc: { char: "@", dark: COLOURS.DARK_CYAN, light: COLOURS.RED },
	},

	tiles: {
		empty: { char: undefined, dark: COLOURS.BLACK, light: COLOURS.BLACK }, // for showing out-of-bounds areas
		ground: { char: undefined, dark: COLOURS.BLACK, light: COLOURS.BLACK },
		wall: { char: undefined, dark: COLOURS.VERY_DARK_BLUE, light: COLOURS.DARK_BLUE },
	} as unknown as { [key: string]: EntityTheme },

	getTile: (tileType: string) => {
		if (tileType in theme.tiles) {
			return theme.tiles[tileType];
		}
		return theme.tiles.ground;
	},
};

export default theme;
