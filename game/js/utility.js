//utility.js : contains useful function

// RequestAnimFrame: update and render sprite at the same rate of browsing repaint.
// Compatible with most of vendor: webkit, moz, o, ms.
window.requestAnimFrame = (function () {
    'use strict';
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
}());

// CancelAnimFrame: stop current browser repaint (it needs id of current animation frame)
window.cancelAnimFrame = (function () {
    'use strict';
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame ||
        function (myRequest) {
            window.cancelAnimationFrame(myRequest);
        };
}());