var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FlappyBird;
(function (FlappyBird) {
    var Birdy = (function (_super) {
        __extends(Birdy, _super);
        // states:Phaser.Sprite;
        function Birdy(game, x, y, key) {
            _super.call(this, game, x, y, key);
            this.jumpSound = this.game.add.audio('jump-sound');
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.anchor.setTo(0.2, 0.5);
            this.scale.set(0.1);
        }
        Birdy.prototype.update = function () {
            if (this.angle < 20)
                this.angle += 1;
        };
        Birdy.prototype.startTheRun = function () {
            this.body.gravity.y = 1000;
            this.animations.add('fly', [0, 1, 2, 3], 10);
            this.animations.play('fly', 10, true);
        };
        Birdy.prototype.jump = function () {
            if (this.alive == false) {
                return;
            }
            ;
            this.game.add.tween(this).to({ angle: -20 }, 100).start();
            this.body.velocity.y = -300;
            this.angle = -20;
            this.jumpSound.play();
            // console.log('jumpuuu');
        };
        return Birdy;
    }(Phaser.Sprite));
    FlappyBird.Birdy = Birdy;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('loading', '../assets/Evil-Loader-For-Websites.png');
        };
        ;
        Boot.prototype.create = function () {
            this.game.state.start('loading');
        };
        ;
        Boot.prototype.update = function () {
        };
        ;
        return Boot;
    }(Phaser.State));
    FlappyBird.Boot = Boot;
    ;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var FlappyGame = (function (_super) {
        __extends(FlappyGame, _super);
        function FlappyGame(width, height, parent) {
            _super.call(this, width, height, Phaser.AUTO, parent);
            this.state.add('boot', FlappyBird.Boot);
            this.state.add('loading', FlappyBird.Loading);
            this.state.add('main', FlappyBird.mainState);
            this.state.start('boot');
        }
        return FlappyGame;
    }(Phaser.Game));
    FlappyBird.FlappyGame = FlappyGame;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var Loading = (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            _super.apply(this, arguments);
        }
        Loading.prototype.preload = function () {
            this.load.atlasJSONArray('birdy-img', '../assets/PNG/json-flappy.png', '../assets/PNG/json-flappy.json');
            this.load.image('pipe-img', '../assets/pipe.png');
            this.load.audio('jump-sound', '../assets/jump.wav');
        };
        ;
        Loading.prototype.create = function () {
        };
        ;
        Loading.prototype.init = function () {
            var loadingscr = this.game.add.image(0, 0, 'loading');
            var tween = this.add.tween(loadingscr).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        Loading.prototype.update = function () {
        };
        ;
        Loading.prototype.startGame = function () {
            this.game.state.start('main', true, false);
        };
        return Loading;
    }(Phaser.State));
    FlappyBird.Loading = Loading;
    ;
})(FlappyBird || (FlappyBird = {}));
var FlappyBird;
(function (FlappyBird) {
    var startingText;
    var mainState = (function (_super) {
        __extends(mainState, _super);
        function mainState() {
            _super.apply(this, arguments);
        }
        mainState.prototype.preload = function () {
        };
        ;
        mainState.prototype.create = function () {
            this.hasStarted = false;
            this.bird = new FlappyBird.Birdy(this.game, 100, 245, 'birdy-img');
            this.game.stage.backgroundColor = '#71c5cf';
            this.game.add.existing(this.bird);
            this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.bird.jump, this.bird);
            this.pipes = this.game.add.group();
            this.score = 0;
            this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
            this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(this.startTheGame, this);
            startingText = this.game.add.text(70, 100, "Press Enter to Start", { font: "30px Arial", fill: "#ffffff" });
        };
        ;
        mainState.prototype.update = function () {
            if (this.bird.y < 0 || this.bird.y > 500) {
                this.restartGame();
            }
            this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
        };
        ;
        mainState.prototype.startTheGame = function () {
            if (this.hasStarted == false) {
                this.hasStarted = true;
                this.bird.startTheRun();
                this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
                startingText.destroy();
            }
        };
        mainState.prototype.addOnePipe = function (x, y) {
            var pipe = this.game.add.sprite(x, y, 'pipe-img');
            this.pipes.add(pipe);
            this.game.physics.arcade.enable(pipe);
            pipe.body.velocity.x = -200;
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
        };
        mainState.prototype.addRowOfPipes = function () {
            var hole = Math.floor(Math.random() * 5) + 1;
            for (var i = 0; i < 8; i++) {
                if (i != hole && i != hole + 1) {
                    this.addOnePipe(400, i * 60 + 10);
                }
            }
            this.score += 1;
            this.labelScore.text = this.score;
        };
        mainState.prototype.hitPipe = function () {
            if (this.bird.alive == false) {
                return;
            }
            this.bird.alive = false;
            this.game.time.events.remove(this.timer);
            this.pipes.forEach(function (p) {
                p.body.velocity.x = 0;
            }, this.game);
        };
        mainState.prototype.restartGame = function () {
            this.game.state.restart();
        };
        return mainState;
    }(Phaser.State));
    FlappyBird.mainState = mainState;
    ;
})(FlappyBird || (FlappyBird = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZWQtZmxhcHB5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmlyZHkudHMiLCJib290LnRzIiwiZ2FtZS50cyIsImxvYWRpbmcudHMiLCJtYWluLXN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBVSxVQUFVLENBK0JuQjtBQS9CRCxXQUFVLFVBQVUsRUFBQSxDQUFDO0lBQ2pCO1FBQTJCLHlCQUFhO1FBRXBDLHdCQUF3QjtRQUN4QixlQUFZLElBQWdCLEVBQUMsQ0FBUSxFQUFDLENBQVEsRUFBQyxHQUFVO1lBQ3JELGtCQUFNLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0Qsc0JBQU0sR0FBTjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsMkJBQVcsR0FBWDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFD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QUVELDBCQUFNLEdBQU47WUFDQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLENBQUE7WUFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0YsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElB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