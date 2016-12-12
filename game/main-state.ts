namespace FlappyBird{
  let startingText; 
  
  export class mainState extends Phaser.State {
    bird:FlappyBird.Birdy;
    pipes:Phaser.Group;
    timer:Phaser.TimerEvent;
    score;
    labelScore;
    hasStarted:boolean;

    preload() { 

    };

    create() {
     this.hasStarted = false;
     this.bird = new FlappyBird.Birdy(this.game,100,245,'birdy-img')
     this.game.stage.backgroundColor = '#71c5cf';
     this.game.add.existing(this.bird);
     this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.bird.jump, this.bird);
     this.pipes = this.game.add.group();
     this.score = 0;
     this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
     this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.startTheGame, this);
     startingText = this.game.add.text(70,100,"Press Enter to Start",{ font: "30px Arial", fill: "#ffffff" })
    };

    update() {
    if (this.bird.y < 0 || this.bird.y > 500){ 
        this.restartGame();
        }
    this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
     };
     

   startTheGame(){
       if(this.hasStarted == false){
       this.hasStarted = true;
       this.bird.startTheRun();
       this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
       startingText.destroy();
      }

   }
   addOnePipe(x, y) {
     let pipe = this.game.add.sprite(x, y, 'pipe-img');
     this.pipes.add(pipe);
     this.game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -200; 
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }
    addRowOfPipes() {
    let hole = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < 8; i++){ 
        if (i != hole && i != hole + 1) { 
            this.addOnePipe(400, i * 60 + 10);
        } 
      } 
    this.score += 1;
    this.labelScore.text = this.score; 
    }
    hitPipe() {
    if (this.bird.alive == false){
        return;
    }
        
    this.bird.alive = false;
    this.game.time.events.remove(this.timer);

    this.pipes.forEach(function(p){
        p.body.velocity.x = 0;
    }, this.game);
  }
     
     restartGame(){
       this.game.state.restart()
      }    
    };

}