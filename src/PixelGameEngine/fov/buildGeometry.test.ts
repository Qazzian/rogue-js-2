import buildGeometry from './buildGeometry';


describe('FOV functions', () => {

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
					map: [[1], [0]],
					geom: [{x1: 1, x2: 1, y1: 0, y2: 1}],
				},
				{
					name: 'single west edge',
					map: [[0], [1]],
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
					geom: [
						{x1: 1, x2: 2, y1: 1, y2: 1},
						{x1: 2, x2: 2, y1: 1, y2: 2},
						{x1: 1, x2: 2, y1: 2, y2: 2},
						{x1: 1, x2: 1, y1: 1, y2: 2},
					],
				},
			];

			tests.forEach(testGeometry);
		});
	});

	describe('for adjacent blocks', () => {
		const tests = [
			{
				name: 'two high',
				map: [
					[0, 0, 0],
					[1, 1, 0],
					[0, 0, 0]],
				geom: [
					{x1: 2, x2: 2, y1: 0, y2: 2},
					{x1: 1, x2: 1, y1: 0, y2: 2},
					{x1: 1, x2: 2, y1: 2, y2: 2},
				],
			},
			{
				name: 'snake like',
				map: [
					[0, 0, 0, 0, 0],
					[0, 1, 0, 0, 0],
					[0, 1, 0, 0, 0],
					[0, 1, 0, 0, 0],
					[0, 1, 1, 1, 0],
					[0, 0, 0, 1, 0],
					[0, 0, 0, 1, 0],
					[0, 1, 0, 1, 0],
					[0, 0, 0, 0, 0],
				],
				geom: [
					{ x1: 1, x2: 5, y1: 1, y2: 1 },
					{ x1: 1, x2: 4, y1: 2, y2: 2 },
					{ x1: 1, x2: 1, y1: 1, y2: 2 },
					{ x1: 5, x2: 5, y1: 1, y2: 3 },
					{ x1: 4, x2: 4, y1: 2, y2: 4 },
					{ x1: 4, x2: 8, y1: 4, y2: 4 },
					{ x1: 5, x2: 8, y1: 3, y2: 3 },
					{ x1: 7, x2: 8, y1: 1, y2: 1 },
					{ x1: 8, x2: 8, y1: 1, y2: 2 },
					{ x1: 7, x2: 8, y1: 2, y2: 2 },
					{ x1: 7, x2: 7, y1: 1, y2: 2 },
					{ x1: 8, x2: 8, y1: 3, y2: 4 }
				],
			},
		];

		tests.forEach(testGeometry);
	});

	function testGeometry(testData:any){
		test(testData.name, () => {
			const geom = buildGeometry(testData.map, (b:any) => !!b);
			expect(geom).toMatchObject(testData.geom);
		});
	}
});
