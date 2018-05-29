import ServiceController from "../controller/serviceController";
import Base from "./base";
import Record, { StageRecord } from "../vo/record"
import { RankUtil } from "../vo/rank";

export class Level extends Base {
	readonly numberOfStagePerPage = 3;

	lowerStageBtn : Phaser.Button;
	higherStageBtn : Phaser.Button;

	logoutBtn : Phaser.Button;
	
	numberOfStage: number;
	numberOfPage: number;
	currentPage: number;
	stageMap: any;

	record: Record;

	stageBtnGroup: Phaser.Group;

	constructor(game) {
		super(game);
		this.currentPage = 1;
	}
	
	init(stageMap) {
		this.stageMap = stageMap;
		this.numberOfStage = Object.keys(stageMap).length;
		this.numberOfPage = Math.ceil(this.numberOfStage/this.numberOfStagePerPage);
	}

	preload() {
		this.game.load.spritesheet('stageArrows', '../assets/img/stageArrows.png', 48, 48);
		this.game.load.image('logoutBtn', '../assets/img/logoutBtn.png');

		this.record = this.serviceController.getRecord();
		this.stageBtnGroup = this.game.add.group();
	}

	create() {
		this.game.stage.backgroundColor = '#3b3b3b';
		this.game.stage.alpha = 0.9;
		this.drawStageBtn(this.currentPage);
		this.drawStageMoveBtn();
		this.drawLogoutBtn();
	}

	update() {

	}

	private drawLogoutBtn() {
		this.logoutBtn = this.game.add.button(this.game.world.centerX, 500, 'logoutBtn', () => {
			if (confirm('Logout 하시겠습니까?')) {
				// Remove lastLoggedInUser
				this.serviceController.authService.logout(this.serviceController.authService.getLastLoggedInUser().userId);
			}
		}, this);

		this.logoutBtn.anchor.setTo(0.5, 0.5);
	}

	private clearStageBtnField() {
		this.stageBtnGroup.callAll('kill', '');
	}

	private drawStageBtn(pageNum) {
		this.clearStageBtnField();

		const width = 200;
		const height = 200;

		let offsetX = (this.game.world.width - 150) / this.numberOfStagePerPage; // 150: padding

		let stageInfos = {};
		if (this.record) {
			stageInfos = this.record.records;
		}
		
		const offset = (pageNum-1) * this.numberOfStagePerPage;
		for (let i=offset; i<offset+this.numberOfStagePerPage; i++) {
			if (!this.stageMap[i]) {
				return;
			}
			
			let stageInfo: StageRecord;
			let stageInfoStr = '';
			if (stageInfos[i]) {
				stageInfo = stageInfos[i];
				stageInfoStr += '\nTime: ' + stageInfo.time + ' seconds';
				stageInfoStr += '\nRank: ' + RankUtil.valueOf(stageInfo.rank);
			}

			const stageBtnText = `Stage-${i+1}` + stageInfoStr;

			const offsetXOfBtn = offsetX * (i%this.numberOfStagePerPage);

			const stageBtn = this.game.add.text(145 + offsetXOfBtn, 90, stageBtnText, {
				fill: '#ffffff',
				font: '15px Arial'
			});

			stageBtn.inputEnabled = true;
			stageBtn.input.useHandCursor = true;
			
			const stageNum = i+1;
			const self = this;
			stageBtn.events.onInputDown.add((e) => {
				if (confirm(`Stage-${stageNum} 이동할까요?`)) {
					self.stateController.goState('Play', true, true, self.stageMap[i]);
				}
			}, this);

			this.stageBtnGroup.add(stageBtn);
		}
	}

	private drawStageMoveBtn() {
		const p = this.game.world.bounds;

		this.lowerStageBtn = this.game.add.button(100, this.game.world.centerY , "stageArrows", this.buttonClicked, this);
		this.higherStageBtn = this.game.add.button(100, this.game.world.centerY, "stageArrows", this.buttonClicked, this);

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
		let currentPage = this.currentPage;
		if (button.frame == 0) { // lowerStageBtn
			if (currentPage === 1) {
				return;
			}
			this.drawStageBtn(--this.currentPage);
		} else if (button.frame == 1) { // higherStageBtn
			if (currentPage+1 > this.numberOfPage) {
				return;
			}
			this.drawStageBtn(++this.currentPage);
		}
	}
}
