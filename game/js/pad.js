//pad.js : containt pad object proprieties and method
var PADHEIGHT = 10,
    BENDHEIGHT = 30,
    MAXPADWIDTH = 200;

function PAD() {
    'use strict';
    this.concrete = false;
    this.present = false;
    this.bend = false;

    //Pad position and dimension in game
    //depends from user click on screen.
    //Default values:
    this.height = PADHEIGHT;
    this.bendHeight = BENDHEIGHT;
    this.width = 0;
    this.slope = 0;
    this.rotation = 0;
    this.x = 0;
    this.y = 0;
}

//calculate slope of line and its width using 2 points coordinates acquired
PAD.prototype.calculate = function (firstX, lastX, firstY, lastY) {
    'use strict';
    var deltaX, deltaY;
    deltaX = firstX - lastX;
    deltaY = firstY - lastY;
    this.width = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    //line width check, it's impossibile to draw line too long!
    this.width = ((this.width > MAXPADWIDTH) ? MAXPADWIDTH : this.width);
    //calc line slope
    this.rotation = Math.atan2(deltaY, deltaX);
    this.slope = (-deltaY) / (-deltaX);
    //infinity value can cause problem, so we treat infinity as 0-acceleration (vertical platform)
    if (!isFinite(this.slope)) {
        this.slope = 0;
    }
};

//return type of jump if player hits pad, -1 else
PAD.prototype.isHit  = function (playerX, playerY, playerHeight, playerWidth) {
    'use strict';
    var yFirstCollision, ySecondCollision, xFirstCollision, xSecondCollision, typeofJump;
    
    
    yFirstCollision = (playerY + playerHeight) > this.y;
    ySecondCollision = (playerY < this.y);
    xFirstCollision = (playerX >= this.x) || (playerX + playerWidth >= this.x);
    xSecondCollision = (playerX <= this.x + this.width) || (playerX + playerWidth <= this.x + this.width);
    
    if (yFirstCollision && ySecondCollision && xFirstCollision && xSecondCollision && this.concrete) {
        //after collision, pad is bend, after choose type of jump and return hit
        this.bend = true;
        typeofJump = Math.ceil(this.width / 50);
        return typeofJump;
    }
    
    //no collision
    return -1;
};

//getter for present property
PAD.prototype.isPresent = function () {
    'use strict';
    return this.present;
};

//getter for concrete property
//pad is concrete only if mouse button has been released
PAD.prototype.isConcrete = function () {
    'use strict';
    return this.concrete;
};

//getter for bend property
//pad is bend or not?
PAD.prototype.isBend = function () {
    'use strict';
    return this.bend;
};

//restore PAD object to its default values
PAD.prototype.reset = function () {
    'use strict';
    this.concrete = false;
    this.present = false;
    this.bend = false;
    this.width = 0;
    this.slope = 0;
    this.rotation = 0;
    this.x = 0;
    this.y = 0;
};