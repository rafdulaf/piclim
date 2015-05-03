<?php
    include '../../src/authentication.php';

    include '../../src/graph/temperatures.php';
    
    echo temperaturesJSON($_REQUEST['startDate'], $_REQUEST['endDate']);
?>
