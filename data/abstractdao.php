<?php
//php5 nodig
require_once("dbconfig.php"); //connectiegegevens

abstract class AbstractDAO{
	
	public function createConnection(){
		$db = mysqli_connect(DBConfig::$host, DBConfig::$dbUser,DBConfig::$dbPassw,DBConfig::$dbName);
		
		return $db;
	}

}



?>