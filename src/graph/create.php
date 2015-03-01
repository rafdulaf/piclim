<?php
	include '../sonde.php';

	$MIN_TEMPERATURE=-60;
	$MAX_TEMPERATURE=60;
	$STEP=5*60; // every 5 minutes
	
	$cmd = "rrdtool create temperatures.rrd --step $STEP ";
	$cmd .= "DS:temp_out:GAUGE:.".($STEP*2).".:$MIN_TEMPERATURE:$MAX_TEMPERATURE ";
	
	$temperatures = getTemperatures();
	foreach ($temperatures as $name => $temp)
	{
		$cmd .= "DS:temp_".$name.":GAUGE:.".($STEP*2).".:$MIN_TEMPERATURE:$MAX_TEMPERATURE ";
	}
	
	// Remember every 5 minutes during 7 days (7*24*60/5)
	$cmd .= "RRA:MIN:0.5:1:2016 RRA:AVERAGE:0.5:1:2016 RRA:MAX:0.5:1:2016 "; 
	// Remember every 1 hour (12*5 minutes) during 30 days (30*24)
	$cmd .= "RRA:MIN:0.5:12:720 RRA:AVERAGE:0.5:12:720 RRA:MAX:0.5:12:720 "; 
	// Remember every day (24 * 12*5 minutes) during 5 years (365*5)
	$cmd .= "RRA:MIN:0.5:288:1825 RRA:AVERAGE:0.5:288:1825 RRA:MAX:0.5:288:1825 ";

	echo($cmd);
	echo("\n");
	echo(shell_exec($cmd));
?>