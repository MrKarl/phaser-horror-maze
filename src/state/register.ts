/// <reference path="../../node_modules/@orange-games/phaser-input/build/phaser-input.d.ts" />

import { Component } from '../component/inputText'; 
import { Util } from '../util';

export class Register extends Phaser.State {
	inputText : Component.InputText;
	registerBtn : Phaser.Button;

	constructor() {
		super();
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

		this.inputText = new Component.InputText(this.game, textX, textY, textWidth, textHeight, textMaxLength, 'testing is good', textStyle);
	}

	private setRegisterButton() {
		let btnWidth = 200;
		let btnHeight = 80;
		
		let btnX = this.game.world.centerX - btnWidth/2;
		let btnY = this.game.world.centerY - btnHeight/2 + 100;

		let btnText = 'Register';
		this.registerBtn = this.game.add.button(btnX, btnY, btnText, (e) => {
			if (confirm(`${this.inputText.text}님으로 하시겠습니까?`)) {
				this.saveUserId();
				this.game.state.start('Stage');
			}
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
		Util.setLocalStorageValue('uuid', userId);
	}
}