<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
	
session_start();
require "dbc.php";

	if(isset($_SESSION['session_id'])){
		$login_id = $_SESSION['session_id'];
		$request_id = $_POST['request_id'];

		/* check all friends-id in this table */
		$qry = mysqli_query($dbc, "SELECT * FROM friends WHERE (login_id='$login_id' AND request_id='$request_id') OR (login_id='$request_id' AND request_id='$login_id')");

		if(mysqli_num_rows($qry) > 0){
			/* query for delete friend request */
			$query = mysqli_query($dbc, "DELETE FROM friends WHERE (login_id='$request_id' AND request_id='$login_id' AND status=0)");
			if($query){
				$response['status'] = true;
				$response['message'] = "Friend request deleted successfully";
			}else{
				$response['status'] = false;
				$response['message'] = "Processing failed";
			}			
		}else{
			$response['status'] = false;
			$response['message'] = "Already unfriend";
		}
	}else{
		$response['status'] = "exit";
		$response['message'] = "You have not Autherized user ";
	}
	echo json_encode($response);

?>