<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

session_start();
require "dbc.php";


	if(isset($_POST['mob'])){
		$mob = $_POST['mob'];
		$pass = md5($_POST['pass']);

		$qry = mysqli_query($dbc, "SELECT * FROM users WHERE mobile='$mob' AND password='$pass'");

		if(mysqli_num_rows($qry) > 0){
			while ($row = mysqli_fetch_assoc($qry)) {
				$response['user'] = $row;
			}
			/* remove previous session */
			session_unset(); 
			$_SESSION['session_id'] = $response['user']['usr_id'];	//create session id
			$_SESSION['session_name'] = $response['user']['name'];	//create session name

			$response['status'] = true;
			$response['message'] = "Logedin Successfully";
		}else{
			$response['status'] = false;
			$response['message'] = "Mobile and Password are not matched!";
		}
		echo json_encode($response);
	}


?>