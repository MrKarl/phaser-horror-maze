import StateController from "./stateController";
import Controller from "./controller";
import StageService from "../services/stageService";
import AuthService from "../services/authService";
import { Game } from "../maze";
import Util from "../util/util";
import User from "../vo/user";
import RecordService from "../services/recordService";
import Record from "../vo/record";

export default class ServiceController implements Controller {
	game : Phaser.Game;

	stageService : StageService;
	authService : AuthService;
	recordService : RecordService;

	// It is necessary for controling state.
	stateController : StateController;

	constructor(game: Game.Maze) {
		this.game = game;
		
		this.stageService = new StageService();
		this.authService = new AuthService();
		this.recordService = new RecordService();
		
		this.stateController = game.stateController;
	}	
	
	public login(userId, callback) {
		this.authService.login(userId, callback);
	}

	public registerUser(user: User) {
		this.authService.registerUser(user);
	}

	public getRecord() : Record {
		const userId = this.authService.getLastLoggedInUser().userId;
		debugger
		const record = this.recordService.getRecord(userId);
		return record;
	}

	public getStageInformation() {
		return this.stageService.stageMap;
	}

	public recordRank(record: Record) {
		this.recordService.setRecord(record);
	}
}
