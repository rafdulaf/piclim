<?php
	// Current path
	$CURRENT_PATH = realpath(dirname(__FILE__));
	include $CURRENT_PATH.'/../sonde.php';

	function temperaturesJSON()
	{
		// Current path
		$CURRENT_PATH = realpath(dirname(__FILE__));
		
		// Remove existing file if necessaddd
		// Create new export
		$cmd = "rrdtool xport --start -300800 --end now --json ";
		
		$temperatures = getTemperatures();
		$i = 1;
		foreach ($temperatures as $name => $temp)
		{
			$cmd .= "DEF:min_".$i."=".$CURRENT_PATH."/temperatures.rrd:temp_".$name.":MIN ";
			$cmd .= "DEF:avg_".$i."=".$CURRENT_PATH."/temperatures.rrd:temp_".$name.":AVERAGE ";
			$cmd .= "DEF:max_".$i."=".$CURRENT_PATH."/temperatures.rrd:temp_".$name.":MAX ";
			
			$cmd .= "XPORT:min_".$i.":MIN_".$name." ";
			$cmd .= "XPORT:avg_".$i.":AVG_".$name." ";
			$cmd .= "XPORT:max_".$i.":MAX_".$name." ";
				
			$i++;
		}
		
		return shell_exec($cmd);
	}
?>
