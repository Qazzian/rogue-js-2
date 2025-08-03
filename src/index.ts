import Game, { DebugFlags } from "./RogueEngine/Game.js";

import "./index.css";

const screen = document.getElementById("game_screen");
const stats = document.getElementById("stats");
if (!screen) {
	throw new Error("No game screen found.");
}

const game = new Game(screen as HTMLCanvasElement, stats as HTMLElement);

window.addEventListener("keydown", (eventDescription) => {
	game.handleKeyEvent(eventDescription);
});

document.getElementById("newMapButton")!.addEventListener("click", () => {
	game.pause();
	game.start();
});
document.getElementById("pause")!.addEventListener("click", () => game.pause());
document.getElementById("unpause")!.addEventListener("click", () => game.unpause());

document.getElementById("showRoomNumbers")!.addEventListener("change", debugOptionChanged);
document.getElementById("showFovGeometry")!.addEventListener("change", debugOptionChanged);
document.getElementById("showFov")!.addEventListener("change", debugOptionChanged);
game.start();

function debugOptionChanged(event: Event) {
	const target = event.currentTarget as HTMLInputElement;
	const flagName = target.id;
	const value = target.checked;
	console.log("Debug flag to set: ", flagName, value);
	// if (flagName in DebugFlags) {
		// game.setDebugFlag(flagName, value);
	// }
}
