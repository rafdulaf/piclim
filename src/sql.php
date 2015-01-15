<?php
    include 'config.php';

    $bdd = new PDO('mysql:host='.$BDD_host.';dbname='.$BDD_db, $BDD_user, $BDD_pass);

    function _sql($request, $args)
    {
        global $bdd;
        
        $stmt = $bdd->prepare($request);

        	var_dump($args);
        if (in_array('start', $args))
        {
        	$stmt->bindParam(":start", intval($args['start']), PDO::PARAM_INT);
        	$stmt->bindParam(":limit", intval($args['limit']), PDO::PARAM_INT);
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
