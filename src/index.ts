import Game from './RogueEngine/Game';

import './index.css';


const screen = document.getElementById('game_screen');
const stats = document.getElementById('stats');
const game = new Game(screen, stats);



window.addEventListener("keydown", (eventDescription) => {
	game.handleKeyEvent(eventDescription);
});

// @ts-ignore
document.getElementById('newMapButton').addEventListener('click', () => {
	game.pause();
	game.start();
});
// @ts-ignore
document.getElementById('pause').addEventListener("click", () => game.pause());
// @ts-ignore
document.getElementById('unpause').addEventListener("click", () => game.unpause());
// @ts-ignore
document.getElementById('DebugFlag').addEventListener("change", (event:ChangeEvent) => {
	const checked = event.currentTarget.checked;
	game.setDebugFlag(checked);
});
game.start();

