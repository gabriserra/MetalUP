<?php

//signup php : contains php script to add user in DB
//require php script page once or throw an error
require_once "dbmanager.php";
require_once "session.php";

//start a session to check if user is already logged
session_start();

//if user is already logged, return a JSON object and die
if (isUserLogged() != false) {
    echo '{"error":true, "message":"You are already registered!"}';
    die(-1);
}

//if one or more required field are not set, return a JSON object and die
if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['password'])) {
    echo '{"error":true, "message":"Some field are empty!"}';
    die(-1);
}

//sanitize input to prevent code injection and try to strip HTML tags
//and addshashes to escape " ' character in query
$name = addslashes(filter_var($_POST['name'], FILTER_SANITIZE_STRING));
$email = addslashes(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL));
$password = addslashes(strip_tags($_POST['password']));
$password = md5($password);
$bio = addslashes(strip_tags($_POST['bio']));

//if sanitize is failed, return a JSON object and die
if ($name == false || $email == false) {
    echo '{"error":true, "message":"Problem with name or email, try changing them"}';
    die(-1);
}

//if user email is already in database, return a JSON object and die
if (isUserRegistered($email)) {
    echo '{"error":true, "message":"This mail is already present in our database!"}';
    die(-1);
}

//use global database connection and prepare query string
global $myDatabase;
$queryString = "INSERT INTO `user` (`username`, `email`, `password`, `bio`)";
$queryString = $queryString . " VALUES ('" . $name . "', '" . $email . "', '" . $password . "', '" . $bio . "')";
//send query and close connection
$myresult = $myDatabase->sendQuery($queryString);
$myDatabase->closeConnection();

//if myresult is empty, there was some problem
if (!$myresult) {
    echo '{"error":true, "message":"There are some problem with your registration, please try again later!"}';
    die(-1);
}

//else registration was successfull, create a JSON object and exit php script
echo '{"error":false, "message":"Sign up successful!", "name":"' . $name . '"}';
exit(0);

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

?>