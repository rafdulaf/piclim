<?php
    include '../../src/authentication.php';

    include '../../src/graph/temperatures.php';
    
    echo temperaturesJSON($_REQUEST['fromDate'], $_REQUEST['toDate']);
?>
