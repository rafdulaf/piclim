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
        $request = "SELECT count(*) FROM Users";
        if (_sql($request) == 0)
        {
            // No login in database means an inscription
            return 'empty';
        }

        $salt = _getSalt($login);
        if ($salt)
        {
            $loginP = mysql_real_escape_string($login);
            
            $passwordP = mysql_real_escape_string($password);
            $md5password = md5($salt . $passwordP);
            
            $request = mysql_query("SELECT login, fullname, email FROM Users WHERE login='$loginP' and password='$md5password'");
            $_SESSION['user'] = _sql($request);
            return true;
        }
        else
        {
            return false;
        }
    }
    
    function _getSalt($login)
    {
        $loginP = mysql_real_escape_string($login);

        $request = mysql_query("SELECT salt FROM Users WHERE login='$loginP'");
        return _sql($request);
    }
?>
