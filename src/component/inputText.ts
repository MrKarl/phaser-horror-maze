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
			// graphics.beginFill(0xFF700B, 1);
			graphics.drawRect(x, y, width, height);
			// graphics.endFill();
			group.add(graphics);

			this.phaserText = this.game.add.text(x, y, text, style);
			this.phaserText.setTextBounds(0, 0, width, height)
			this.phaserText.alpha = 0.6;

			this.phaserText.inputEnabled = true;

			this.phaserText.events.onInputDown.add((sprite, pointer) => {
				this.isFocus = true;
				this.phaserText.alpha = 1;
			}, this);
			
			this.game.input.onDown.add((sprite, pointer) => {
				let textX = this.phaserText.world.x;
				let textWidth = this.phaserText.width;

				let textY = this.phaserText.world.y;
				let textHeight = this.phaserText.height;

				if (pointer.clientX > textX && pointer.clientX <= textX + textWidth) {
					if (pointer.clientY > textY && pointer.clientY <= textY + textHeight) {
						this.isFocus = true;
						this.phaserText.alpha = 1;
						return;
					}
				}

				this.phaserText.alpha = 0.6;
				this.isFocus = false;
			}, this);

			this.game.input.keyboard.addCallbacks(this, (e) => {
				if (!this.isFocus) {
					return;
				}
				
				if (e.keyCode == Phaser.Keyboard.BACKSPACE) {
					this.phaserText.text = this.phaserText.text.slice(0, -1);

					
					return;
				} 

				if (this.phaserText.text.length + 1 > this.maxLength) {
					return;
				}
				
				this.phaserText.text += e.key;
			});
		}

		render() {
			
		}
	}
}