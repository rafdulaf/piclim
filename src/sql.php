<?php
    include 'config.php';

    $bdd = new PDO('mysql:host='.$BDD_host.';dbname='.$BDD_db, $BDD_user, $BDD_pass);

    function _sql($request, $args)
    {
        global $bdd;
        
        $stmt = $bdd->prepare($request);

        	var_dump($args);
        if (array_key_exists('start', $args))
        {
        	var_dump($args);
        	$stmt->bindParam(":start", $args['start'], PDO::PARAM_INT);
        	$stmt->bindParam(":limit", $args['limit'], PDO::PARAM_INT);
        }
        
        if(strrchr($request, 'SELECT'))
        {
            $stmt->execute($args); 
            return $stmt->fetchAll();
        }
        else
        {
            return $stmt->execute($args); 
        }    
    }
?>
