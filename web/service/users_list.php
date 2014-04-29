<?php
    include '../../src/authentication.php';

    echo "{success: true, users: [";

    foreach (getAllUsers() as $key => $user)
    {
        if ($key != 0)
        {
            echo ", ";
        }
        echo "{ login: '" . $user['login'] . "', fullname: '" . $user['fullname'] . "', email: '" . $user['email'] . "'}";
    }

    echo "]}";
?>
