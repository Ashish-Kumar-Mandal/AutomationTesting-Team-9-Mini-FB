<?php
session_start();
require "dbc.php";

if(!isset($_SESSION["session_id"])){
	header("Location: ../");
	die();
}

session_unset(); 
session_destroy();
header("location: ../");
mysqli_close($dbc);
die();

?>