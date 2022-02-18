import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";

import {DebugOption} from "../RogueEngine/tools/DebugOptions";

interface DebugProps {
	setDebugFlag: (flagName: string, isEnabled: boolean) => void,
	getDebugFlags: () => [DebugOption],
}

const defaultDebugProps = {
	setDebugFlag: (flagName: string, isEnabled: boolean) => {
	},
	getDebugFlags: () => [],
};

export default function Debug(props: DebugProps) {
	const debugFlags = props.getDebugFlags();


	console.info('Debug flags', debugFlags);


	const flagNames = Object.keys(debugFlags);

	return <section className="debug-actions">
		<header>Debug options</header>
		{debugFlags.map(DebugFlag)}
	</section>;


	function DebugFlag(debugFlag: DebugOption) {

		return <label key={debugFlag.name}>
			Room numbers:
			<input
				id={debugFlag.name}
				type="checkbox"
				value="1"
				checked={debugFlag.value}
				onChange={event => onFlagChanged(debugFlag.name, event)}/>
		</label>
	}

	function onFlagChanged(flagName: string, event: ChangeEvent<HTMLInputElement>) {
		console.info('flagChange:', {flagName, event});
		const isChecked = event.target.checked;
		props.setDebugFlag(flagName, isChecked);
	}
}

