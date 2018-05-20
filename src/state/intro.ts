import Base from "./base";

export class Intro extends Base {
	static introInterval = 1500;

	gameTitle : string;
	logoText : Phaser.Text;

	constructor(game: Phaser.Game) {
		super(game);
	}

	init(gameTitle) {
		this.gameTitle = gameTitle;
	}

	preload() {
		
	}

	create() {
		this.stage.backgroundColor = '#4488AA';

		this.logoText = this.game.add.text(
			this.game.world.centerX, 
			this.game.world.centerY, 
			this.gameTitle,
			{
				font: '80px Arial;',
				fill: '#ffffff'
			}
		);
		this.logoText.anchor.setTo(0.5, 0.5);
		this.logoText.alpha = 0.8;

		const p = this.game.world.bounds.bottomRight;
		
		const footer = this.game.add.text(
			p.x - 100,
			p.y - 30,
			'v1.0, made with Phaser',
			{
				font: '15px Arial;',
				fill: '#eeeeee'
			}
		);
		footer.anchor.setTo(0.5, 0.5);

		const self = this;
		setTimeout(function() {
			self.stateController.goState('Login');
		}, Intro.introInterval);
	}

	update() {

	}
}