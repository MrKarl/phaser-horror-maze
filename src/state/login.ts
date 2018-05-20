import Base from './base';
import User from '../vo/user';

export class Login extends Base {
	loginText : Phaser.Text;
	gameLogo : Phaser.Image;

	guestUUID : string;

	constructor(game) {
		super(game);
	}

	preload() {
		this.game.load.image('gameLogo', 'assets/img/gamelogo.png');
	}

	create() {
		this.stage.backgroundColor = '#FFFFFF';

		this.gameLogo = this.game.add.image(this.game.world.centerX, 210, 'gameLogo');
		this.gameLogo.anchor.setTo(0.5, 0.5);

		this.loginText = this.game.add.text(
			this.game.world.centerX, 
			this.game.world.centerY, 
			'Login',
			{
				font: '35px Arial;',
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
				let user = self.serviceController.authService.getLastLoggedInUser();
				if (user && user.userId) {
					self.serviceController.login(user.userId, (user: User, isSuccess: boolean) => {
						if (isSuccess) {
							alert(`${user.userId}님 환영합니다.`);
							const stageInfo = self.serviceController.getStageInformation();
							self.stateController.goState('Level', true, true, stageInfo);
						} else {
							alert('예전에 방문하신 적이 없으시군요? 사용자 등록화면으로 이동합니다.');
							self.stateController.goState('Register');
						}
					});	
				} else {
					alert('예전에 방문하신 적이 없으시군요? 사용자 등록화면으로 이동합니다.');
					self.stateController.goState('Register');
				}
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