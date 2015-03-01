<?php
	include 'config.php';

	/*
	 *  Get the temperature
	 */
	function getTemperatures()
    {
        global $SONDES;

        $temperatures = array();
        
        $temperatures["out"] = "U"; // U for unknown
        
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

	            $temperatures[$Name] = round($regs[1]/100)/10; 
	        }
	    }
	    
	    return $temperatures;
    }
?>
