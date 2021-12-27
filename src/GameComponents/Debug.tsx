import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";

import {DebugOption} from "../RogueEngine/tools/DebugOptions";

interface DebugProps {
	setDebugFlag: (flagName: string, isEnabled: boolean) => void,
	getDebugFlags: () => any,
}

const defaultDebugProps = {
	setDebugFlag: (flagName: string, isEnabled: boolean) => {},
	getDebugFlags: () => {[]},
};

export default function Debug(props: DebugProps) {

	const [debugFlags, setDebugFlags]: [any, any] = useState(defaultDebugProps);

	useEffect(() => {
		setDebugFlags(props.getDebugFlags());
	}, []);

	const flagNames = Object.keys(debugFlags);


	console.info('Debug flags', debugFlags);

	return <section className="debug-actions">
		<header>Debug options</header>
		{ flagNames.map(flagName => DebugFlag(flagName)) }
	</section>;


	function DebugFlag(flagName: string) {
		const isActive:boolean = debugFlags[flagName];

		return <label key={flagName}>
			Room numbers:
			<input type="checkbox" id={flagName} value="1" checked={isActive} onChange={event => onFlagChanged(flagName, event)}/>
		</label>
	}

	function onFlagChanged(flagName: string, event:ChangeEvent<HTMLInputElement>) {
		console.info('flagChange:', {flagName, event});
		const isChecked = event.target.checked;
		props.setDebugFlag(flagName, isChecked);
	}
}

