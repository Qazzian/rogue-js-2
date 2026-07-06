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
});
