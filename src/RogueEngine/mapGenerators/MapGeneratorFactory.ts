import AdvancedHeroquestGenerator from "./AHQ/AdvancedHeroquestGenerator";
import { EmptyMap } from "./EmptyMap";
import TutorialMap from "./Tutorial/TutorialMap";

export const mapGeneratorList = [
	{ name: "Empty", id: "empty" },
	{ name: "Tutorial", id: "tutorial" },
	{ name: "Advanced Heroquest", id: "AHQ" },
];

export default function MapGeneratorFactory(name: string) {
	switch (name) {
		case "tutorial":
			return TutorialMap;
		case "AHQ":
			return AdvancedHeroquestGenerator;
		case "empty":
			return EmptyMap;
	}
	throw new Error(`Unknown Map generator ${name}`);
}
