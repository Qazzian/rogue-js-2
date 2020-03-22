import PixelGameEngine, {COLORS} from "./PixelGameEngine";
import {loadSpriteSheet, sprites} from "./ImageLoader_Arial10x10";

class Game {
	constructor(canvasElement, width, height) {
		this.canvas = canvasElement;
		canvasElement.width = width;
		canvasElement.height = height;

		this.context = this.canvas.getContext('2d');
		this.gameEngine = new PixelGameEngine(this.canvas, 80, 60, 10, 10);
		this.gameEngine.clear();

		this.spriteSheet = null;

		this.drawTests();
	}

	async start() {
		this.spriteSheet = await loadSpriteSheet();
		this.gameEngine.drawSprite(this.spriteSheet, sprites['@'], [50, 50]);
	}

	drawTests() {
		const engine = this.gameEngine;

		for(let x=0; x<80; x+=2) {
			engine.draw(x,2,COLORS.WHITE);
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
const game = new Game(screen);
game.start();
