//soldier.js : contains soldier object

//useful constant
var BOX_WIDTH,
    SOLDIERWIDTH = 55,
    SOLDIERHEIGHT = 60,
    GRAVITY = 0.2;

//soldier object constructor
function SOLDIER(BOX_HEIGHT, BOX_WIDTH) {
    'use strict';

    //Default values
    this.dir = "right";
    this.present = false;
    this.prevSpawnScore = 0;
    this.spritepos = 0;
    this.currentx = 0;
    this.currenty = 0;

    //Player dimension and position in game
    this.width = SOLDIERWIDTH;
    this.height = SOLDIERHEIGHT;
    this.y = BOX_HEIGHT / 3;
    this.x =  this.width / 2;
}

//getter for present propriety
SOLDIER.prototype.isPresent = function () {
    'use strict';
    return this.present;
};

//generate a enemy soldier using random direction
SOLDIER.prototype.spawn = function (score) {
    'use strict';
    //spawn soldier about every 500 points
    if (score - this.prevSpawnScore >= 500) {
        //restore y values and randomize direction and x acceleration. after save new present state and new spawn score
        this.y = 0;
        this.currenty = 0;
        this.dir = ((Math.random() > 0.50) ? "right" : "left");
        if (this.dir === "right") {
            this.x = this.width / 2;
            this.currentx = Math.random() * 10;
        } else {
            this.currentx = -1 * Math.random() * 10;
            this.x = BOX_WIDTH - (this.width * 2);
        }
        this.present = true;
        this.prevSpawnScore = score;
    }
};

//return true if soldier collides, else return false
SOLDIER.prototype.isHit  = function (playerX, playerY, playerHeight, playerWidth) {
    'use strict';
    var yFirstCollision, ySecondCollision, xFirstCollision, xSecondCollision;
    
    
    yFirstCollision = (playerY + playerHeight) < this.y; //sistemare
    ySecondCollision = (playerY < this.y); //sistemare
    xFirstCollision = (playerX >= this.x) || (playerX + playerWidth >= this.x);
    xSecondCollision = (playerX <= this.x + this.width) || (playerX + playerWidth <= this.x + this.width);
    
    if (yFirstCollision && ySecondCollision && xFirstCollision && xSecondCollision && this.present) {
        return true;
    }
    
    return false;
};

//calculate next soldier position (Y)
SOLDIER.prototype.calcPositionY = function (BOX_HEIGHT) {
    'use strict';
    //soldier current position increase (soldier go down) by 0.2 at each loop and refresh y coord
    this.y = this.currenty + this.y;
    this.currenty = this.currenty + GRAVITY;
};
    
//calculate next soldier position (X)
SOLDIER.prototype.calcPositionX = function () {
    'use strict';
    //refresh x position using x acceleration
    this.x = this.x + this.currentx;
    //if player is not stable
    if (this.currentx !== 0) {
        //reduce x acceleration
        this.currentx = ((this.currentx > 0) ? this.currentx - GRAVITY : this.currentx + GRAVITY);
        //round 2 decimal digits
        this.currentx *= 10;
        this.currentx = Math.round(this.currentx);
        this.currentx /= 10;
    }
};

//restore soldier attributes to default values
SOLDIER.prototype.reset = function () {
    'use strict';
    //Default values
    this.dir = "right";
    this.present = false;
    this.prevSpawnScore = 0;
    this.spritepos = 0;
    this.currentx = 0;
    this.currenty = 0;
};

//check if soldier went out from BOX border, and in case change soldier state
SOLDIER.prototype.landPass = function (BOX_HEIGHT) {
    'use strict';
    //if last y of soldier pass land y
    if ((this.y + this.height) > BOX_HEIGHT) {
        this.present = false;
        return true;
    }
    return false;
};