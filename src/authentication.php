<?php 
	include 'utils.php';
	
	echo $_SESSION['user'];
	if (getCurrentUser() == null)
	{
		echo "{ failure: true }";
		exit;
	}
?>
