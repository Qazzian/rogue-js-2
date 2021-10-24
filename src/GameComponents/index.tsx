import * as React from "react";
import Game from '../RogueEngine/Game';
import {useState} from "react";

import Debug from './Debug';

interface MainProps {
	setDebugFlag: (flagName: string, isEnabled: boolean) => void,
}

export default (props: MainProps) => {

	return <>
		<Debug setDebugFlag={props.setDebugFlag}/>

		<section id="actions">
			<button id="newMapButton">New map</button>
			<button id="pause">Stop!</button>
			<button id="unpause">Carry on</button>

			<span id="stats"></span>
		</section>

	</>
};
