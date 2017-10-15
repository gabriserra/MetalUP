//sketcher.js : contains drawing methods

//useful constant important for drawing
//first 4 constant represent distance between different images
//second 4 constant represent source width and height
var XDISTANCEANIMATION = 284,
    YDISTANCEANIMATION = 500,
    YDISTANCESOLDIERANIM = 62,
    XDISTANCESOLDIERANIM = 59,
    PLAYERSWIDTH = 285,
    PLAYERSHEIGHT = 475,
    SOLDIERSWIDTH = 55,
    SOLDIERSHEIGHT = 60,
    PADSX = 10,
    PADSY = 10,
    PADSWIDTH = 20,
    PADSHEIGHT = 5,
    MAX_ANIMATION = 8,
    BACK_BOTTOM = -3300;

//sketcher construct (get image object from id and canvas context)
function SKETCHER(canvas, spriteId, soldierSpriteId, platformId) {
    'use strict';
    this.canvas = canvas;
    this.platform = document.getElementById(platformId);
    this.image = document.getElementById(spriteId);
    this.soldierImage = document.getElementById(soldierSpriteId);
    this.context = this.canvas.getContext('2d');
    this.actualBack = BACK_BOTTOM;
}

//Drawing player in canvas
SKETCHER.prototype.playerDraw = function (PLAYER) {
    'use strict';
    var sx, sy;
    //calculate correct selection in image
    sx = XDISTANCEANIMATION * PLAYER.spritepos;
    sy = ((PLAYER.dir === "right") ? 0 : YDISTANCEANIMATION);
    this.context.drawImage(this.image, sx, sy, PLAYERSWIDTH, PLAYERSHEIGHT, PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
};

//Drawing soldier in canvas
SKETCHER.prototype.soldierDraw = function (SOLDIER) {
    'use strict';
    var sx, sy;
    //calculate correct selection in image
    sx = XDISTANCESOLDIERANIM * SOLDIER.spritepos;
    sy = ((SOLDIER.dir === "right") ? 0 : YDISTANCESOLDIERANIM);
    this.context.drawImage(this.soldierImage, sx, sy, SOLDIERSWIDTH, SOLDIERSHEIGHT, SOLDIER.x, SOLDIER.y, SOLDIER.width, SOLDIER.height);
};

//Clear the canvas from each old draw.
SKETCHER.prototype.clearCanvas = function (BOX_WIDTH, BOX_HEIGHT) {
    'use strict';
    this.context.clearRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
};

//calculate the correct image to display according to player's position
SKETCHER.prototype.calcSpritePosition = function (PLAYER) {
    'use strict';
    var absoluteCurrentY = Math.abs(PLAYER.currenty);
    
    //if player jumped high or ultra high use max animation!
    absoluteCurrentY = ((absoluteCurrentY > 8) ? MAX_ANIMATION : absoluteCurrentY);
    
    //if player current y <= 2, use readytojump sprite, else choose one of the other.
    PLAYER.spritepos = ((PLAYER.currenty <= 2) ? 6 : Math.round(MAX_ANIMATION - absoluteCurrentY));
};

//calculate the correct image to display according to soldier's position
SKETCHER.prototype.calcSoldierSpritePosition = function (SOLDIER) {
    'use strict';
    var absoluteCurrentY = SOLDIER.currenty;
    
    //soldier currY value is between 0 to 15 -> use correct image until 10, else use last image
    SOLDIER.spritepos = ((Math.round(absoluteCurrentY / 2) > 5) ? 5 : Math.round(absoluteCurrentY / 2));
};

//draw pad in canvas according to its rotation
SKETCHER.prototype.padDraw = function (PAD) {
    'use strict';
    //save the unrotated canvas context
    this.context.save();
    //translate to center of pad
    this.context.translate(PAD.x + PAD.width / 2, PAD.y + PAD.height / 2);
    //rotate them
    this.context.rotate(PAD.rotation);
    //draw line
    this.context.drawImage(this.platform, 50, 170, 150, 15, -PAD.width / 2, -PAD.height / 2, PAD.width, PAD.height);
    //draw begin and final point
    this.context.drawImage(this.platform, 20, 160, 23, 34, -PAD.width / 2, -PAD.height / 2, 15, 20);
    this.context.drawImage(this.platform, 20, 160, 23, 34, PAD.width / 2, -PAD.height / 2, 15, 20);
    //restore the previsous context
    this.context.restore();
};

//draw pad in canvas when it is hitted by player
SKETCHER.prototype.padBendDraw = function (PAD) {
    'use strict';
    this.context.save();
    this.context.translate(PAD.x + PAD.width / 2, PAD.y + PAD.height / 2);
    this.context.rotate(PAD.rotation);
    this.context.drawImage(this.platform, 48, 22, 150, 45, -PAD.width / 2, -PAD.height / 2, PAD.width, PAD.bendHeight);
    this.context.drawImage(this.platform, 20, 160, 23, 34, -PAD.width / 2, PAD.height / 2, 15, 20);
    this.context.drawImage(this.platform, 20, 160, 23, 34, PAD.width / 2, PAD.height / 2, 15, 20);
    this.context.restore();
};

//move background image to simulate player move
SKETCHER.prototype.moveBackground = function (increment) {
    'use strict';
    //if increment = 0, restore original background position else move by increment
    this.actualBack = ((increment === 0) ? BACK_BOTTOM : this.actualBack + increment);
    //IMPORTANT - if background image is finished, restore to repeat point: 1090px
    this.actualBack = ((this.actualBack >= 0) ? -1090 : this.actualBack);
    //refresh in CSS to display modification
    this.canvas.style.backgroundPosition = "0px " + this.actualBack + "px";
};

//move background image on gameOver menù loop
SKETCHER.prototype.moveGameOverBackground = function () {
    'use strict';
    //if image was moved, move back by 10px and refresh in CSS
    if (this.actualBack > BACK_BOTTOM) {
        this.actualBack = this.actualBack - 10;
        this.canvas.style.backgroundPosition = "0px " + this.actualBack + "px";
    } else {
        //else if image it's at the top, simply reassign correct top coord (it's important 'cause decrement can dephase image and coord)
        this.actualBack = BACK_BOTTOM;
    }
};