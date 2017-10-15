<?php

//scoresumbit php : contains php script to submit score to server
require_once "../../php/dbmanager.php";
require_once "../../php/session.php";

session_start();

if (!isUserLogged()) {
    echo '{"error":true, "message":"You can\'t submit score if you aren\'t registered!"}';
    die(-1);
}

if (!isset($_POST['score'])) {
    //error: score is not set
    echo '{"error":true, "message":"Problem with your score points."}';
    die(-1);
}

$queryString = "INSERT INTO score(userId, points, date) VALUES (" . getUserId() . ", " . $_POST['score'] . ", CURDATE());";

global $myDatabase;
$myresult = $myDatabase->sendQuery($queryString);
$myDatabase->closeConnection();

if (!$myresult) {
    echo '{"error":true, "message":"There are some problem with your request, please try again later!"}';
    die(-1);
}

echo '{"error":false, "message":"Score submitted"}';
exit(0);