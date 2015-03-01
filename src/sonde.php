<?php
	include 'config.php';

	/*
	 *  Get the temperature
	 */
	function getTemperatures()
    {
        global $SONDES, $WEATHER;

        $temperatures = array();
        
        $raw_result = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=".$WEATHER);
        var_dump($raw_result);
        $result = json_decode($raw_result, true);
        $external_temperature = $result["main"]["temp"] - 273.15;
        $temperatures["out"] = $external_temperature;
        
        foreach ($SONDES as $Name => $Sonde)
        {
	        if (!$fp = fopen("/sys/bus/w1/devices/" . $Sonde . "/w1_slave", "r"))
	        {
	            throw new Exception('Can not get current temperature for '.$Name.' => '.$Sonde);
	        }
	        else
	        {
	        	$Fichier = "";
	            while(!feof($fp)) 
	            {
	               $Ligne = fgets($fp,255);
	               $Fichier .= $Ligne;
	            }
	            fclose($fp); // On ferme le fichier
	        
	            eregi("t=([0-9]+)", $Fichier, $regs);

	            $temperatures[$Name] = $regs[1]/1000; 
	        }
	    }
	    
	    return $temperatures;
    }
?>
