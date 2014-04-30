<?php
	include 'devmode.php';
    include 'sql.php';

   	session_start();
   	
    /* {login, fullname, email} or null */
    function getCurrentUser()
    {
        if(!isset($_SESSION['user']))
        {
            return null;
        }
        return $_SESSION['user'];
    }
    function disconnect()
    {
    	$_SESSION['user'] = null;
    	session_unset();
    	session_destroy();
    }
    
    function isUserBaseInitialized()
    {
    	return (_sql("SELECT count(*) FROM Users", array())[0][0] > 0);
    }
    
    function createUser($login, $password, $fullname, $email)
    {
    	$salt = uniqid(mt_rand(), true);
    	$md5password = md5($salt . $password);
    	
    	_sql("INSERT INTO Users(login, password, fullname, email, salt) VALUES(:login, :password, :fullname, :email, :salt)",
    				array(':login' => $login, ':password' => $md5password, ':fullname' => $fullname, ':email' => $email, ':salt' => $salt));
    }
    
    function loginByToken($login, $remember_token)
    {
    	if (!isUserBaseInitialized() || $remember_token == null)
    	{
    		// No login in database means an inscription is required
    		return false;
    	}
    	 
       	$encryptedToken = md5($remember_token);
        $result = _sql("SELECT login, fullname, email FROM Users WHERE login=:login and remember_token=:remember_token", 
            array(':login' => $login, ':remember_token' => $encryptedToken));

        if (count($result) == 1)
        {
                $_SESSION['user'] = $result[0];

               	$generateToken = uniqid();
               	$encryptedToken2 = md5($generateToken);
                
                $_SESSION['user']['remember_token'] = $generateToken;
                
               	_sql("UPDATE Users SET remember_token=:remember_token WHERE login=:login",
            		array(':remember_token' => $encryptedToken2, ':login' => $login));
                
               return true;
         }
         
         return false;
    }
    
    /* returns false if wrong authentication or db empty, true if ok or */
    function login($login, $password, $remember_token)
    {
        if (!isUserBaseInitialized())
        {
            // No login in database means an inscription is required
            return false;
        }

        $salt = _getSalt($login);
        if ($salt)
        {
            $md5password = md5($salt . $password);
            
            $result = _sql("SELECT login, fullname, email FROM Users WHERE login=:login and password=:password", 
                                        array(':login' => $login, ':password' => $md5password));
            if (count($result) == 1)
            {
                $_SESSION['user'] = $result[0];

                if ($remember_token == "true")
                {
                	$generateToken = uniqid();
                	$encryptedToken = md5($generateToken);
                }
                else
                {
                	$generateToken = null;
                	$encryptedToken = null;
                }
                
                $_SESSION['user']['remember_token'] = $generateToken;
                
               	_sql("UPDATE Users SET remember_token=:remember_token WHERE login=:login",
            		array(':remember_token' => $encryptedToken, ':login' => $login));
                
                return true;
            }
        }
        
        return false;
    }

    function getAllUsers($start, $limit)
    {
        return _sql("SELECT login, fullname, email FROM Users LIMIT :start,:limit", array(':start' => $start, ':limit' => $limit)); 
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
    
    function update()
    {
    	return shell_exec("cd ../.. ; git pull") != '';
    }
?>
