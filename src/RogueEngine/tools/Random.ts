import Rand from 'random-seed';

export default class Random {
	private seed: string;
	private rand: any;

	constructor(seed?: string|undefined) {
		this.seed = seed ?? Date.now().toString();
		// @ts-ignore
		this.rand = new Rand(seed);
	}

	intBetween(min: number, max: number): number {
		return this.rand.intBetween(min, max);
	}
}
