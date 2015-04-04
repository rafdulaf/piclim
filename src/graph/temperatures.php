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
		$val = str_replace(' data:', ' "data":', $val);
		$val = str_replace(' about:', ' "about":', $val);
		$val = str_replace(' meta:', ' "meta":', $val);
		$val = str_replace(' start:', ' "start":', $val);
		$val = str_replace(' step:', ' "step":', $val);
		$val = str_replace(' end:', ' "end":', $val);
		$val = str_replace(' legend:', ' "legend":', $val);
		$val = str_replace("'", '"', $val);
		
		$obj = json_decode($val);

		$startTime = $obj->meta->start;
		$step = $obj->meta->step;
		
		$currentTime = $startTime;
		
		$newObj = array( "data" => array() );
		
		foreach ($obj->data as $index => $array)
		{
			$newArray = array( "time" => $currentTime );
			
			foreach ($obj->meta->legend as $legendIndex => $legendName)
			{
				$newArray[$legendName] = $array[$legendIndex];
			}
			
			$newObj['data'][] = $newArray;	
			
			$currentTime += $step;
		}
		
		$retVal = json_encode($newObj);
		
		return $retVal;
	}
?>
