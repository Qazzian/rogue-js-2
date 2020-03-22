const imgUrl = '../images/arial10x10.png';


const spriteWidth = 10;
const spriteHeight = 10;

function sprite(x, y) {
	return [x * spriteWidth, y * spriteHeight, spriteWidth, spriteHeight];
}


export const sprites = {
	' ': sprite(0, 0),
	'!': sprite(1, 0),
	'@': sprite(0, 1),
};

export async function loadSpriteSheet() {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = imgUrl;
		image.addEventListener('load', () => {
			resolve(image);
		}, false);
	});
}
