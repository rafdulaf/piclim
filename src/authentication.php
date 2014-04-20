<?php 
	include 'utils.php';
	
	if (getCurrentUser() == null)
	{
		echo "{ failure: true, aa: " . $_SESSION['user'] . " }";
		exit;
	}
?>
