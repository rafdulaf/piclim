<?php
if (!$fp = fopen("/sys/bus/w1/devices/10-00080283b869/w1_slave","r"))
{
  echo "Impossible de lire la sonde de température";
  exit;
}
else
{
    while(!feof($fp)) {
        $Ligne = fgets($fp,255);
        $Fichier .= $Ligne;
     }
     fclose($fp); // On ferme le fichier

        eregi("t=([0-9]+)",$Fichier,$regs);
}
?>

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8"/>
    <title>Température de la pièce</title>
  </head>
  <body>
    <h1>La température de la pièce est de <?php echo round($regs[1]/100)/10 ?>°C.</h1>
  </body>
</html>
