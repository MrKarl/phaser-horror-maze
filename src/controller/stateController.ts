import { Intro } from '../state/intro';
import { Login } from '../state/login';
import { Level } from '../state/level';
import { Play } from '../state/play';
import { Register } from '../state/register';

import ServiceController from './serviceController';
import { Game } from '../maze';

export default class StateController {
	stateManager : Phaser.StateManager;
	game : Phaser.Game;

	width: number;
	height: number;


	gameVersion: string;

	constructor() {

	}

	public initialize(game: Game.Maze, width: number, height: number, gameVersion: string) {
		this.stateManager = new Phaser.StateManager(game);
		this.game = game;
		this.game.state = this.stateManager;
		this.gameVersion = gameVersion;

		this.width = width;
		this.height = height;

		this.init();
	}

	startState(state? : string) {
		let startingState = 'Intro';
		if (state === 'undefined' || state === null) {
			startingState = state;
		}

		this.goState(startingState, true, true, 'Horror Maze', this.gameVersion);
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