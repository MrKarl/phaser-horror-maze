export class Play extends Phaser.State {
	constructor() {
		super();
	}

	preload() {
		this.game.load.image('wall', 'assets/img/wall-001.png');
		this.game.load.image('floor', 'assets/img/floor-001.png');
	}

	create() {
		this.game.stage.backgroundColor = '#991235';

		const wall = this.game.add.image(0, 0, 'floor');
	}

	update() {

	}
}