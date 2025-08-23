import { Area, Position, DrawInterface, COLORS, Grid } from "@qazzian/pixel-game-engine";
import GameMap from "./GameMap.js";
import MapTile from "./MapTile";
import Theme from "./GameTheme";

export class MapView {
	private viewCenter: Position | undefined;
	private viewWindow: Area = new Area(0, 0, 0, 0);
	private map: GameMap;
	private printer: DrawInterface;
	private printArea: Grid<MapTile>;

	constructor(viewWindow: Area, map: GameMap, printer: DrawInterface) {
		this.viewCenter = new Position(viewWindow.x, viewWindow.y);
		this.viewWindow = viewWindow;
		this.map = map;
		this.printer = printer;
		this.viewWindow = this.calcViewArea(this.viewCenter);
		this.printArea = map.getTilesInRange(viewWindow);
	}

	update(center: Position) {
		if (this.viewCenter && this.viewCenter.equals(center)) {
			return;
		}
		this.viewCenter = center;
		this.viewWindow = this.calcViewArea(center);
		this.printArea = this.map.getTilesInRange(this.viewWindow);
	}

	print(): void {
		this.printer.clear(COLORS.BLACK);
		this.printArea.forEach((tile, x, y) => {
			const tileTheme = Theme.tiles[tile?.tileType] ?? Theme.tiles.ground;
			this.printer.draw(x, y, tileTheme.light);
		});
	}

	calcViewArea(center: Position): Area {
		const { x, y } = center;

		// TODO what if on the edge of the map?
		return new Area(
			x - this.viewWindow.width / 2,
			y - this.viewWindow.height / 2,
			this.viewWindow.width,
			this.viewWindow.height,
		);
	}
}
