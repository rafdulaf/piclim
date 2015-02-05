<?php
    include '../sonde.php';
    include '../sql.php';
    
    $temps = getTemperatures();
    
    $sql = "INSERT INTO Temperatures(";
    
    $i = 1;
    foreach ($temps as $temp)
    {
    	if ($i != 1)
    	{
    		$sql .= "," ;
    	}
    	
    	$sql .= "temperature_".$i++;
    }
    
    $sql .= ") VALUES (";

    $i = 1;
    foreach ($temps as $temp)
    {
    	if ($i != 1)
    	{
    		$sql .= "," ;
    	}
    	 
    	$sql .= ":temperature_".$i++;
    }
    
    $sql .= ");";
    
    $values = array();
    $i = 1;
    foreach($temps as $temp=>$value)
    {
    	$values[":temperature_".$i++] = intval($value*10);
    }
    
    _sql($sql, $values);
?>