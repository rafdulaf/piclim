<?php
    include '../../src/sonde.php';
    include '../../src/sql.php';
    
    $temps = getTemperatures();
    
    $sql = "INSERT INTO Temperatures(";
    
    $i = 1;
    foreach ($temps as $temp)
    {
    	if ($i != 0)
    	{
    		$sql .= "," ;
    	}
    	
    	$sql .= "temperature_".$i++;
    }
    
    $sql .= ") VALUES (";

    $i = 1;
    foreach ($temps as $temp)
    {
    	if ($i != 0)
    	{
    		$sql .= "," ;
    	}
    	 
    	$sql .= ":temperature_".$i++;
    }
    
    $sql .= ");";
    
    $values = array();
    $i = 1;
    foreach($temps as $temp)
    {
    	$values[":temperature_".$i++] = $temp;
    }
    
    _sql($sql, $values);
?>