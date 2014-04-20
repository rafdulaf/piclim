<?php 
	include 'utils.php';
	
	if (getCurrentUser() == null)
	{
		echo "{ failure: " . var_dump($_SESSION) . " }";
		exit;
	}
?>
