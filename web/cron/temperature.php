<?php
    include '../../src/sonde.php';
    include '../../src/sql.php';
    
    $temp = getTemperature();
    
    _sql("INSERT INTO Temperatures(temperature) VALUES(:temperature)", array(':temperature'=>($temp*10)));
?>