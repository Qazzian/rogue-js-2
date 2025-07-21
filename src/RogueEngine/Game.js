import { PixelGameEngine, fov, util, COLOURS } from 'pixel-game-engine';
import rand from 'random-seed';
import Entity from './Entity';
import Theme from './GameTheme';

import TutorialMap from './mapGenerators/TutorialMap';

const {buildGeometry} = fov;
const {getASeed, objMatch} = util;

function getMapGenerator(name) {
	switch (name) {
		default:
		case 'tutorial':
			return TutorialMap;
	}
}

export default class Game {
	constructor(canvasElement, statsElement) {
		this.statsElement = statsElement;
		this.canvas = canvasElement;
		this.mapWindow = {
			width: 60,
			height: 40,
		};
		this.gameEngine = new PixelGameEngine(this.canvas, this.mapWindow.width, this.mapWindow.height, 16, 16);

		this.isGameActive = false;

		this.seed = null;
		this.random = null;
		this.generatorName = 'tutorial';

		this.map = null;
		this.player = null;
		this.entities = null;
		this.mapViewer = {
			area: {x: 0, y: 0, width: 0, height: 0},
			tiles: [],
		};

		this.fovCache = {
			playerPos: {x: NaN, y: NaN},
			fov: null,
		};

		this.debugFlags = {
			showRoomNumbers: false,
			showFovGeometry: false,
			showFov: false,
		};
	}

	async start() {
		try {

			await this.preloadAssets();
			this.map = new (getMapGenerator(this.generatorName))(100, 100);
			this.seed = await getASeed();
			console.info('MAP SEED = ', this.seed);
			this.random = new rand(this.seed);

			this.map.generateMap(this.random);
			console.info('MAP:', this.map);

			this.isGameActive = true;

			this.entities = [];
			const [px, py] = this.map.getPlayerStart();
			this.player = new Entity(px, py, 'player', Theme.entities.player);
			this.entities.push(this.player);
			// const [ox, oy] = this.map.rooms[3].center();
			// this.entities.push(new Entity(ox, oy, 'npc', Theme.entities.npc));
			this.gameEngine.start((timePassed, timeStats) => this.update(timePassed, timeStats));
		} catch (error) {
			this.isGameActive = false;
			console.info('Game error: ', error);
		}
	}

	update(timePassed, timeStats) {
		const engine = this.gameEngine;
		engine.clear();

		this.printStats(timeStats);
		const viewWindow = this.calcViewOffset(this.calcViewArea());

		this.printMap(viewWindow);
		this.printMapDebug(viewWindow);
		this.printEntities(viewWindow);
		this.printOverlays(viewWindow);

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

	moveEntity(entity, dx, dy) {
		const [newX, newY] = [entity.x + dx, entity.y + dy];
		if (this.map.canMoveTo(newX, newY)) {
			entity.move(dx, dy);
		}
	}

	printStats(timeStats) {
		const {fps} = timeStats;
		if (this.isGameActive) {
			this.statsElement.innerText = `FPS: ${fps}`;
		} else {
			this.statsElement.innerText = `FPS: PAUSED`;
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

	calcViewOffset(viewArea) {
		return {
			...viewArea,
			xOffset: -viewArea.x,
			yOffset: -viewArea.y,
		};
	}

	printMap(area) {
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

		displayTiles.forEach((row, x) => {
			// console.info('print row: ', x);
			row.forEach((tile, y) => {
				this.printTile(x, y, tile);
			});
		});
	}

	printTile(x, y, tile) {
		const tileTheme = tile.type && Theme.tiles[tile.type] ? Theme.tiles[tile.type] : Theme.tiles.ground;
		if (tileTheme.char) {
			debugger;
			this.gameEngine.drawCharacter(x, y, tileTheme.char, tileTheme.light);
		} else {
			this.gameEngine.draw(x, y, tileTheme.light);
		}
	}

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

			// console.info('fov:', this.fovCache.fov);
		}

		if (this.debugFlags.showFov) {
			const fovData = this.printFov(relativePlayerPosition, this.fovCache.fov);
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
	setMapGenerator(generatorName) {
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

	setDebugFlag(flag, value) {
		console.info('set debug flag: ', flag, value);
		this.debugFlags[flag] = value;
	}
}
