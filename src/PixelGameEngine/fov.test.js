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
		test('is defined', () => {
			expect(buildGeometry).toBeDefined();
		});

		test('Empty map returns empty array', () => {
			const emptyMap = [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			];
			const geom = buildGeometry(emptyMap, () => {
			});
			expect(geom).toBeDefined();
			expect(geom.length).toBe(0);
		});

		describe('for only one block', () => {
			const tests = [
				{
					name: 'single east edge',
					map: [[0], [1]],
					geom: [{x1: 1, x2: 1, y1: 0, y2: 1}],
				},
				{
					name: 'single west edge',
					map: [[1], [0]],
					geom: [{x1: 1, x2: 1, y1: 0, y2: 1}],
				},
				{
					name: 'single north edge',
					map: [[0, 1]],
					geom: [{x1: 0, x2: 1, y1: 1, y2: 1}],
				},
				{
					name: 'single south edge',
					map: [[1, 0]],
					geom: [{x1: 0, x2: 1, y1: 1, y2: 1}],
				},
				{
					name: 'isolated block',
					map: [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
					geom: [// todo
						{x1: 1, x2: 2, y1: 1, y2: 1},
						{x1: 2, x2: 2, y1: 1, y2: 2},
						{x1: 1, x2: 2, y1: 2, y2: 2},
						{x1: 1, x2: 1, y1: 1, y2: 2},
					],
				},
			];

			tests.forEach(testData => test(testData.name, () => {
				const geom = buildGeometry(testData.map, (b) => !!b);
				expect(geom).toBeDefined();
				expect(geom.length).toBe(testData.geom.length);
				expect(geom).toMatchObject(testData.geom);
			}));
		});
	});

});
