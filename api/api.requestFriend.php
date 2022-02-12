<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
	
session_start();
require "dbc.php";

	if(isset($_SESSION['session_id'])){
		$login_id = $_SESSION['session_id'];
		$request_id = $_POST['request_id'];	

		/* check this id in friends table */
		$qry = mysqli_query($dbc, "SELECT * FROM friends WHERE (login_id='$login_id' AND request_id='$request_id') OR (login_id='$request_id' AND request_id='$login_id')");

		if(mysqli_num_rows($qry) > 0){
			$response['status'] = false;
			$response['message'] = "Friend request already sent";			
		}else{
			/* query for sent new friend request */
			$query = mysqli_query($dbc, "INSERT INTO friends (login_id, request_id, status) VALUES ('$login_id', '$request_id', 0)");
			if($query){
				$response['status'] = true;
				$response['message'] = "Friend request sent";
			}else{
				$response['status'] = false;
				$response['message'] = "Friend request failed";
			}
		}
	}else{
		$response['status'] = "exit";
		$response['message'] = "You have not Autherized user ";
	}
	echo json_encode($response);

?>