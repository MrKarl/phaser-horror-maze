import { Controller } from "../controller";

export class Stage extends Phaser.State {
	readonly numberOfStage = 3;

	lowerStageBtn : Phaser.Button;
	higherStageBtn : Phaser.Button;


	stageGroup : Phaser.Group;
	currentStage: number;

	constructor() {
		super();
	}

	preload() {
		this.game.load.spritesheet('stageArrows', '../assets/img/stageArrows.png', 48, 48);
	}

	create() {
		this.game.stage.backgroundColor = '#4B4B4B';
		const userId = Controller.getInstance().userId;

		this.drawStageBtn();
		this.drawStageMoveBtn();
	}

	update() {

	}

	private drawStageBtn() {
		const width = 200;
		const height = 200;

		let offsetX = (this.game.world.width - 200) / 3

		for (let i=0; i<this.numberOfStage; i++) {
			this.game.add.button()
		}
	}

	private drawStageMoveBtn() {
		this.lowerStageBtn = this.game.add.button(50, 420, "stageArrows", this.buttonClicked);
		this.higherStageBtn = this.game.add.button(270, 420, "stageArrows", this.buttonClicked);

		this.lowerStageBtn.frame = 0;
		this.higherStageBtn.frame = 1;

		const stageText = this.game.add.text(this.game.world.centerX, 50, 'Stage', {
			fill: '#ffffff',
			font: '20px Arial'
		});

		stageText.anchor.setTo(0.5, 0.5);
	}

	private buttonClicked(button, pointer) {
		if (button.frame == 0) { // lowerStageBtn

		} else if (button.frame == 1) { // higherStageBtn

		}
	}
}
