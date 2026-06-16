import React, { useEffect, useState } from "react";

import "./controls.css";

export interface ControllerProps {
	onKeyPress: (key: string) => void;
}

const DirKeys = [
	{ key: "ArrowLeft", label: "Left" },
	{ key: "ArrowUp", label: "Up" },
	{ key: "ArrowDown", label: "Down" },
	{ key: "ArrowRight", label: "Right" },
];

export default function Controls(props: Readonly<ControllerProps>) {

	const [repeatedKey, setRepeatedKey] = useState("");
	const [repeatIntervalId, setRepeatIntervalId] = useState<NodeJS.Timeout>();
	const [repeatFirstClick, setRepeatFirstClick] = useState<boolean>(false);
	useEffect(() => {
		if (repeatedKey !== "" && repeatFirstClick) {
			console.log(`Pressed: ${repeatedKey}`);
			props.onKeyPress(repeatedKey);
			setTimeout(() => {
				setRepeatFirstClick(false);
			}, 300);
		} else if (repeatedKey !== "") {
			const intervalId = setInterval(() => {
				console.log(`Pressed: ${repeatedKey}`);
				props.onKeyPress(repeatedKey);
			}, 100);
			setRepeatIntervalId(intervalId);
		} else if (repeatIntervalId) {
			clearInterval(repeatIntervalId);
		}

		return () => {
			clearInterval(repeatIntervalId);
		};
	}, [repeatedKey, repeatFirstClick]);

	return (
		<section className="Controller">
			<p>Controls</p>
			<div>
				{DirKeys.map(({ key, label }) => {
					return (
						<button key={key} data-key={key} onPointerDown={onPress} onPointerUp={onRelease}>
							{label}
						</button>
					);
				})}
			</div>
		</section>
	);

	function onPress(e: React.PointerEvent) {
		e.preventDefault();
		e.stopPropagation();
		const targetElement = e.target as HTMLButtonElement;
		const key = targetElement.dataset.key ?? "";
		setRepeatFirstClick(true);
		setRepeatedKey(key);
	}

	function onRelease(e: React.PointerEvent) {
		e.preventDefault();
		e.stopPropagation();
		setRepeatedKey("");
	}
}
