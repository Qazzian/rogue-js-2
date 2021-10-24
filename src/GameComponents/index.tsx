import * as React from "react";

import Game from "../RogueEngine/Game";

import Debug from "./Debug";
import { useEffect, useState } from "react";
import { TimeStats } from "@Qazzian/pixel-game-engine";

const screen = document.getElementById("game_screen");
const game = new Game(screen as HTMLCanvasElement);

const GameComponent = () => {
	const [gameSpeed, setGameSpeed] = useState("Paused");

	useEffect(() => {
		const handleKeyEvents = (eventDescription: KeyboardEvent) => {
			game.handleKeyEvent(eventDescription);
		};

		window.addEventListener("keydown", handleKeyEvents);
		game.start(gameUpdatedHandler).catch((error) => {
			console.error(error);
		});

		return () => {
			window.removeEventListener("keydown", handleKeyEvents);
		};
	}, [game]);

	return (
		<>
			<Debug
				setDebugFlag={(flagName, value) => {
					game.setDebugFlag(flagName, value);
				}}
				getDebugFlags={() => game.getDebugFlags()}
			/>

			<section id="actions">
				<button id="newMapButton" onClick={newGame}>
					New map
				</button>
				<button id="pause" onClick={() => game.pause()}>
					Stop!
				</button>
				<button id="unpause" onClick={() => game.unpause()}>
					Carry on
				</button>

				<span id="stats">FPS: {gameSpeed}</span>
			</section>
		</>
	);

	function newGame() {
		game.pause();
		game.start(gameUpdatedHandler).catch((error) => {
			console.error(error);
		});
	}

	function gameUpdatedHandler(gameStats: TimeStats) {
		if (gameStats.fps === 0) {
			setGameSpeed("Paused");
		} else {
			setGameSpeed(gameStats.fps.toString());
		}
	}
};
export default GameComponent;
