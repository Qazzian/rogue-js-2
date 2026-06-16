import React from "react";

import "./controls.css";

export interface ControllerProps {
	onKeyPress: (key: string) => void;
}

export default function Controls(props: Readonly<ControllerProps>) {
	return (
		<section className="Controller">
			<p>Controls</p>
			<div>
				<button data-key="ArrowLeft" onPointerDown={onPress} onPointerUp={(e) => onRelease(e, "ArrowLeft")}>left</button>
				<button onPointerUp={(e) => onRelease(e, "ArrowUp")}>up</button>
				<button onPointerUp={(e) => onRelease(e, "ArrowDown")}>down</button>
				<button onPointerUp={(e) => onRelease(e, "ArrowRight")}>right</button>
			</div>
		</section>
	);

	function onPress(e: React.PointerEvent) {
	// start repeat timer
		const key = e.eventTarget.data["key"];

	}

	function onRelease(e: React.PointerEvent, key: string) {
		e.preventDefault();
		props.onKeyPress(key);
	}
}
