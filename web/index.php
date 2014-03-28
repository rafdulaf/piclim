<?php
    include '../src/sonde.php';
?>

<!doctype html>
<html lang="fr">
    <head>
        <meta charset="UTF-8"/>
        <title>Température de la pièce</title>
    </head>
    <body>
        <h1>La température de la pièce est de <?php echo getTemperature(); ?>°C.</h1>
    </body>
</html>
