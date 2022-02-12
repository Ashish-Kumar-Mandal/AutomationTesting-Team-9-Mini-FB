<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
	
session_start();
require "dbc.php";

	if(isset($_SESSION['session_id'])){
		$login_id = $_SESSION['session_id'];
		
		$query = mysqli_query($dbc, "SELECT DISTINCT * FROM users WHERE (usr_id IN (SELECT request_id FROM friends WHERE status=1 AND login_id='$login_id')) OR (usr_id IN (SELECT login_id FROM friends WHERE status=1 AND request_id='$login_id'))");

		if(mysqli_num_rows($query) > 0){
			while ($row = mysqli_fetch_all($query, MYSQLI_ASSOC)) {
				$response['allFriend'] = $row;
			}
			$response['status'] = true;
		}else{
			$response['status'] = "false";
			$response['message'] = "No any Friends";
		}

	}else{
		$response['status'] = "exit";
		$response['message'] = "You have not Autherized user ";
	}
	echo json_encode($response);

?>