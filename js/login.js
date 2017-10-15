//login.js : contains form validation and ajax request for login

//javascript function to validate login input
function loginValidation() {
    'use strict';
    var ajax, email, emailReg, password, dataString, error = false;
    
    email = document.getElementById("userid");
    password = document.getElementById("loginPassword");
    
    email.className = "login-input";
    password.className = "login-input";
    
    //if password field is empty or composed only by blank space
    if (password.value.trim() === "") {
		error = true;
		password.className = "login-input errorInput";
	}
	
    //test email with a regexp and check if field it is empty
	emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if (email.value === "") {
		error = true;
		email.className = "login-input errorInput";
	} else if (!emailReg.test(email.value)) {
        email.className = "login-input errorInput";
        error = true;
	}

    //if there is an error, return
	if (error === true) {
		return;
	}
    
    //serialize data input to send with POST
	dataString = email.name + "=" + email.value + "&";
    dataString = dataString + password.name + "=" + password.value;
    
    //encode special char like % & ..
    dataString = encodeURI(dataString);
	
    //create an ajax object and send request
    ajax = new AJAX();
    ajax.open("./php/login.php");
    ajax.setHeader();
    ajax.done(loginResponse);
    ajax.send(dataString);
}

//on response, loginResponse will be run
function loginResponse(text) {
    'use strict';
    var errorAlert, newPassword, responseObject = JSON.parse(text);
    if (responseObject.error) {
        errorAlert = document.getElementsByClassName("errorAlert")[0];
        errorAlert.textContent = responseObject.message;
        return;
    } else if (!responseObject.error && responseObject.firstaccess) {
        //first access after a password recover, so user has possibility to change it
        displayForgetForm(true);
        displayNewpassForm(true);
    } else {
        //if there wasn't error, close login dialog
        signShow(false);
    }
    //clear eventually alert, hide button and show soldiername
    clearAlertP();
    showName(responseObject.name);
    hideSignButton(true);
}

function setNewPassword() {
    'use strict';
    var ajax, dataString, errorAlert, newPassword;
    errorAlert = document.getElementsByClassName("errorAlert")[1];
    newPassword = document.getElementById("newPassword").value;
    
    if (newPassword === null || newPassword.trim() === "") {
        errorAlert.textContent = "New request will be showed at next access if you skip now";
        return;
    }
    
    //serialize data input to send with POST
	dataString = "newpassword=" + newPassword;
    
    //encode special char like % & ..
    dataString = encodeURI(dataString);
	
    //create an ajax object and send request
    ajax = new AJAX();
    ajax.open("./php/forget.php");
    ajax.setHeader();
    ajax.done(forgetResponse);
    ajax.send(dataString);
}

function forgetLogin() {
    'use strict';
    var ajax, dataString, emailReg, email, errorAlert, button;
    button = document.getElementById("newpass");
    email = document.getElementById("forgetid").value;
    errorAlert = document.getElementsByClassName("errorAlert")[1];
    emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    
    //clear eventually p alert
    clearAlertP();
    
    if (email.trim() === "" || !emailReg.test(email)) {
        errorAlert.textContent = "Insert a valid mail!";
        return;
    }
    newpass.disabled = true;
    errorAlert.textContent = "Wait.. it would be take a minute";
    
    //serialize data input to send with POST
	dataString =  "email=" + email;
    
    //encode special char like % & @..
    dataString = encodeURI(dataString);
	
    //create an ajax object and send request
    ajax = new AJAX();
    ajax.open("./php/forget.php");
    ajax.setHeader();
    ajax.done(forgetResponse);
    ajax.send(dataString);
}

//on response, forgetResponse will be run
function forgetResponse(text) {
    'use strict';
    var errorAlert, responseObject = JSON.parse(text);
    errorAlert = document.getElementsByClassName("errorAlert")[1];
    errorAlert.textContent = responseObject.message;
}