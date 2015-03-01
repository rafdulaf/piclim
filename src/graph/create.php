<?php
	include '../sonde.php';
	
	// Current path
	$CURRENT_PATH = realpath(dirname(__FILE__));
	
	// If rrdfile exists => remove it and remove cron
	echo("REMOVING EXISTING RRD FILE");
	echo("\n");
	unlink($CURRENT_PATH."/temperatures.rrd");
	echo("\n");
	echo("\n");
	
	// CREATE CRON
	$cmd = "crontab -l | grep -v \"$CURRENT_PATH\" | crontab -";

	echo("REMOVING EXISTING CRON TASK");
	echo("\n");
	echo($cmd);
	echo("\n");
	echo(shell_exec($cmd));
	echo("\n");
	echo("\n");
	
	// CREATE RRD FILE
	$EVERY=5; // every 5 minutes
	$MIN_TEMPERATURE=-60;
	$MAX_TEMPERATURE=60;
	$STEP=$EVERY*60;
	
	$cmd = "rrdtool create $CURRENT_PATH/temperatures.rrd --step $STEP ";
	
	$temperatures = getTemperatures();
	foreach ($temperatures as $name => $temp)
	{
		$cmd .= "DS:temp_".$name.":GAUGE:".($STEP*2).":$MIN_TEMPERATURE:$MAX_TEMPERATURE ";
	}
	
	// Remember every 5 minutes during 7 days (7*24*60/5)
	$cmd .= "RRA:MIN:0.5:1:2016 RRA:AVERAGE:0.5:1:2016 RRA:MAX:0.5:1:2016 "; 
	// Remember every 1 hour (12*5 minutes) during 30 days (30*24)
	$cmd .= "RRA:MIN:0.5:12:720 RRA:AVERAGE:0.5:12:720 RRA:MAX:0.5:12:720 "; 
	// Remember every day (24 * 12*5 minutes) during 5 years (365*5)
	$cmd .= "RRA:MIN:0.5:288:1825 RRA:AVERAGE:0.5:288:1825 RRA:MAX:0.5:288:1825 ";

	echo("CREATING RDD FILE");
	echo("\n");
	echo($cmd);
	echo("\n");
	echo(shell_exec($cmd));
	echo("\n");
	echo("\n");
	
	// CREATE CRON
	$cmd = "crontab -l | { cat; echo \"*/$EVERY * * * * cd $CURRENT_PATH ; php -f cron.php >/dev/null 2>&1 \"; } | crontab -";
	echo("CREATING CRON TASK");
	echo("\n");
	echo($cmd);
	echo("\n");
	echo(shell_exec($cmd));
	echo("\n");
	echo("\n");
?>
