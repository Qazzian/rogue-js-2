import React from "react";

import "./controls.css";

export interface ControllerProps {
	onKeyPress: (key: string) => void;
}

export default function Controls(props: Readonly<ControllerProps>) {
	const onPress = props.onKeyPress;

	return (
		<section className="Controller">
			<p>Controls</p>
			<div>
				<button onPointerUp={() => onPress("ArrowUp")}>up</button>
				<button onPointerUp={() => onPress("ArrowLeft")}>left</button>
				<button onPointerUp={() => onPress("ArrowDown")}>down</button>
				<button onPointerUp={() => onPress("ArrowRight")}>right</button>
			</div>
		</section>
	);
}
