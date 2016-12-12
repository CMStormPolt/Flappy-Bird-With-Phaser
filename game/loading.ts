namespace FlappyBird{
  export class Loading extends Phaser.State {
    preload() { 
        this.load.atlasJSONArray('birdy-img','../assets/PNG/json-flappy.png','../assets/PNG/json-flappy.json');
        this.load.image('pipe-img','../assets/pipe.png');
        this.load.audio('jump-sound','../assets/jump.wav');
    };

    create() { 
      
       
    };

    init(){
      let loadingscr = this.game.add.image(0,0,'loading')
        var tween = this.add.tween(loadingscr).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this); 
    }
    update() {

         };
   startGame() {
            this.game.state.start('main', true, false);
        }      
    };
}