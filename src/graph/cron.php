<?php
	include '../sonde.php';

	$cmd = "rrdtool update temperatures.rrd N";

	$temperatures = getTemperatures();
	foreach ($temperatures as $name => $temp)
	{
		$cmd .= ":".$temp;
	}
	
	echo($cmd);
	echo("\n");
	echo(shell_exec($cmd));
?>