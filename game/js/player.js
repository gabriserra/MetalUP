//player.js : contain player object proprieties and method

//useful constant that represent dimension of player in game and gravity
var PLAYERWIDTH = 55,
    PLAYERHEIGHT = 92,
    GRAVITY = 0.2;


//player object constructor
function PLAYER(BOX_HEIGHT, BOX_WIDTH) {
    'use strict';
    //Default values
    this.backShift = 0;
    this.dir = "right";
    this.spritepos = 0;
    this.isDead = false;
    this.currentx = 0;
    this.currenty = 0;

    //Player dimension and position in game
    this.width = PLAYERWIDTH;
    this.height = PLAYERHEIGHT;
    this.y = BOX_HEIGHT;
    this.x = (BOX_WIDTH / 2) - (this.width / 2);
}

//set proprieties at defaul values
PLAYER.prototype.reset = function (BOX_WIDTH, BOX_HEIGHT) {
    'use strict';
    this.backShift = 0;
    this.dir = "right";
    this.spritepos = 0;
    this.isDead = false;
    this.currentx = 0;
    this.currenty = 0;
    
    this.y = BOX_HEIGHT;
    this.x = (BOX_WIDTH / 2) - (this.width / 2);
};

//jumping y speed depends from drawed line lenght
PLAYER.prototype.jumpY = function (jumpHeight) {
    'use strict';
    this.currenty = -jumpHeight;
};

//jumping x speed depends from drawed line rotation
PLAYER.prototype.jumpX = function (rotation, multiply) {
    'use strict';
    //sign function
    var sign = ((rotation >= 0) ? 1 : -1);
    //trying to muffle too high rotation with logarithm function (sum 1 to avoid 0 error)
    this.currentx = ((Math.ceil(Math.log(Math.abs(rotation * multiply) + 1))) * sign);
};

//calculate next player position (Y) in game
PLAYER.prototype.calcPositionY = function (BOX_HEIGHT) {
    'use strict';
    //if y coord of player pass mid-screen coord
    if (this.y > (BOX_HEIGHT / 2) - (this.height / 2) || (this.currenty >= 0)) {
        //gravity: player current position increase (p go down) 0.2 at each loop and refresh y coord
        this.y = this.currenty + this.y;
        this.currenty = this.currenty + GRAVITY;
    } else {
        //else player won't move and background must be moved!
        this.backShift = -this.currenty;
        //increment curry until it is 0!
        this.currenty = this.currenty + 0.5;
    }
};

//calculate next player position (X) in game
PLAYER.prototype.calcPositionX = function () {
    'use strict';
    //refresh x position
    this.x = this.x + this.currentx;
    //if player is not stable
    if (this.currentx !== 0) {
        //reduce x acceleration
        this.currentx = ((this.currentx > 0) ? this.currentx - GRAVITY : this.currentx + GRAVITY);
        //round 2 decimal digits
        this.currentx.toFixed(2);
    }
};

//make the player bounce at walls
PLAYER.prototype.borderCollision = function (BOX_WIDTH) {
    'use strict';
    //if player position + player width pass box border or player position is smaller than 0 (first border)
    if (((this.x + this.width) >= BOX_WIDTH) || (this.x <= 0)) {
        //change currx sign and update dir variable
        this.currentx =  -this.currentx;
        this.dir = ((this.dir === "left") ? "right" : "left");
    }
};

//check if player pass land height
PLAYER.prototype.landCollision = function (BOX_HEIGHT) {
    'use strict';
    //if last y of player pass land y
    return (((this.y + this.height) > BOX_HEIGHT) ? true : false);
};