/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import ServiceController from "./controller/serviceController";
import StateController from "./controller/stateController";

export namespace Game {
	export class Maze extends Phaser.Game {
		serviceController : ServiceController;
		stateController : StateController;

		constructor(width, height, parentId) {
			super(width, height, Phaser.AUTO, parentId, null, false, true, null);

			this.serviceController = new ServiceController(this);

			this.stateController = new StateController();
			this.stateController.initialize(this, width, height);
			this.stateController.startState();
		}
	}
}