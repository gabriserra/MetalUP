//ajax Class : create and handle XMLHttpRequest Object
//ajax constant
var READYSTATE = {
    INATTIVO:	0,
    INIZIALIZZATO:	1,
    RICHIESTA:	2,
    RISPOSTA:	3,
    COMPLETATO:	4
};

//construct for ajax class 
function AJAX() {
    'use strict';
    this.ajaxRequest = new XMLHttpRequest();
    this.doneHandler = undefined;
    this.failHandler = undefined;
}

//open a connection with POST protocol
AJAX.prototype.open = function (url) {
    'use strict';
    this.ajaxRequest.open('POST', url, true);
};

//set correct header for request
AJAX.prototype.setHeader = function (url) {
    'use strict';
    this.ajaxRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
};

//set changeState function on ready event and send an asinc request
AJAX.prototype.send = function (dataString) {
    'use strict';
    this.ajaxRequest.onreadystatechange = this.changeState.bind(this);
    this.ajaxRequest.send(dataString);
};

//getter for ajax state ready state
AJAX.prototype.getReadyState = function () {
    'use strict';
    return this.ajaxRequest.readyState;
};

//getter for ajax status
AJAX.prototype.getStatus = function () {
    'use strict';
    return this.ajaxRequest.status;
};

//getter for ajax response text
AJAX.prototype.getResponseText = function () {
    'use strict';
    return this.ajaxRequest.responseText;
};

//specify function that will be run after request
AJAX.prototype.done = function (readyFunction) {
    'use strict';
    this.doneHandler = readyFunction;
};

//specify function that will be run after failed request
AJAX.prototype.fail = function (readyFunction) {
    'use strict';
    this.failHandler = readyFunction;
};

//check if request is complete and if it was successfull
AJAX.prototype.changeState = function () {
    'use strict';
    if (this.getReadyState() === READYSTATE.COMPLETATO) {
        if (this.getStatus() === 200) {
            this.doneHandler(this.ajaxRequest.responseText);
        } else {
            //on fail call fail handler function and pass a JSON object
            this.failHandler('{"error":true, "message":"Problem of connection, try again"}');
        }
    }
};