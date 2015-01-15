<?php
    include 'config.php';

    $bdd = new PDO('mysql:host='.$BDD_host.';dbname='.$BDD_db, $BDD_user, $BDD_pass);

    function _sql($request, $args)
    {
        global $bdd;
        $bdd->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
        $stmt = $bdd->prepare($request);
        
        foreach ($args as $key => $value)
        {
        	if (is_int($value))
        	{
        		var_dump("param ".$key." is int of ".$value);
        		$stmt->bindParam($key, $value, PDO::PARAM_INT);
        	}
        	else 
        	{
        		var_dump("param ".$key." is string of ".$value);
        		$stmt->bindParam($key, $value);
        	}
        }
        if(strrchr($request, 'SELECT'))
        {
            $stmt->execute(); 
$stmt->debugDumpParams ();
var_dump($stmt->errorInfo());
var_dump($stmt);
            return $stmt->fetchAll();
        }
        else
        {
            return $stmt->execute(); 
        }    
    }
?>
