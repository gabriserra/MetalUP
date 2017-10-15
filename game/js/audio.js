//audio.js : contains audio controller

//audio file constant
var MUSIC_ID = "musicFile",
    JUMP_EFFECT_ID = "jumpFile",
    BEGIN_EFFECT_ID = "beginFile",
    END_EFFECT_ID = "endFile";

//audio controller class constructor
function AUDIO() {
    'use strict';
    this.music = document.getElementById(MUSIC_ID);
    this.jumpEffect = document.getElementById(JUMP_EFFECT_ID);
    this.beginEffect = document.getElementById(BEGIN_EFFECT_ID);
    this.endEffect = document.getElementById(END_EFFECT_ID);
}

//music soundtrack will be played
AUDIO.prototype.musicPlay = function () {
    'use strict';
    this.music.play();
};

//high jump effect ("OK!") will be played
AUDIO.prototype.jumpPlay = function () {
    'use strict';
    this.jumpEffect.play();
};

//initial sound effect ("MISSION START!") will be played
AUDIO.prototype.beginPlay = function () {
    'use strict';
    this.beginEffect.play();
};

//final sound effect ("NOOOO!") will be played
AUDIO.prototype.endPlay = function () {
    'use strict';
    this.endEffect.play();
};

//music soundtrack will be stopped
AUDIO.prototype.musicStop = function () {
    'use strict';
    this.music.pause();
};

//music soundtrack changes his state: from mute to unmute or viceversa
AUDIO.prototype.musicChange = function () {
    'use strict';
    this.music.muted = !this.music.muted;
};

//sound effect change their state: from mute to unmute or viceversa
AUDIO.prototype.effectChange = function () {
    'use strict';
    this.jumpEffect.muted = !this.jumpEffect.muted;
    this.beginEffect.muted = !this.beginEffect.muted;
    this.endEffect.muted = !this.endEffect.muted;
};