export class Intro extends Phaser.State {
	static introInterval = 1000;

	logoText : Phaser.Text;

	constructor() {
		super();
	}

	preload() {
		
	}

	create() {
		this.stage.backgroundColor = '#4488AA';

		this.logoText = this.game.add.text(
			this.game.world.centerX, 
			this.game.world.centerY, 
			'Horror Maze',
			{
				font: '20px Arial;',
				fill: '#000000'
			}
		);
		this.logoText.anchor.setTo(0.5, 0.5);
		this.logoText.alpha = 0.8;
		
		const __this = this;
		setTimeout(function() {
			console.log(`${Intro.introInterval} ellapsed`);
			__this.login();
		}, Intro.introInterval)
	}

	update() {

	}

	login() {
		this.game.state.start('Login');
	}
}