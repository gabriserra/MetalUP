<?php
//include db manager class and instance & session important function
require_once "dbmanager.php";
require_once "session.php";

session_start();

//if user has logged and newpassword is set he's trying to change password
if (isUserLogged() && isset($_POST['newpassword'])) {
    $password = addslashes(filter_var($_POST['newpassword'], FILTER_SANITIZE_STRING));
    $password = md5($password);
    setPassword($password, getUserEmail(), 0);
    echo '{"error":false, "message":"Password changed"}';
    exit(0);
} else if (isUserLogged()) {
    //he can't recover password!
    echo '{"error":true, "message":"You can\'t recover password \'cause you are already logged!"}';
    die(-1);
}

//filter user input to prevent code injection
if(isset($_POST['email'])) {
    $email = addslashes(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
} else {
    echo '{"error":true, "message":"Insert your mail!"}';
    die(-1);
}

//if sanitize is failed, return a JSON object and die
if ($email == false) {
    echo '{"error":true, "message":"Problem with email, check it"}';
    die(-1);
}

//if user email is not in database, return a JSON object and die
if (!isUserRegistered($email)) {
    echo '{"error":true, "message":"This mail isn\'t in our database!"}';
    die(-1);
}

//generate a random string and send to email
forget($email, generateString());

//generate random string, default is 8 char lenght, and only alphanumeric for ease
function generateString($length = 8) {
    $randomString = "";
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $baseStringLength = strlen($characters);
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $baseStringLength - 1)];
    }
    return $randomString;
}

function forget($email, $rand) {
    $password = md5($rand);
    setPassword($password, $email, 1);
        
    //Random email domain
    $header = "From: webmaster@metalup.tv";
    
    //PHP EMAIL SENDER MUST CONFIGURE!
    $sended = mail($email, "Metal UP: password recover", "Here is new password: " . $rand . ", please change at your first access", $header);
    if (!$sended) {
        echo '{"error":true, "message":"Server error sending mail, re-try!"}';
        die(-1);
    }
    
    echo '{"error":false, "message":"Complete: check your inbox email"}';
    exit(0);
}

function setPassword($password, $email, $access) {
    $queryString = "UPDATE user SET first_access = " . $access . ", password = '" . $password . "' WHERE  email = '" . $email . "';";
    
    //retrieve mydatabase variable and send query
    global $myDatabase;
    $myresult = $myDatabase->sendQuery($queryString);
    $myDatabase->closeConnection();
    
    //if myresult is empty, there was some problem
    if (!$myresult) {
        echo '{"error":true, "message":"There are some problem with your request, please try again!"}';
        die(-1);
    }
}

//isUserRegistered: return boolean
//send a query to database and check if an email is already in DB
function isUserRegistered($email) {
    global $myDatabase;
    
    $queryString = "SELECT * FROM user WHERE email = '" . $email . "'";
    $myresult = $myDatabase->sendQuery($queryString);
    $myDatabase->closeConnection();
    
    if ($myresult->num_rows == 0)
        return false;
    return true;
}