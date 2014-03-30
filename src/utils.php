<?php
	include 'devmode.php';
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
        if (_sql("SELECT count(*) FROM Users", array())[0][0] == 0)
        {
            // No login in database means an inscription is required
            return 'empty';
        }

        $salt = _getSalt($login);
        if ($salt)
        {
            $md5password = md5($salt . $password);
            
            $result = _sql("SELECT login, fullname, email FROM Users WHERE login=:login and password=:password", 
                                        array(':login' => $login, ':password' => $md5password));
            if (count($result) == 1)
            {
                $_SESSION['user'] = $result[0][0]; 
                return true;
            }
        }
        
        return false;
    }

    function getAllUsers()
    {
        return _sql("SELECT login, fullname, email FROM Users", array()); 
    }
    
    function _getSalt($login)
    {
        $result = _sql("SELECT salt FROM Users WHERE login=:login",
                    array(':login' => $login));
        if (count($result) == 1)
        {
            return $result[0][0];
        } 
        else
        {
            return false;
        }
    }
?>
