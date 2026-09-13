import MapTile from "../MapTile";
import theme from "../GameTheme";

export default function PrintMap(map: MapTile[][]) {
	let output = "╔" + "═".repeat(map.length) + "╗\n";
	for (let x = 0; x < map.length; x++) {
		output += "║";
		for (let y = 0; y < map[x].length; y++) {
			const tile = map[x][y];
			output += theme.tiles[tile.tileType]?.char ?? "?";
		}
		output += "║\n";
	}
	output += "╚" + "═".repeat(map.length) + "╝";
	return output;
}
