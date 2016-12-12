namespace FlappyBird{
  export class Boot extends Phaser.State {
    preload() { 
        this.load.image('loading','../assets/Evil-Loader-For-Websites.png');
    };

    create() { 
        this.game.state.start('loading'); 
    };
    update() {

         };
    };
}