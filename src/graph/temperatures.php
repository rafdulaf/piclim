<?php
	// Current path
	$CURRENT_PATH = realpath(dirname(__FILE__));
	include $CURRENT_PATH.'/../config.php';

	function _temperaturesJSON($i, $name)
	{
		// Current path
		$CURRENT_PATH = realpath(dirname(__FILE__));

		$cmd = "";
		
		$cmd .= "DEF:min_".$i."=".$CURRENT_PATH."/temperatures.rrd:temp_".$name.":MIN ";
		$cmd .= "DEF:avg_".$i."=".$CURRENT_PATH."/temperatures.rrd:temp_".$name.":AVERAGE ";
		$cmd .= "DEF:max_".$i."=".$CURRENT_PATH."/temperatures.rrd:temp_".$name.":MAX ";
			
		$cmd .= "XPORT:min_".$i.":MIN_".$name." ";
		$cmd .= "XPORT:avg_".$i.":AVG_".$name." ";
		$cmd .= "XPORT:max_".$i.":MAX_".$name." ";
		
		return $cmd;
	}
	
	function temperaturesJSON()
	{
		global $SONDES;
		
		// Create new export
		$cmd = "rrdtool xport --start -300800 --end now --json ";
		
		$i = 1;
        foreach ($SONDES as $Name => $Sonde)
		{
			$cmd .= _temperaturesJSON($i, $name);
			$i++;
		}
		$cmd .= _temperaturesJSON($i, "out");
		
		return shell_exec($cmd);
	}
?>
