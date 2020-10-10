export default class Index {
	readonly isBuilt: boolean;
	constructor() {
		this.isBuilt = true;
	}

	alert() {
		console.info('Has Built: ', this.isBuilt);
	}

}

const myIndex = new Index();
myIndex.alert();




