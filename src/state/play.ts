import Base from "./base";
import { Stage } from "../vo/stage";
import { Point } from "../vo/point";
import { RecordDao } from "../dao/recordDao";
import Record, { StageRecord } from "../vo/record";
import { Rank } from "../vo/rank";

export class Play extends Base {
	static readonly rayLength = 500;
	static readonly numOfRays = 20;
	static readonly lightAngle = Math.PI/4; // 45 deg.

	private readonly speed = 2;

	timer : Phaser.Timer;

	// floor : Phaser.TileSprite;
	floor : Phaser.Sprite;
	wall : Phaser.Sprite;
	wallsBitMap : Phaser.BitmapData;
	mask : Phaser.Graphics;
	player : Phaser.Sprite;
	playerPath : string;

	cursor : Phaser.CursorKeys;
	
	stageInfo : Stage;
	currentExitPoint : Point;
	currentExitGraphic : Phaser.Graphics;

	wallCollisionSound: Phaser.Sound;
	tadaSound: Phaser.Sound;

	constructor(game) {
		super(game);
	}

	init(stageInfo : Stage) {
		this.stageInfo = stageInfo;
		this.playerPath = 'assets/img/player-spreadsheet.png';
	}

	preload() {
		this.game.load.image('floor', this.stageInfo.floorFilePath);
		this.game.load.image('wall', this.stageInfo.wallFilePath);
		this.game.load.spritesheet('player', this.playerPath, 64, 64, 36);
		this.load.audio("wallCollisionSound", ["assets/mp3/beep-01a.mp3"]);
		this.load.audio("tadaSound", ["assets/mp3/tada-01a.mp3"]);
	}

	create() {
		this.wallCollisionSound = this.add.audio('wallCollisionSound');
		this.tadaSound = this.add.audio('tadaSound');

		this.game.stage.backgroundColor = '#000000'; 
		// this.game.stage.backgroundColor = '0xffffff'; 

		this.game.world.setBounds(0, 0, this.world.width, this.world.height-120);
		
		this.createFloor();
		this.makeFirstExitPoint();
		this.createWall();
		this.createPlayer(); 

		this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		this.createMask();

		this.floor.mask = this.mask;

		this.timer = this.game.time.create(false);

		this.cursor = this.game.input.keyboard.createCursorKeys();
		this.game.input.keyboard.addCallbacks(this, (key) => {
			//TODO: wasd 가능하게 할 것
			if (key.keyCode === 87) {		// W, Up
				
			} else if (key.key === 65) {	// A, Left
			
			} else if (key.key === 83) {	// S, Down
			
			} else if (key.key === 68) {	// D, Right
			
			}
		});

		this.createTimer();
	}

	private createTimer() {
		const text = this.game.add.text(this.game.world.centerX, 500, 'Timer : ', {
			fill: '#ffffff',
			font: '15px Arial'
		});
	}

	update() {
		this.movePlayer();
		this.moveFlash();
		this.randomAlphaTo(this.floor);
	}

	render() {
		this.game.debug.inputInfo(32, 32);
	}

	private makeFirstExitPoint() {
		const idxOfExitPoint = Math.round(Math.random())*11 % this.stageInfo.exitPoints.length;
		this.stageInfo.exitPoints[idxOfExitPoint].active = true;
		this.currentExitPoint = this.stageInfo.exitPoints[idxOfExitPoint];
		this.renderExitPoint(this.currentExitPoint);
	}

	private renderExitPoint(exitPoint : Point) {
		const graphicalPoint = (x, y) => {
			this.currentExitGraphic = this.game.add.graphics(0, 0);
			this.currentExitGraphic.beginFill(0xff0000, 0.8);
			this.currentExitGraphic.drawCircle(x, y, 10);
			this.currentExitGraphic.endFill();
		};

		graphicalPoint(exitPoint.x, exitPoint.y);
	}

	private randomAlphaTo(obj :any) {
		obj.alpha = 0.5 + Math.random() * 0.5;
	}

	private createPlayer() {
		this.player = this.game.add.sprite(75, 75, 'player');
		this.player.anchor.set(.5, .5);	

		this.player.animations.add('north', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
		this.player.animations.add('west', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
		this.player.animations.add('south', [18, 19, 20, 21, 22, 23, 24, 25, 26], 10, true);
		this.player.animations.add('east', [27, 28, 29, 30, 31, 32, 33, 34, 35 ], 10, true);
	}

	private createFloor() {
		this.floor = this.game.add.sprite(0, 0, 'floor');
		this.floor.width = 640;
		this.floor.height = 480;
	}

	private createMask() {
		this.mask = this.game.add.graphics(0, 0);
	}

	private createWall() {
		this.wallsBitMap = this.game.make.bitmapData(640, 480);
		this.wallsBitMap.draw('wall');
		this.wallsBitMap.update();
		this.wall = this.game.add.sprite(0, 0, this.wallsBitMap);
	}

	private moveFlash() {
		const playerWidth = this.player.width;
		const playerHeight = this.player.height;

		const playerX = this.player.x;
		const playerY = this.player.y;
		
		const dy = this.game.input.y - playerY;
		const dx = this.game.input.x - playerX;

		const mouseAngle = Math.atan2(dy, dx);

		this.mask.clear();
		this.mask.lineStyle(2, 0xffffff, 1);

		this.mask.beginFill(0x000000);
		this.mask.moveTo(playerX, playerY);
		for (let i=0; i<Play.numOfRays; i++) {
			const rayAngle = mouseAngle - (Play.lightAngle/2) + (Play.lightAngle/Play.numOfRays) * i;
			let lastX = playerX;
			let lastY = playerY;
			
			for (let j=1; j<=Play.rayLength; j++) {
				const x = Math.round(playerX + (j * Math.cos(rayAngle)));
				const y = Math.round(playerY + (j * Math.sin(rayAngle)));

				const color = this.pickColorOf(x, y, this.wallsBitMap);
				if (color == 0) {
					lastX = x;
					lastY = y;
				} else {
					this.mask.lineTo(lastX, lastY);
					break;
				}
			}
			this.mask.lineTo(lastX, lastY);
		}

		this.mask.lineTo(playerX, playerY);
		this.mask.endFill();
	}

	private movePlayer() {
		let xSpeed = 0;
		let ySpeed = 0;
		let isMoving = false;
		let canMove = false;

		const playerWidth = this.player.width;
		const playerHeight = this.player.height;

		const playerX = this.player.x;
		const playerY = this.player.y;

		const color = {
			north : 0,
			south : 0,
			west : 0,
			east : 0
		}

		if (this.cursor.up.isDown) {
			ySpeed -= this.speed;
			this.player.animations.play('north');
			const northEast = this.pickColorOf(playerX + playerWidth/2 + xSpeed, playerY - playerHeight/2 + ySpeed, this.wallsBitMap);
			const northWest = this.pickColorOf(playerX - playerWidth/2 + xSpeed, playerY - playerHeight/2 + ySpeed, this.wallsBitMap);
			color.north = northEast + northWest;
		}
		
		if (this.cursor.down.isDown) {
			ySpeed += this.speed;
			this.player.animations.play('south');
			const southEast = this.pickColorOf(playerX + playerWidth/2 + xSpeed, playerY + playerHeight/2 + ySpeed, this.wallsBitMap);
			const southWest = this.pickColorOf(playerX - playerWidth/2 + xSpeed, playerY + playerHeight/2 + ySpeed, this.wallsBitMap);
			color.south = southEast + southWest;
		}
		
		if (this.cursor.left.isDown) {
			xSpeed -= this.speed;
			this.player.animations.play('west');
			const westNorth = this.pickColorOf(playerX - playerWidth/2 + xSpeed, playerY - playerHeight/2 + ySpeed, this.wallsBitMap);
			const westSouth = this.pickColorOf(playerX - playerWidth/2 + xSpeed, playerY + playerHeight/2 + ySpeed, this.wallsBitMap);
			color.west = westNorth + westSouth;
		}
		
		if (this.cursor.right.isDown) {
			xSpeed += this.speed;
			this.player.animations.play('east');
			const eastNorth = this.pickColorOf(playerX + playerWidth/2 + xSpeed, playerY - playerHeight/2 + ySpeed, this.wallsBitMap);
			const eastSouth = this.pickColorOf(playerX + playerWidth/2 + xSpeed, playerY + playerHeight/2 + ySpeed, this.wallsBitMap);
			color.east = eastNorth + eastSouth;
		}

		isMoving = Math.abs(xSpeed) + Math.abs(ySpeed) < this.speed*2 && Math.abs(xSpeed) + Math.abs(ySpeed) > 0;
		canMove = color.north + color.south + color.east + color.west == 0;
		if (isMoving && canMove) {
			this.player.x += xSpeed;
			this.player.y += ySpeed;
		} else {
			this.stopPlayerAnimcateion();
		}

		if (isMoving && !canMove) {
			this.game.camera.shake();
			this.wallCollisionSound.play();
		}

		
		if (Math.abs(this.currentExitPoint.x-this.player.x) < 3 && Math.abs(this.player.y-this.currentExitPoint.y) < 3) {
			alert('Congrat!');
			this.tadaSound.play();

			const userId = this.serviceController.authService.getLastLoggedInUser().userId;
			const stageId = this.stageInfo.stageId;
			const stageRecord = new StageRecord(stageId, Rank.S, 80);
			const stageRecordObj = {};
			stageRecordObj[stageId] = stageRecord;
			const record = new Record(userId, stageRecordObj);
			this.serviceController.recordRank(record);
			
			const stageInfo = this.serviceController.getStageInformation();
			this.stateController.goState('Level', true, true, stageInfo);
		}
	}

	private pickColorOf(x: number, y: number, bitMapData: Phaser.BitmapData) {
		const color = bitMapData.getPixel32(x, y);
		return color;
	}

	private stopPlayerAnimcateion() {
		this.player.animations.stop('north');
		this.player.animations.stop('south');
		this.player.animations.stop('west');
		this.player.animations.stop('east');
	}


	private goFullScreen() {

	}
}