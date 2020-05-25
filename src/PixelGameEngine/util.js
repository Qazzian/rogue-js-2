

export function generateSeed() {
	return Date.now();
}

export async function fetchSeed() {
	const result = await fetch('https://www.random.org/integers/?num=1&min=1&max=100000000&col=1&base=10&format=plain&rnd=new');
	return await result.text();
}

export function objMatch(obj1, obj2) {
	const keys = Object.keys(obj1);

	return keys.every((keyName) => {
		return obj1[keyName] === obj2[keyName];
	});

}
