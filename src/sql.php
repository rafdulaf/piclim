<?php
    include 'config.php';

    $bdd = new PDO('mysql:host='.$BDD_host.';dbname='.$BDD_db, $BDD_user, $BDD_pass);

    function _sql($request, $args)
    {
        global $bdd;
        
        $stmt = $bdd->prepare($request);
        
        if(strrchr($request, 'SELECT'))
        {
            $req = $stmt->query($args);
        }
        else
        {
            $stmt->execute($args); 
        }
        
        
        if(!empty($req))
        {
            while ($data = $req->fetch())
            {
                $res[] = $data;
            }
            return $res;
        }
        else
        {
            return false; 
        }
    }
?>
