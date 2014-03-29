<?php
    include 'config.php';

    $bdd = new PDO('mysql:host='.$BDD_host.';dbname='.$BDD_db, $BDD_user, $BDD_pass);

    function _sql($request, $args)
    {
        global $bdd;
        
        $stmt = $bdd->prepare($request);
        
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
