/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />

import { State } from "./state/manager";
import { Controller } from "./controller";

export namespace Game {
	export class Maze extends Phaser.Game {
		stateManager : State.Manager;
		controller : Controller;

		constructor(width, height, parentId) {
			super(width, height, Phaser.AUTO, parentId, null, false, true, null);

			this.stateManager = new State.Manager(this);
			this.stateManager.init();
			this.stateManager.startState();

			this.loadPlugins();

			Controller.initialize();
			this.controller = Controller.getInstance();

		}

		loadPlugins() {
			const __this = this;
			Phaser.Device.whenReady(function () {
				__this.plugins.add(PhaserInput.Plugin);
			});
		}
	}
}