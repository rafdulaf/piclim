<?php
    include '../src/authentication.php';

    function sendUserInfo()
    {
        echo "{ authenticated: true, login: '" . $_SESSION['user'] . "' }";
    }

    session_start();
    if(!isset($_SESSION['user']))
    {
        if(isset($_REQUEST['login']) && isset($_REQUEST['password']) && check_login($_REQUEST['login'], $_REQUEST['password']))
        {
            $_SESSION['user'] = $_REQUEST['login'];
            sendUserInfo();
        }
        else
?>
            { authenticated: false }
<?php
    }
    else
    {
        sendUserInfo();
    }
?>
    