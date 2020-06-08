import { buildGeometry, Edge } from './fov';


describe('FOV functions', () => {
	test('Edge Class', () => {
		expect(Edge).toBeDefined();
		const edge1 = new Edge(2, 5);
		expect(edge1).toMatchObject({
			x1: 2, x2: 2, y1: 5, y2: 5,
		});

		edge1.extend(1, 0);
		expect(edge1).toMatchObject({
			x1: 2, x2: 3, y1: 5, y2: 5,
		});

		const edge2 = new Edge(0, 0);
		edge2.extend(0, -2);
		expect(edge2).toMatchObject({
			x1: 0, x2: 0, y1: 0, y2: -2,
		});

		edge2.extend(1, -1);
		expect(edge2).toMatchObject({
			x1: 0, x2: 1, y1: 0, y2: -3,
		});

		expect(edge2.getPoints()).toMatchObject([[0, 1], [0, -3]]);
	});


	describe('buildGeometry', () => {

		const testMap = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];

		test('defined', () => {
			expect(buildGeometry).toBeDefined();
		});

		test('Returns geometry listing', () => {
			const geom = buildGeometry();

			expect(geom).toBeDefined();
			expect(geom.length).toBeGreaterThan(0);
			expect(geom[0] instanceof Edge).toBe(true);
		});
	});

});
