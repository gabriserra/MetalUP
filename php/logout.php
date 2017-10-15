<?php
//is SESSION is not set, start it
if (!isset($_SESSION)) {
    session_start();
} else {
    //else assign an empty array
    $_SESSION = array();
}

//destroy session
session_destroy();
//return to index page
echo "Logout completed";
//readdress to calling page
header("Location: " . $_SERVER['HTTP_REFERER']);
exit;

?>
