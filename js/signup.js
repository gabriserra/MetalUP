//signup.js : javascript utility for signup page

//signup form validation
function formValidation() {
    'use strict';
    var ajax, input, emailReg, i, dataString, bio, error = false;
    
    input = document.getElementsByClassName("sign-input");
    bio = document.getElementsByName("bio")[0];
    
    //reset input element class to default
    for (i = 0; i < input.length; i = i + 1) {
        input[i].className = "sign-input";
    }
    
    //if name field is empty or filled with space then assign error class
	if (input[0].value.trim() === "") {
		error = true;
		input[0].className = "sign-input errorInput";
	}
	
    //if email field is empty or not respect regexp then assign class error
	emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if (input[1].value === "") {
		error = true;
		input[1].className = "sign-input errorInput";
	} else if (!emailReg.test(input[1].value)) {
        input[1].className = "sign-input errorInput";
        error = true;
	}
    
    //if password field is empty or it's not equal to "password confirm" field, then assing class error
    if ((input[2].value === "") || (input[2].value !== input[3].value)) {
        error = true;
        input[2].className = "sign-input errorInput";
    }

    //if an error was found, return.
	if (error === true) {
		return;
	}
    
    //serialize input field to send with POST
	dataString = input[0].name + "=" + input[0].value + "&";
    dataString = dataString + input[1].name + "=" + input[1].value + "&";
    dataString = dataString + input[2].name + "=" + input[2].value + "&";
    dataString = dataString + bio.name + "=" + bio.value;
    
    //encode special char
    dataString = encodeURI(dataString);
    
    //create ajax object and try to do a request
    ajax = new AJAX();
    ajax.open("./php/registration.php");
    ajax.setHeader();
    //on response, run formResponse function
    ajax.done(formResponse);
    ajax.send(dataString);
}

//function that will be run on ajax response to request
function formResponse(text) {
    'use strict';
    //obtain responseObject parsing JSON text sended by PHP script
    var errorAlert, responseObject = JSON.parse(text);
    //if error = false 
    if (!responseObject.error) {
        //hide form field and show a message
        hideForm(responseObject.message);
    } else {
        //if there is an error warn user with an alert
        errorAlert = document.getElementsByClassName("errorAlert")[2];
        errorAlert.textContent = responseObject.message;
    }
}

//hide form field and show a message in case that signup is ended with success
function hideForm(text) {
    'use strict';
    var form, afterSignBox, p, wrapper;
    wrapper = document.getElementsByClassName("wrapper signup")[0];
    form = document.getElementsByClassName("form")[0];
    afterSignBox = document.getElementsByClassName("afterSignBox")[0];
    p = document.getElementsByClassName("responseText")[0];
    
    //hide form
    form.style.display = "none";
    //show after sign box
    afterSignBox.style.display = "block";
    //assign new height to page wrapper
    wrapper.style.height = "800px";
    afterSignBox.style.height = "400px";
    //create a text node with message and append it to p element
    p.appendChild(document.createTextNode(text));
}