<?php
    include '../../src/utils.php';

    echo "{ version: '0.1.0'";
	if (isUserBaseInitialized())
	{
		echo ", initialized: false";
	}
	echo "}";
?>
    