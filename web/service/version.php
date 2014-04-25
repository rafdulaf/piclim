<?php
    include '../../src/utils.php';

    echo "{ version: '0.1.0', initialized: " . (isUserBaseInitialized() ? "true" : "false") . ", authenticated: " . (getCurrentUser() != null ? "'" . getCurrentUser()["fullname"] . "'" : "false") . "}";
?>
    