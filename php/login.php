<?php
//include db manager class and instance & session important function
require_once "dbmanager.php";
require_once "session.php";

//filter user input to prevent code injection
if(isset($_POST['email']) && isset($_POST['password'])) {
    $email = addslashes(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
    $password = addslashes(filter_var($_POST['password'], FILTER_SANITIZE_STRING));
    $password = md5($password);
} else {
    echo '{"error":true, "message":"No value inserted"}';
    die(-1);
}
    

//login with email and password credential and test if there is an error
$error = login($email, $password);
if($error === null) {
    //if error == null, login occur successful, check first access boolean and return username to show
    $first_access = ((getUserInfo($_SESSION['userId'], 1) == 0) ? false : true);
    echo '{"error":false, "message":"Login occur successful", "name": "' . $_SESSION['name'] . '", "firstaccess": "' . $first_access . '"}';
    exit(0);
} else {
    //if error != null, create json object and include error message inside
    echo '{"error":true, "message":"' . $error . '"}';
    die(-1);
}

//login user with email and password supplied
function login($email, $password) {   
    if ($email != null && $password != null) {
        //if email and password are not null, try to authenticate the user
        $userId = authenticate($email, $password);
        if ($userId) {
            //if user logged with success, obtain his name, start a PHP session and return null.
            $name = getUserInfo($userId);
            session_start();
            setSessionArray($email, $userId, $name);
            return null;
        }
    } else {
        //password or email are empty, maybe they aren't pass filter var control
        return "No value inserted";
    }
    return "Username or password are not valid. Try again";
}

//authenticate an user by his email and his password
function authenticate ($email, $password) {   
    global $myDatabase;

    //prepare query string
    $queryString = "SELECT * FROM user WHERE email = '" . $email . "' AND password='" . $password . "'";
    //send query
    $myresult = $myDatabase->sendQuery($queryString);
    
    if ($myresult->num_rows != 1)
        return false;
    
    //get selected user row and return his userid
    $user = $myresult->fetch_assoc();
    
    //close connection to DB.
    $myDatabase->closeConnection();

    return $user['userId'];
}

//flag is setted defaul to 0, to return username, if != 0 return first_access boolean
//in next implementation flag can be set to obtain not only 2 information
function getUserInfo ($userId, $flag = 0) {   
    global $myDatabase;

    $queryString = "SELECT * FROM user WHERE userId = " . $userId;
    $myresult = $myDatabase->sendQuery($queryString);
    
    if ($myresult->num_rows != 1)
        return false;
    
    //get selected user row and return his name
    $user = $myresult->fetch_assoc();
    
    //close connection to DB.
    $myDatabase->closeConnection();
    
    if (!$flag) {
        return $user['username'];
    } else {
        return $user['first_access'];
    }
}

?>