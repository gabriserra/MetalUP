<?php
//include php script file with db access name and credential
require "dbcredential.php";

//istance of database manager
$myDatabase = new dbManager();

class dbManager {
    
    private $myconnection = null;
    
    //construct for dbManager class
    function __construct() {
        $this->newConnection();
    }
    
    //create new dabatase connection
    function newConnection() {
        global $dbUsername;
        global $dbPassword;
        global $dbName;
        global $dbHost;

        //create new connection and die in case of error
        $this->myconnection = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
        if ($this->myconnection->connect_error) {
            echo("Can't connect to db, error " . $this->myconnection->connect_errno . ": " . $this->myconnection->connect_error);
            die(-1);
        }
    }
    
    //check if db is currently connected (if MYSQL:RECONNECT = TRUE in php.ini try to reconnect)
    function isConnected() {
        if ($this->myconnection == null) {
            return false;
        } else {
            return $this->myconnection->ping();
        }
    }

    //send query string to db
    function sendQuery($queryString) {
        if (!$this->isConnected()) {
            $this->newConnection();
        }
        return $this->myconnection->query($queryString);
    }
        
    //close database connection
    function closeConnection() {
        $this->myconnection->close();
        $this->myconnection = null;
    }
}

?>