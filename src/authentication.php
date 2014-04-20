<?php 
	include 'utils.php';
	
	if (getCurrentUser() == null)
	{
		echo "{ failure: true }";
		exit;
	}
?>
