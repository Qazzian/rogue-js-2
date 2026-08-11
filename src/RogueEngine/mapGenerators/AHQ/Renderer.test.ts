import { Render } from "./Renderer";
import { MapSection } from "./MapSection";
import { MapNode, MapNodeOptions } from "./MapNode";

describe("Render", () => {
	test("Render", () => {
		expect(Render).toBeDefined();
	});

	test("Render with default tile", () => {
		const VIEW_WIDTH = 10, VIEW_HEIGHT = 8;
		const passage = new MapSection({ height: 5, type: "ROOM", width: 5, x: 1, y: 1 });
		const node = new MapNode({ section: passage });
		const view = Render(node, 0, 0, VIEW_WIDTH, VIEW_HEIGHT);
		expect(view).toBeDefined();
		expect(Array.isArray(view)).toBe(true);
		expect(view.length).toBe(VIEW_WIDTH);
		expect(Array.isArray(view[0])).toBe(true);
		expect(view[0].length).toBe(VIEW_HEIGHT);
	});
});
