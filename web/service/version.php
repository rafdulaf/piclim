<?php
    include '../../src/utils.php';

    global $TEMP_COLORS;
    echo "{ version: '0.1.0', initialized: " . (isUserBaseInitialized() ? "true" : "false") . ", authenticated: " . (getCurrentUser() != null ? "'" . getCurrentUser()["fullname"] . "'" : "false") . ", temperatures: ".json_encode($TEMP_COLORS)."}";
?>
    