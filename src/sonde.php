<!--
    Get the temperature
-->
<?php
    include 'config.php';

    function getTemperatures()
    {
        global $SONDES;

        $temperatures = array();
        foreach ($SONDES as $SONDE)
        {
	        if (!$fp = fopen("/sys/bus/w1/devices/" . $SONDE . "/w1_slave", "r"))
	        {
	            throw new Exception('Can not get current temperature');
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

	            $temperatures[] = round($regs[1]/100)/10; 
	        }
	    }
	    
	    return $temperatures;
    }
?>
