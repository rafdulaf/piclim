<?php
    include '../../src/utils.php';

    if (getCurrentUser() == null 
        && (!isset($_REQUEST['login']) 
        	|| (!isset($_REQUEST['password']) && !isset($_REQUEST['remember_token'])) 
        	|| (isset($_REQUEST['password']) && isset($_REQUEST['remember_token'])) 
        	|| (isset($_REQUEST['password']) && login($_REQUEST['login'], $_REQUEST['password'], $_REQUEST['remember']) == false)
			|| (isset($_REQUEST['remember_token']) && loginByToken($_REQUEST['login'], $_REQUEST['remember_token']) == false)))
    {
            echo "{ authenticate: false }";
    }
    else
    {
        $user = getCurrentUser();
        
        global $TEMP_COLORS;
        echo "{ authenticate: true, login: '" . $user['login'] . "', email: '" . $user['email'] . "', fullname: '" . $user['fullname'] . "', remember_token:'" . $user['remember_token'] . "', temperatures: ".json_encode($TEMP_COLORS)." }";
    }
?>
    