<?php
    include '../../src/authentication.php';

    $users = getAllUsers();
    
    echo "{success: true, total: " . count($users) . ", users: [";

    foreach ($users as $key => $user)
    {
        if ($key != 0)
        {
            echo ", ";
        }
        echo "{ login: '" . $user['login'] . "', fullname: '" . $user['fullname'] . "', email: '" . $user['email'] . "'}";
    }

    echo "]}";
?>
