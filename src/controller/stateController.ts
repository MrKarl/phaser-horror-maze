import { Intro } from '../state/intro';
import { Login } from '../state/login';
import { Level } from '../state/level';
import { Play } from '../state/play';
import { Register } from '../state/register';

import ServiceController from './serviceController';
import { StateManager } from 'phaser-ce';
import { Game } from '../maze';

export default class StateController {
	stateManager : Phaser.StateManager;
	game : Phaser.Game;

	width: number;
	height: number;

	constructor() {

	}

	public initialize(game: Game.Maze, width: number, height: number) {
		this.stateManager = new StateManager(game);
		this.game = game;
		this.game.state = this.stateManager;

		this.width = width;
		this.height = height;

		this.init();
	}

	startState(state? : string) {
		let startingState = 'Intro';
		// let startingState = 'Stage';
		if (state === 'undefined' || state === null) {
			startingState = state;
		}

		this.goState(startingState, true, true, 'Horror Maze');
	}

	public goState(state: string, clearWorld?: boolean, clearCache?: boolean, ...args: any[]) {
		if (!this.stateManager.checkState(state)) {
			throw new Error(`This state(${state}) does not exist!`);
		}

		this.stateManager.start(state, clearWorld, clearCache, ...args);
	}

	private init() {
		this.add('Intro', Intro, true);
		this.add('Login', Login, false);
		this.add('Register', Register, false);
		this.add('Level', Level, false);
		this.add('Play', Play, false);
	}

	private add(key, state, authStart?) {
		this.stateManager.add(key, state, authStart);
	}
}