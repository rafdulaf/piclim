<?php
    session_start();
    if(!isset($_SESSION['user']))
    {
?>
        { authenticated: false }
<?php
    }
    else
    {
?>
        { authenticated: true }
<?php
    }
?>
    