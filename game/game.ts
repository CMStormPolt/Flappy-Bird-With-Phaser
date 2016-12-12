namespace FlappyBird{
    export class FlappyGame extends Phaser.Game {
        constructor(width:number,height:number,parent:string){
            super(width,height,Phaser.AUTO,parent);
            this.state.add('boot',Boot);
            this.state.add('loading',Loading);
            this.state.add('main',mainState);
            this.state.start('boot');
        }

    }

}

