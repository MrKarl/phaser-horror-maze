import { Intro } from './intro';
import { Login } from './login';
import { Stage } from './stage';
import { Play } from './play';
import { Register } from './register';

export namespace State {
	export class Manager extends Phaser.StateManager {
		
		constructor(game) {
			super(game, null);
			this.game.state = this;
			this.onPreloadCallback = function(e) {
				console.dir(e);
			};

			this.game.state.onPreloadCallback = function(e) {
				console.dir(e);
				// TODO: ?????????????/ What is this?
			};
		}

		init() {
			this.add('Intro', Intro, true);
			this.add('Login', Login, false);
			this.add('Register', Register, false);
			this.add('Stage', Stage, false);
			this.add('Play', Play, false);
		}

		startState(state? : string) {
			let startingState = 'Intro';
			if (state == 'undefined') {
				startingState = state;
			}
			this.start(startingState);
		}

		public login() {
			this.start('Login');
		}
	}
}