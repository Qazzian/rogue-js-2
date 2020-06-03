class Index {
	private isBuilt: boolean;
	constructor() {
		this.isBuilt = true;
	}

	alert() {
		alert('Hello from webpack and TypeScript');
	}
}

const myIndex = new Index();
myIndex.alert();




