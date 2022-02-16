import {COLOURS} from '../PixelGameEngine/Colour';
import EntityTheme from '../PixelGameEngine/EntityTheme';

export default {
	entities: {
		player: new EntityTheme('@', COLOURS.DARK_RED, COLOURS.CYAN),
		npc: new EntityTheme('@', COLOURS.DARK_CYAN, COLOURS.RED),
	},

	tiles: {
		empty: new EntityTheme(undefined, COLOURS.BLACK, COLOURS.BLACK), // for showing out of bounds areas
		ground: new EntityTheme(undefined, COLOURS.BLACK, COLOURS.BLACK),
		wall: new EntityTheme( undefined, COLOURS.VERY_DARK_BLUE, COLOURS.DARK_BLUE),
	},
};
