import PixelGameEngine  from "./PixelGameEngine/PixelGameEngine";
import {COLOURS} from "./PixelGameEngine/Colour";
import { loadSpriteSheet, sprites } from "./ImageLoader_Arial10x10";
import Entity from "./RogueEngine/Entity";
import Theme from "./RogueEngine/GameTheme";

import './index.css';
import GameMap from "./RogueEngine/GameMap";

class Game {
	constructor(canvasElement, statsElement) {
		this.statsElement = statsElement;
		this.canvas = canvasElement;
		this.gameEngine = new PixelGameEngine(this.canvas, 60, 40, 16, 16);

		this.spriteSheet = null;
		this.isGameActive = false;

		this.playerStart = {x: 30, y: 38};
		this.player = null;

		this.map = null ;
		this.entities = [];
	}

	async start() {
		try {

			await this.preloadAssets();
			this.bindEvents();
			this.map = new GameMap(60, 40);
			console.info('MAP:', this.map);

			this.isGameActive = true;

			// this.player = new Entity(this.playerStart.x, this.playerStart.y, {sprite: sprites['@']});
			this.player = new Entity(this.playerStart.x, this.playerStart.y, 'player', Theme.entities.player);
			this.entities.push(this.player);
			this.entities.push(new Entity(this.playerStart.x+10, this.playerStart.y-10, 'npc', Theme.entities.npc));
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
		this.printMap();
		this.printEntities();

		return this.isGameActive;
	}

	async preloadAssets() {

		this.spriteSheet = await loadSpriteSheet();
	}

	bindEvents() {
		window.addEventListener("keydown", (eventDescription) => {
			this.handleKeyEvent(eventDescription);
		});
	}

	handleKeyEvent(event) {
		if (!this.isGameActive){
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
		const {timestamp, timePassed, fps} = timeStats;
		if (this.isGameActive) {
			this.statsElement.innerText = `FPS: ${fps}`;
		}
		else {
			this.statsElement.innerText = `FPS: PAUSED`;
		}
	}

	printMap() {
		this.map.tiles.forEach((row, x) => {
			row.forEach((tile, y) => {
				this.printTile(x, y, tile);
			});
		});
	}

	printTile(x, y, tile) {
		const tileTheme = tile.type && Theme.tiles[tile.type] ? Theme.tiles[tile.type] : Theme.tiles.ground;
		if (tileTheme.char) {
			this.gameEngine.drawCharacter(x, y, tileTheme.char, tileTheme.light);
			this.charDraws++;
		}
		else {
			this.gameEngine.draw(x, y, tileTheme.light);
		}
	}

	printEntities() {
		for (let i = this.entities.length - 1; i >= 0; i--) {
			const {x, y, theme: {char, light}} = this.entities[i];
			this.gameEngine.drawCharacter(x, y, char, light);
		}
	}

	pause() {
		this.isGameActive = false;
	}

	unpause() {
		this.isGameActive = true;
		this.gameEngine.start((timePassed, timeStats) => this.update(timePassed, timeStats));
	}

	drawTests() {
		const engine = this.gameEngine;
		engine.clear();

		for (let x = 0; x < 80; x += 2) {
			engine.draw(x, 2, COLOURS.WHITE);
		}

		engine.fillRect(4, 4, 35, 40, COLOURS.BLUE);
		engine.drawRect(6, 6, 30, 30, COLOURS.YELLOW);

		// vertical
		engine.drawLine(1, 4, 1, 43, COLOURS.YELLOW);
		engine.drawLine(78, 43, 78, 4, COLOURS.YELLOW);
		// horizontal
		engine.drawLine(1, 45, 10, 45, COLOURS.YELLOW);
		engine.drawLine(30, 45, 20, 45, COLOURS.YELLOW);
		// angled
		engine.drawLine(7, 7, 21, 21, COLOURS.RED);
		engine.drawLine(35, 7, 22, 21, COLOURS.RED);
		engine.drawLine(7, 35, 21, 23, COLOURS.RED);
		engine.drawLine(35, 35, 22, 23, COLOURS.RED);
	}
}

const screen = document.getElementById('game_screen');
const stats = document.getElementById('stats');
const game = new Game(screen, stats);
document.getElementById('pause').addEventListener("click", () => game.pause());
document.getElementById('unpause').addEventListener("click", () => game.unpause());
game.start();

