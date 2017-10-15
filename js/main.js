//main.js : contains function for graphic presentation for all page

//function to show/hide facebook and twitter share button
function showShare(boolean) {
    'use strict';
    var shareContainer, buttonShare, soldiername;
    shareContainer = document.getElementsByClassName("containerShare")[0];
    buttonShare = document.getElementsByClassName("buttonShare")[0];
    soldiername = document.getElementsByClassName("soldiername")[0];
    
    //if true -> show
    if (boolean) {
        //translate down container div 
        shareContainer.style.transform = "translateY(-65px)";
        //hide button
        buttonShare.style.opacity = "0";
        //move soldiername text to left
        soldiername.style.right = "140px";
        //add event listener to reset in case of mouse leave event
        shareContainer.addEventListener("mouseleave", function () { showShare(false); }, false);
    //if false -> hide
    } else {
        //translate up container div
        shareContainer.style.transform = "translateY(-230px)";
        //show button
        buttonShare.style.opacity = "1";
        //move soldiername to right
        soldiername.style.right = "40px";
        //remove event listner
        shareContainer.removeEventListener("mouseleave", showShare, false);
    }
}

//initialize game iframe with correct source or delete them
function loadGame(boolean) {
    'use strict';
    var game = document.getElementsByClassName("game")[0];
    //if boolean == true -> assign correct src to iframe, else assign empty string
    game.src = ((boolean === true) ? "game/index.html" : "");
}

//open iframe and hide the page with an overlayer
function play(boolean) {
    'use strict';
    var overlayer = document.getElementById("gameWrapper");
    loadGame(boolean);
    //if boolean == true, display overlayer
    if (boolean) {
        document.body.style.overflowY = "hidden";
        overlayer.style.display = "block";
    } else {
    //if boolean == false, hide overlayer
        document.body.style.overflowY = "auto";
        overlayer.style.display = "none";
    }
}

//show forget pass form
function displayForgetForm(boolean) {
    'use strict';
    var signContainer, forgetContainer;
    signContainer = document.getElementById("sign");
    forgetContainer = document.getElementById("forget");
    
    if (boolean) {
        signContainer.style.display = "none";
        forgetContainer.style.display = "block";
    } else {
        signContainer.style.display = "block";
        forgetContainer.style.display = "none";
    }
}

//show setpassword form
function displayNewpassForm(boolean) {
    'use strict';
    var recoverForm, setForm;
    recoverForm = document.getElementById("recoverPass");
    setForm = document.getElementById("setPass");
    
    if (boolean) {
        recoverForm.style.display = "none";
        setForm.style.display = "block";
    } else {
        setForm.style.display = "block";
        recoverForm.style.display = "none";
    }
}

//show login form or hide them
function signShow(boolean) {
    'use strict';
    var overlayer = document.getElementById("signWrapper");
    if (boolean) {
        displayForgetForm(false);
        document.body.style.overflowY = "hidden";
        overlayer.style.display = "block";
    } else {
        document.body.style.overflowY = "auto";
        overlayer.style.display = "none";
    }
}

//clear each alert error paragraph 
function clearAlertP() {
    'use strict';
    var i, alertP = document.getElementsByClassName("errorAlert");
    for (i = 0; i < alertP.length; i = i + 1) {
        alertP[i].textContent = "";
    }
}

//show soldier name or default string
function showName(name) {
    'use strict';
    var nameBox = document.getElementsByClassName("soldiername")[0];
    if (name !== "") {
        nameBox.firstElementChild.textContent = "Hi " + name + "!";
        nameBox.lastElementChild.textContent = " Logout NOW";
        nameBox.lastElementChild.setAttribute("href", "./php/logout.php");
    } else {
        nameBox.firstElementChild.textContent = "Hi soldier!";
        nameBox.lastElementChild.textContent = " Sign up NOW!";
        nameBox.lastElementChild.setAttribute("href", "signup.php");
    }
}

//hide sign button
function hideSignButton(boolean) {
    'use strict';
    var buttonSign;
    buttonSign = document.getElementsByClassName("item sign")[0].parentElement;
    buttonSign.style.display = ((boolean === true) ? "none" : "inline-block");
}