import * as React from "react";

interface DebugProps {
	setDebugFlag: (flagName: string, isEnabled: boolean) => void,
}


export default function Debug(props: DebugProps) {

	return <section className="debug-actions">
		<header>Debug options</header>
		<label>
			Room numbers:
			<input type="checkbox" id="showRoomNumbers" value="1"/>
		</label>
		<label>
			Show fov geometry:
			<input type="checkbox" id="showFovGeometry" value="1"/>
		</label>
		<label>
			Show fov:
			<input type="checkbox" id="showFov" value="1"/>
		</label>

	</section>
}
