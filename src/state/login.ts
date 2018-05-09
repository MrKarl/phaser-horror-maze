import Base from './base';

export class Login extends Base {
	loginText : Phaser.Text;

	guestUUID : string;

	constructor(game) {
		super(game);
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

		const self = this;
		this.loginText.events.onInputDown.add((e) => {
			const tween = self.game.add.tween(self.loginText).to({
				alpha: 0.2
			}, 700, Phaser.Easing.Quadratic.Out, false, 0, 0, false);
			
			tween.onComplete.add((e) => {
				self.serviceController.login((result) => {
					if (result) {
						const stageInfo = self.serviceController.getStageInformation();
						self.stateController.goState('Level', true, true, stageInfo);
					} else {
						self.stateController.goState('Register');
					}
				});
			}, self);

			tween.start();
		}, this);


		this.loginText.events.onInputOver.add((e) => {
			self.loginText.alpha = 0.5;
		}, this);

		this.loginText.events.onInputOut.add((e) => {
			self.loginText.alpha = 0.8;
		}, this);
	}

	update() {

	}
}