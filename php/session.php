<?php
//setSessionArray: return void;
//set superglobal $_SESSION array with userId and email of logged user
function setSessionArray($email, $userId, $name) {
    $_SESSION['userId'] = $userId;
    $_SESSION['email'] = $email;
    $_SESSION['name'] = $name;
}

//isUserLogged: return userId || return false
//check if user is logged in and return his Id or false instead
function isUserLogged() {		
    if(isset($_SESSION['userId']) && isset($_SESSION['email'])) {
        return $_SESSION['userId'];
    } else {
        return false;
    }
}

//getUserId: return userId || return null
//return user id of logged user
function getUserId() {
    return $_SESSION['userId'];
}

//getUserEmail: return userEmail || return null
//return user email of logged user
function getUserEmail() {
    return $_SESSION['email'];
}

?>