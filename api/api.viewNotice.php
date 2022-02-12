<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

session_start();
require "dbc.php";

	if(isset($_SESSION['session_id'])){
		$usr_id = $_SESSION['session_id'];

		$qry = mysqli_query($dbc, "SELECT * FROM notices ORDER BY ntc_id DESC LIMIT 20");
		
		if(mysqli_num_rows($qry) > 0){
			while ($row = mysqli_fetch_all($qry, MYSQLI_ASSOC)) {
				$response['notice'] = $row;
			}
			$response['status'] = true;
		}else{
			$response['status'] = false;
			$response['message'] = "&#9888; Data Not Found";
		}
	}else{
		$response['status'] = "exit";
		$response['message'] = "You have not Autherized user ";
	}
	echo json_encode($response);
?>