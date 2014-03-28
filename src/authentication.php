<?php
    include 'sql.php';

    function check_login($login, $password)
    {
        $request = "SELECT count(*) FROM users";
        if (_sql($request) == 0)
        {
            // No login in database means an inscription
            $salt = rand();
            $loginP = mysql_real_escape_string($login);
            $passwordP = mysql_real_escape_string($password);
            $md5password = md5($salt . $passwordP);
            $request = "INSERT INTO users(login, password, salt, fullname, email) VALUES('$loginP', '$md5password', '$salt', 'Administrator', 'noemail@noemail.org');

            return $login;
        }

        $salt = _getSalt($login);
        if ($salt)
        {
            $loginP = mysql_real_escape_string($login);
            
            $passwordP = mysql_real_escape_string($password);
            $md5password = md5($salt . $passwordP);
            
            $request = mysql_query("SELECT login FROM users WHERE login='$loginP' and password='$md5password'");
            return _sql($request);
        }
        else
        {
            return false;
        }
    }
    
    function _getSalt($login)
    {
        $loginP = mysql_real_escape_string($login);

        $request = mysql_query("SELECT salt FROM users WHERE login='$loginP'");
        return _sql($request);
    }
?>
