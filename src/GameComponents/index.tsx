import * as React from "react";

import Game from "../RogueEngine/Game";

import Debug from './Debug';
import {useEffect, useState} from "react";


const screen = document.getElementById('game_screen');
const game = new Game(screen as HTMLCanvasElement);

export default () => {

	const [gameSpeed, setGameSpeed] = useState('Paused');

	useEffect(() => {

		const handleKeyEvents = (eventDescription:KeyboardEvent) => {
			game.handleKeyEvent(eventDescription);
		}

		window.addEventListener("keydown", handleKeyEvents);
		game.start(gameUpdatedHandler).catch((error) => {
			console.error(error);
		});

		return () => {
			window.removeEventListener('keydown', handleKeyEvents);
		};
	}, [game])



	return <>
		<Debug setDebugFlag={game.setDebugFlag} getDebugFlags={() => {
			game.getDebugFlags()
		}}/>

		<section id="actions">
			<button id="newMapButton" onClick={newGame}>New map</button>
			<button id="pause" onClick={game.pause}>Stop!</button>
			<button id="unpause" onClick={game.unpause}>Carry on</button>

			<span id="stats">FPS: {gameSpeed}</span>
		</section>

	</>

	function newGame() {
		game.pause();
		game.start(gameUpdatedHandler).catch((error) => {
			console.error(error);
		});

	}

	function gameUpdatedHandler(gameStats:any) {
		setGameSpeed(gameStats.gameSpeed);
	}

};
