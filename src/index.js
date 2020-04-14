import PixelGameEngine  from "./PixelGameEngine/PixelGameEngine";
import {COLOURS} from "./PixelGameEngine/Colour";
import { loadSpriteSheet, sprites } from "./ImageLoader_Arial10x10";
import Entity from "./RogueEngine/Entity";

import './index.css';
import GameMap from "./RogueEngine/GameMap";

class Game {
	constructor(canvasElement, statsElement) {
		this.statsElement = statsElement;
		this.canvas = canvasElement;
		this.gameEngine = new PixelGameEngine(this.canvas, 60, 40, 15, 15);

		this.spriteSheet = null;
		this.isGameActive = false;

		this.playerStart = {x: 30, y: 39};
		this.player = null;

		this.map = null ;
		this.entities = [];
	}

	async start() {
		try {

			await this.preloadAssets();
			this.bindEvents();
			this.map = new GameMap(30, 30);
			console.info('MAP:', this.map);

			this.isGameActive = true;

			// this.player = new Entity(this.playerStart.x, this.playerStart.y, {sprite: sprites['@']});
			this.player = new Entity(this.playerStart.x, this.playerStart.y, {character: '@', colour: COLOURS.WHITE});
			this.entities.push(this.player);
			this.entities.push(new Entity(this.playerStart.x+10, this.playerStart.y-10, {character: '@', colour: COLOURS.CYAN}));
			this.gameEngine.start((timePassed, timeStats) => this.update(timePassed, timeStats));
		} catch (error) {
			this.isGameActive = false;
			console.info('Game error: ', error);
		}
	}

	pause() {
		this.isGameActive = false;
	}

	unpause() {
		this.isGameActive = true;
		this.gameEngine.start((timePassed, timeStats) => this.update(timePassed, timeStats));
	}

	update(timePassed, timeStats) {
		const engine = this.gameEngine;
		engine.clear();

		this.printStats(timeStats);
		this.printMap();

		this.entities.forEach((entity) => {
			const {x, y, character, colour} = entity;
			this.gameEngine.drawCharacter(x, y, character, colour);
		});

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
				this.player.move(0, -1);
				break;
			case 'ArrowDown':
				this.player.move(0, +1);
				break;
			case 'ArrowLeft':
				this.player.move(-1, 0);
				break;
			case 'ArrowRight':
				this.player.move(+1, 0);
				break;
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
		this.map.tiles.forEach((col, y) => {
			col.forEach((tile, x) => {

				if (!tile.allowsMovement) {
					this.gameEngine.draw(x, y, COLOURS.WHITE);
				}
			})
		})
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

