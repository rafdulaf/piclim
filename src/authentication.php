<?php 
	include 'utils.php';
	
	if (getCurrentUser() == null)
	{
		header("HTTP/1.0 403 Forbidden" );
		exit;
	}
?>
