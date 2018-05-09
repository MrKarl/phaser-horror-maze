import ServiceController from "../controller/serviceController";
import Base from "./base";

export class Level extends Base {
	readonly numberOfStage = 3;

	lowerStageBtn : Phaser.Button;
	higherStageBtn : Phaser.Button;
	stageGroup : Phaser.Group;
	currentStage: number;
	stageMap: any;

	constructor(game) {
		super(game);
	}
	
	init(stageMap) {
		this.stageMap = stageMap;
	}

	preload() {
		this.game.load.spritesheet('stageArrows', '../assets/img/stageArrows.png', 48, 48);
	}

	create() {
		this.game.stage.backgroundColor = '#9B9B9B';
		this.game.stage.alpha = 0.9;
		this.drawStageBtn();
		this.drawStageMoveBtn();
	}

	update() {

	}

	private drawStageBtn() {
		const width = 200;
		const height = 200;

		let offsetX = (this.game.world.width - 200) / 3; // 200: padding

		const stageInfo = new Array(this.numberOfStage);
		
		for (let i=0; i<this.numberOfStage; i++) {
			
			const stageBtnText = `Stage-${i+1}` + (stageInfo[i] ? '\n' + stageInfo[i] : '');
			const stageBtn = this.game.add.text(145 + (offsetX * i), 90, stageBtnText, {
				fill: '#ffffff',
				font: '15px Arial'
			});

			stageBtn.inputEnabled = true;
			stageBtn.input.useHandCursor = true;
			
			const stageNum = i+1;
			stageBtn.events.onInputDown.add((e) => {
				if (confirm(`Wanna Go to Stage-${stageNum}?`)) {
					this.stateController.goState('Play', true, true, this.stageMap[i]);
				}
			}, this);

			
			

			// const btn = this.game.add.button(100 + (offsetX * i), 50, `Stage - ${i}`, (e) => {
			// 	if (confirm(`Go to Stage - ${i}?`)) {
			// 		this.stateController.goState('Play', true, true, this.stageMap[i]);
			// 	}
			// }, this);
		}
	}

	private drawStageMoveBtn() {
		const p = this.game.world.bounds;

		this.lowerStageBtn = this.game.add.button(100, 500 , "stageArrows", this.buttonClicked);
		this.higherStageBtn = this.game.add.button(100, 500, "stageArrows", this.buttonClicked);

		this.lowerStageBtn.frame = 0;
		this.higherStageBtn.frame = 1;

		// Align stage page move btn
		this.lowerStageBtn.x = 100;
		this.higherStageBtn.x = p.right - 100 - this.higherStageBtn.width;

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
