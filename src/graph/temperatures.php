<?php
	include '../sonde.php';

	function temperaturesJSON()
	{
		// Current path
		$CURRENT_PATH = realpath(dirname(__FILE__));
	
		// Remove existing file if necessary
		unlink($CURRENT_PATH."/temperatures.xml");
		
		// Create new export
		$cmd = "rrdtool xport --start -300800 --end now --json ";
		
		$temperatures = getTemperatures();
		$i = 1;
		foreach ($temperatures as $name => $temp)
		{
			$cmd .= "DEF:min_".$i."=temperatures.rrd:".$name.":MIN ";
			$cmd .= "DEF:avg_".$i."=temperatures.rrd:".$name.":AVG ";
			$cmd .= "DEF:max_".$i."=temperatures.rrd:".$name.":MAX ";
			
			$cmd .= "XPORT:min_".$i.":MIN_".$name." ";
			$cmd .= "XPORT:avg_".$i.":AVG_".$name." ";
			$cmd .= "XPORT:max_".$i.":MAX_".$name." ";
				
			$i++;
		}
		
//		"rrdtool xport --start -300800 --end now --json DEF:x1=temperatures.rrd:temp_salon:MIN DEF:x2=temperatures.rrd:temp_salon:AVERAGE DEF:x3=temperatures.rrd:temp_salon:MAX DEF:y1=temperatures.rrd:temp_out:MIN DEF:y2=temperatures.rrd:temp_out:AVERAGE DEF:y3=temperatures.rrd:temp_out:MAX XPORT:x1:salonMin XPORT:x2:salonAvg XPORT:x3:salonMax XPORT:y1:outMin XPORT:y2:outAvg XPORT:y3:outMax > temperatures.json";
		shell_exec($cmd);
	}
?>
