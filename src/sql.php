<?php
    $bdd = new PDO('mysql:host='.$BDD_host.';dbname='.$BDD_db, $BDD_user, $BDD_pass);

    function _sql($request)
    {
        global $bdd;
        
        if(strrchr($request, 'SELECT'))
        {
            $req = $bdd->query($request);
        }
        else
        {
            $bdd->exec($request); 
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
