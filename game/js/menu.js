//menu.js : contains dinamically hide/show code for menu

//useful constant (id)
var SCORE_BOARD_ID = "scoreBoard",
    MAIN_MENU_ID = "mainMenu",
    GAME_OVER_ID = "gameOverMenu",
    FINAL_SCORE_STRING_ID = "finalScore",
    SCORE_ID = "score",
    MUSIC_CTRL_ID = "music",
    EFFECT_CTRL_ID = "effect",
    RESTART_ID = "restart";
    
//menu object constructor (get object from id)
function MENU() {
    'use strict';
    this.restartButton = document.getElementById(RESTART_ID);
    this.scoreBoard = document.getElementById(SCORE_BOARD_ID);
    this.mainMenu = document.getElementById(MAIN_MENU_ID);
    this.gameOver = document.getElementById(GAME_OVER_ID);
    this.scoreString = document.getElementById(FINAL_SCORE_STRING_ID);
    this.score = document.getElementById(SCORE_ID);
    this.musicCtrl = document.getElementById(MUSIC_CTRL_ID);
    this.effectCtrl = document.getElementById(EFFECT_CTRL_ID);
}

//Hiding score decreasing z index.
MENU.prototype.hideScore = function () {
    'use strict';
    this.scoreBoard.style.zIndex = -1;
};

//Showing score increasing z index
MENU.prototype.showScore = function () {
    'use strict';
    this.scoreBoard.style.zIndex = 1;
};

//Hiding principal game menu (player jump in loop)
MENU.prototype.hideMenu = function () {
    'use strict';
    this.mainMenu.style.zIndex = -1;
};

//Showing principal game menu (player jump in loop)
MENU.prototype.showMenu = function () {
    'use strict';
    this.mainMenu.style.zIndex = 1;
};

//Showing game over menu
MENU.prototype.showGameOverMenu = function (score) {
    'use strict';
    this.gameOver.style.zIndex = 1;
    this.gameOver.style.visibility = "visible";
    this.scoreString.textContent = "You scored " + Math.floor(score) + " points!";
};

//Hiding game over menu
MENU.prototype.hideGameOverMenu = function () {
    'use strict';
    this.gameOver.style.zIndex = -1;
    this.gameOver.style.visibility = "hidden";
};

//update score string with actual score
MENU.prototype.updateScore = function (score) {
    'use strict';
    this.score.textContent = Math.floor(score);
};

//on music mute/unmute this function change text on screen and update class for css presentation
MENU.prototype.changeMusicClass = function () {
    'use strict';
    var name, ref;
    name = this.musicCtrl.className;
    this.musicCtrl.className = ((name === "mute music") ? "unmute music" : "mute music");
    this.musicCtrl.textContent = this.musicCtrl.className;
};

//on sound effect mute/unmute this function change text on screen and update class for css presentation
MENU.prototype.changeEffectClass = function () {
    'use strict';
    var name = this.effectCtrl.className;
    this.effectCtrl.className = ((name === "mute sound") ? "unmute sound" : "mute sound");
    this.effectCtrl.textContent = this.effectCtrl.className;
};