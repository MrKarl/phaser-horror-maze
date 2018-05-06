import { Util } from "./util";
import { StageService } from "./stageService";
import { AuthService } from "./authService";


export class Controller {
	userId : string;

	
	stageService : StageService;
	authService : AuthService;

	private static instance : Controller;

	constructor() {
		this.userId = Util.getLocalStorageValue('uuid');
		this.stageService = StageService.getInstance();
		this.authService = AuthService.getInstance();
	}

	public static initialize() {
		Controller.instance = new Controller();
	}

	public static getInstance() {
		return Controller.instance;
	}

	public login(callback) {
		this.authService.login(callback);
	}
}
