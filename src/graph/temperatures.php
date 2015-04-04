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
        foreach ($SONDES as $name => $Sonde)
		{
			$cmd .= _temperaturesJSON($i, $name);
			$i++;
		}
		$cmd .= _temperaturesJSON($i, "out");

		$val = shell_exec($cmd);
		$val = str_replace($val, 'data', '"data"');
		$val = str_replace($val, 'about', '"about"');
		$val = str_replace($val, 'meta', '"meta"');
		$val = str_replace($val, 'start', '"start"');
		$val = str_replace($val, 'step', '"step"');
		$val = str_replace($val, 'end', '"end"');
		$val = str_replace($val, 'legend', '"legend"');
		return $val;
	}
?>
