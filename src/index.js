import PixelGameEngine, {COLORS} from "./PixelGameEngine";


class Game {
	constructor(canvasElement, width, height) {
		this.canvas = canvasElement;
		canvasElement.width = width;
		canvasElement.height = height;

		this.context = this.canvas.getContext('2d');
		this.gameEngine = new PixelGameEngine(this.canvas, 80, 60, 10, 10);
		this.gameEngine.clear();

		for(let x=0; x<80; x+=2) {
			this.gameEngine.draw(x,2,COLORS.WHITE);
		}

	}

}

const screen = document.getElementById('game_screen');
const game = new Game(screen);
