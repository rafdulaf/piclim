<?php
    include '../src/authentication.php';

    if (get_current_user() == null || (isset($_REQUEST['login']) && isset($_REQUEST['password']) && login($_REQUEST['login'], $_REQUEST['password']) == false))
    {
            echo "{ authenticate: false }";
    }
    else
    {
        $user = get_current_user();
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
    