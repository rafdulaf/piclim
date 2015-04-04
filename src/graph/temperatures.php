<?php
	function temperaturesJSON()
	{
		// Current path
		$CURRENT_PATH = realpath(dirname(__FILE__));
	
		// Remove existing file if necessary
		unlink($CURRENT_PATH."/temperatures.xml");
		
		// Create new export
		$cmd = "rrdtool dump ".$CURRENT_PATH."/temperatures.rrd ".$CURRENT_PATH."/temperatures.xml";
		shell_exec($cmd);
	
	   $xslDoc = new DOMDocument();
	   $xslDoc->load($CURRENT_PATH."/xml2json.xsl");
	
	   $xmlDoc = new DOMDocument();
	   $xmlDoc->load($CURRENT_PATH."/temperatures.xml");
	
	   $proc = new XSLTProcessor();
	   $proc->importStylesheet($xslDoc);
	   
	   return $proc->transformToXML($xmlDoc);
	}
?>
