import ServiceController from "../controller/serviceController";
import Base from "./base";
import Record, { StageRecord } from "../vo/record"
import { RankUtil } from "../vo/rank";

export class Level extends Base {
	readonly numberOfStage = 3;

	lowerStageBtn : Phaser.Button;
	higherStageBtn : Phaser.Button;
	currentStage: number;
	stageMap: any;

	record: Record;

	constructor(game) {
		super(game);
	}
	
	init(stageMap) {
		this.stageMap = stageMap;
	}

	preload() {
		this.game.load.spritesheet('stageArrows', '../assets/img/stageArrows.png', 48, 48);

		this.record = this.serviceController.getRecord();
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

		let offsetX = (this.game.world.width - 150) / this.numberOfStage; // 150: padding

		let stageInfos = {};
		if (this.record) {
			stageInfos = this.record.records;
		}
		
		for (let i=0; i<this.numberOfStage; i++) {
			let stageInfo: StageRecord;
			let stageInfoStr = '';
			if (stageInfos[i]) {
				stageInfo = stageInfos[i];
				stageInfoStr += '\nTime: ' + stageInfo.time + ' seconds';
				stageInfoStr += '\nRank: ' + RankUtil.valueOf(stageInfo.rank);
			}

			const stageBtnText = `Stage-${i+1}` + stageInfoStr;
			const stageBtn = this.game.add.text(145 + (offsetX * i), 90, stageBtnText, {
				fill: '#ffffff',
				font: '15px Arial'
			});

			stageBtn.inputEnabled = true;
			stageBtn.input.useHandCursor = true;
			
			const stageNum = i+1;
			const self = this;
			stageBtn.events.onInputDown.add((e) => {
				if (confirm(`Wanna Go to Stage-${stageNum}?`)) {
					self.stateController.goState('Play', true, true, self.stageMap[i]);
				}
			}, this);
		}
	}

	private drawStageMoveBtn() {
		const p = this.game.world.bounds;

		this.lowerStageBtn = this.game.add.button(100, this.game.world.centerY , "stageArrows", this.buttonClicked);
		this.higherStageBtn = this.game.add.button(100, this.game.world.centerY, "stageArrows", this.buttonClicked);

		this.lowerStageBtn.frame = 0;
		this.higherStageBtn.frame = 1;

		// Align stage page move btn
		this.lowerStageBtn.x = 20;
		this.higherStageBtn.x = p.right - 20 - this.higherStageBtn.width;

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
