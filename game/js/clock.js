//clock.js : contain game start, loop, pause function
var BOX_WIDTH = 422,
    BOX_HEIGHT = 552,
    CANVASID = "canvas";

//main variable of game
var game;

//on body load, simple menu loop
function init() {
    'use strict';
    var loading = document.images[1].style.visibility = "hidden";
    game = new GAME(CANVASID);
    game.menuLoop();
}

//music soundtrack will be muted/unmuted
function changeMusicState() {
    'use strict';
    game.changeMusic();
}

//sound effect will be muted/unmuted
function changeEffectState() {
    'use strict';
    game.changeEffect();
}

//try to save current score to database
function submit() {
    'use strict';
    game.submitScore();
}

//launch javascript alert parsing json response object
function jsonAlert(text) {
    'use strict';
    var error, object = JSON.parse(text);
    error = ((object.error === true) ? "Error: " : "Completed: ");
    window.alert(error + object.message);
}