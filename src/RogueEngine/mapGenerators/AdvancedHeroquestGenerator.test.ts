import AdvancedHeroquestGenerator, { DIRS } from "./AdvancedHeroquestGenerator";
import { Area, Random } from "@Qazzian/pixel-game-engine";
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

describe("AdvancedHeroquestGenerator", () => {
	test("Can generate a start map", () => {
		const ahq = new AdvancedHeroquestGenerator();
		const mockRng = new Random();
		expect(ahq).toBeDefined();
		(mockRng.intBetween as Mock).mockReturnValueOnce(DIRS.n);
		ahq.generateMap(mockRng);
		expect(ahq.dungeonGraph).toMatchSnapshot();
	});
});
