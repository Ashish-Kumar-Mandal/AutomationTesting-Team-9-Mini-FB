<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

require "dbc.php";

	if(isset($_POST['mobile'])){
		$name = $_POST['name'];
		$mobile = $_POST['mobile'];
		$email = $_POST['email'];
		$password = md5($_POST['password']);

		$qry = mysqli_query($dbc, "SELECT * FROM users WHERE mobile='$mobile'");

		if(mysqli_num_rows($qry) > 0){
			$response['status'] = false;
			$response['message'] = "Try another mobile number!";
		}else{
			$qry = mysqli_query($dbc, "INSERT INTO users (name, mobile, email, password) VALUES ('$name', '$mobile', '$email', '$password')");
			if($qry){
				$response['status'] = true;
				$response['message'] = "Register successfully";
			}else{
				$response['status'] = false;
				$response['message'] = "Something went wrong!";
			}
		}
		echo json_encode($response);
	}


?>