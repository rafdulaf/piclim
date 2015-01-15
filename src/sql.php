<?php
    include 'config.php';

    $bdd = new PDO('mysql:host='.$BDD_host.';dbname='.$BDD_db, $BDD_user, $BDD_pass);

    function _sql($request, $args)
    {
        global $bdd;

        $stmt = $bdd->prepare($request);
        
        foreach ($args as $key => $value)
        {
        	if (is_int($value))
        	{
        		$stmt->bindValue($key, $value, PDO::PARAM_INT);
        	}
        	else
        	{
        		$stmt->bindValue($key, $value);
        	}
        }
        if(strrchr($request, 'SELECT'))
        {
            $stmt->execute(); 
            return $stmt->fetchAll();
        }
        else
        {
            return $stmt->execute(); 
        }    
    }
?>
