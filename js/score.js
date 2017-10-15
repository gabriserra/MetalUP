//score.js : contains javascript function to get score

//check if a number it is valid for page number
function checkPageNumber(sospectNum) {
    'use strict';
    //if sospect num is nan or smaller than 1
    if (isNaN(sospectNum) || sospectNum < 1) {
        return false;
    }
    //else is ok
    return true;
}

//refresh score page
function refreshScore() {
    'use strict';
    var ajax, boxPage, input, parsedValue, dataString;
    
    input = document.getElementsByClassName("rank-input");
    boxPage = document.getElementsByName("npage")[0];
    parsedValue = parseInt(boxPage.value);
    
    //if value is not valid for page number, set value to 1
	if (!checkPageNumber(parsedValue)) {
        boxPage.value = "1";
	}
    
    //serialize input element of page to send with POST and AJAX class
    dataString = input[0].name + "=";
    dataString = dataString + ((input[0].checked === true) ? input[0].value : input[1].value) + "&";
    dataString = dataString + ((input[2].checked === true) ? input[2].name + "=" + input[2].value + "&" : "");
    dataString = dataString + boxPage.name + "=" + boxPage.value;
    
    //encode special char like % & ecc
    dataString = encodeURI(dataString);
    
    //open ajax class and send a request
    ajax = new AJAX();
    ajax.open("./php/getscore.php");
    ajax.setHeader();
    //set a function for response
    ajax.done(rankResponse);
    ajax.send(dataString);
}

//response function of ajax request
function rankResponse(text) {
    'use strict';
    var errorAlert, responseObject = JSON.parse(text);
    errorAlert = document.getElementsByClassName("errorAlert")[2];
    //if there wasn't an error
    if (!responseObject.error) {
        //fill score table
        errorAlert.textContent = "";
        fillTable(responseObject.rank);
    } else {
        //else alert user with error message
        errorAlert.textContent = responseObject.message;
    }
}

//clear table from old records
function clearTable() {
    'use strict';
    var currentChild, table = document.getElementById("scoreTable");
    //skip first element because it's table heading
    currentChild = table.firstElementChild;
    currentChild = currentChild.nextElementSibling;
    
    //in first table fill-operation there is no child apart headings.
    if (currentChild === null) {
        return;
    }
    
    //step element and remove every child
    while (currentChild.nextElementSibling !== null) {
        currentChild = currentChild.nextElementSibling;
        table.removeChild(currentChild.previousElementSibling);
    }
    table.removeChild(table.lastChild);
}

//fill table with up-to-date records
function fillTable(rankArray) {
    'use strict';
    var i, j, tr, td, textNode, table = document.getElementById("scoreTable");
    //create an empty array and clear old records from table
    textNode = new Array();
    clearTable();
    
    //create tr and td node and append text node to it
    for (i = 0; i < rankArray.length; i = i + 1) {
        //create one tr element for each array row
        tr = document.createElement("tr");
        
        textNode[0] = document.createTextNode(rankArray[i].username);
        textNode[1] = document.createTextNode(rankArray[i].points);
        textNode[2] = document.createTextNode(rankArray[i].rank);
        textNode[3] = document.createTextNode(rankArray[i].date);
        
        //create 4 tdata element for each row
        for (j = 0; j < 4; j = j + 1) {
            td = document.createElement("td");
            td.appendChild(textNode[j]);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

//step one page back/next and refresh table
function stepScore(direction) {
    'use strict';
    var boxPage, parsedValue;
    boxPage = document.getElementsByName("npage")[0];
    //get page number
    parsedValue = parseInt(boxPage.value);
    
    //if direction is next increment page number, else decrement
    parsedValue = ((direction === 'next') ? parsedValue + 1 : parsedValue - 1);
    
    //if page number is not valid
    if (!checkPageNumber(parsedValue)) {
        //set to 1
        boxPage.value = "1";
        return;
    }
    
    //assign new value to page number input and refresh
    boxPage.value = parsedValue;
    refreshScore();
}

//disable distinct checkbox if myrank is selected
function checkBoxChangeState() {
    'use strict';
    var checkBox = document.forms[3].elements[3];
    checkBox.disabled = !checkBox.disabled;
    checkBox.checked = false;
}