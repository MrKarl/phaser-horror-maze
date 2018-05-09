import { StateManager, Game } from "phaser-ce";
import ServiceController from "../controller/serviceController";
import StateController from "../controller/stateController";

export default class Base extends Phaser.State {
	serviceController : ServiceController;
	stateController : StateController;

	constructor(game : Phaser.Game) {
		super();

		// For Ignoring non-exist property error.
		this.serviceController = (game as any).serviceController;
		this.stateController = (game as any).stateController;
	}

	goState(string) {
		this.serviceController 
	}
	
}