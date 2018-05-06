import { Util } from '../util';
import { Controller } from '../controller';

export class Login extends Phaser.State {
	loginText : Phaser.Text;

	guestUUID : string;

	constructor() {
		super();
	}

	preload() {
		
	}

	create() {
		this.stage.backgroundColor = '#FFFFFF';

		this.loginText = this.game.add.text(
			this.game.world.centerX, 
			this.game.world.centerY, 
			'Login',
			{
				font: '20px Arial;',
				fill: '#000000'
			}
		);
		this.loginText.anchor.setTo(0.5, 0.5);
		this.loginText.alpha = 0.8;

		this.loginText.inputEnabled = true;
		this.loginText.input.useHandCursor = true;
		this.loginText.events.onInputDown.add(function(event) {
			// const uuid = Util.getLocalStorageValue('uuid');
			Controller.getInstance().login((result) => {
				if (result) {
					this.game.state.start('Stage');	
				} else {
					this.game.state.start('Register');	
				}
			});
		}, this);
		
	}

	update() {

	}
}