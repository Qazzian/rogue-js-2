import { Colour, COLOURS } from "@Qazzian/pixel-game-engine";

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
		empty: { char: "_", dark: COLOURS.BLACK, light: COLOURS.BLACK }, // for showing out-of-bounds areas
		floor: { char: "_", dark: COLOURS.BLACK, light: COLOURS.BLACK }, // for showing out-of-bounds areas
		ground: { char: "░", dark: COLOURS.BLACK, light: COLOURS.BLACK },
		wall: { char: "▓", dark: COLOURS.VERY_DARK_BLUE, light: COLOURS.DARK_BLUE },
		stairs: { char: ">", dark: COLOURS.DARK_YELLOW, light: COLOURS.YELLOW },
		STAIRS_IN: { char: ">", dark: COLOURS.DARK_GREY, light: COLOURS.YELLOW },
		STAIRS_DOWN: { char: ">", dark: COLOURS.DARK_YELLOW, light: COLOURS.YELLOW },
		STAIRS_OUT: { char: ">", dark: COLOURS.DARK_GREEN, light: COLOURS.GREEN },
		DEAD_END: { char: undefined, dark: COLOURS.BLACK, light: COLOURS.DARK_GREY },
	} as unknown as { [key: string]: EntityTheme },

	getTile: (tileType: string) => {
		if (tileType in theme.tiles) {
			return theme.tiles[tileType];
		}
		return theme.tiles.ground;
	},
};

export default theme;
