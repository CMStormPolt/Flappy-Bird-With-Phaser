namespace FlappyBird{
    export class Birdy extends Phaser.Sprite{
        jumpSound:Phaser.Sound;
        // states:Phaser.Sprite;
        constructor(game:Phaser.Game,x:number,y:number,key:string){
            super(game,x,y,key);
            this.jumpSound = this.game.add.audio('jump-sound');
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.anchor.setTo(0.2,0.5);
            this.scale.set(0.1);
        }
        update(){
            if (this.angle < 20)
             this.angle += 1; 
        }
        startTheRun(){
            this.body.gravity.y = 1000;
            this.animations.add('fly',[0,1,2,3],10);
            this.animations.play('fly',10,true);
        }

        jump(){
            if (this.alive == false){return};
            this.game.add.tween(this).to({angle: -20}, 100).start(); 
            this.body.velocity.y = -300;
            this.angle = -20;
            this.jumpSound.play();
            // console.log('jumpuuu');
        }

    }
}