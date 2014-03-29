<?php
    include 'sql.php';

    /* {login, fullname, email} or null */
    function getCurrentUser()
    {
    	session_start();
    	if(!isset($_SESSION['user']))
    	{
			return null;
    	}
    	return $_SESSION['user'];
    }
    
    /* returns false if wrong authentication, true if ok or 'empty' if db is empty */
    function login($login, $password)
    {
        if (_sql("SELECT count(*) FROM Users", array())[0] == 0)
        {
            // No login in database means an inscription
            return 'empty';
        }

        $salt = _getSalt($login);
        if ($salt)
        {
            $md5password = md5($salt . $password);
            
            $_SESSION['user'] = _sql("SELECT login, fullname, email FROM Users WHERE login=:login and password=:password", 
            							array(':login' => $login, ':password' => $md5password));
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function _getSalt($login)
    {
        return _sql("SELECT salt FROM Users WHERE login=:login",
            		array(':login' => $login));
    }
?>
