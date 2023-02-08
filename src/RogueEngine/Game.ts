import PixelGameEngine from '../PixelGameEngine/PixelGameEngine';
import buildGeometry from '../PixelGameEngine/fov/buildGeometry';
import fov from '../PixelGameEngine/fov/fov';
import {getASeed, objMatch} from '../PixelGameEngine/util';
import Random from './tools/Random';
import Entity from './Entity';
import Theme from './GameTheme';
import {COLOURS} from '../PixelGameEngine/Colour';
import Position from "../PixelGameEngine/locationObjects/Position";
import EventEmitter from 'events';


import TutorialMap from './mapGenerators/TutorialMap';
import GameMap from "./GameMap";
import Area from '../PixelGameEngine/locationObjects/Area';
import MapTile from "./MapTile";
import {DebugOption} from "./tools/DebugOptions";

function getMapGenerator(name: string) {
	switch (name) {
		default:
		case 'tutorial':
			return TutorialMap;
	}
}

interface DebugFlagNames {
	"showFov": string,
	"showRoomNumbers": string,
	"showFovGeometry": string,
}

export default class Game extends EventEmitter {
	private canvas: HTMLCanvasElement;
	private gameEngine: PixelGameEngine;
	private isGameActive: boolean;

	private seed: string;
	private random: Random;
	private generatorName: string;
	private map: GameMap | undefined;
	private player: Entity;
	private entities: Entity[];
	private mapWindow: { width: number; height: number };
	private mapViewer: { area: { x: number; width: number; y: number; height: number }; tiles: any[] };
	private debugFlags: { showFov: boolean; showRoomNumbers: boolean; showFovGeometry: boolean };
	private fovCache: { playerPos: { x: any; y: any }; fov: null };

	private updateHandler: { (gameStats: any): void; (gameStats: any): void };


	constructor(canvasElement: HTMLCanvasElement) {
		super();

		this.canvas = canvasElement;
		this.mapWindow = {
			width: 60,
			height: 40,
		};
		this.gameEngine = new PixelGameEngine(this.canvas, this.mapWindow.width, this.mapWindow.height, 16, 16);

		this.isGameActive = false;

		this.seed = '';
		this.random = new Random();
		this.generatorName = 'tutorial';

		this.mapViewer = {
			area: {x: 0, y: 0, width: 0, height: 0},
			tiles: [],
		};


		this.player = new Entity(new Position(0, 0), 'player', Theme.entities.player);
		this.entities = [this.player];
		this.updateHandler = () => {
		};

		this.fovCache = {
			playerPos: {x: NaN, y: NaN},
			fov: null,
		};

		console.info('setting default debug flags');
		this.debugFlags = {
			showRoomNumbers: false,
			showFovGeometry: false,
			showFov: false,
		};
	}

	async start(onUpdateHandler: { (gameStats: any): void; (gameStats: any): void; }) {
		try {

			await this.preloadAssets();
			this.updateHandler = onUpdateHandler;
			this.map = new (getMapGenerator(this.generatorName))(50, 50);
			this.seed = await getASeed();
			console.info('MAP SEED = ', this.seed);
			this.random = new Random(this.seed);

			this.map.generateMap(this.random);
			console.info('MAP:', this.map);

			this.isGameActive = true;

			this.entities = [];
			const playerPos: Position = this.map.getPlayerStart();
			this.player = new Entity(playerPos, 'player', Theme.entities.player);
			this.entities.push(this.player);
			// const [ox, oy] = this.map.rooms[3].center();
			// this.entities.push(new Entity(ox, oy, 'npc', Theme.entities.npc));
			this.gameEngine.start((timePassed: any, timeStats: any) => this.update(timePassed, timeStats));
		} catch (error) {
			this.isGameActive = false;
			console.info('Game error: ', error);
		}
	}

	update(timePassed: any, timeStats: any) {
		const engine = this.gameEngine;
		engine.clear();

		const gameSpeed = this.getGameSpeed(timeStats);
		const viewWindow = this.calcViewOffset(this.calcViewArea());

		this.printMap(viewWindow);
		this.printMapDebug(viewWindow);
		this.printEntities(viewWindow);
		this.printOverlays(viewWindow);
		this.updateHandler({gameSpeed});

		return this.isGameActive;
	}

	async preloadAssets() {

		// this.spriteSheet = await loadSpriteSheet();
	}

	handleKeyEvent(event) {
		if (!this.isGameActive) {
			return;
		}
		switch (event.key) {
			case 'ArrowUp':
				this.moveEntity(this.player, 0, -1);
				break;
			case 'ArrowDown':
				this.moveEntity(this.player, 0, +1);
				break;
			case 'ArrowLeft':
				this.moveEntity(this.player, -1, 0);
				break;
			case 'ArrowRight':
				this.moveEntity(this.player, +1, 0);
				break;
		}
	}

	moveEntity(entity: Entity, dx: number, dy: number) {
		const [newX, newY] = [entity.x + dx, entity.y + dy];
		if (this.map.canMoveTo(newX, newY)) {
			entity.move(dx, dy);
		}
	}

	getGameSpeed(timeStats: { fps: any; }) {
		const {fps} = timeStats;
		if (this.isGameActive) {
			return fps;
		} else {
			return `PAUSED`;
		}
	}

	calcViewArea() {
		return {
			x: this.player.x - (this.mapWindow.width / 2),
			width: this.mapWindow.width,
			y: this.player.y - (this.mapWindow.height / 2),
			height: this.mapWindow.height,
		};
	}

	calcViewOffset(viewArea: { x: any; width?: number; y: any; height?: number; }) {
		return {
			...viewArea,
			xOffset: -viewArea.x,
			yOffset: -viewArea.y,
		};
	}

	printMap(area: Area) {
		let displayTiles;
		if (objMatch(area, this.mapViewer.area)) {
			displayTiles = this.mapViewer.tiles;
		} else {
			displayTiles = this.map.getTilesInRange(area);
			this.mapViewer = {
				area,
				tiles: displayTiles,
			};
		}

		displayTiles.forEach((row, x:number) => {
			// console.info('print row: ', x);
			row.forEach((tile: MapTile, y: number) => {
				this.printTile(x, y, tile);
			});
		});
	}

	printTile(x: number, y: number, tile: MapTile) {
		const tileTheme = tile.type && Theme.tiles[tile.type] ? Theme.tiles[tile.type] : Theme.tiles.ground;
		if (tileTheme.char) {
			debugger;
			this.gameEngine.drawCharacter(x, y, tileTheme.char, tileTheme.light);
		} else {
			this.gameEngine.draw(x, y, tileTheme.light);
		}
	};

	printMapDebug({xOffset, yOffset, width, height}) {
		const mapRangeParams = {
			x: xOffset * -1,
			y: yOffset * -1,
			width: width,
			height: height
		}
		const mapRange = this.map.getTilesInRange(mapRangeParams);
		const geometry = buildGeometry(mapRange, (tile) => tile.canSeeThrough(), true);

		const relativePlayerPosition = {
			x: this.player.x + xOffset + 0.5,
			y: this.player.y + yOffset + 0.5,
		};

		if (this.debugFlags.showFovGeometry) {
			geometry.forEach((edge) => {
				const {x1, x2, y1, y2} = edge;
				this.gameEngine.drawDebugLine(x1, y1, x2, y2, COLOURS.YELLOW);
			});
		}

		if (this.debugFlags.showRoomNumbers) {
			this.map.rooms.forEach((room, index) => {
				const {x1, y1} = room;
				this.gameEngine.drawCharacter(x1 + 1 + xOffset, y1 + 1 + yOffset, '' + index, COLOURS.DARK_RED);
			});
		}


		if (this.player.x !== this.fovCache.playerPos.x
			|| this.player.y !== this.fovCache.playerPos.y
		)
		{
			this.fovCache.playerPos = {...this.player};
			this.fovCache.fov = fov(relativePlayerPosition, geometry, 20);
			console.info('FOV: ', this.fovCache.fov);

			// console.info('fov:', this.fovCache.fov);
		}

		if (this.debugFlags.showFov) {
			this.printFov(relativePlayerPosition, this.fovCache.fov);
		}
	}

	printEntities({xOffset, yOffset}) {
		for (let i = this.entities.length - 1; i >= 0; i--) {
			const {x, y, theme: {char, light}} = this.entities[i];
			this.gameEngine.drawCharacter(x + xOffset, y + yOffset, char, light);
		}
	}

	printOverlays({xOffset, yOffset, width, height}) {

		const playerPosition = {
			x: this.player.x + xOffset + 0.5,
			y: this.player.y + yOffset + 0.5,
		};

		if (this.debugFlags.showFov) {
			this.gameEngine.drawCharacter(playerPosition.x - 0.5, playerPosition.y - 0.5, '+', COLOURS.RED);
		}
	}

	// TODO
	setMapGenerator(generatorName: string) {
		this.generatorName = generatorName;
	}

	printFov(playerPosition, fovMask) {
		this.gameEngine.drawPolygon(fovMask, COLOURS.RED);
	}

	pause() {
		this.isGameActive = false;
	}

	unpause() {
		this.isGameActive = true;
		this.gameEngine.start((timePassed, timeStats) => this.update(timePassed, timeStats));
	}

	setDebugFlag(flag: string, value: boolean) {
		console.info('set debug flag: ', {flag, value}, this);
		this.debugFlags[flag as keyof DebugFlagNames] = value;
	}

	getDebugFlags(): DebugOption[] {
		console.info('getting debug flags', this.debugFlags);
		const flagNames = Object.keys(this.debugFlags);
		return flagNames.map(name => ({
			name: name,
			value: this.debugFlags[name as keyof DebugFlagNames],
		}));
	}
}
