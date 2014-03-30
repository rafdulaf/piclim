<?php
    include '../../src/utils.php';

    header("Access-Control-Allow-Origin: *");

    if (getCurrentUser() == null 
        && ((!isset($_REQUEST['login']) || !isset($_REQUEST['password'])) 
            || (isset($_REQUEST['login']) && isset($_REQUEST['password']) && login($_REQUEST['login'], $_REQUEST['password']) == false)))
    {
            echo "{ authenticate: false }";
    }
    else
    {
        $user = getCurrentUser();
        if ($user == null)
        {
	        echo "{ initialized: false }";
        }
        else
        {
            echo "{ authenticate: true, login: '" . $user['login'] . "', email: '" . $user['email'] . "', fullname: '" . $user['fullname'] . "' }";
        }
    }
?>
    