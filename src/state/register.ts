import Util from '../util/util';
import { Component } from '../component/inputText';
import Base from './base';
import User from '../vo/user';
import Score from '../vo/score';

export class Register extends Base {
	inputText : Component.InputText;
	registerBtn : Phaser.Text;

	constructor(game) {
		super(game);
	}

	preload() {
		
	}

	private setRegisterInputText() {
		let textWidth = 200;
		let textHeight = 80;
		let textX = this.game.world.centerX - textWidth/2;
		let textY = this.game.world.centerY - textHeight/2;

		let textMaxLength = 20;

		let textStyle = {
			fill: '#000000',
			boundsAlignH: 'center',
			boundsAlignV: 'middle',
			font: '20px Arial'
		}

		this.inputText = new Component.InputText(this.game, textX, textY, textWidth, textHeight, textMaxLength, 'ex) User00700', textStyle);
	}

	private setRegisterButton() {
		let btnWidth = 200;
		let btnHeight = 80;
		
		let btnX = this.game.world.centerX;// - btnWidth/2;
		let btnY = this.game.world.centerY + 120;// - btnHeight/2 + 100;

		let btnText = 'Register';

		const self = this;

		let textStyle = {
			fill: '#000000',
			boundsAlignH: 'center',
			boundsAlignV: 'middle',
			font: '20px Arial'
		}
		this.registerBtn = this.game.add.text(btnX, btnY, btnText, textStyle);
		this.registerBtn.anchor.setTo(.5, .5);
		
		this.registerBtn.inputEnabled = true;
		this.registerBtn.input.useHandCursor = true;

		this.registerBtn.events.onInputDown.add((e) => {
			if (confirm(`${self.inputText.text}님으로 하시겠습니까?`)) {
				self.saveUserId();
				const stageInfo = self.serviceController.getStageInformation();
				self.stateController.goState('Level', true, true, stageInfo);
			}
		}, this);

		this.registerBtn.events.onInputOver.add((e) => {
			this.registerBtn.alpha = 0.7;
		}, this);

		this.registerBtn.events.onInputOut.add((e) => {
			this.registerBtn.alpha = 1;
		}, this);
	}

	create() {

		this.setRegisterInputText();
		this.setRegisterButton();
		
	}

	update() {
		this.inputText.render();
	}

	saveUserId() {
		let userId = this.inputText.text;
		const user = new User(userId, new Score());
		this.serviceController.registerUser(user);
	}
}