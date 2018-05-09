import StateController from "./stateController";
import Controller from "./controller";
import StageService from "../services/stageService";
import AuthService from "../services/authService";
import { Game } from "../maze";
import Util from "../util/util";
import User from "../vo/user";

export default class ServiceController implements Controller {
	game : Phaser.Game;

	stageService : StageService;
	authService : AuthService;

	// It is necessary for controling state.
	stateController : StateController;

	constructor(game: Game.Maze) {
		this.game = game;
		
		this.stageService = new StageService();
		this.authService = new AuthService();
		this.stateController = game.stateController;
	}	
	
	public login(callback) {
		this.authService.login(callback);
	}

	public registerUser(user: User) {
		this.authService.registerUser(user);
	}

	public getStageInformation() {
		return this.stageService.stageMap;
	}
}
