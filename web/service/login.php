<?php
    include '../../src/utils.php';

    if (getCurrentUser() == null 
        && ((!isset($_REQUEST['login']) || !isset($_REQUEST['password'])) 
            || (isset($_REQUEST['login']) && isset($_REQUEST['password']) && login($_REQUEST['login'], $_REQUEST['password']) == false)))
    {
            echo "{ authenticate: false }";
    }
    else
    {
        $user = getCurrentUser();
        echo "{ authenticate: true, login: '" . $user['login'] . "', email: '" . $user['email'] . "', fullname: '" . $user['fullname'] . "' }";
    }
?>
    