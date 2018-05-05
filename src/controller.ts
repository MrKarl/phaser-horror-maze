import { Util } from "./util";


export class Controller {
	userId : string;

	private static instance : Controller;

	constructor() {
		this.userId = Util.getLocalStorageValue('uuid');
	}

	static initialize() {
		Controller.instance = new Controller();
	}

	static getInstance() {
		return Controller.instance;
	}
}
