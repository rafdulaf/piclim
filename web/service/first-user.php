<?php
    include '../../src/utils.php';

    if (!isUserBaseInitialized())
    {
    	$success = false;
    	if (isset($_REQUEST['login']))
    	{
    		$fullname = $_REQUEST['fullname'];
    		$login = $_REQUEST['login'];
    		$password = $_REQUEST['password'];
       		$email = $_REQUEST['email'];
       	
       		$success = createUser($login, $password, $fullname, $email);
    	}
   		echo "{ success: " . serialize($success) . " }";
    }
    else
    {
    	echo "{ error: true }";
    }
?>
    