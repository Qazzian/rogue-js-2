import { PixelGameEngine, COLOURS, TimeStats, Area, Position, util, Point, fov } from "@qazzian/pixel-game-engine";
import rand, { RandomSeed } from "random-seed";
import Entity from "./Entity";
import Theme from "./GameTheme";

import TutorialMap from "./mapGenerators/TutorialMap";
import MapTile from "./MapTile";
import GameMap from "./mapGenerators/GameMap";
import { MapView } from "./MapView";
import { EmptyMap } from "./mapGenerators/EmptyMap";

const { buildFov, buildGeometry } = fov;

// const { getASeed, objMatch } = util;

// Todo move to a factory module in ./mapGenerators
function getMapGenerator(name: string) {
	switch (name) {
		default:
		case "tutorial":
			return TutorialMap;
	}
}

export enum DebugFlags {
	empty,
	showRoomNumbers,
	showFovGeometry,
	showFov,
}

export default class Game {
	private statsElement: HTMLElement;
	private canvas: HTMLCanvasElement;
	private mapWindow: { width: number; height: number };
	private gameEngine: PixelGameEngine;
	private mainView: MapView;
	private isGameActive: boolean;
	private seed: string | undefined;
	private random: RandomSeed | undefined;
	private generatorName: string;
	private map: GameMap | undefined;
	private player: Entity | undefined;
	private entities: Entity[];
	private fovCache: { playerPos: Point; fov: fov.Intersect[] | null };
	private readonly debugFlags: { [key in DebugFlags]?: boolean };
	previousViewArea: Area = new Area(0, 0, 0, 0);

	constructor(canvasElement: HTMLCanvasElement, statsElement: HTMLElement) {
		this.statsElement = statsElement;
		this.canvas = canvasElement;
		this.mapWindow = {
			width: 600,
			height: 400,
		};
		this.gameEngine = new PixelGameEngine(this.canvas, this.mapWindow.width, this.mapWindow.height, 16, 16);
		this.mainView = new MapView(new Area(0, 0, 60, 40), new EmptyMap({}), this.gameEngine);
		this.isGameActive = false;

		this.generatorName = "tutorial";

		this.entities = [];

		this.fovCache = {
			playerPos: { x: NaN, y: NaN },
			fov: null,
		};

		this.debugFlags = {
			[DebugFlags.showRoomNumbers]: false,
			[DebugFlags.showFovGeometry]: false,
			[DebugFlags.showFov]: false,
		};
	}

	async start() {
		try {
			await this.preloadAssets();
			this.map = new (getMapGenerator(this.generatorName))({ maxWidth: 100, maxHeight: 100 });
			this.seed = await util.getASeed();
			console.info("MAP SEED = ", this.seed);
			this.random = rand.create(this.seed);

			this.map.generateMap(this.random);
			console.info("MAP:", this.map);

			this.isGameActive = true;

			this.entities = [];
			const { x: px, y: py } = this.map.getPlayerStart();
			this.player = new Entity(px, py, "player", Theme.entities.player);
			this.entities.push(this.player);
			// const [ox, oy] = this.map.rooms[3].center();
			// this.entities.push(new Entity(ox, oy, 'npc', Theme.entities.npc));
			this.gameEngine.addEventListener("update", (event) => {
				const timeStats = event.detail;
				this.update(timeStats);
			});
			this.mainView = new MapView(new Area(0, 0, 60, 40), this.map, this.gameEngine);
			this.mainView.update(new Position(this.player.x, this.player.y));
			this.gameEngine.start();
		} catch (error) {
			this.isGameActive = false;
			console.info("Game error: ", error);
		}
	}

	update(timeStats: TimeStats) {
		const engine = this.gameEngine;
		engine.clear();

		this.printStats(timeStats);
		const viewWindow = this.calcViewOffset(this.calcViewArea());

		this.mainView.print();
		this.printMapDebug(viewWindow);
		this.printEntities(viewWindow);
		this.printOverlays(viewWindow);

		return this.isGameActive;
	}

	async preloadAssets() {
		// this.spriteSheet = await loadSpriteSheet();
	}

	handleKeyEvent(event: KeyboardEvent) {
		if (!this.isGameActive || !this.player) {
			return;
		}
		switch (event.key) {
			case "ArrowUp":
				this.moveEntity(this.player, 0, -1);
				break;
			case "ArrowDown":
				this.moveEntity(this.player, 0, +1);
				break;
			case "ArrowLeft":
				this.moveEntity(this.player, -1, 0);
				break;
			case "ArrowRight":
				this.moveEntity(this.player, +1, 0);
				break;
		}
	}

	moveEntity(entity: Entity, dx: number, dy: number) {
		if (!this.map) {
			return;
		}
		const [newX, newY] = [entity.x + dx, entity.y + dy];
		if (this.map.canMoveTo(newX, newY)) {
			entity.move(dx, dy);
		}
	}

	printStats(timeStats: TimeStats) {
		const { fps } = timeStats;
		if (this.isGameActive) {
			this.statsElement.innerText = `FPS: ${fps}`;
		} else {
			this.statsElement.innerText = "FPS: PAUSED";
		}
	}

	calcViewArea(): Area {
		const { x, y } = this.player ?? { x: 0, y: 0 };

		return new Area(
			x - this.mapWindow.width / 2,
			y - this.mapWindow.height / 2,
			this.mapWindow.width,
			this.mapWindow.height,
		);
	}

	calcViewOffset(viewArea: Area): Area {
		return new Area(-viewArea.x, -viewArea.y, viewArea.width, viewArea.height);
	}

	printMapDebug({ x: xOffset, y: yOffset, width, height }: Area) {
		if (!this.map) {
			return;
		}
		// console.log("Need to implement printMapDebug", { xOffset, yOffset, width, height });
		const mapRangeParams = new Area(xOffset * -1, yOffset * -1, width, height);
		const mapRange = this.map.getTilesInRange(mapRangeParams);
		const geometry = buildGeometry(
			mapRange,
			(tile: unknown) => {
				if (tile instanceof MapTile) {
					return tile.canSeeThrough();
				}
				return false;
			},
			true,
		);

		// if (this.debugFlags.showFovGeometry) {
		// 	geometry.forEach((edge) => {
		// 		const { x1, x2, y1, y2 } = edge;
		// 		this.gameEngine.drawDebugLine(x1, y1, x2, y2, COLOURS.YELLOW);
		// 	});
		// }

		// if (this.debugFlags.showRoomNumbers) {
		// 	this.map.rooms.forEach((room: Room, index: number) => {
		// 		const { x1, y1 } = room;
		// 		this.gameEngine.drawCharacter(x1 + 1 + xOffset, y1 + 1 + yOffset, "" + index, COLOURS.DARK_RED);
		// 	});
		// }

		if (this.player) {
			const relativePlayerPosition = {
				x: this.player.x + xOffset + 0.5,
				y: this.player.y + yOffset + 0.5,
			};
			if (this.player.x !== this.fovCache.playerPos.x || this.player.y !== this.fovCache.playerPos.y) {
				this.fovCache.playerPos = { ...this.player };
				this.fovCache.fov = buildFov(relativePlayerPosition, geometry, 20);
				console.info("fov:", this.fovCache.fov);
			}

			// if (this.debugFlags.showFov) {
			// 	const fovData = this.printFov(relativePlayerPosition, this.fovCache.fov);
			// }
		}
	}

	printEntities({ x: xOffset, y: yOffset }: Point) {
		for (let i = this.entities.length - 1; i >= 0; i--) {
			const {
				x,
				y,
				theme: { char, light },
			} = this.entities[i];
			this.gameEngine.drawCharacter(x + xOffset, y + yOffset, char, light);
		}
	}

	printOverlays({ x: xOffset, y: yOffset }: Area) {
		if (!this.player) {
			return;
		}
		const playerPosition = {
			x: this.player.x + xOffset + 0.5,
			y: this.player.y + yOffset + 0.5,
		};

		if (this.debugFlags[DebugFlags.showFov]) {
			this.gameEngine.drawCharacter(playerPosition.x - 0.5, playerPosition.y - 0.5, "+", COLOURS.RED);
		}
	}

	// TODO
	setMapGenerator(generatorName: string) {
		this.generatorName = generatorName;
	}

	printFov(playerPosition: Position, fovMask: Position[]) {
		this.gameEngine.drawPolygon(fovMask, COLOURS.RED);
	}

	pause() {
		this.isGameActive = false;
		this.gameEngine.stop();
	}

	unpause() {
		this.isGameActive = true;
		this.gameEngine.start();
	}

	setDebugFlag(flag: DebugFlags, value: boolean) {
		console.info("set debug flag: ", flag, value);
		this.debugFlags[flag] = value;
	}
}
