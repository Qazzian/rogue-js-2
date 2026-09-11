import { DIRS } from "./AdvancedHeroquestGenerator";
import { Random } from "@Qazzian/pixel-game-engine";
import Mock = jest.Mock;
import { generateStairsIn } from "./Passage";
jest.mock("@Qazzian/pixel-game-engine", () => {
	const originalModule = jest.requireActual("@Qazzian/pixel-game-engine");
	return {
		__esModule: true,
		...originalModule,
		Random: jest.fn(() => ({
			seed: 0,
			rand: jest.fn(),
			intBetween: jest.fn(() => 0),
			vector: jest.fn(() => 0),
		})),
	};
});
const dirs = Object.keys(DIRS).filter((dir) => !isNaN(parseInt(dir)));

describe("AHQ Passage", () => {
	let rng: Random;

	beforeEach(() => {
		jest.clearAllMocks();
		rng = new Random();
	});
	test.each(dirs)("Generate Stairs in - %s", (dir) => {
		(rng.intBetween as Mock).mockReturnValueOnce(dir);
		const startNode = generateStairsIn(rng);
		expect(startNode).toMatchSnapshot();
	});

	test("Start passage should have stairs, corridor and an end piece", () => {
		(rng.intBetween as Mock).mockReturnValueOnce(1);
		const startNode = generateStairsIn(rng);
		expect(startNode.mapSection.type).toEqual("STAIRS_IN");
		expect(startNode.exits).toHaveLength(1);
		const startPassage = startNode.exits[0];
		expect(startPassage.mapSection.type).toEqual("PASSAGE");
		expect(startPassage.exits).toHaveLength(1);
		const passageEnd = startPassage.exits[0];
		expect(passageEnd.mapSection.type).toEqual("DEAD_END");
	});
});
