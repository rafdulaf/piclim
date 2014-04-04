<?php
    include '../../src/utils.php';

    if (!isUserBaseInitialized())
    {
    	$success = false;
    	if (isset($_POST['login']))
    	{
    		$fullname = $_POST['fullname'];
    		$login = $_POST['login'];
    		$password = $_POST['password'];
       		$email = $_POST['email'];
       	
       		$success = createUser($login, $password, $fullname, $email);
    	}
   		echo "{ success: " . $success . " }";
    }
    else
    {
    	echo "{ error: true }";
    }
?>
    