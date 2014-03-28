<!--
    Get the temperature
-->
<?php
    include 'config.php';

    function getTemperature()
    {
        global $SONDE;
    
        if (!$fp = fopen("/sys/bus/w1/devices/" . $SONDE . "/w1_slave", "r"))
        {
            throw new Exception('Can not get current temperature');
        }
        else
        {
            while(!feof($fp)) 
            {
               $Ligne = fgets($fp,255);
               $Fichier .= $Ligne;
            }
            fclose($fp); // On ferme le fichier
        
            eregi("t=([0-9]+)", $Fichier, $regs);
             
            return round($regs[1]/100)/10;
        }
    }
?>
