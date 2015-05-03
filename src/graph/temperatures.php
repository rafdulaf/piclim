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
	
	function temperaturesJSON($startDate, $endDate)
	{
		global $SONDES;
		
		// Let us export at the json format
		$cmd = "rrdtool xport --start ".(3600*24*365*5)." --end now --json ";
		
		$i = 1;
        foreach ($SONDES as $name => $Sonde)
		{
			$cmd .= _temperaturesJSON($i, $name);
			$i++;
		}
		$cmd .= _temperaturesJSON($i, "out");

		$val = shell_exec($cmd);
		
		// Let us repair the json, so it will effectively be a json
		$val = str_replace(' data:', ' "data":', $val);
		$val = str_replace(' about:', ' "about":', $val);
		$val = str_replace(' meta:', ' "meta":', $val);
		$val = str_replace(' start:', ' "start":', $val);
		$val = str_replace(' step:', ' "step":', $val);
		$val = str_replace(' end:', ' "end":', $val);
		$val = str_replace(' legend:', ' "legend":', $val);
		$val = str_replace("'", '"', $val);
		
		// Now let us convert to the json format for extjs
		$obj = json_decode($val);

		$startTime = $obj->meta->start;
		$step = $obj->meta->step;
		
		$currentTime = $startTime;
		
		$newObj = array( "data" => array() );
		
		foreach ($obj->data as $index => $array)
		{
			$newArray = array( "time" => $currentTime*1000 );
			
			foreach ($obj->meta->legend as $legendIndex => $legendName)
			{
				$newArray[$legendName] = $array[$legendIndex] != null ? $array[$legendIndex] : undefined;
			}
			
			$newObj['data'][] = $newArray;	
			
			$currentTime += $step;
		}

		// ok we can return it now
		$retVal = json_encode($newObj);
		return $retVal;
	}
?>
