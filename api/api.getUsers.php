<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
	
session_start();
require "dbc.php";

	if(isset($_SESSION['session_id'])){
		$login_id = $_SESSION['session_id'];
		
		$query = mysqli_query($dbc, "SELECT * FROM users WHERE usr_id!='$login_id' AND usr_id NOT IN (SELECT login_id FROM friends) AND usr_id NOT IN (SELECT request_id FROM friends)");

		if(mysqli_num_rows($query) > 0){
			while ($row = mysqli_fetch_all($query, MYSQLI_ASSOC)) {
				$response['allUser'] = $row;
			}
			$response['status'] = true;
		}else{
			$response['status'] = "false";
			$response['message'] = "No other users";
		}

	}else{
		$response['status'] = "exit";
		$response['message'] = "You have not Autherized user ";
	}
	echo json_encode($response);

?>