import rand from 'random-seed';
import MapTile from './MapTile';

const ROOM_SIZE_MAX = 12;
const ROOM_SIZE_MIN = 7;
const ROOM_COUNT_MAX = 15;

export default class GameMap {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.rand = null;
		this.seed = null;
		this.rooms = [];
		this.generateMap();
	}

	generateMap(seed) {
		this.seed = seed;
		this.rand = new rand(seed);

		const rooms = [];
		const maxAttempts = 300;

		for (let a=0; rooms.length < ROOM_COUNT_MAX && a<maxAttempts; a++) {
			const w = this.rand.intBetween(ROOM_SIZE_MIN, ROOM_SIZE_MAX);
			const h = this.rand.intBetween(ROOM_SIZE_MIN, ROOM_SIZE_MAX);
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

		this.tiles = this.initTiles();

		rooms.forEach((room) => this.createRoom(room));
	}

	initTiles() {
		const tiles = [];
		for (let x = 0; x < this.width; x++) {
			tiles[x] = [];
			for (let y = 0; y < this.height; y++) {
				tiles[x][y] = new MapTile('wall', false);
			}
		}

		return tiles;
	}

	/**
	 *
	 * @param room{Room}
	 */
	createRoom(room) {
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

	createTunnelH(x1, x2, y) {
		for (let x = x1; x < x2; x++) {
			this.tiles[x][y] = new MapTile('ground', true);
		}
	}

	createTunnelV(x, y1, y2) {
		for (let y = y1; x < y2; y++) {
			this.tiles[x][y] = new MapTile('ground', true);
		}
	}

	getPlayerStart() {
		if (this.rooms.length === 0) {
			throw Error('Cannot get player start position. Map has not been generated yet');
		}
		return this.rooms[0].center();
	}

	canMoveTo(x, y) {
		if (x instanceof MapTile) {
			return x.allowsMovement;
		}
		return this.tiles[x][y].allowsMovement;
	}

	canSeeThrough(x, y) {
		if (x instanceof MapTile) {
			return x.allowsSight;
		}
		return this.tiles[x][y].allowsSight;
	}
}

export class Room {
	constructor(x, y, w, h) {
		this.x1 = x;
		this.x2 = x + w;
		this.y1 = y;
		this.y2 = y + h;
		this.width = w;
		this.height = h;
	}

	center() {
		const xc = Math.round((this.x1 + this.x2) / 2);
		const yc = Math.round((this.y1 + this.y2) / 2);
		return [xc, yc];
	}

	hasIntersect(other) {
		return (this.x1 <= other.x2 && this.x2 >= other.x1 &&
			this.y1 <= other.y2 && this.y2 >= other.y1);
	}
}
