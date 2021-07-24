import Game from './RogueEngine/Game';

import './index.css';


const screen = document.getElementById('game_screen');
const stats = document.getElementById('stats');
const game = new Game(screen, stats);



window.addEventListener("keydown", (eventDescription) => {
	game.handleKeyEvent(eventDescription);
});
document.getElementById('mapGeneratorSelector')!.addEventListener("change", (event) => {
	const selectElement = event.target as HTMLSelectElement;
	const selectedValue = selectElement.value;
	game.setMapGenerator(selectedValue);
});
document.getElementById('newMapButton')!.addEventListener('click', () => {
	game.pause();
	game.start();
});
document.getElementById('pause')!.addEventListener("click", () => game.pause());
document.getElementById('unpause')!.addEventListener("click", () => game.unpause());

document.getElementById('showRoomNumbers')!.addEventListener("change", debugOptionChanged);
document.getElementById('showFovGeometry')!.addEventListener("change", debugOptionChanged);
document.getElementById('showFov')!.addEventListener("change", debugOptionChanged)
game.start();

function debugOptionChanged(event:Event) {
	const target = event.currentTarget as HTMLInputElement;
	const flagName =  target.id;
	const value = target.checked;
	game.setDebugFlag(flagName, value);
}
