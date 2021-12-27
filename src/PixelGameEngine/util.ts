// Maths
export function degToRad(deg: number) {
	return deg * Math.PI / 180;
}

// Random numbers
export async function getASeed(): Promise<string>{
	try {
		return await fetchSeed();
	}
	catch (error) {
		return Promise.resolve(generateSeed());
	}
}

export async function fetchSeed(): Promise<string> {
	const result = await fetch('https://www.random.org/integers/?num=1&min=1&max=100000000&col=1&base=10&format=plain&rnd=new');
	return await result.text();
}

export function generateSeed(): string{
	return Date.now().toString();
}

// Testing
export function objMatch(obj1: any, obj2: any) {
	const keys = Object.keys(obj1);

	return keys.every((keyName) => {
		return obj1[keyName] === obj2[keyName];
	});

}
