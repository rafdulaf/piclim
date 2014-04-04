<?php
    include '../../src/utils.php';

    if (!isUserBaseInitialized())
    {
    	$success = false;
    	if (isset($_REQUEST['login']))
    	{
    		$login = $_REQUEST['login'];
    		$password = $_REQUEST['password'];
       		$email = $_REQUEST['email'];
       	
       		$success = createUser($login, $password, $email);
    	}
   		echo "{ success: " . $success . " }";
    }
    else
    {
    	echo "{ error: true }";
    }
?>
    