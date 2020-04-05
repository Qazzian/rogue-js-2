import PixelGameEngine, { COLORS } from "./PixelGameEngine";
import { loadSpriteSheet, sprites } from "./ImageLoader_Arial10x10";
import Entity from "./Entity";

import './index.css';

class Game {
	constructor(canvasElement, statsElement) {
		this.statsElement = statsElement;
		this.canvas = canvasElement;
		this.gameEngine = new PixelGameEngine(this.canvas, 80, 60, 10, 10);

		this.spriteSheet = null;
		this.isGameActive = false;
		this.playerStart = {x: 50, y: 50};
		this.player = null;

		this.drawTests();
	}

	async start() {
		try {

			await this.preloadAssets();
			this.bindEvents();
			this.isGameActive = true;

			this.player = new Entity(this.playerStart.x, this.playerStart.y, sprites['@']);
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
		this.printStats(timeStats);
		this.drawTests();
		this.gameEngine.drawSprite(this.spriteSheet, this.player.sprite, [this.player.x, this.player.y]);

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

	drawTests() {
		const engine = this.gameEngine;
		engine.clear();

		for (let x = 0; x < 80; x += 2) {
			engine.draw(x, 2, COLORS.WHITE);
		}

		engine.fillRect(4, 4, 35, 40, COLORS.BLUE);
		engine.drawRect(6, 6, 30, 30, COLORS.YELLOW);

		// vertical
		engine.drawLine(1, 4, 1, 43, COLORS.YELLOW);
		engine.drawLine(78, 43, 78, 4, COLORS.YELLOW);
		// horizontal
		engine.drawLine(1, 45, 10, 45, COLORS.YELLOW);
		engine.drawLine(30, 45, 20, 45, COLORS.YELLOW);
		// angled
		engine.drawLine(7, 7, 21, 21, COLORS.RED);
		engine.drawLine(35, 7, 22, 21, COLORS.RED);
		engine.drawLine(7, 35, 21, 23, COLORS.RED);
		engine.drawLine(35, 35, 22, 23, COLORS.RED);
	}

}

const screen = document.getElementById('game_screen');
const stats = document.getElementById('stats');
const game = new Game(screen, stats);
document.getElementById('pause').addEventListener("click", () => game.pause());
document.getElementById('unpause').addEventListener("click", () => game.unpause());
game.start();

