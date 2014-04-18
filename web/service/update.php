<?php
    include '../../src/authentication.php';

    $result = update();
    
    echo "{ result: '" . $result . "' }";
?>
