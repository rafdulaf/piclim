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
        		var_dump("param ".$key." is int of ".$value);
        		$stmt->bindValue($key, $value, PDO::PARAM_INT);
        	}
        	else
        	{
        		var_dump("param ".$key." is string of ".$value);
        		$stmt->bindValue($key, $value);
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
