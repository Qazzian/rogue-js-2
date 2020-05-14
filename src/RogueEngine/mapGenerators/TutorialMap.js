import GameMap from '../GameMap';
import Room from '../Room';
import rand from 'random-seed';
import MapTile from '../MapTile';

export default class TutorialMap extends GameMap {
	constructor(width, height) {
		super(width, height);

		this.rand = null;
		this.seed = null;
		this.rooms = [];
	}

	generateMap(seed) {
		this.seed = seed;
		this.rand = new rand(seed);

		const rooms = [];
		const maxAttempts = 300;

		for (let a = 0; rooms.length < this.options.roomCountMax && a < maxAttempts; a++) {
			const w = this.rand.intBetween(this.options.roomSizeMin, this.options.roomCountMax);
			const h = this.rand.intBetween(this.options.roomSizeMin, this.options.roomCountMax);
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
		this.joinRooms(rooms);
	}

	getPlayerStart() {
		if (this.rooms.length === 0) {
			throw Error('Cannot get player start position. Map has not been generated yet');
		}
		return this.rooms[0].center();
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

	joinRooms(rooms) {
		rooms.forEach((room, index) => {
			if (index === 0) { return; }
			const prev = rooms[index - 1];
			const [px, py] = prev.center();
			const [x, y] = room.center();
			if (this.rand.intBetween(0,1)) {
				this.createTunnelH(px, x, py);
				this.createTunnelV(x, py, y);
			}
			else {
				this.createTunnelV(x, py, y);
				this.createTunnelH(px, x, py);
			}
		});
	}

	createTunnelH(x1, x2, y) {
		const xMin = Math.min(x1, x2);
		const xMax = Math.max(x1, x2);
		for (let x = xMin; x <= xMax; x++) {
			this.tiles[x][y] = new MapTile('ground', true);
		}
	}

	createTunnelV(x, y1, y2) {
		const yMin = Math.min(y1, y2);
		const yMax = Math.max(y1, y2);
		for (let y = yMin; y <= yMax; y++) {
			this.tiles[x][y] = new MapTile('ground', true);
		}
	}

}
