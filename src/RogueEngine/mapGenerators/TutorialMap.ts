import GameMap from '../GameMap';
import Room from '../Room';
import MapTile from '../MapTile';
import Random from "../tools/Random";
import Area from "../../PixelGameEngine/locationObjects/Area";
import Position from "../../PixelGameEngine/locationObjects/Position";

export default class TutorialMap extends GameMap {
	private rand: Random;
	private rooms: Room[];

	constructor(width: number, height:number) {
		super(width, height);

		this.rand = new Random();
		this.rooms = [];
		this.tiles = [];
	}

	generateMap(randomGenerator?: Random) {
		if (!randomGenerator) {
			throw new Error('Missing RandomSeed generator');
		}

		this.rand = randomGenerator;

		const rooms = [];
		const maxAttempts = 300;

		for (let a = 0; rooms.length < this.options.roomCountMax && a < maxAttempts; a++) {
			const w = this.rand.intBetween(this.options.roomSizeMin, this.options.roomSizeMax);
			const h = this.rand.intBetween(this.options.roomSizeMin, this.options.roomSizeMax);
			const x = this.rand.intBetween(0, this.width - w - 1);
			const y = this.rand.intBetween(0, this.height - h - 1);
			const newRoom = new Room(x, y, w, h);

			const hasIntersectedRooms = rooms.some((other) => {
				return newRoom.hasIntersect(other);
			});

			if (!hasIntersectedRooms) {
				rooms.push(newRoom);
			}
		}

		this.rooms = rooms;
		console.info('Generated rooms:', rooms);

		this.initTiles();

		rooms.forEach((room) => this.createRoom(room));
		this.joinRooms(rooms);
		// console.info('Generated map tiles:', this.tiles);
	}

	getPlayerStart(): Position {
		if (this.rooms.length === 0) {
			throw Error('Cannot get player start position. Map has not been generated yet');
		}
		const [x, y] = this.rooms[0].center();
		return new Position(x, y);
	}

	getTilesInRange(area:Area) {
		const tilesInRange = [];
		const {x1, x2} = area;
		const [y1, y2] = [Math.max(area.y, 0), Math.min(area.y + area.height, this.height)];
		let yPreFill: MapTile[] = [];
		let yPostFill: MapTile[] = [];
		if (area.y < 0) { yPreFill = fillerTiles(Math.abs(area.y)); }
		if (area.y + area.height > this.height) {
			yPostFill = fillerTiles(area.y + area.height - this.height);
		}

		for (let mx = x1; mx < x2; mx++) {
			if (mx < 0 || mx >= this.width) {
				tilesInRange.push(fillerTiles(area.height));
			}
			else {
				tilesInRange.push([
					...yPreFill,
					...(this.tiles[mx].slice(y1, y2)),
					...yPostFill,
				]);
			}
		}
		// console.info(`getTilesInRange {${x1}, ${x2}, ${y1}, ${y2}}: `, tilesInRange);
		return tilesInRange;

		function fillerTiles(length: number) {
			return Array.from({length}, (v, i) => new MapTile('empty', false));
		}
	}


	initTiles() {
		const tiles: MapTile[][] = [];
		for (let x = 0; x < this.width; x++) {
			tiles[x] = [];
			for (let y = 0; y < this.height; y++) {
				tiles[x][y] = new MapTile('wall', false);
			}
		}

		this.tiles = tiles;
	}

	/**
	 *
	 * @param room{Room}
	 */
	createRoom(room: Room) {
		const {x1, x2, y1, y2} = room;
		for (let x = x1 + 1; x < x2 - 1; x++) {
			for (let y = y1 + 1; y < y2 - 1; y++) {
				const tile = this.tiles[x][y];
				tile.type = 'ground';
				tile.allowsMovement = true;
				tile.allowsSight = true;
			}
		}
	}

	joinRooms(rooms: Room[]) {
		rooms.forEach((room, index) => {
			if (index === 0) { return; }
			const prev = rooms[index - 1];
			const [px, py] = prev.center();
			const [x, y] = room.center();
			if (this.rand?.intBetween(0,1)) {
				this.createTunnelH(px, x, py);
				this.createTunnelV(x, py, y);
			}
			else {
				this.createTunnelV(x, py, y);
				this.createTunnelH(px, x, py);
			}
		});
	}

	createTunnelH(x1: number, x2: number, y: number) {
		const xMin = Math.min(x1, x2);
		const xMax = Math.max(x1, x2);
		for (let x = xMin; x <= xMax; x++) {
			this.tiles[x][y] = new MapTile('ground', true);
		}
	}

	createTunnelV(x: number, y1: number, y2: number) {
		const yMin = Math.min(y1, y2);
		const yMax = Math.max(y1, y2);
		for (let y = yMin; y <= yMax; y++) {
			this.tiles[x][y] = new MapTile('ground', true);
		}
	}
}
