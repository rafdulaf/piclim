<?php 
	include 'utils.php';
	
	if (getCurrentUser()['login'] == null)
	{
		echo "{ failure: " . getCurrentUser()['login'] . " }";
		exit;
	}
?>
