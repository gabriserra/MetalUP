<?php

//getscore php : contains php script to get rank from database
//require php script page once or throw an error
require_once "dbmanager.php";
require_once "session.php";

//start a session to check if user is already logged
session_start();

//rank is available only to registered user
if (!isUserLogged()) {
    echo '{"error":true, "message":"You can\'t view score page if you aren\'t registered!"}';
    die(-1);
}

//prepare query to get rank
$queryString = "SELECT U.username, S.points, S.rank, S.date FROM user U INNER JOIN (SELECT T1.userId, T1.points, T1.date, COUNT(*) As rank FROM score T1 CROSS JOIN score T2 WHERE T1.points <= T2.points";

//if distinct checkbox is checked
if (isset($_POST['distinct'])) {
    //count only highest score of player!
    $queryString = $queryString . " AND T1.points = (SELECT MAX(points) FROM score T3 WHERE T1.userId = T3.userId) AND T2.points = (SELECT MAX(points) FROM score T4 WHERE T2.userId = T4.userId)";
}

$queryString = $queryString . " GROUP BY T1.userId, T1.points, T1.date) AS S  ON U.userId = S.userId";

//if ranktype radio is set and checked on myrank option
if ((isset($_POST['ranktype'])) && ($_POST['ranktype'] == 'myrank')) {
    //exclude other player rank
    $queryString = $queryString . " WHERE U.userId = " . getUserId();
}

//show 10 result per page
$upperLimit = 10;

//if npage text input is set and is not 0
if (isset($_POST['npage']) && intval($_POST['npage']) != 0) {
    //limit result to correct page
    $lessLimit = (intval($_POST['npage']) - 1) * 10;
} else {
    //in case of error, show only first page of rank
    $lessLimit = 0;
}

$queryString = $queryString . " ORDER BY S.rank ASC LIMIT " . $lessLimit . ", " . $upperLimit;
    
//retrieve mydatabase variable and send query
global $myDatabase;
$myresult = $myDatabase->sendQuery($queryString);
$myDatabase->closeConnection();

//if myresult is null there was problem with query
if (!$myresult) {
    echo '{"error":true, "message":"There are some problem with your request, please try again later!"}';
    die(-1);
//if query was successfull but is composed of 0 row, it was required an empty page
} else if (mysqli_num_rows($myresult) === 0) {
    echo '{"error":false, "message":"No result retrieved", "rank":[{"username":"Still empty page", "points":0, "rank":"N", "date":""}]}';
    exit(0);
}

//build a JSON object with a rank array
$rankJson = '{"error":false, "message":"Rank retrieved with success", "rank":[';
for($i = 0; $i < mysqli_num_rows($myresult); $i++) {
    $row = $myresult->fetch_array(MYSQLI_ASSOC);
    $append = '{"username":"' . $row["username"] . '"';
    $append = $append . ',"points":' . $row["points"] . '';
    $append = $append . ',"rank":' . $row["rank"] . '';
    $append = $append . ',"date":"' . $row["date"] . '"';
    $rankJson = $rankJson . $append . '},';
}

//remove last comma char
$rankJson = substr($rankJson, 0, -1);
$rankJson = $rankJson . ']}';

//everything was successfull, return a JSON object with rank and exit
echo $rankJson;
exit(0);