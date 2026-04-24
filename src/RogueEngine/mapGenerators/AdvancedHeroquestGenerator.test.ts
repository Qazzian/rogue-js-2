import AdvancedHeroquestGenerator, { DIRS } from "./AdvancedHeroquestGenerator";
import { Random } from "@Qazzian/pixel-game-engine";
import Mock = jest.Mock;
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

describe("AdvancedHeroquestGenerator", () => {
	let ahq: AdvancedHeroquestGenerator;
	let rng: Random;

	beforeEach(() => {
		jest.clearAllMocks();
		ahq = new AdvancedHeroquestGenerator();
		rng = new Random();
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	test("Class is defined", () => {
		expect(AdvancedHeroquestGenerator).toBeDefined();
		expect(ahq).toBeDefined();
	});

	test.each(dirs)("Can generate a start map - %s", (dir) => {
		(rng.intBetween as Mock).mockReturnValueOnce(dir);
		ahq.generateMap(rng);
		expect(ahq.dungeonGraph).toMatchSnapshot();
	});
});
