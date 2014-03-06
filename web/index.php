<?php
if (!$fp = fopen("/sys/bus/w1/devices/10-00080283b869/w1_slave","r"))
{
  echo "Impossible de lire la sonde de tempÃ©rature";
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
    <title>TempÃ©rature de la piÃ¨ce</title>
  </head>
  <body>
    <h1>La tempÃ©rature de la piÃ¨ce est de <?php echo round($regs[1]/100)/10 ?>Â°C.</h1>
  </body>
</html>
