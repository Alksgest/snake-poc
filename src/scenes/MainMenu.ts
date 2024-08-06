import {Scene, GameObjects} from 'phaser';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;

    // title: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        // this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(212, 150, 'logo');
        this.logo.setDisplaySize(254, 213);

        // this.title = this.add.text(512, 460, 'Main Menu', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        const title = this.add.text(100, 300, 'Збирайте світло')

        // const player = new Snake(this, 512, 384);

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
