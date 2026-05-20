import React from "react";
import { useState } from "react";

export interface GeneratorSelectorProps {
	generators: { name: string; id: string }[];
	onChange: (generatorId: string) => void;
}

export default function MapGeneratorSelector(props: GeneratorSelectorProps) {
	const [selectedGenerator, setSelectedGenerator] = useState<string>("0");

	return (
		<select onChange={onChange}>
			<option value={"0"} selected={selectedGenerator === "0"}>
				Select a map generator
			</option>
			{props.generators.map((generator) => {
				return (
					<option key={generator.id} value={generator.id} selected={selectedGenerator === generator.id}>
						{generator.name}
					</option>
				);
			})}
		</select>
	);

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		const newValue = event.target.value;
		if (newValue !== selectedGenerator) {
			return;
		}
		setSelectedGenerator(newValue);
		if (newValue === "0") {
			return;
		}
		props.onChange(event.target.value);
	}
}
