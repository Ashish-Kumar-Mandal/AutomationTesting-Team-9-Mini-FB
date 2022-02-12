<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

session_start();
require "dbc.php";

	if(isset($_SESSION['session_id'])){
		$usr_id = $_SESSION['session_id'];
		$notice = $_POST['notice'];

		$qry = mysqli_query($dbc, "INSERT INTO notices (notice, usr_id) VALUES ('$notice', '$usr_id')");
		if($qry){
			$response['status'] = true;
			$response['message'] = "Notice Published ✔";
		}else{
			$response['status'] = false;
			$response['message'] = "Something went wrong!";
		}
	}else{
		$response['status'] = "exit";
		$response['message'] = "You have not Autherized user ";
	}
	echo json_encode($response);
?>