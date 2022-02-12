<?php
	$host = 'localhost';
	$user = 'root';
	$password = '';
	$database = 'automation_testing';

	$dbc = new mysqli($host, $user, $password, $database);

	if(!$dbc){
		echo "Database connection failed! ";
	}
?>