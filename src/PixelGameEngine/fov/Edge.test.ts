import Edge from './Edge';

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

		expect(edge2.getPoints()).toMatchObject([{x:0, y:0}, {x:1, y:-3}]);
	});
});
