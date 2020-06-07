import GameMap from '../GameMap';
import Room from '../Room';
import rand from 'random-seed';
import MapTile from '../MapTile';

const DIRS = ['n', 'e', 's', 'w'];
const DirCode = [-1, 1, 1, -1];

function isNS(dir) { return (dir % 2) === 0; }
function isEW(dir) { return (dir % 2) === 1; }

export default class AdvancedHeroquestGenerator extends GameMap {
	constructor() {
		super(0, 0);

		this.nextId = 0;
		this.random = null;
		this.dungeonGraph = null;

		this.dimensions = {
			minX: 0, maxX: 0,
			minY: 0, maxY: 0,
		}
	}

	newId() {
		const id = this.nextId;
		this.nextId ++;
		return id;
	}

	generateMap(randomGenerator) {
		this.random = randomGenerator;

		const startDir = this.random.range(4);

		this.dungeonGraph = PASSAGE_TYPES.STAIRS_IN(this.newId(), startDir, 0, 0);
		const passage1 = PASSAGE_TYPES.PASSAGE(this.newId(), startDir, 2);
		this.dungeonGraph.exits.push(passage1);
		console.info('Dungeon Graph: ', this.dungeonGraph);
		this.generateNextPiece(passage1);
	}

	generateNextPiece(previousPiece) {

	}

	trackMapSize(addedPiece) {



	}

	getPlayerStart() {
		return [0, 0];
	}

}

class MapNode extends Room {
	constructor({id, type, x, y, width, height, enterFrom}) {
		super(x, y, width, height);
		this.id = id;
		this.type = type;
		this.enterFrom = enterFrom;
		this.exits = [];
	}
}

/**
 *
 * @param {rand}random
 */
function genPassageLength(random) {
	const roll = random.intBetween(1, 12);
	if (roll <= 2) return 1;
	if (roll <= 8) return 2;
	return 3;
}

/**
 *
 * @param {rand} random
 * @param {char} entranceFrom - Direction the map is being drawn from one of N, S, E or W
 */
function rollForPassageEnd(random, entranceFrom) {

	const roll = random.intBetween(2, 24);
	if (roll <= 3) { }


	function rollTDirection(random) {
		const roll = random.intBetween(1,3);
		if (roll === 1) {return 'LEFT' }
		if (roll === 2) {return 'BACK'}
		if (roll === 3) {return 'RIGHT'}
	}

}

const PASSAGE_TYPES = {
	// Start of the level
	STAIRS_IN: function(id, enterFrom, x, y){
		return new MapNode({
			id,
			type: 'STAIRS_IN',
			x, y,
			width: 2,
			height: 2,
			enterFrom,
		});
	},
	// End of the level
	STAIRS_DOWN: {},
	STAIRS_OUT: {},
	END_PASSAGE: {},
	// length here means the number of passage segments not total number of tiles. Each segment is 5 tiles.
	PASSAGE: function(id, enterFrom, length, x, y){
		return new MapNode({
			id,
			type: 'PASSAGE',
			width: isNS(enterFrom) ? 2 : 5 * length,
			height: isNS(enterFrom) ? 5 * length : 2,
			enterFrom
		})
	},
	S_W_CORNER: {},
	S_E_CORNER: {},
	N_W_CORNER: {},
	N_E_CORNER: {},
	N_W_S_JUNC: {},
	W_S_E_JUNC: {},
	S_E_N_JUNC: {},
	E_N_W_JUNC: {},
	CROSS_JUNC: {},
};

const ROOM_TYPES = {
	NORMAL: {},
	HAZARD: {},
	LAIR: {},
	QUEST: {},
}

