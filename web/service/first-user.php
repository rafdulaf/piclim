<?php
    include '../../src/utils.php';

    if (!isUserBaseInitialized())
    {
    	if (isset($_REQUEST['login']))
    	{
    		$fullname = $_REQUEST['fullname'];
    		$login = $_REQUEST['login'];
    		$password = $_REQUEST['password'];
       		$email = $_REQUEST['email'];
       	
       		createUser($login, $password, $fullname, $email);
	   		echo "{ success: true }";
    	}
    	else
    	{
	   		echo "{ success: false }";
    	}
    }
    else
    {
    	echo "{ error: true }";
    }
?>
    