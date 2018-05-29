export namespace Component {
	export class InputText extends Phaser.Text {
		isFocus = false;

		x : number;
		y : number;
		width : number;
		height : number;

		maxLength : number;

		placeholder : string;

		
		borderRectangler : Phaser.Rectangle;

		text : string;

		phaserText : Phaser.Text;

		clickCount = 0;

		constructor(game, x, y, width, height, maxLength, text, style) {
			super(game, x, y,  text, style);
			this.placeholder = 'Input Text';
			if (text.length == 0) {
				text = this.placeholder;
			}

			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.text = text;
			this.maxLength = maxLength ? maxLength : 20;

			let group = this.game.add.group();
			let graphics = this.game.make.graphics();
			graphics.lineStyle(2, 0x000000, 1);
			graphics.drawRect(x, y, width, height);
			group.add(graphics);

			this.phaserText = this.game.add.text(x, y, text, style);
			this.phaserText.setTextBounds(0, 0, width, height)
			this.phaserText.alpha = 0.6;

			this.phaserText.inputEnabled = true;

			this.phaserText.events.onInputDown.add((sprite, pointer) => {
				this.isFocus = true;
				this.phaserText.alpha = 1;
			}, this);
			

			const self = this;
			this.game.input.onDown.add((sprite, pointer) => {
				self.clickCount++;
				if (self.clickCount == 1) {
					self.phaserText.setText('');
				}

				let textX = self.phaserText.world.x;
				let textWidth = self.width;

				let textY = self.phaserText.world.y;
				let textHeight = self.height;

				if (pointer.clientX > textX && pointer.clientX <= textX + textWidth) {
					if (pointer.clientY > textY && pointer.clientY <= textY + textHeight) {
						self.isFocus = true;
						self.phaserText.alpha = 1;
						return;
					}
				}

				self.phaserText.alpha = 0.6;
				self.isFocus = false;
			}, this);

			this.game.input.keyboard.addCallbacks(this, (e) => {
				if (!self.isFocus) {
					return;
				}
				
				if (e.keyCode == Phaser.Keyboard.BACKSPACE) {
					self.phaserText.text = self.phaserText.text.slice(0, -1);

					
					return;
				} 

				if (self.phaserText.text.length + 1 > self.maxLength) {
					return;
				}
				
				self.phaserText.text += e.key;
				self.text = self.phaserText.text;
			});
		}
	}
}