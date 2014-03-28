<?php
    include '../src/sonde.php';
    
    try
    {
        $temp = getTemperature();
    }
    catch (Exception $e)
    {
        $temp = "XX.X";
    }
?>

<!doctype html>
<html lang="fr">
    <head>
        <meta charset="UTF-8"/>
        <title>Température de la pièce</title>
    </head>
    <body>
        <h1>La température de la pièce est de <?php echo $temp; ?>°C.</h1>
    </body>
</html>
