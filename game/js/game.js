//game.js : contains game core function and object

//useful constant, BOX dimension, sprites id and jump different lenght
var BOX_WIDTH = 422,
    BOX_HEIGHT = 552,
    SPRITEID = "sprite",
    SOLDIERSPRITE = "soldierprite",
    PLATFORMID = "plsprite",
    MAX_JUMP = 15,
    MID_JUMP = 12,
    MIN_JUMP = 8;

//game object constructor
function GAME(canvasId) {
    'use strict';
    
    //DEFAULT VALUES
    this.AnimationId = 0;
    this.score = 0;
    this.landMoved = false;
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = BOX_WIDTH;
    this.canvas.height = BOX_HEIGHT;
        
    //INITALIZE OBJECT
    this.player = new PLAYER(BOX_HEIGHT, BOX_WIDTH);
    this.soldier = new SOLDIER(BOX_HEIGHT, BOX_WIDTH);
    this.pad = new PAD();
    this.sketcher = new SKETCHER(this.canvas, SPRITEID, SOLDIERSPRITE, PLATFORMID);
    this.menu = new MENU();
    this.audio = new AUDIO();
    this.ajax = new AJAX();
    
    //CANVAS AND DIV EVENT LISTENER
    this.canvas.addEventListener("mousedown", this.saveFirstCoord.bind(this));
    this.canvas.addEventListener("mousemove", this.saveLastCoord.bind(this));
    this.canvas.addEventListener("mouseup", this.releasePad.bind(this));
    this.canvas.addEventListener("touchstart", this.touchFirstCoord.bind(this));
    this.canvas.addEventListener("touchmove", this.touchLastCoord.bind(this));
    this.canvas.addEventListener("touchend", this.touchReleasePad.bind(this));
    this.menu.mainMenu.addEventListener("mouseup", this.start.bind(this));
    this.menu.restartButton.addEventListener("click", this.reset.bind(this));

    //MOUSE CLICK COORD
    this.firstClick = false;
    this.firstEventX = 0;
    this.firstEventY = 0;
    this.lastEventX = 0;
    this.lastEventY = 0;
}

//save PAD first 2 mouse coord
GAME.prototype.saveFirstCoord = function (event) {
    'use strict';
    //obtain actual Canvas dimension in window
    var rect = this.canvas.getBoundingClientRect();
    //pad in canvas is no more present
    this.pad.present = false;
    this.pad.concrete = false;
    //obtain first x & y mouse coordinates subtracting canvas bound
    this.firstEventY = event.clientY - rect.top;
    this.firstEventX = event.clientX - rect.left;
    this.firstClick = true;
};

//same function but for touch screen displays
GAME.prototype.touchFirstCoord = function (event) {
    'use strict';
    //prevent click event that will be generated on displays
    event.preventDefault();
    //obtain actual Canvas dimension in window
    var rect = this.canvas.getBoundingClientRect();
    //pad in canvas is no more present
    this.pad.present = false;
    this.pad.concrete = false;
    //obtain first x & y mouse coordinates subtracting canvas bound
    this.firstEventY = event.touches[0].clientY - rect.top;
    this.firstEventX = event.touches[0].clientX - rect.left;
    this.firstClick = true;
};

//save PAD last 2 mouse coord, first click variable it's a flag to prevent running of function when it's not required
//(because it is called by mouse move event)
GAME.prototype.saveLastCoord = function (event) {
    'use strict';
    if (this.firstClick) {
        //obtain actual Canvas dimension in window
        var rect = this.canvas.getBoundingClientRect();
        //obtain x & y coord subtracting canvas bound
        this.lastEventX = event.clientX - rect.left;
        this.lastEventY = event.clientY - rect.top;
        //see pad object (calc slope and lenght)
        this.pad.calculate(this.firstEventX, this.lastEventX, this.firstEventY, this.lastEventY);

        this.pad.x = this.firstEventX;
        this.pad.y = this.firstEventY;

        //if pad was drawed from left to right invert first with last
        if (this.lastEventX < this.firstEventX) {
            this.pad.x = this.lastEventX;
            this.pad.calculate(this.lastEventX, this.firstEventX, this.lastEventY, this.firstEventY);
        }

        //in next loop the pad will be present!
        this.pad.present = true;
    }
};

//same function but for touch screen displays
GAME.prototype.touchLastCoord = function (event) {
    'use strict';
    event.preventDefault();
    if (this.firstClick) {
        //obtain actual Canvas dimension in window
        var rect = this.canvas.getBoundingClientRect();
        this.lastEventX = event.touches[0].clientX - rect.left;
        this.lastEventY = event.touches[0].clientY - rect.top;
        this.pad.calculate(this.firstEventX, this.lastEventX, this.firstEventY, this.lastEventY);

        this.pad.x = this.firstEventX;
        this.pad.y = this.firstEventY;

        if (this.lastEventX < this.firstEventX) {
            this.pad.x = this.lastEventX;
            this.pad.calculate(this.lastEventX, this.firstEventX, this.lastEventY, this.firstEventY);
        }

        //in next loop the pad will be present!
        this.pad.present = true;
    }
};

//mouse button was released, pad is now concrete
GAME.prototype.releasePad = function (event) {
    'use strict';
    this.firstClick = false;
    this.pad.concrete = true;
};

//same as before, but for touch screen displays
GAME.prototype.touchReleasePad = function (event) {
    'use strict';
    event.preventDefault();
    this.firstClick = false;
    this.pad.concrete = true;
};

//check every collision that could happen in game and regulate eventual jump
GAME.prototype.checkCollision = function () {
    'use strict';
    var landCollide, soldierCollide, typeOfJump;
    typeOfJump = this.pad.isHit(this.player.x, this.player.y, this.player.height, this.player.width);
    
    //multiply coeff for x acceleration increase by jump lenght and only if it is MAX "OK" effect will be play.
    switch (typeOfJump) {
    case -1:
        break;
    case 0:
        break;
    case 1:
        this.player.jumpY(MAX_JUMP);
        this.player.jumpX(this.pad.slope, 80);
        this.landMoved = true;
        this.audio.jumpPlay();
        break;
    case 2:
        this.player.jumpY(MID_JUMP);
        this.player.jumpX(this.pad.slope, 40);
        this.landMoved = true;
        break;
    default:
        this.player.jumpY(MIN_JUMP);
        this.player.jumpX(this.pad.slope, 25);
        this.landMoved = true;
    }
    
    //check player collision with border of box
    this.player.borderCollision(BOX_WIDTH);
    
    //check player collision with lower border
    landCollide = this.player.landCollision(BOX_HEIGHT);
    if (landCollide && !this.landMoved) {
        //if player touch earth, jump!
        this.player.jumpY(MIN_JUMP);
    } else if (landCollide && this.landMoved) {
        //else game over!!
        this.player.isDead = true;
    }
    
    //check if enemy want to kill player
    soldierCollide = this.soldier.isHit(this.player.x, this.player.y, this.player.height, this.player.width);
    if (soldierCollide) {
        this.player.isDead = true;
    }
};

//KERNEL OF GAME -
GAME.prototype.updateGame = function () {
    'use strict';
    //clear canvas from old draw
    this.sketcher.clearCanvas(BOX_WIDTH, BOX_HEIGHT);
    //PAD can be normal or bend, check by getter and draw the correct one
    if (this.pad.isPresent()) {
        if (this.pad.isBend()) {
            this.sketcher.padBendDraw(this.pad);
            this.pad.reset();
        } else {
            this.sketcher.padDraw(this.pad);
        }
    }
    
    //if ENEMY SOLDIER is not present, try to generate one
    if (!this.soldier.isPresent()) {
        this.soldier.spawn(this.score);
    } else {
        //if it is present, calc is own position, the correct image to display and draw him
        this.soldier.calcPositionX();
        this.soldier.calcPositionY();
        this.sketcher.calcSoldierSpritePosition(this.soldier);
        this.sketcher.soldierDraw(this.soldier);
        //check if soldier is out of lower box bound, and in case remove him
        this.soldier.landPass(BOX_HEIGHT);
    }
    
    //calc PLAYER position and move background if player pass mid screen
    this.player.calcPositionX();
    this.player.calcPositionY(BOX_HEIGHT);
    if (this.player.backShift !== 0) {
        this.sketcher.moveBackground(this.player.backShift);
        //refresh score
        this.score += this.player.backShift;
        this.player.backShift = 0;
    }
    
    //calc PLAYER correct image to display
    this.sketcher.calcSpritePosition(this.player);
    //check player collision 
    this.checkCollision();
    //draw player
    this.sketcher.playerDraw(this.player);
    //update menu with fresh score
    this.menu.updateScore(this.score);
    this.AnimationId = window.requestAnimFrame(this.updateGame.bind(this));
    //check if player is dead, call game over function
    if (this.player.isDead) {
        this.gameOver();
    }
};

//game over man! play end sound effect, show/hide menu, stop game animation and call menu loop
GAME.prototype.gameOver = function () {
    'use strict';
    this.audio.endPlay();
    this.menu.hideScore();
    this.menu.showGameOverMenu(this.score);
    this.stop();
    this.menuLoop();
};

//simple game loop used for menu
GAME.prototype.menuLoop = function () {
    'use strict';
    this.sketcher.clearCanvas(BOX_WIDTH, BOX_HEIGHT);
    //restore background to default decrementing by 10px
    this.sketcher.moveGameOverBackground();
    this.player.calcPositionY(BOX_HEIGHT);
    this.sketcher.calcSpritePosition(this.player);
    if (this.player.landCollision(BOX_HEIGHT)) {
        this.player.jumpY(MIN_JUMP);
    }
    this.sketcher.playerDraw(this.player);
    this.AnimationId = window.requestAnimFrame(this.menuLoop.bind(this));
};

//stop browser repaint
GAME.prototype.stop = function () {
    'use strict';
    window.cancelAnimFrame(this.AnimationId);
};

//restore game to default values, stop music and animation and reset every object
GAME.prototype.reset = function () {
    'use strict';
    this.audio.musicStop();
    this.stop();
    
    this.landMoved = false;
    this.firstClick = false;
    this.firstEventX = 0;
    this.firstEventY = 0;
    this.lastEventX = 0;
    this.lastEventY = 0;
    
    this.menu.hideGameOverMenu();
    this.menu.hideScore();
    this.menu.showMenu();
    this.sketcher.moveBackground(0);
    this.player.reset(BOX_WIDTH, BOX_HEIGHT);
    this.pad.reset();
    this.soldier.reset();
    
    this.start();
};

//reset score, stop menu animation and start game!
GAME.prototype.start = function () {
    'use strict';
    this.score = 0;
    this.stop();
    this.audio.beginPlay();
    this.audio.musicPlay();
    this.menu.hideMenu();
    this.menu.showScore();
    this.updateGame();
};

//change music state from mute to unmute or viceversa and refresh graphic
GAME.prototype.changeMusic = function () {
    'use strict';
    this.audio.musicChange();
    this.menu.changeMusicClass();
};

//change effect state from mute to unmute or viceversa and refresh graphic
GAME.prototype.changeEffect = function () {
    'use strict';
    this.audio.effectChange();
    this.menu.changeEffectClass();
};

//submit player score to server using asinc AJAX and display an alert on fail/done
GAME.prototype.submitScore = function () {
    'use strict';
    if (navigator.onLine === false) {
        window.alert("You are playing in locale.");
        return;
    }
    
    var dataString = "score=" + parseInt(this.score);
    
    this.ajax.open("./php/scoresubmit.php");
    this.ajax.setHeader();
    this.ajax.done(jsonAlert);
    this.ajax.fail(jsonAlert);
    this.ajax.send(dataString);
};