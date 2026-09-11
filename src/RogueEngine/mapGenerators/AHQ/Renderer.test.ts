import { Render } from "./Renderer";
import { MapSection } from "./MapSection";
import { MapNode } from "./MapNode";
import { Area } from "@Qazzian/pixel-game-engine";
import PrintMap from "../../tools/PrintMap";

describe("Render", () => {
	test("Render", () => {
		expect(Render).toBeDefined();
	});

	test("Render a simple room", () => {
		const VIEW_WIDTH = 10,
			VIEW_HEIGHT = 8;
		const passage = new MapSection({ height: 4, type: "ROOM", width: 5, x: 2, y: 2 });
		const node = new MapNode({ section: passage });
		const view = Render(node, new Area(0, 0, VIEW_WIDTH, VIEW_HEIGHT));
		expect(view.length).toBe(VIEW_WIDTH);
		expect(view[0].length).toBe(VIEW_HEIGHT);
		const printedMap = PrintMap(view);
		console.log(printedMap);
		expect(printedMap).toMatchSnapshot();
	});

	test("Render the stairs", () => {
		const VIEW_WIDTH = 6,
			VIEW_HEIGHT = 6;
		const passage = new MapSection({ height: 2, type: "STAIRS_IN", width: 2, x: 2, y: 2 });
		const node = new MapNode({ section: passage });
		const view = Render(node, new Area(0, 0, VIEW_WIDTH, VIEW_HEIGHT));
		const printedMap = PrintMap(view);
		console.log(printedMap);
		expect(view.length).toBe(VIEW_WIDTH);
	});
});
