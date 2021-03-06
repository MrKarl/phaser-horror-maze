import StateController from "./stateController";
import Controller from "./controller";
import StageService from "../services/stageService";
import AuthService from "../services/authService";
import { Game } from "../maze";
import Util from "../util/util";
import User from "../vo/user";
import RecordService from "../services/recordService";
import Record from "../vo/record";
import RankService from "../services/rankService";

export default class ServiceController implements Controller {
	game : Phaser.Game;

	stageService : StageService;
	authService : AuthService;
	recordService : RecordService;
	rankService : RankService;

	// It is necessary for controling state.
	stateController : StateController;

	constructor(game: Game.Maze) {
		this.game = game;		
		this.stageService = new StageService();
		this.authService = new AuthService();
		this.recordService = new RecordService();
		this.rankService = new RankService();		
		
		this.stateController = game.stateController;
	}	
	
	public login(userId, callback) {
		this.authService.login(userId, callback);
	}

	public registerUser(user: User, callback: (user: User, isAlreadyExist: boolean) => void) {
		this.authService.registerUser(user, callback);
	}

	public getRecord() : Record {
		const userId = this.authService.getLastLoggedInUser().userId;
		const record = this.recordService.getRecord(userId);
		return record;
	}

	public getStageInformation() {
		return this.stageService.getStageInformation();
	}

	public recordRank(record: Record) {
		this.recordService.setRecord(record);
	}
}
