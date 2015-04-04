<?php
    include '../../src/authentication.php';

    include '../../src/graph/temperatures.php';
    
    ini_set('display_errors',1);
    ini_set('display_startup_errors',1);
    error_reporting(-1);
    
    
    echo "jeronimo";
    echo temperaturesJSON();
    echo "jeronimo2";
?>
