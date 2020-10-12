import rand from 'random-seed';

import Game from './RogueEngine/Game';

import './index.css';


const screen = document.getElementById('game_screen');
const stats = document.getElementById('stats');
const game = new Game(screen, stats);



window.addEventListener("keydown", (eventDescription) => {
	game.handleKeyEvent(eventDescription);
});

document.getElementById('newMapButton').addEventListener('click', () => {
	game.pause();
	game.start();
});
document.getElementById('pause').addEventListener("click", () => game.pause());
document.getElementById('unpause').addEventListener("click", () => game.unpause());

document.getElementById('ShowRoomNumbersOptions').addEventListener("change", (event) => {
	const value = event.target.checked;
	game.setDebugFlag('ShowRoomNumbersOption', value);
});
document.getElementById('ShowFovGeomOption').addEventListener("change", (event) => {
	const value = event.target.checked;
	game.setDebugFlag('showFovGeometry', value);
});
game.start();

