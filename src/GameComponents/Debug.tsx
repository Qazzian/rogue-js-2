import React, { ChangeEvent } from "react";

import { DebugFlags, DebugOption } from "../RogueEngine/tools/DebugOptions";

export interface DebugProps {
	setDebugFlag: (flagName: keyof DebugFlags, isEnabled: boolean) => void;
	getDebugFlags: () => DebugFlags;
}

export default function Debug(props: DebugProps) {
	const debugFlags = props.getDebugFlags();

	console.info("Debug flags", debugFlags);

	return (
		<section className="debug-actions">
			<header>Debug options</header>
			{Object.keys(debugFlags).map((name) => {
				// @ts-expect-error name string -> DebugFlag
				return DebugFlag({ name: name as keyof DebugFlags, value: debugFlags[name] });
			})}
		</section>
	);

	function DebugFlag(debugFlag: DebugOption) {
		return (
			<label key={debugFlag.name}>
				{debugFlag.name}:
				<input
					id={`DEBUG_${debugFlag.name}`}
					type="checkbox"
					value="1"
					checked={debugFlag.value}
					onChange={(event) => onFlagChanged(debugFlag.name, event)}
				/>
			</label>
		);
	}

	function onFlagChanged(flagName: keyof DebugFlags, event: ChangeEvent<HTMLInputElement>) {
		console.info("flagChange:", { flagName, event });
		const isChecked = event.target.checked;
		props.setDebugFlag(flagName, isChecked);
	}
}
