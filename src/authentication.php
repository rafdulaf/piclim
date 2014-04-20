<?php 
	include 'utils.php';
	
	$user = getCurrentUser();
	if ($user == null)
	{
		echo "{ failure: " . $user['login'] . " }";
		exit;
	}
?>
